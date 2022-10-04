---
title: Why clock sync matters in Ethereum 2.0
tags: Time, Ethereum2.0
author: Alex Vlasov
---

# Why clock sync matters in Ethereum 2.0

> source:
> [https://hackmd.io/X-uvqwe8TkmR-CJqMdfn6Q](https://hackmd.io/X-uvqwe8TkmR-CJqMdfn6Q)

**Abstract**

Beacon chain protocol critically depends on clock synchronization. If
validators or nodes clocks discrepancy becomes too much, then
[liveness properties](https://en.wikipedia.org/wiki/Liveness) can become
violated, i.e. the protocol participants won't be able to make progress
or its probability becomes too low. In theory,
[safety properties](https://en.wikipedia.org/wiki/Safety_property) can
become violated too, since validators which failed to participate due to
clock discrepancies are penalized. If an adversary manages to attack
otherwise honest validator clocks then it can seize voting power over
time.

## Safety, liveness and robustness

[Casper FFG](https://arxiv.org/abs/1710.09437) is based on epoch
justification and finalization. An epoch justification requires 2/3 of
total voting power, so if an adversary gains control on 2/3 then it will
reign over a Casper FFG based system. If an adversary controls less than
2/3 of voting power, but it controls 1/3, it might be able to hinder
protocol progress, by voting differently than other validators, thus
breaking liveness property. However, even if an adversary controls less
than 1/3 of voting power, there are other sources of failures in real
network. E.g. there are network delays, clock disparities, hardware or
link failures. All these result in additional faults, which combined
with an adversarial behavior of some nodes can lead to situations when
epochs cannot get justified for some periods of time. So, from a
practical point of view, while protocol can successfully withstand
safety and liveness attacks, it can do that with degrade performance,
which is a real problem for real users of the protocol. While, in
theoretical sense, liveness property cannot be violated in a finite
execution of a protocol, a practical liveness as perceived by real users
_can_ be violated. An illustration of the problem can be found in
Vitalik Buterin's
[post](https://ethresear.ch/t/network-adjusted-timestamps/4187), which
also outlines potential solution.

Thus, for designers of practical BFT systems, it's important to design
Robust BFT protocols, e.g. able to withstand attacks with relatively low
performance degradation.

## Clock disparity consequences

The focus of the document is faults - and attacks - related to lack of
clock synchronization. Beacon chain specs require either delay or
discard messages (blocks or attestations), which arrived beyond
admissible time bounds. So if a validator is severely out of time, then
it's a form of failure. A late message arrival can be a consequence of
different problems:

-   slow or faulty links
-   clock skew or drift
-   slow or faulty validators
-   slow or faulty transient nodes (in p2p network)

A message can arrive before designated time, which is a problem with
clocks either on a sender (fast) or on a receiver (slow) side. However,
in the case it will typically be enqueued until the target period of
time begins. However, fast clock of a sender (relative to others) can
still be a problem, since it will send a message before it gathers prior
(in terms of logical time) protocol messages from other nodes. Thus, in
certain cases, it can result in a beacon state view, that is different
from others. Thus, it also can be seen as a form of fault, which hinders
reaching consensus. In other words, it reduces probability that honest
validators reach 2/3 majority, aiming to an epoch. Such faults can be
summed up with the adversary voting power, alleviating practical
liveness or robustness attacks.

### Correctness

As validators are penalized when they evade their duties, timing faults
can lead to a situation where otherwise honest validators are gradually
loosing their balances. Thus certain attacks are imaginable, where
voting power of honest validators degrades while malicious voting power
stays the same (or degrades at slower rate). So, an adversary can reach
voting power dominance over time, leading to safety property violation.
While it's unlikely in practice (because of counter-measures undertaken
by administrators), in theory it's possible that time-level attacks can
be used to violate safety properties of the beacon chain protocol (while
Caper FFG's _accountable safety_ is not viloated).

### Problem persistence

One serious problem is that clock disparity among nodes will grow with
time, e.g. if it reaches some dangerous level, it will likely persist
until corrected. That is caused by the fact that individual clock rates
are not stable and drift because of various reasons, including
temperature variations, aging, radiation, etc. This is in contrast to
message transmission delays, which has similar impact, but periods of
higher than usual network delays do not typically last for a long.
However the persistence of clock disparity simplifies problem detection.
Thus, a reliable clock synchronization mechanism is a must-level
requirement.

### Disparity level

Different level of clock disparity affect protocol in different ways. An
attestation can be included in a block, during 32 slots, i.e. the same
duration as the duration of an epoch. So, from attestation processing
point of view, only severe disparity will critically affect beacon chain
protocol (as also illustrated by the Vitalik's
[post](https://ethresear.ch/t/network-adjusted-timestamps/4187)).

However, a reward for an attester will be lower, if an attestation is
included later. Additionally, delayed inclusion may lead to a delayed
fork switch, which is also not good from stability point of view.

Clock disparity are much more severe for block producers. If a block
proposer is 1/3 slot late, then attesters won't receive it at the moment
when they should attest current head. However, they still can attest the
parent, so if the late proposed block references the parent as well,
it's not a problem, since the newly proposed block is the only child of
the parent block and will be chosen as a head block, when it has
arrived. But if the block proposer is one slot late, then the next slot
proposer won't receive the block at time, won't be able to choose it as
head and will create its block based on some other block as parent. So,
there will be a fork. While beacon chain protocol is able to tolerate
forks, together with other problems it can lead to problems, so it's
better to reduce such opportunities as much as possible.

Being too fast also can lead to problems. If an attester votes too
early, then it won't receive latest information which will be received
by other nodes, so its view on beacon chain will be different, which may
hinder consensus at some point. However, if there are no forks it
shouldn't be a problem, since it still votes for the same chain. That's
why it's worse situation when there are forks. If a block proposer is
too fast (about a slot) it won't receive a block from the previous slot
proposer, which means a fork happen.

So, clock disparity about 1/3 of a slot affects normal message flow,
though should not lead to big problems (unless there are other
problems). Clock disparity around slot duration leads to forks, which is
a prerequisite for other problems. Clock disparity around epoch duration
are very severe.

However, a recent change to
[p2p-interface spec](https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/p2p-interface.md#configuration)
assumes maximum clock disparity to be 500ms and prescribes to delay too
early blocks (the similar behavior prescribed to attestation processing,
but they can be included during a longer time, e.g. during 32 slots, so
it's less of a problem). That means even a transient node with even
slight clock disparity (fast more than 500 ms) will delay block flow
through it.

So, in general, the requirements regarding clock disparity are rather
strict, it should be around 100-200ms, since there is also message
latency about the same magnitude.

## Time-level attacks

As clock disparity can be a source of faults, at least degrading
protocol performance (or leading to liveness/safety violations, in
general, as the magnitude of disparity grows), one should investigate
ways, how such attack could be performed and harden the system, if
needed.

As individual node clocks drift over time, the clock disparity
inevitably grows, so clocks should be synchronized periodically. Thus,
synchronization protocol is one of the targets that can be attacked.

Unfortunately, in the context of the Internet, NTP is the default (cheap
and convenient) way to synchronize clocks, while NTP lacking BFT
properties. So, if an adversary can find ways to become an NTP server of
choice for a significant number of otherwise honest nodes, then it can
manipulate their time, gradually hastening or slowing their clocks and
induce timing faults.

A pointed out earlier, even slow discrepancies, like several seconds can
lead to timing faults, while can be difficult to detect by unaware
administrators (unless the problem is addressed explicitly).

### NTP-level attacks

NTP servers are known to be
[misused and abused](https://en.wikipedia.org/wiki/NTP_server_misuse_and_abuse).
NTP server bandwidth is a scare resource worldwide. As a consequence,
NTP server access becomes more structured and administered.

One initiative is [NTP pool](https://www.pool.ntp.org/en/), which is a
big cluster of community time servers and
`the default "time server" for most of the major Linux distributions and many networked appliances`.
Therefore, it's likely that many (or even most) validator nodes will use
the NTP pool as their time server. On the other side, joining the pool
would not be a problem for an adversary

> Because of the large number of users we are in need of more servers.
> If you have a server with a static IP address always available on the
> internet, please consider adding it to the system.

While NTP is able to tolerate certain faults, including "falsetickers",
it's limited in the ability. I'm not an expert in NTP and the following
reasoning needs revision, however, it's likely that such an adversary
has a high chance to be able to manipulate the NTP pool clients, if it
controls significant portion of the pool.

So, if the adversary adds about 4000 own time servers to the pool, they
will comprise half of the pool. So, there will be 1/2 chance that a time
server chosen randomly from the pool is controlled by the adversary.

Typical NTP configuration includes 4 NTP servers. So, if there is only
one malicious time server, it will be recognized as a "falseticker".
However, if there are two malicious and two regular servers, then NTP is
not able to recognize malicious servers as "falsetickers". Moreover, as
two servers may report extremely correlated time readings, they are
likely to be preferred.

So, given 0.5 probability to choose a malicious server from the pool,
the are three outcomes of choosing 4 of them:

-   honest time servers dominate, i.e. 3 or 4 of them, this is 1/16 +
    4/16 = 5/16 probability
-   malicious time servers dominate, the same 5/16 probability
-   two honest against two malicious time servers, 6/16 probability.
    It's not clear who will win but it's a risky setup, since either two
    malicious server will look as more "synchronous" or they will affect
    average reading of the time server quorum (the exact NTP
    implementation behavior should be additionally investigated)

Overall, by "donating" around 4K time servers, an adversary has about
1/2 chance to affect time on a node, which is configured to use NTP
pool. The chance can probably be increased, by exploiting details of NTP
and/or NTP pool administration procedures.

Note, that such an adversary time pool can behave honestly to a regular
node, if its IP is not in `validators` list. It can also behave
correctly for some period of time for IPs in the list and start to
manipulate clocks later. It can also detect that it's the single
malicious timeserver for a particular node (high chance to be identified
as a "falseticker") and service it normal way. From BFT literature
perspective, Byzantine faulty clock can return different values when
read by different processes and this is the property, which makes BF
tolerant clock sync protocol difficult/expensive.

## Mitigating time-level attacks

The main purpose of the document is to describe the problem and to give
foundation to the thesis _Why Clock Synchronization matters in Ethereum
2.0_. So, I will only briefly discuss how the clock synchronization
problem can be solved. A more detailed solution is to be described in a
separate document.

### Appropriate NTP configuration

The potential NTP pool attack problem described above can be solved by
an appropriate configuration of NTP protocol - do not use the default
configuration, but choose other NTP servers instead. However, a problem
that remains is which NTP servers should be used instead.

Taking an NTP server from a publicly available list can expose to the
same kind of problems, if an adversary manages to add its servers to
such a list.

One can use NTP servers operated by government agencies, well known
commercial or non profit organization. However, it means the presumably
decentralized PoS architecture critically depends on relatively small
list of time servers, so it becomes a kind of Proof-of-Authority in some
sense. While it might be acceptable (the protocol relies on IP, DNS, etc
anyway), there are risks associated with this. Servers can cease
servicing or can participate in clock manipulation.

So, a truly decentralized BFT system deserves more BF tolerant clock
synchronization protocol. At least, such solutions should be proposed
and analyzed.

### Anonymizing validator nodes

As written before, Byzatine clock return different results, when read by
different processes. A publicly available, but Byzantine NTP server
(e.g., included in some public NTP server list) should service correctly
normal users, else it will be easily identified as faulty. Thus such
janus-faced server should be able to discriminate validator nodes from
other clients in order to manipulate former. So, a simple intermediate
server can conceal a validator node, especially if it uses two IP
addresses (to service the validator node requests from an IP which is
distinct from the IP used to query an NTP server). However, such a setup
increases costs of being a validator, so it will be a problem to many
low-steak validators.

### GNSS or radio clocks

A similar approach is to use other publicly available time services,
e.g. [GNSS](https://en.wikipedia.org/wiki/Satellite_navigation)
receivers or [radio clock](https://en.wikipedia.org/wiki/Radio_clock).
Inexpensive GPS receivers are available and such service access by
validator nodes cannot be discriminated from others, so such services
cannot be used to manipulate validator clocks.

The same concerns about centralization and a higher entry barriers apply
here. However, the former one doesn't seem to be a really serious one -
people and organization over the world rely on international standards
including UTC time standard. It's inevitable in some sense, including
the requirement that beacon chain slot duration should be equal to
`SECONDS_per_SLOT`, which also relies on international time standard.

So, it could be considered as almost perfect solution with the exception
that it raises an entry barrier for some validators, e.g. if one would
like to use server hosting to run a validator. However, they can set up
an alternative clock synchronization scheme.

### BFT Clock Synchronization

From BF tolerance perspective, as beacon chain critically relies on
Clock Synchronization property, there should be BFT Clock
Synchronization (sub)protocol.

The NTP pool attack above illustrates one of the main problems of
practical BFT solutions: one has to restrict participants of a BFT
system by some means, else a Sybil-like attack is possible, i.e. an
adversary can add many participants which will surpass safety limits
(like a typical 'less than 1/3 of faulty participants' or so). NTP pool
is an open (to join) system, which makes it a problem to rely on it in a
BFT system.

A straightforward way to restrict participants is to require that (only)
validators (can) participate in creating a BFT service. Vitalik Buterin
also discusses this in the
[post](https://ethresear.ch/t/network-adjusted-timestamps/4187)
mentioned above.

A number of BFT clock synchronization protocol exists, however, the cost
of such protocols can be prohibitive, given the expected amount of
Ethereum 2.0 validator/nodes (an order of thousand of nodes). As p2p
architecture is used to connect the validator nodes, validators cannot
reach each other directly, thus message delays are multiplied by some
factor (an average/maximum number of hops), which limits clock
synchronization accuracy, because network delay variability decreases
the ability to measure clock offsets. However, an estimation of such
delays based on special (asymmetric) optimization measures can be used
(e.g.
https://www.researchgate.net/publication/3958812_Clock_synchronization_algorithms_for_network_measurements).

### Redesigning beacon chain protocol

An alternative approach would be to re-design beacon chain to avoid its
reliance on the clock synchronization property. While it seems quite
radical, actually it's a traditional approach to build reliable
distributed systems, since logical clocks are much easier to implement,
while implementing BFT clock synchronization with beacon chain level of
requirements together with the expected scale of the system (thousands
of nodes) can be quite challenging. However, cryptoeconomics still
require that slot duration be of the prescribed amount
(`SECONDS_PER_SLOT`, 12 seconds currently), because reward rate depends
on slot/epoch rate. Thus clock synchronization with the world time is
still required. However, clock disparity requirements are mild relative
clock disparity required to align validator slots along the same time
axis. Because, reward rate should be stable on a long scale.

However, EVM or smart contracts may require higher quality of clock
synchronization.
