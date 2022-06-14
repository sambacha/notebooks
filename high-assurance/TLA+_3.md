## General words about the system

ClickHouse is a columnar database management system (DBMS) for online processing of analytical queries (OLAP). Which is developed by Yandex and the open-source community.

In this chapter, we will deal with the specification and verification of the replication protocol details of this system.

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C)Distribution

The KX data model operates with tables. Each table is implemented by a specific engine, which is responsible for the data storage mechanism and the process of processing client requests.

KX supports horizontal scaling using distributed sharded tables, which are implemented by the _Distributed_ engine .

KX is a fault-tolerant system where each shard of a distributed table is independently replicated, the replication protocol is encapsulated in the _Replicated_ engine family .

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%80%D0%B5%D0%BF%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F)Replication

We will consider a separate shard of a distributed table.

-   A shard is a set of replicas whose behavior is determined by the ReplicatedMergeTree engine
-   Insertions into the shard table are done in blocks
-   Inserts are performed through different shard replicas, replicas learn about the insertion to other nodes through ZooKeeper and download the corresponding block directly from other replicas that are currently connected to ZK
-   To detect "dead" replicas, ZooKeeper stores an ephemeral is_active node, which shows whether the node has a connection with ZooKeeper. We will call such replicas _active_ .
-   Blocks with data are stored in separate sorted files; to optimize reading, these files need to be merged together.
-   In order for replicas to converge to one state, they must agree on the order of insertions and merges, for this they use the update log in ZooKeeper
-   The information about the insert goes to the log after the replica has processed the user's request and written the data to itself on the disk.
-   Merges are assigned (added to the log) by the replica leader, which is selected using ZK.

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D0%BE%D1%82%D1%87%D0%B8%D1%81%D1%82%D0%BA%D0%B0-%D0%BB%D0%BE%D0%B3%D0%B0)Log clearing

It is impossible to store the entire update log in ZooKeeper indefinitely, you just need to maintain an acute tail, and old records that have already been processed by all replicas can be deleted.

We can delete the old commands that processed all the replicas, since the existing replicas will never see them, because they only move their iterator forward, and the new ones will copy the state from active replicas at startup.

Each of the replicas stores a log_pointer in the ZooKeeper, which points to the last record processed by the replica. During cleaning, we will delete entries from the log to the minimum log pointer of active replicas

The replica can re-establish communication with the ZK and become active again. At this moment, she needs to understand whether the entries she needs have been removed from the log. To do this, when clearing the log, we will mark inactive replicas, for which we have deleted the necessary records, with the is_lost flag in ZooKeeper.

When such a replica becomes active again, it can understand whether it needs to copy the state from another replica, or if it can simply continue to log.

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#quorum-insertselect)Quorum Insert/Select

In normal mode, the replica confirms the insert to the client after it writes data only to the local disk, replication is performed asynchronously.

The client wants to be more reliable and receive an insert confirmation only after a synchronous write to multiple replicas. To do this, ClickHouse uses the _quorum inserts_ mode .

The replica to which the quorum insert arrived creates a node in ZooKeeper, writes itself to it, and then adds a record of the quorum insert to the log. When other replicas reach this record, they will check to see if the insert has reached a quorum. If not, they will download the corresponding block for themselves and join the quorum by updating the corresponding node in ZK.

If the replica sees that the required number of replicas has been collected in the znode for the quorum, then the node will delete this znode, and the client will confirm the entry. If, for some reason, a replica that wants to take part in the quorum cannot receive this block, then the quorum is considered failed and information about this is recorded in ZooKeeper.

This algorithm can be improved to provide sequential consistency for reads. To achieve this, it is necessary to respond during reading only if the replica has all the blocks inserted with quorum. To do this, ZooKeeper stores the number of the last recorded block along with the quorum.

When Select comes to the replica, the replica responds to it only if it has all the blocks that were inserted with quorum, except for those for which the quorum has failed.

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)Modeling

First of all, let's choose the level of abstraction for the model.

During an update (insert or merge), the replica first of all inserts information about it into ZooKeeper. Thus, all actions on the system are ordered using the log and information about new updates and the order on them replicas get exactly from it, therefore, unlike Kafka, we do not need to simulate communication between replicas, but we can assume that if the replica has read the information about the insert, then she immediately downloaded this piece of data for herself.

