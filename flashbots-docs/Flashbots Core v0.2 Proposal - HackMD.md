_edit 10/05/21: update timeline, remove megabundle_  
_edit 04/05/21: update timeline, remove proxy contract, add release
plan_  
_edit 21/04/21: incorporate feedback and finalize proposal_  
_edit 14/04/21: update timeline and incorporate feedback_

Flashbots Core consists of MEV-geth together with the Flashbots Relay.
The current live version is v0.1, this document describes the proposed
improvements to roll out in the next version, v0.2. The tentative
timeline for this version is:

-   April 5th: Initial proposal
-   April 19th: Final proposal
-   May 17th: Code freeze / Formal spec
-   May 24th: Launch
-   May 31st: Deprecate v0.1

4/4/2021 4/11/2021 4/18/2021 4/25/2021 5/2/2021 5/9/2021 5/16/2021
5/23/2021 5/30/2021Feature selection Initial Proposal Collect feedback
Reference implementation Integration Final Proposal Rolling upgrades
Code freeze / Formal spec Launch Upgrade deadline Version deprecation
Stage 0Stage 1Stage 2Stage 3Stage 4Stage 5Flashbots Core v0.2 Upgrade

The release plan for v0.2 is outlined in the
[Flashbots Auction documentation](https://docs.flashbots.net/flashbots-auction/releases/alpha-v0.2).

The upgrade process for flashbots core infrastructure is detailed in
[Flashbots Core - Upgrade Process](https://docs.flashbots.net/flashbots-auction/upgrade-process).

The WIP mev-geth v0.2 formal specification is detailed on
[github](https://github.com/flashbots/mev-geth/blob/master/README.md#differences-between-mev-geth-and-vanilla-geth)

## [](https://hackmd.io/@flashbots/core-v2-proposal#Features "Features")Features

### [](https://hackmd.io/@flashbots/core-v2-proposal#Revamped-auction-pricing "Revamped-auction-pricing")Revamped auction pricing

Community members highlighted a number of criteria for a good scoring
function:

1.  **bundle stuffing**: prevent searchers from submitting high gwei TXs
    from txpool to inflate their score
2.  **large bundles**: avoid penalizing large bundles, this should allow
    searcher side merging
3.  **compatibility**: maintain compatibility with frontrunning
    protection use cases by scoring gasprice
4.  **efficient**: efficiently computable with minimal latency
5.  **risk-minimized**: minimize the number of configurable parameters

These criteria can be used to evaluate how the current bundle scoring
function compares to alternatives. Apart from these, we require that the
scoring approximately compensates for the opportunity cost that the
miner incurs by including the bundle, which limits the choice of
function.

1.  v0.1 scoring: implied gas price  
    sv0.1\=Δcoinbase+∑T∈UgTpT∑T∈UgT
2.  ignore gas-price  
    s\=Δcoinbase∑T∈UgT
3.  v0.2 proposal: drop mempool txs  
    sv0.2\=Δcoinbase+∑T∈UgTpT−∑T∈M∩UgTpT∑T∈UgT
4.  full block scoring  
    s\=Δcoinbase+∑T∈UgTpT+∑T∈OgTpT
5.  marginal price scoring  
    s\=Δcoinbase+∑T∈UgTpT−∑T∈UpboundgT

Notation

s: bundle U _score_ used to sort bundles.  
U: ordered list of transactions T in a bundle.  
M: set of transactions T in the mempool.  
O: ordered list of transactions T included in the remaining block space
after U.  
gT: _gas used_ by transaction T.  
pT: _gas price_ of transaction T.  
Δcoinbase: coinbase difference from direct payment.  
pbound: estimate of the marginal gas price at a given depth in a block.

criterion

option 1

option 2

option 3

option 4

option 5

bundle stuffing

❌

✅

✅

✅

✅

large bundles

❌

❌

❌

✅

✅

compatibility

✅

❌

✅

✅

✅

efficient

✅

✅

✅

❌

✅

risk-minimized

✅

✅

✅

✅

❌

**Option 2**: Ignoring gas price solves our bundle stuffing issues, but
it breaks compatibility with frontrunning protection use case where
users can send regular transactions through flashbots.

**Option 3**: Achieves the same objectives as option 2 while maintaining
compatibility for gasprice payments.

**Option 4**: Scoring based on revenue of full blocks would provide a
perfect score which does not penalize large bundles, but our initial
benchmarks found it would limit throughput to approx 15 bundles per
second. We estimate it would be possible to increase the throughput up
to 100 bundles per second with geth optimizations. This is a promising
future direction, but out of scope for this release. Please reach out if
you are interested in working on geth performance optimizations and
benchmarking.

**Option 5**: This proposal made by community member @shane attempts to
overcome the computational requirements of full block simulation by
instead estimating the opportunity cost using a function pbound which
estimates the marginal gas price at a given depth in a block. If pbound
is correctly configured, this method would provide an accurate and
efficient score. Unfortunately, if pbound is miss-configured, it may
produce unreliable results, undershooting causes unprofitable blocks and
overshooting prevents the inclusion of any bundle. Additional simulation
work is required to increase the level of confidence in the reliability
of pbound. Please reach out if you are interested in working on this
simulation work.

All of these approximately account for the miners’ opportunity cost,
either via normalizing by total gas used, or by explicitly computing it.
Note that some hybrids like option 3 without normalization no longer
account for this, and might thus prioritize bundles that are less
profitable for the miner.

We’ve decided to include option 3 in the v0.2 release as it solves the
immediate issue of bundle stuffing without impacting risk or
performance. We are looking at including option 4 or option 5 in a
future release once their limitations are better understood.

Discussion:
[https://github.com/flashbots/pm/discussions/53](https://github.com/flashbots/pm/discussions/53)

### [](https://hackmd.io/@flashbots/core-v2-proposal#Bundle-merging "Bundle-merging")Bundle merging

In v0.1, at most a single bundle could be included in a block. In v0.2
we implement _bundle merging_ whereby many bundles can be included in a
block. The merging of bundles is done at the MEV-geth level, using the
following algorithm and configurable parameters.

_Note: bundle merging at the mev-geth level should be considered a
temporary feature as it will be obsoleted once a scoring function which
solves for ‘large bundles’ criteria is implemented and enables searchers
to do merging themselves._

Notation

σ: blockchain state.  
U: ordered list of transactions T in a bundle.  
s(σ,U): bundle U _score_ when applied on blockchain state σ.  
B: ordered list of transactions to be included in the block.  
gU: cumulative gas used by transactions in U.  
gB: cumulative gas used by transactions in B.  
Υ~(σ,B): state transition function, yields blockchain state σx+1 after B
is applied to σx.  
k: configurable maximum number of bundles in a block set by the miner.  
c: configurable maximum blockspace used by flashbots in units of gas.

For each target number of bundles ki from 1 to k, MEV-geth spawns a
worker that builds a template block Bi. These blocks are built in
parallel, and are later compared with each other and with the vanilla (0
bundles) block for profitability. Each worker i runs the following
algorithm:

Merging algorithm

For a set of n submitted bundles targeting the next block, and
blockchain state after prior block σ0, simulate each bundle on top of σ0
and sort according to their score s(σ0,U) in descending order, resulting
in an ordered list (U0,…,Un−1). Then:  
insert U0 in position 0 of the transaction list Bi  
for j\=1 to n−1:  
if Υ~(Υ~(σ0,Bi),Uj) does not revert and gBi+gUj≤c:  
append Uj to Bi  
if |Bi|≥ki:  
break  
return Bi

This algorithm introduces two configurable parameters (k and c) which
are set by the miner. Miners will be able to experiment with how to set
these parameters according to the hardware they are using and their risk
tolerance.

The k parameter determines the number of bundles the miner will attempt
to merge together into a ‘Mega Bundle’. Setting k\=1 would yield blocks
with a single bundle (like in v0.1). Increasing the k value will
increase the miner’s revenue, but will also significantly increase the
computational load as it requires spinning up a parallel process for
each additional bundle depth.

The c parameter determines the maximum blockspace which can be used by
flashbots bundles. A low c value means only few highly profitable
bundles will be included, whereas a high c value means many lower
profitability bundles will have the chance to be merged into a mega
bundle. A high c value also increases the node’s computational
requirements and risk of discarding valuable transactions from the tx
pool.

As in v0.1, the candidate _Flashbots_ blocks are compared with the
vanilla geth block to maximize miner profitability.

Discussion:
[https://github.com/flashbots/pm/discussions/27](https://github.com/flashbots/pm/discussions/27)

### [](https://hackmd.io/@flashbots/core-v2-proposal#Discard-bundles-with-reverting-transactions "Discard-bundles-with-reverting-transactions")Discard bundles with reverting transactions

In v0.2, bundles with reverting transactions will no longer be included
in blocks, unless explicitly allowed. This change will help avoid
unintended transactions from landing on chain leading to less chain
bloating.

A new `txsAllowingRevert` RPC parameter will be included in
`eth_sendBundle`, consisting in an array of transaction hashes. Any
reverting transaction not included in this array will lead to the
rejection of the entire bundle containing it.

Discussion:
[https://github.com/flashbots/pm/discussions/41](https://github.com/flashbots/pm/discussions/41)

### [](https://hackmd.io/@flashbots/core-v2-proposal#Proxy-payment-contract "Proxy-payment-contract")Proxy payment contract

We considered introducing a proxy contract for handling miner payments.

This payment contract aimed to achieve the following objectives:

1.  Provide a reliable and trustless method for identifying flashbots
    bundles on chain
2.  Provide a way for miners to redirect MEV revenues to an address
    other than coinbase
3.  Provide a path for introducing finality protection

The proposed contract introduced ~11k gas overhead to all flashbots
bundles. While this is a trivial amount compared to the cost savings of
using flashbots, the searcher community felt the objectives listed above
did not justify such a cost and off-chain methods should be explored to
achieve goals 1 and 2.

Based on this feedback, the introduction of a proxy payment contract
will be delayed in order to provide more time to explore alternatives.

Improving the security of the chain by smoothing MEV revenue variance /
reducing incentive for time-bandit attacks / providing finality
protection remains a core objective of flashbots and will be introduced
in a future release.

We encourage the community to help us in solving these challenges.

Discussion:
[https://github.com/flashbots/pm/discussions/45](https://github.com/flashbots/pm/discussions/45)

### [](https://hackmd.io/@flashbots/core-v2-proposal#Full-block-submissions-on-mev-geth "Full-block-submissions-on-mev-geth")Full block submissions on mev-geth

We considered introducing a new method to mev-geth for accepting ‘Mega
Bundles’. However, this feature introduced changes to the block
formation code which is considered high risk and did not meet the
quality standards set by our review process. As such, it is excluded
from the v0.2 release.

This mega bundle is pulled from the relay and inserted in a LIFO queue
of length 1, a parallel worker pulls the latest mega bundle and produces
a full block with the requested header parameters, the block is then
inserted in the multi-worker in charge of profit-switching. Since
mega-bundles are not scored before producing a full block, this method
should only be used by a single relay. Mega bundles will help experiment
with new approaches to bundle scoring and bundle merging.

Discussion:
[https://github.com/flashbots/pm/discussions/52](https://github.com/flashbots/pm/discussions/52)

### [](https://hackmd.io/@flashbots/core-v2-proposal#WebSockets-replace-HTTP-endpoints "WebSockets-replace-HTTP-endpoints")WebSockets replace HTTP endpoints

The use of RPC endpoints on mev-geth is replaced in v0.2 with a
WebSocket connection which pulls bundles from the relay instead or
receiving them via HTTP, this aims to reduce latency and improve node
security by avoiding the need to open the rpc to the public.

Discussion:
[https://github.com/flashbots/pm/discussions/51](https://github.com/flashbots/pm/discussions/51)

### [](https://hackmd.io/@flashbots/core-v2-proposal#Strict-profit-switching "Strict-profit-switching")Strict profit switching

v0.2 introduces a new geth config `miner.strictprofitswitch` which
forces the mev-geth multi-worker to wait for the vanilla block to be
completed before comparing the flashbots block.

This eliminates the race condition where a flashbots block could be
mined before the vanilla block is done being calculated.

Discussion:
[https://github.com/flashbots/pm/discussions/56](https://github.com/flashbots/pm/discussions/56)

## [](https://hackmd.io/@flashbots/core-v2-proposal#Surrounding-changes "Surrounding-changes")Surrounding changes

### [](https://hackmd.io/@flashbots/core-v2-proposal#Testnet-infrastructure "Testnet-infrastructure")Testnet infrastructure

With v0.2, we will have testing infrastructure deployed in the Görli and
Ropsten testnets. This infrastructure will allow us to thoroughly test
the new code before releasing it to miners. The Görli relay will also
allow searchers to test against our Flashbots validator, and the Ropsten
one will be useful for miners testing MEV-geth against surrogate
bundles.

Discussion:
[https://github.com/flashbots/pm/discussions/37](https://github.com/flashbots/pm/discussions/37)

### [](https://hackmd.io/@flashbots/core-v2-proposal#Flashbots-Fair-Market-Principles-FFMP "Flashbots-Fair-Market-Principles-FFMP")Flashbots Fair Market Principles (FFMP)

In order to improve the guarantees of correct operation of the Flashbots
system, we will introduce a set of principles and best practices that
miners are expected to follow. Violation of the principles might result
in miners being excluded from the Flashbots system until corrected.

[Flashbots Fair Market Principles (FFMP)](https://hackmd.io/s3MhcyKYTS-b22JL2CrCdA)

## [](https://hackmd.io/@flashbots/core-v2-proposal#Feedback "Feedback")Feedback

We kindly ask the community to provide feedback on this proposal by
joining the discussions in our
[pm repository](https://github.com/flashbots/pm/discussions/54).
