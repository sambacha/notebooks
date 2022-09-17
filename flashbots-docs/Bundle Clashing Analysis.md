# Bundle Clashing Analysis

Before designing an algorithm for bundle merging at the relay, we need
to achieve a better understanding of the problem at hand. In particular,
we don’t know where incompatibility of bundles is taking place, or:
where do our bundles “clash”?

Here, we introduce a parsing of the clashing space that ultimately
suggests different algorithm approaches. We run an analysis on past
relay data to quantify how the clashing of bundles is distributed. For
each target block, we check all bundles submitted, and see where each
bundle pair clashes according to the following hierarchy:

Don't mergeTrivial mergeMultiple orderingsSimple greedyTarget
txsameContracts
toucheddifferentunrelatedCompatibilityrelatedcompatibleincompatible

Where:

-   “Target tx” is the MEV-exposing transaction. We categorize bundles
    as going after the same target transaction if they share at least
    one tx hash, which can be decided looking directly at our relay
    data.
-   “Contracts touched” means which addresses’ state would have been
    changed by the different bundles, which requires tracing like we do
    with inspect.
-   “Compatibility” means whether processing pairs in different order
    would yield the same profit to the miner, and it requires simulating
    the bundles on top of each other to compute profitability.

Corresponding to each category, we noted one algorithmic approach that
would be a priori reasonable to take for bundles clashing at that level.
We’ll come back to this point after looking at the data. The (very
rough) code and data underlying the analyisis can be found
[here](https://github.com/flashbots/bundle-clashing-analysis).

## [](https://hackmd.io/@flashbots/Hkd8iBP8u#Results "Results")Results

### [](https://hackmd.io/@flashbots/Hkd8iBP8u#Target-txs "Target-txs")Target txs

Analyzed random equispaced blocks [12225646, 12227646, 12229646,
12231646] for “target tx” (non-overlapping vs. overlapping):  
![](https://hackmd.io/_uploads/Hk76wNo8_.png)  
We see that most of the bundle pairs do _not_ share a target
transaction.

Looking at the two most profitable blocks so far (12141301 and
12206158), we see:  
![](https://hackmd.io/_uploads/BkKJCcsId.png)  
Also overwhelmingly non-overlapping.

We can further look at the distribution of transactions over bundles
(how many txs appear in a single bundle, 2 bundles, etc.), for a
standard target block:  
![](https://hackmd.io/_uploads/SkAG_HnId.png)

And for a highly profitable block:  
![](https://hackmd.io/_uploads/Hkf-DLnLO.png)

Both show little overlap in target txs.

Note, finally, that the “overlapping” category might even include the
case of a single searcher going after the same opportunity with several
bundles; it might not make much sense but we have seen this behavior in
the data before.

### [](https://hackmd.io/@flashbots/Hkd8iBP8u#Contracts-touched "Contracts-touched")Contracts touched

Next, we look at the `stateDiff` of the different addresses touched by
the txs in the bundles. We classify bundle pairs as clashing at:

1.  only miner: if their only intersecting changed state is the miner
    address
2.  plus chi: if they only commonly modify miner + chi token state
3.  plus weth: if they commonly modifiy either miner + weth or miner +
    chi + weth state
4.  intersecting: if they commonly modify other addresses’ state.

These choices stem from the fact that many bundles modify these
contracts/address’ state, but that does not imply incompatibility.
Trivially, all bundles pay the miner, thus modifying the coinbase state,
but they can still be entirely independent.

This is what the distribution looks like for the random equispaced
blocks:  
![](https://hackmd.io/_uploads/SkSevuPP_.png)  
Only a minority of bundles jointly modify state other than the coinbase,
chi, and weth contract.

We see a similar pattern for the two most profitable blocks:  
![](https://hackmd.io/_uploads/B1RpTzywd.png)

Note that this categorization includes pairs of bundles both sharing the
same target transaction and not–presumably most pairs sharing a tx will
be comprised under the “intersecting” category here, more on this below.

### [](https://hackmd.io/@flashbots/Hkd8iBP8u#Compatibility "Compatibility")Compatibility

For the final stage of the hierarchy, we look at bundle compatibility,
checking whether running two bundles A, B in order [A, B] or [B, A]
would have yielded the same total profit for the miner (in which case we
call them _compatible_). As before, we look at the entire set of bundles
submitted to the relay with a given target block number, and analyze
them pairwise. For a given set of blocks, including the most profitable
so far, and some randomly picked ones we see the following distribution
of compatible vs. incompatible bundles:

![](https://hackmd.io/_uploads/Sy-bSLHFu.png)

As is clear from the graph, the vast majority of bundles yield the same
miner profit independently of the order in which they are run. We stress
that, as before, these are _all_ bundles submitted for the corresponding
target blocks, including in particular those sharing target
transactions, and touching unrelated state.

### [](https://hackmd.io/@flashbots/Hkd8iBP8u#Meta "Meta")Meta

We now categorize the pairwise clashes according to the hierarchy, for
three blocks: 12141301 (high profit), and 12225646 and 12227646
(random). Progressing down the hierarchy, we categorize pairs of bundles
according to whether they pursued the same transaction (overlapping
target), whether they modify state of only unrelated contracts
(unrleated contracts), and whether they are compatible or not in the
commutative sense described in the previous section. Now, differently
from the previous sections, we _exclude_ bundle pairs from higher levels
of the hierarchy when moving to the next level.

We find, for each of the three blocks, the following distributions:  
![](https://hackmd.io/_uploads/rypd4cSFu.png)

This shows that most pairs of bundles really touch unrelated contracts,
and, for those that modify the same state, it is only a small fraction
that is incompatible.

Averaging the proportions for each category, we find the following
distribution, again showing that only a small fraction of bundle pairs
are truly incompatible:  
![](https://hackmd.io/_uploads/H1UFSjBKd.png)

Finally, we note that the intuitive exclusion relations suggested by the
hierarchy do not strictly hold. In particular, we would perhaps expect:

1.  Pairs with same target tx to touch similar contracts
2.  Pairs touching unrelated contracts to be compatible
3.  Pairs with same target tx to be incompatible

In the data however, we see that neither 1. nor 3. hold (but 2.
apparently does). This can be simply explained by reverting
transactions, that do not modify state or change miners’ balance.

## [](https://hackmd.io/@flashbots/Hkd8iBP8u#Conclusions-and-Next-Steps "Conclusions-and-Next-Steps")Conclusions and Next Steps

The data so far consistently suggest that bundles targeting a single
block are by and large compatible, mostly targeting different
opportunities and touching unrelated state. This preliminarily suggests
a merging algorithm where a check for overlapping transactions can be
performed to discard bundles going after the same opportunity, after
which they can be trivially merged. This can be done with no more
simulation other than the one required for sorting by profit score, and
would only incur a cost for the miner to the extent to which we merge
incompatible bundles, but this seems to be a very infrequent case.

Note that this is similar to what we already do at the MEV-geth level,
where we actually even do an extra round of simulation to validate total
block profitability, which discards the potential occasional cost.
MEV-geth, however, does currently not look for overlapping transactions
in the bundles, a cheap check that we could include in a future version
or handle temporarily at the relay.

Modifying the bundle merging behavior of our system might incentivize a
change of behavior on the part of our searchers. Given the chance to
extract multiple opportunities by enabling bundle merging, they might
start submitting more incompatible bundles, which would partly
invalidate the analysis. Also, the analyses ran here are fairly costly
in CPU time and hence only a limited number of target blocks was
analyzed; still, the pattern seems to be extremely consistent. It would
be interesting to extend the analysis with more data coming after bundle
merging at the MEV-geth level is enabled with v0.2, to check for
consistency.

Computation permitting, we might still want to go for an all-in approach
where we compute profit for all (many) possible bundle orderings. In any
case, it would be interesting to build more robust infrastructure to
backtest different potential algorithms with actual data before settling
on a relay-level bundle merging algorithm to be implemented when the
`MegaBundle` RPC is finally included in MEV-geth.

---

Published on **[HackMD](https://hackmd.io/)**

112

Like1 Bookmark

Subscribe