The main characters will be replicas and clients. For better readability, let's combine the actions for each of the entities:

```
ReplicaAction ==
    \E replica \in Replicas:
        \/ ExecuteInsert(replica)
        \/ ExecuteMerge(replica)
        \/ BecomeLeader(replica)

ClientAction ==
    \/ Insert
    \/ Select
```

Replicas can restart or lose connectivity with other replicas and ZK (for example, if the replica is in a DC that is inaccessible due to channel damage). We will simulate this using the ReplicaBecomeInactive and ReplicaBecomeActive actions:

```
ReplicaBecomeInactive ==
    /\ \E replica \in Replicas :
      /\ IsActive(replica)
      /\ RepicaStartInactive(replica)
      ...

ReplicaBecomeActive ==
    /\ \E replica \in Replicas :
      /\ ~IsActive(replica)
      /\ RepicaStartActive(replica)
      ...
```

All information about the replica is stored (is_active flag, log_pointer, local chunks, etc.) in a separate node in ZK. After restarting, the replica must restore which log entries it has already processed and which chunks it has locally.

Non-determinism in the system manifests itself in several points:

The client can send his request to any of the replicas. We simulate sending requests using an action:

```
QuorumReadLin ==
    ...
    /\ \E replica \in Replicas :
        /\ IsActive(replica)
        /\ Cardinality(GetCommitedId) = Cardinality(replicaState[replica].local_parts \ ({quorum.data} \cup GetData(failedParts)))
    ...

ClientAction ==
    \/ QuorumInsert
    \/ QuorumReadLin
```

Secondly, any of the replicas can take an action on its own initiative: refuse, process a new entry in the log, update the quorum information. We simulate the replica behavior using the ReplicaAction:

```
 ReplicaAction ==
     \E replica \in Replicas:
      \/ IsActive(replica)
          /\ \/ ExecuteLog(replica)
             \/ UpdateQuorum(replica)
             \/ EndQuorum(replica)
             \/ BecomeInactive(replica)
             \/ FailedQuorum(replica)
      \/ ~IsActive(replica)
          /\ BecomeActive(replica)
```

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)Testing

Verification confirms the correctness of the log trimming algorithm: the ValidLogPointer invariant is not violated:

```
ValidLogPointer == [] (\A replica \in Replicas: IsActive(replica) => deletedPrefix < replicaState[replica].log_pointer)
```

The spec about Quorums deserves special attention.

In KX there is a sequential_consistency setting, which should provide one of the consistency modes.

In this mode, the replica responds to a user request when its maximum local last inserted block number is equal to the number of the last block inserted using quorum inserts, which is read from the ZK. Reads, in ZK, unlike records, do not go through the ZAB protocol, but are performed locally. This means that we may have gotten an obsolete value for the last quorum record.

```
QuorumReadWithoutLin ==
    /\ Len(log) > 0
    /\ Cardinality(GetSelectFromHistory(history)) < HistoryLength
    /\ \E replica \in Replicas :
        /\ IsActive(replica)
        /\ LET max_data == Max(replicaState[replica].local_parts \ ({quorum.data} \cup GetData(failedParts)))
           IN /\ max_data # NONE
              /\ ReadEvent(GetIdForData(max_data, log))
    /\ UNCHANGED <<log, replicaState, nextRecordData, quorum, lastAddeddata, failedParts>>
```

If you check the history, then TLC will give an error.

If we make linearizable reading in ZK, then KX itself will also be linearizable for quorum readings. Let's simulate this with the QuorumReadLin action:

```
QuorumReadLin ==
    /\ Len(log) > 0
    /\ Cardinality(GetSelectFromHistory(history)) < HistoryLength
    /\ \E replica \in Replicas :
        /\ IsActive(replica)
        /\ Cardinality(GetCommitedId) = Cardinality(replicaState[replica].local_parts \ ({quorum.data} \cup GetData(failedParts)))
        /\ LET max_data == Max(replicaState[replica].local_parts \ ({quorum.data} \cup GetData(failedParts)))
           IN /\ max_data # NONE
              /\ ReadEvent(GetIdForData(max_data, log))
    /\ UNCHANGED <<log, replicaState, nextRecordData, quorum, lastAddeddata, failedParts>>
```

If you check the story with such an action, it turns out to be linearizable.