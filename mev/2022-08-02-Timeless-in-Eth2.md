+++
title = "Timeless in Ethereum PoS"
slug = "timeless"
weight = 55
+++

# Timeliness in PoS Ethereum

## [](https://notes.ethereum.org/@css/H1G4M6CBc#Background-info "Background-info")Background info

A slot is 12 seconds long. The proposer is supposed to release their block at the beginning of it.

The spec forsees the following schedule within a slot for an [honest validator](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/validator.md) that is selected to attest:

> A validator should create and broadcast the attestation to the associated attestation subnet when either (a) the validator has received a valid block from the expected block proposer for the assigned slot or (b) 1 / 3 of the slot has transpired (4s into the slot) – whichever comes first.

Further,

> If the validator is selected to aggregate, then they broadcast their best aggregate as a SignedAggregateAndProof to the global aggregate channel 2 / 3 of the way through the slot-that is, 8 seconds after the start of slot.

## [](https://notes.ethereum.org/@css/H1G4M6CBc#Problem "Problem")Problem

**The proposer can release their block late in order to increase their tx mempool listening time (more MEV), while their block still becomes part of the canonical chain.**

Let’s consider various scenarios releasing the block at different times. For simplicty, assume instant network propagation as well as honest behavior apart from the proposer who times their block release strategically.

-   Honest strategy: proposer releases the block on time (at the beginning of the slot). This implies no extra mempool listening time is gained. Business as usual.
-   Release block at time $0s \leq t \leq 4s$. Proposer gains $t$ seconds extra tx mempool listening time, while all committee members hear the block in time and vote for it as head of the chain.
-   Release block at time $4s < t < 12s$. Proposer gains $t$ seconds extra listening time, but committee members will attest before they hear this block and thus vote on the parent block. In other words, your block is $t$ seconds late, gaining you extra listening time, at the expense of acummulating fork choice weight, which makes it easier to reorg your block.
-   Release block at time $t>12s$. You gain all the listening time you want, but your block won’t become canonical as the next block proposer does not hear it in time for them to build on your block.

In short, you can release a block very late - say 11sec into the slot - and still become canonical. If you’re the only one using this strategy and everyone else is validating honestly this means you can gain roughly 2 slots worth of tx mempool listening time for free.

Essentially the constraint is that the next block proposer needs to hear your block so that they can build on top of it. Because they will consider you as head of the chain even if not a single attester votes for you. This is because your late block inherits all the parent’s “fork choice weight”. Or explained differently: there is no competing sibling that has more votes and hence your late block is considered head of the chain despite the absence of votes for it.

There is a caveat however: For independent reasons, something called [_Proposer LMD Score Boosting_](https://github.com/ethereum/consensus-specs/pull/2730) has been introduced. On a very high level, this gives a timely proposer a temporary boost (essentially as if some validators had already attested to this block). This allows a timely proposer to reorg out a preceeding block that has accumulated less weight than whatever the boost is. By releasing a block too late (and hence accumulate few votes) you open yourself up to being reorged by the next proposer. **If you are reorg-intolerant you cannot release your block much later than around the 4s mark.** The Proposer LMD Score Boosting essentially introduces a soft-cap for the block releasing deadline around the 4s mark.

## [](https://notes.ethereum.org/@css/H1G4M6CBc#mev-boost-setting "mev-boost-setting")mev-boost setting

So far I have completely ignored the mev-boost setting, the proposer/builder relationship in particular.

Both builders and proposers are interested in colluding since more tx mempool listening time implies more MEV, which is good for both parties involved. The question is whether they can collude without trusting each other? And I think the answer is yes: Builders can simply send new bids as time goes by and the proposer just picks the best whenever they decide to finally build and release their block. This is good in so far that there is no advantage to being a large, reputable staker (builders trust you) vs being a solo staker (builders don’t trust you), but it is bad in so far that it is therefore more likely to happen in the wild.

A side-note on relays: One may wonder whether a relay could somehow enforce honest release timing? For example, the relay could simply refuse to forward late builder bids. However, this incentivizes the creation of a new relay that is trusted by builders/proposers and allows untimely timing strategies. Relays only need to be trusted by builders and proposers, and it’s irrelevant whether they’re value aligned. Generally this competitive pressure should make them stay away from being too restrictive. Further, relays are overall quite limited in what they can enforce, e.g. builders can release their payload themselves (should the relay refuse to because the proposer was late)…

## [](https://notes.ethereum.org/@css/H1G4M6CBc#Solutions "Solutions")Solutions

### [](https://notes.ethereum.org/@css/H1G4M6CBc#block-slot-voting "block-slot-voting")(block, slot)-voting

There is a known solution that just needs some details figured out. There was a [GitHub PR](https://github.com/ethereum/consensus-specs/pull/2197) already at some point. Essentially the idea is to make commitee members vote for an empty slot if they don’t hear a valid block in time. This is different to the status quo in that, if they don’t hear the block in time, they simply vote for whatever they consider the head of the chain (which in the normal case would be the parent of the late block). But with (block, slot)-voting you would now vote for an empty block. As a result, you cannot simply release a block late and still become canonical. Validators will vote for emptiness and the next block proposer will build on top of that empty slot, instead of your late block.

One side effect of this solution is that it introduces a liveness constraint. If messages take longer than 4s to propgate, for whatever reason, then everyone will vote for emptiness in every round. While the chain keeps making progress (empty) in that it continues finalizing, it is not particularly usefull… Hence, we need some kind of backoff scheme that kicks in when the chain starts enshrining emptiness due to network delays.

### [](https://notes.ethereum.org/@css/H1G4M6CBc#retroactive-block "retroactive-block")retroactive block

_(below is based on this [HackMD note](https://notes.ethereum.org/7eL9cMDNQoyzH9xFpzaw), please refer for most up-to-date version)_

Another idea is to specifically try to incentivze timely block releasing, i.e. beginning of slot. This is just an idea and not to be considered as a concrete proposal.

Currently the block proposer is rewarded in propotion to the profitability of the attestations they include in their block.

Instead let’s try to also account for the proposer’s timeliness using some heuristic.

Heuristic could be to scale the proposer’s reward by the **share of same-slot committee votes that the block receives and are included in the subsequent block.**

Consider the following example:

![](https://storage.googleapis.com/ethereum-hackmd/upload_6628a528022c407f61d9f8d14aee9004.png)

Block `n+1` was released slightly late such that 10% of the committee in slot `n+1` are attesting before they received block `n+1` and thus vote for block `n`. However, the great majority of the committee (90%) hears block `n+1` before they attest and so they vote for it. The block proposer of slot `n+2` includes all attestations in their block `n+2`.

The idea now is that the rewards of the block proposer of slot `n+1` are scaled with a factor of `0.9`. This punishes the proposer for being slightly late such that 10% of the committee didn’t hear the block in time.

Note that all committee members are incentivized to vote for block `n+1` (if they hear it in time) and therefore griefing the proposer of block `n+1` is costly and not incentive compatible. Further note that it is not incentive-compatible for the proposer of block `n+2` to grief the attesters of of slot `n+1` by not including attestations, since they also get paid based on those.

There is a caveat to this incentivazation scheme: If the MEV gains due to late releasing are greater than the rewards for timely releasing then the proposer/builder are still incentivized to collude. However, incentivizing timeliness specifically may still be a good idea, since it improves things in non-adversarial settings and prevent many adversarial settings (whenever timeliness rewards > mev gains due to late releasing).

Note that this is more of an idea than a concrete proposal