# Part 0 (Intro)

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D0%B2%D0%B5%D1%80%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F-%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC)Verification of distributed systems

Distributed storage and data processing systems are a key component of
modern scalable web services.

For example:

-   Amazon Uses Dynamo to Implement Shopping Cart
-   Google uses BigTable in Gmail
-   LinkedIn uses Kafka to transport user data

For such systems, correctness is critical: due to an error at the
storage level, the user of the service can lose his money, messages or
other important data.

Writing correct code for distributed systems is incredibly difficult
because there are many factors to consider: concurrency, asynchrony,
lost messages, node failures. Therefore, one of the main problems for
such systems is _verification_ - checking the system for compliance with
a set of requirements (for example: after confirming the data, the
system has no right to lose it).

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D1%8B%D0%B5-%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4%D1%8B)Standard Approaches

The industry uses several standard methods for verifying distributed
systems:

-   Design review - developers describe system components and their
    interaction protocol in order to detect possible errors at the
    design stage, before writing code
-   Testing
-   Code review - after passing all handwritten tests, developers try to
    find bugs by reviewing new code

But these methods are not enough. The reason is that it is difficult for
a person to simulate all possible executions of a distributed system in
his head, it is easy for him to miss a difficult race for design
reviews, code reviews, or when writing a test.

Эту мысль подтверждают инженеры из Amazon [4]: "We use deep design
reviews, code reviews, static code analysis, stress testing,
fault-injection testing, and many other techniques, but we still find
that subtle bugs can hide in complex concurrent fault-tolerant systems.
One reason for this problem is that human intuition is poor at
estimating the true probability of supposedly ‘extremely rare’
combinations of events in systems operating at a scale of millions of
requests per second ..."

There is a randomized approach to testing - fault injection. To cover as
many non-trivial executions as possible, failures (node ​​restarts,
delays, or network partitions) are introduced into the system code or
the runtime environment, which are triggered at arbitrary times.

But even this method does not guarantee that very rare scenarios will be
detected.

Инженеры AWS заключают: "We have found that testing the code is
inadequate as a method to find subtle errors in design, as the number of
reachable states of the code is astronomical. So we looked for a better
approach."

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B)Formal Methods

An alternative approach to verification ("better approach", which is
discussed above) - formal methods.

_Formal verification_ is the construction of a logical model of the
system and its analysis by means of mathematical logic.

Basic concepts used by formal verification:

-   _State Machine_ - a time-varying state, which is described by a set
    of variables
-   _State of the_ machine - assigning values ​​to these variables
-   _Behavior_ or _trajectory_ - an infinite sequence of states
-   _Specification_ or _spec_ is a declarative description of all system
    behaviors (states and transitions between them)
-   _Property (Property)_ is a set of permissible system behaviors,
    usually expressed as a temporal logic formula

A specification is a strict, formal analogue of a design document.

The problem of _model checking_ consists in examining the system state
graph and checking the specified properties.

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#tla)TLA +

One of the most popular implementations of this approach is the TLA +
language developed by Leslie Lamport and the TLC - model checker for it.

TLA + is a formal specification language based on untyped set theory,
first-order logic, and temporal logic, which Lamport calls _TLA
(Temporal Logic of Actions)_ .

A typical specification for formal verification against TLA + looks like
this: Spec == Init / \ [] Next.

Where:

-   Init is a predicate that sets the set of initial states of the
    system
-   Next - predicate on pairs of states ( _action_ , action)
-   [] is a temporal operator meaning "always"

Properties in TLA + are defined by _LTL_ formulas - temporal logic of
linear time.

Examples:

Starvation Freedom - The mutex ensures that each thread hits the
critical section infinitely often.

```
StarvationFreedom == \A t \in Thread: []<>(pc[t] = "CS")
```

Eventual Consistency - all replicas will eventually converge to the same
state

```
EventualConsistency == <>[] (\A i, j \in Regions : Database[i] = Database[j])
```

A good introduction to TLA + is the Practical TLA book and video course
by Leslie Lamport. A good detailed reference is Specifying Systems.

### [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC)Modeling Distributed Systems

