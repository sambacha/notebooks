---
tags: Time, Ethereum2.0
---

# Proposal against correlated time-level attacks

> source
> [https://hackmd.io/GnJ_Cf4FSZW-BZImH8KF1w](https://hackmd.io/GnJ_Cf4FSZW-BZImH8KF1w)

There is an
[issue](https://github.com/ethereum/eth2.0-specs/issues/1592) describing
Sybil-like NTP-level attack. The document describes a draft proposal to
solve the problem.

**NB** We describe correlated faults and centralization in a bit more
details in
[the document (Work in progress)](https://hackmd.io/RMxce_2URNm0kToME46aNg).

## Analysis of the problem

### Correlated time-level faults

The essence of the issue is correlated time-level faults. Validator node
clocks can fail (to be synchronized) for various reasons:

-   clock can lost connection to time service for a long time
-   time service they depend on can fail
-   they may be manipulated by an adversary.

If such failures are independent, it's a problem of affected validators,
but not of the beacon chain system, since it's very unlikely that many
of such faults occur at the same time. However, if such failures are
correlated then the probability of many simultaneous faults is much
higher and, thus, the beacon chain cannot be considered a reliable
system.

### Low-stake validators

My assumption is that there are likely to be many low-stake validators
which do not have enough resources and/or expertise to set up a reliable
time service by themselves. Thus they will use the simplest solution,
which is [NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) +
[NTP pool](https://www.pool.ntp.org/en/) (or NTP servers from Public
Time Server Lists), leading to an implicit dependence on the single time
source. Thus, one cannot assume time faults are independent and there is
significant probability that an adversary can organize successful
Sybil-like NTP-level attack (described in the
[issue](https://github.com/ethereum/eth2.0-specs/issues/1592) above or
in the separate
[document](https://hackmd.io/X-uvqwe8TkmR-CJqMdfn6Q#Time-level-attacks)).

### NTP configuration weaknesses

NTP can withstand certain faults like "falseticker" time servers,
however, if it's configured to use several NTP servers which only looks
like independent, then it can be compromised (one see more details
[here](https://hackmd.io/X-uvqwe8TkmR-CJqMdfn6Q#NTP-level-attacks)).

It's easy to detect the problem, if there is an independent time source.
The problem is that for many validators setting up an independent time
source can be a problem. While it's not necessarily expensive, assuming
using GNSS receiver is an acceptable option.

### Advising validators is not enough

Advising validators on NTP setup should help, however, it does not
eliminate the risk of correlated faults. Basically, recommendations are
not requirements. It would be much better if beacon chain clients
provided a default (that means "cheap" in many senses) solution, which
would mitigate the problem. Considering that Ethereum 2.0 is to be much
more scalable than Ethereum 1.0, it's capitalization is expected to be
proportionally higher (much more transactions per second means much more
value). And due to a network effect can be even higher. Thus more
expensive and complex attacks can be profitable, thus security
requirements also should be stricter.

## Solution requirements

Summarizing the notes above, I've formulated requirements that a
solution to the problem should satisfy:

-   correlated faults mean it's a problem of the beacon chain too, thus
    the beacon chain protocol should be hardened against the problem
-   advising valudators is good, but not enough. The protocol should
    require the countermeasures to be implemented as a part of beacon
    chain clients, enabled by default, so that many inexperienced or
    low-stake validators won't be a risk to the whole system
-   it's desirable that validators can use any time service they want,
    since this means diversity, which in turn reduces fault correlations

## Ways to solve problem

Dependence on UTC/IAT (world time standard) cannot be eliminated. Beacon
chain is also semi-centralized regarding to UTC(k) and the public entry
points to access them, i.e. GNSS, Radio Clock stations and stratum 1 NTP
Time Servers. However, graceful degradation is possible: if the root
time suppliers fail, validator clocks can be still synchronized over IP,
while clocks cannot be syntonized/synchronized to a world standard only.

We believe the dependence is inevitable and concentrate on resolving the
potential dependence on centralized Time Server Lists, like NTP pool or
others.

GNSS/Radio Clock/Stratum 1 faults are presumed to be independent and
very rare.

### Proper configuration

If most validators were able to properly configure time service, in the
sense that the faults of time service are independent, then the
time-level faults can be tolerated by the beacon chain protocol. Thus,
any ways to ease NTP configuration, including choosing of time servers
will be helpful. However, choosing time service is still a problem,
since everybody will be picking them from the same list. Additionally,
it's better to pick NTP time servers from different lists. E.g.
typically, NTP configuration includes four NTP servers, so one can be
taken from NTP pool, but other three should be chosen from different
lists, including corporate controlled time servers. The measure will
reduce correlation, it will be more difficult to "attack" many public
lists. which will help tolerate attacks. However, the measure will
reduce centralization, but does not eliminate it.

### Outlier Filtering/Robust Clock Calibration

Every node has a relatively stable RT clock on board, which is
impossible to be attacked (at least, extremely difficult to attack on
board RTC clocks of many validators). In short term, it can be used to
filter out outlier clock corrections (e.g. results from malicious Time
Servers). This will limit the ability of an adversary to induce clock
drift via malicious time corrections, since if such a correction exceeds
several times the expected clock drift, then it can be considered as an
outlier.

A more complex scheme is to calibrate clock rate using a robust
regression approach, filtering out outlier external time corrections.
That can help to reduce the ability even more, since calibrated clocks
are more predictable (compared to predictions based on a nominal clock
rate).

Outlier Filtering/Clock Calibration alone won't be able to prevent
time-level attack, because clock skew can grow unbounded over time, but
it limits the induced clock drift, which gives more time to detect an
attack. And simplify other counter-measures.

### BFT (or weak BFT) Clock Exchange Protocol

Each validator node should use few time sources to correct local clocks.
A form of BFT or "weak" BFT Clock Sync protocol can be used to
disseminate the information between validator nodes. Thus, each node
will have an indirect access to additional "stratum n+" time servers,
which can be used to withstand the NTP pool attack. The main
requirements are that majority of time sources are correct and there are
not that much network-level faults.

As we expect that there will be a lot of nodes (up to 10K),
communication can be a huge problem. Thus, a full BFT solution can be an
overkill, even if it can piggyback the existing beacon chain protocol.

So, some lightweight "weak" BFT protocol may be required. We will
describe BFT approaches in a separate document. However, we will outline
a simple lightweight approach below.

#### Simple time source aggregation protocol

As Vitalik Buterin suggests in
[Network adjusted timestamp](https://ethresear.ch/t/network-adjusted-timestamps/4187),
one can use implied timestamps of messages. E.g. an honest proposer
should send a block at the beginning of a slot. And attesters should
send attestations with an offset of one third of slot duration. A
minimum and maximum message delay bounds should be specified (exceeding
the bounds will be a network-level fault). In p2p network, a message
will pass through transient nodes, so, in general, the bounds are
path-dependent. A simplified version is that bounds are proportional to
amount of hops. Messages should be cryptographically signed so that an
adversary is not able to forge amount of hops or other time-related
info.

As Vitalik suggests, a median of implied timestamps can be used to
derive a "consensus" time.

However, a slightly more complex approach is possible. First, one can
convert the implied timestamps into clock offset bounds. For example,
genesis time $t_g = 1000000$, $slot\_duration = 12 secs$, message delay
(plus time uncertainty) $\delta \in [0.1,2] secs$. At local time
$t_r = 1000065$, a block for a slot $n = 5$ arrived. Thus, clock offset
between the sender and the receiver is $\in [3,4.9]
secs$ (ignoring the
clock skew accrued during the message transmission). Then, one can use
[Marzullo's algorithm](https://en.wikipedia.org/wiki/Marzullo%27s_algorithm),
instead of a median, to select the best time offset.

The uncertainty and the Marzullo's algorithm allows to include validator
node own local time and time server corrections into account. Thus, the
result time is bound to NTP time.

One more step is possible, if a sender can periodically attach time
corrections that it received from its NTP servers, adjusted for elapsed
time and uncertainty. Then each validator node has an indirect access to
time servers of all validators.

If correct time sources dominate and there are not that much network
(and clock) faults, then the correct time sources will form a coherent
majority, which can be used to adjust calibrate local clocks.

## Proposed solution

Summing the above, the solution is:

-   Advise validators on proper NTP/time source configuration.
-   Implement (weak) BFT Clock Exchange protocol, which can be used to
    disseminate time source information between validators, with
    uncertainty adjusted for network delays
-   validator node client will use the pool of time sources to calculate
    the best aggregate time estimate using Marzullo's algorithm or its
    variation
-   the time estimate can be used to calibrate local clocks
-   as a non-faulty real-time clock should have bounded drift (e.g.
    $\pm
100 ppm$ (parts per million), around 8.4 sec a day), it should
    be incorporated in clock calibration or time filtering procedures,
    to limit induced clock drift.

## Additional notes

### Time source weighting

Many validators will take time sources from Internet, that means NTP
time servers may appear several times in the time source pool. Moreover,
each node has a varying number of validators behind it. This raises a
question how time sources should be aggregated and how it will affect
BFT properties. If validators exchange with time server ids too (i.e. IP
address), then a common time server can be used to measure a delay
between two nodes. It also can help detecting two-faced clocks, if the
time delay is too big and growing.

### Distirbuted time server pool

An additional idea is each validator may periodically sample time
servers from the common pool, so that delays between nodes can be
measured. Validator node can compare different time servers in the pool
and some form of reputation can be designed, e.g. based on deviation
from the beacon chain time. One can sort time servers by the metric and
throw away worst ones. That can additionally help to withstand such NTP
pool attacks.
