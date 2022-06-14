24 Sep 2014

Linearizability and serializability are both important properties about
interleavings of operations in databases and distributed systems, and
it’s easy to get them confused. This post gives a short, simple, and
hopefully practical overview of the differences between the two.

#### Linearizability: single-operation, single-object, real-time order

_[Linearizability](http://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf)
is a guarantee about single operations on single objects._ It provides a
real-time (i.e., wall-clock) guarantee on the behavior of a set of
single operations (often reads and writes) on a single object (e.g.,
distributed register or data item).

In plain English, under linearizability, writes should appear to be
instantaneous. Imprecisely, once a write completes, all later reads
(where “later” is defined by wall-clock start time) should return the
value of that write or the value of a later write. Once a read returns a
particular value, all later reads should return that value or the value
of a later write.

Linearizability for read and write operations is synonymous with the
term “atomic consistency” and is the “C,” or “consistency,” in Gilbert
and Lynch’s
[proof of the CAP Theorem](http://lpd.epfl.ch/sgilbert/pubs/BrewersConjecture-SigAct.pdf).
We say linearizability is _composable_ (or “local”) because, if
operations on each object in a system are linearizable, then all
operations in the system are linearizable.

#### Serializability: multi-operation, multi-object, arbitrary total order

_Serializability is a guarantee about transactions, or groups of one or
more operations over one or more objects._ It guarantees that the
execution of a set of transactions (usually containing read and write
operations) over multiple items is equivalent to _some_ serial execution
(total ordering) of the transactions.

Serializability is the traditional “I,” or isolation, in
[ACID](http://sites.fas.harvard.edu/~cs265/papers/haerder-1983.pdf). If
users’ transactions each preserve application correctness (“C,” or
consistency, in ACID), a serializable execution also preserves
correctness. Therefore, serializability is a mechanism for guaranteeing
database
correctness.[1](http://www.bailis.org/blog/linearizability-versus-serializability/#fn:mechanism)

Unlike linearizability, serializability does not—by itself—impose any
real-time constraints on the ordering of transactions. Serializability
is also not composable. Serializability does not imply any kind of
deterministic order—it simply requires that _some_ equivalent serial
execution exists.

#### Strict Serializability: Why don’t we have both?

Combining serializability and linearizability yields _strict
serializability_: transaction behavior is equivalent to some serial
execution, and the serial order corresponds to real time. For example,
say I begin and commit transaction T1, which writes to item _x_, and you
later begin and commit transaction T2, which reads from _x_. A database
providing strict serializability for these transactions will place T1
before T2 in the serial ordering, and T2 will read T1’s write. A
database providing serializability (but not strict serializability)
could order T2 before
T1.[2](http://www.bailis.org/blog/linearizability-versus-serializability/#fn:implementation)

As
[Herlihy and Wing](http://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf)
note, “linearizability can be viewed as a special case of strict
serializability where transactions are restricted to consist of a single
operation applied to a single object.”

#### Coordination costs and real-world deployments

Neither linearizability nor serializability is achievable without
coordination. That is we can’t provide either guarantee with
availability (i.e., CAP “AP”) under an asynchronous
network.[3](http://www.bailis.org/blog/linearizability-versus-serializability/#fn:hardness)

In practice, your database is
[unlikely to provide serializability](http://www.bailis.org/blog/when-is-acid-acid-rarely/),
and your multi-core processor is
[unlikely to provide linearizability](http://preshing.com/20120930/weak-vs-strong-memory-models/)—at
least by default. As the above theory hints, achieving these properties
requires a lot of expensive coordination. So, instead, real systems
often use cheaper-to-implement and often
[harder-to-understand](http://www.bailis.org/blog/understanding-weak-isolation-is-a-serious-problem/)
models. This trade-off between efficiency and programmability represents
a fascinating and challenging design space.

#### A note on terminology, and more reading

One of the reasons these definitions are so confusing is that
linearizability hails from the distributed systems and concurrent
programming communities, and serializability comes from the database
community. Today, almost everyone uses _both_ distributed systems and
databases, which often leads to overloaded terminology (e.g.,
“consistency,” “atomicity”).

There are many more precise treatments of these concepts. I like
[this book](http://link.springer.com/book/10.1007%2F978-3-642-15260-3),
but there is plenty of free, concise, and (often) accurate material on
the internet, such as
[these notes](https://www.cs.rochester.edu/~scott/458/notes/04-concurrent_data_structures).

#### Notes

_You can follow me on Twitter [here](https://twitter.com/#!/pbailis)._

---

---