In this work, we will use TLA + for the specification and verification
of distributed systems.

By itself, TLA + is not tied to distribution in any way, does not
operate with the concepts of this subject area. It is a logical
"assembler" that can be used to describe arbitrary systems. But Lamport
deliberately structured it in such a way that asynchrony and concurrency
fit comfortably.

General scheme of representation of a distributed system in TLA +:

-   The vertices in the state graph correspond to a “snapshot” of the
    entire system, they are formed by the state of all replicas in the
    system and the state of the network.
-   State transitions correspond to the reaction of nodes to events:
    delivery of a message from another node, a request or operation from
    a client, etc.

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#tla-%D0%B2-%D0%B8%D0%BD%D0%B4%D1%83%D1%81%D1%82%D1%80%D0%B8%D0%B8)TLA + in the industry

TLA + was developed by Leslie Lamport in 1999 as a tool for specifying
his own algorithms, and was only used in academia.

Industry interest began with the article “Use of Formal Methods at
Amazon Web Services”, in which AWS engineers shared their experience of
formal verification of algorithms critical for cloud infrastructure:
replication and reconfiguration protocols, lock-free algorithms, network
protocols.

[![result](https://github.com/VadimPlh/Arrival/raw/master/diploma/res.png)](https://github.com/VadimPlh/Arrival/blob/master/diploma/res.png)

Now more and more large IT companies use TLA + to verify their services:

-   Microsoft Azure Cloud Platform Developers Specify CosmosDB
    Distributed Database Consistency Models Using TLA +
-   In Yandex, using TLA +, a complex ABA scenario of several dozen
    steps was reproduced in a lock-free memory allocator and the patch
    for this scenario was verified.
-   In Elastic, using TLA +, we verified the algorithm for compiling the
    index by documents and the data replication protocol.

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#clickhouse)ClickHouse

ClickHouse (Clickhouse, KX) is a columnar database management system
(DBMS) for online processing of analytical queries (OLAP). Developed by
Yandex and the open-source community.

Tables in ClickHouse are scaled horizontally using sharding, and fault
tolerance is provided by replicating each of the shards.

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%86%D0%B5%D0%BB%D0%B8-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)Objectives of the work

The main task is to highlight general techniques for describing
distributed systems and the model in which they operate:

-   Investigate existing TLA + specifications for distributed algorithms
    and industrial distributed systems.
-   Highlight general techniques for modeling distributed systems
    (modeling sections / components, networks, failures, working with
    TLC),
-   Apply these techniques for a formal description of the replication
    algorithm and verification of log trimming algorithms and quorum
    records in Clickhouse.

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)Research specifications

The work will investigate the specifications for the following
algorithms and systems:

-   Replication protocol of a partition in a distributed persistent
    Apache Kafka message queue
-   Snapshot Isolation is a transaction isolation algorithm that runs on
    top of a multiversion data warehouse.
-   Percolator is a client-side distributed transaction protocol on top
    of a distributed key / value storage BigTable, used by Google.
-   Single Decree Paxos is a distributed consensus protocol that
    underlies the mechanism for replicating shards (tablets) in the
    Google Spanner system.
-   Raft is a command log replication protocol, a modern analogue of
    Paxos. Used by MongoDB, InfluxDB and etcd

## [](https://github.com/VadimPlh/Arrival/blob/master/diploma/1-modeling.md#%D0%BF%D0%BB%D0%B0%D0%BD-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)Work plan

Chapter 1 will describe the principles for specifying distributed
systems using TLA +:

-   How to choose the right level of detail for a system / algorithm
-   Is it necessary to simulate glitches in specs
-   How to model a network in algorithms that use communication through
    sending messages between nodes
-   How TLA + allows you to describe the non-determinism that occurs in
    the system.

Chapter 2 discusses the engineering aspects of formal verification:

-   How to test the specification itself
-   How to reduce the number of states in a configuration graph
-   How to choose the appropriate mode for the model checker.

In Chapter 3, we will apply all the developed tricks for the formal
specification and verification of the replication protocol in the
ClickHouse distributed analytical database.
