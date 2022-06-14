# Part 2 (model checker)

In the previous chapter, we explored techniques for modeling distributed systems using TLA +. In this chapter, we will talk about model verification using TLC - model checker for TLA +

TLC explicitly examines the state graph of a system: to check invariants, it needs to traverse every reachable state, and to check arbitrary temporal properties, it explicitly decomposes the entire graph in memory and find strongly connected components in it.

## [](#масштаб-модели)Model scale

For formal verification of the model, it is necessary to fix the values of parameters corresponding to competitive activity: the number of replicas in the distributed system, the number of proposals in Single-Decree Paxos, the number of transactions in the Percolator, etc. These parameters limit the number of states of the model and make it suitable for model checking.

It is easy to see that the number of model states will exponentially depend on the values of these parameters. This means that we will not be able to afford the same scale of competition as in a real system.

Nevertheless, model validation even for small parameter values can still run away in correctness. The nature of competitive bugs is such that, although they may require a large number of steps, they are usually modeled on a small number of nodes / threads / transactions. Therefore, it can be expected that if there is a performance that violates properties, then it will be presented.

Here are some examples confirming this intuition:

-   In Basic Paxos, the acceptance of the same value on most acceptors is not enough for the value to be considered selected - a counterexample can be built on 3 acceptors and 4 proposals.
-   Bugs in lf algorithms can most often be simulated on a very small number of threads, regardless of the complexity of the bug itself.
-   A read-only anomaly in the Snapshot Isolation algorithm is achieved on 3 transactions and 2 keys.
-   Авторы статьи "[usenix.org/system/files/conference/osdi14/osdi14-paper-yuan.pdf](https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-yuan.pdf)" изучили 198 сбоев в 5 распределенных системах (Cassandra, HBase, HDFS, Hadoop MapReduce и Redis) и обнаружили, что: "Almost all (98%) of the failures are guaranteed to manifest on no more than 3 nodes. 84% will manifest on no more than 2 nodes…. It is not necessary to have a large cluster to test for and reproduce failures".

In practice, to verify distributed algorithms, <10 participants are sufficient: replicas / proposals / transactions.

## [](#исследование-графа)Graph exploration

TLC can explore the state graph of a system in two ways: Breadth First Traversal and Simulation.

By default, TLC uses Breadth First Search. Breadth First Search ensures that if the invariant is violated, the checker will return a counter example of the minimum length.

For example, TLC finds a shorter Read-only anomaly scenario in the Snapshot Isolation allogrhythm than in the original article on this anomaly.

The breadth-wide traversal of the state graph allows testing models with an infinite number of states: all possible trajectories will be examined "in parallel". This means that the longer the model checker examines our spec, the more we can be sure that the more we are confident in the correctness of the modeled system.

But if we know that there is no short counterexample, then we can try our luck in the simulation mode: instead of examining all trajectories at once, the checker will choose arbitrary ones.

For example, this method allows you to find read-only script anomalies in SI much faster than breadth-first traversal.

## [](#дедлоки)Details

To limit the number of states in the model for the system under study, we limit the number of client operations / transactions, which means that states arise in the model in which all events have already occurred and no transitions can be made.

TLC will by default take these states as the deadlock of the algorithm, although they only indicate the end of the system.

To get rid of "false" deadlocks, we will create an additional clause in Next, which will generate an explicit loop in states in which limited external events (client requests, transactions, etc.) have been exhausted.

For example, in the SI spec, a new action is added to Next, where it is checked that the id of completed transactions match the initial set:

```
LegitimateTermination ==  FinalizedTxns(history) = TxnId

Next == \/ \E txn \in TxnId :
            \/ Begin(txn)
            \/ Commit(txn)
            \/ ChooseToAbort(txn) (* as contrasted with being forced to abort by FCW rule or deadlock prevention *)
            \/ \E key \in Key :
                \/ Read(txn, key)
                \/ StartWriteMayBlock(txn, key)

               (* Internal actions *)
            \/ FinishBlockedWrite(txn)
        \/ (LegitimateTermination /\ UNCHANGED allvars)
```

## [](#тестирование)Testing

Although the system specification in TLA + is a logical formula, quality criteria (uniform style, comments on complex actions) and work techniques (testing individual statements and checking the "code" coverage of the spec) with the program code are applicable to it.

### [](#юнит-тестирование)Unit testing

It is useful to write unit tests for individual non-trivial operators from which properties are then built.

Examples:

In the SI spec, unit tests verify that the FindAllNodesInAnyCycle statement detects a cycle in the conflicting transaction graph.

```
UnitTests_FindAllNodesInAnyCycle ==
    /\ FindAllNodesInAnyCycle({})                                                       = {}
    /\ FindAllNodesInAnyCycle({<<"a", "b">>})                                           = {}
    /\ FindAllNodesInAnyCycle({<<"a", "b">>, <<"b", "c">>, <<"c", "d">>})               = {}
    ...
```

The following tests verify that the specification defeats valid transaction execution histories: every transaction in history must go through the Begin -> \[Write | Read\] -> Abort | Commit steps.

```
UnitTest_WellFormedTransactionsInHistory ==
         (* must begin *)
    /\   WellFormedTransactionsInHistory(<<[op |-> "begin", txnid |-> "T_1"]>>)
    /\ ~ WellFormedTransactionsInHistory(<<[op |-> "write", txnid |-> "T_1", key |-> "K_X"], [op |-> "begin", txnid |-> "T_1"]>>)
         (* multiple begin *)
    /\ ~ WellFormedTransactionsInHistory(<<[op |-> "begin", txnid |-> "T_1"], [op |-> "begin", txnid |-> "T_1"], [op |-> "write", txnid |-> "T_1", key |-> "K_X"]>>)
    ...
```

You can "run" tests like this:

1.  В секции TLC "What is the behavior spec?", выбрать "No Behavior Spec"
2.  In "Evaluate Constant Expression" write the name of the unit test

### [](#покрытие-кода)Code coverage

If TLC does not find a property violation, then it is useful to make sure that it actually investigated non-trivial system behaviors and used all the described actions. In other words, it is useful to check the coverage of the spec's "code".

For example:

-   In SI, you can check that transactions generally start and some are executed. Since only then can we talk about some properties.
-   In Paxos, you can check that the second phase of the algorithm is happening at all.

In order to check the existence of a nontrivial trajectory, you need to write an invariant that will select it and check its negation.

Example:

The SI transaction isolation algorithm does not guarantee serializability; it can generate performance anomalies that cannot be serialized. So, in addition to the properties that this algorithm provides, it is reasonable to check that the model that TLC investigated did indeed have these anomalies.

```
ReadOnlyAnomaly(h) ==
        (* current history is not serializable *)
    /\  ~ CahillSerializable(h)
        (* and there is a transaction that does some reads and zero writes,
           and when that transaction is entirely removed from the history,
               the resulting history is serializable. *)
    /\ \E txn \in TxnId :
            LET keysReadWritten == KeysReadAndWrittenByTxn(h, txn)
            IN
                /\ Cardinality(keysReadWritten[1]) > 0
                /\ Cardinality(keysReadWritten[2]) = 0
                /\ CahillSerializable(HistoryWithoutTxn(h, txn))
```

The TLC developer is working on built-in profiling in the IDE to make it easier to check code coverage.

### [](#мутационоое-тестирование)Mutation testing

Mutation testing is a way to ensure the signal quality of successful tests. Mutation testing makes small destructive changes to the program that should break the tests. If this does not happen, then the tests need to be redone.

Likewise with formal verification: errors are introduced into the specification of the algorithm, after which the TLC must detect violations of properties.

The Paxos algorithm is based on the fact that the quorum of the first phase of the algorithm intersects with the quorums of the second phase. If, when checking a model, you specify a quorum system in which there are two disjoint sets, then TLC should detect a violation of the SafeValue property.

### [](#проверка-типов)Type checking

Like dynamically typed programming languages, variables in TLA + are typeless. Lamport writes about this: "If a specification language is to be general, it must be expressive. No simple type system is as expressive as untyped set theory. While a simple type system can allow many specifications to be written easily, it will make some impossible to write and others more complicated than they would be in set theory. "

But expressiveness has a downside, which is well known to developers in dynamically typed languages: a simple typo in the program text can appear only during startup and not immediately. The same is true for TLA +.

To debug such errors, it is useful to introduce a technical invariant that will check that the variables that form the state of the system are at their expected values.

According to the tradition laid down by Lamport, such an invariant is called TypeOK.

Examples:

Paxos:

```
Message ==      [type : {"1a"}, bal : Ballot]
           \cup [type : {"1b"}, acc : Acceptor, bal : Ballot,
                 mbal : Ballot \cup {-1}, mval : Value \cup {None}]
           \cup [type : {"2a"}, bal : Ballot, val : Value]
           \cup [type : {"2b"}, acc : Acceptor, bal : Ballot, val : Value]

TypeOK == /\ maxBal \in [Acceptor -> Ballot \cup {-1}]
          /\ maxVBal \in [Acceptor -> Ballot \cup {-1}]
          /\ maxVal \in [Acceptor -> Value \cup {None}]
          /\ msgs \subseteq Message
```

Typically, TypeOk describes a network protocol, that is, all possible messages that can be exchanged between nodes.

## [](#читаемая-траектория)Readable trajectory

TLC is able to print the trajectory on which the checked properties were violated. The trajectory is either a finite succession of states, or a cycle of states (in case of violation of temporal properties). Each state is described by the values of variables.

In order for the trajectory for each state to indicate the action that was taken during the transition, Next must be a simple disjunction:

Example: Kafka

```
Next ==
    \/ ControllerElectLeader
    \/ ControllerShrinkIsr
    \/ BecomeLeader
    \/ LeaderExpandIsr
    \/ LeaderShrinkIsr
    \/ LeaderWrite
    \/ LeaderIncHighWatermark
    \/ BecomeFollowerTruncateToHighWatermark
    \/ FollowerReplicate
```

This approach requires that we introduce an existential quantifier into each individual action, which impairs readability.

If we add all the actions of one entity under one quantifier of existence, then we will lose references to actions in the trajectory:

```
Next == \/ \E b \in Ballot : \/ Phase1a(b)
                             \/ \E v \in Value : Phase2a(b, v)
        \/ \E a \in Acceptor : Phase1b(a) \/ Phase2b(a)
```

It is necessary to choose between the readability of the trajectory and the readability of the spec.