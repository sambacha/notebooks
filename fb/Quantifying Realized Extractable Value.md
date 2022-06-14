_Alejo Salles – Flashbots_

_Maximal_ (formerly _Miner_) _Extractable Value_ (MEV) is the value that
can be extracted from a blockchain by any agent without special
permissions. Considering this permissionless nature, any agent with
transaction ordering rights will be in a privileged position to perform
the extraction. In Proof of Work blockchains, it is miners who determine
transaction ordering within a block, hence the former “_miner_” term. In
practice, bot operators seek to extract MEV by either paying high fees
to increase the likelihood that their transactions are mined, or by
fine-tuning their gas price choices in order to “time” their
transactions right, as is the case when backrunning an oracle update to
perform a liquidation.

Despite much recent discussion about the topic and, in particular, its
associated risks for the Ethereum protocol, we still lack a cohesive
formal model for quantifying MEV extraction. At Flashbots, we have
released an [MEV explorer](https://explore.flashbots.net/) where we shed
light on various aspects of this phenomenon. While we do elaborate on
our metrics in the site, they still lack a formal definition. Here, we
attempt to provide a unifying operational framework that consolidates
MEV extraction metrics, focusing on the Ethereum
network[\[1\]](https://hackmd.io/@flashbots/quantifying-REV#fn1).

## [](https://hackmd.io/@flashbots/quantifying-REV#General-Considerations "General-Considerations")General Considerations

The first important point to make is that MEV is a theoretical quantity
that we can only approach asymptotically. Unforseen extraction methods
can and will be devised (every new DeFi hack is an MEV extraction
event). Hence, we will here focus instead on the _Realized Extractable
Value_, notated REV, where REV≤MEV. In other words, REV is the _actual
value_ extracted from the blockchain from MEV
opportunities[\[2\]](https://hackmd.io/@flashbots/quantifying-REV#fn2).

We note that there’s two classes of actors in the system, _searchers_
and _miners_. We use the generic label _miner_ for actors that bear the
privileged role of transaction inclusion and ordering. _Searchers_ are
any non-privileged actors aiming to profit from these opportunities.
Crucially, miners can also act as searchers.

Extracting MEV incurs externalities, like increasing gas costs for all
users of the network, or bloating the chain. We won’t dwell into the
implications of these externalities here, but we will make them manifest
in the model. For more on this and the “MEV Crisis”, be sure to check
our
[Flashbots introductory post](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752).

We are now ready to begin building our framework, starting with a simple
model that ignores direct miner payments and searcher competition and
other externalities like opportunity checks. We will revisit the model
to account for these at a later stage.

We begin with a model where a single searcher performs an MEV
extraction, sharing proceeds with the block miner via _gas fees only_.
We further assume that miners order transactions by descending gas
price, which approximates well their optimal strategy and is the default
in Ethereum node software.

We decompose the opportunity’s REV in two terms:

(1)REV\=REVS+REVM,

where REVS is the value that goes to the searcher, and REVM is the value
that goes to the miner. Note that, as we expand on below, REV already
encompasses the opportunity’s _extraction costs_ (_i.e._ the actual REV
of an opportunity depends on the gas price of the network at extraction
time[\[3\]](https://hackmd.io/@flashbots/quantifying-REV#fn3)).

Let’s dive into the two different terms. The searcher REV is composed
by:

(2)REVS\=Vin−Vout−gMEV.sMEV,

where Vout is the value that flows from the searcher to the blockchain
in the transactions performing the extraction (excluding gas); Vin is
the value flowing from the blockchain to the searcher; gMEV is the gas
price of the transactions; and sMEV is their _size_, _i.e._ the total
amount of gas they consumed. Vout, Vin, and gMEV are denominated in the
base network currency (ETH), while sMEV is in units of gas. Separating
the gas term from Vout will be helpful in quantifying the extraction
costs, and it is also how we compute REVS in practice.

We use “the blockchain” loosely here to refer to any other addresses
(corresponding to smart contracts or EOAs) that are not the EOA of the
extracting transactions, or smart contracts controlled by the searcher.
Note that identifying these is a heuristic-guided process based on known
searcher patterns, and by all means fallible. Also, we stress that any
ancillary transactions related to the MEV extraction (like the “meat” in
a sandwich attack) are _not_ part of the set of transactions that
contribute to the above variables.

Turning to the miner side, we have:

(3)REVM\=sMEV.(gMEV−geff),

where geff is the _effective gas price_ of the transactions that _would
have been included_ in the block had the opportunity not been taken.
REVM is thus defined to include the _opportunity cost_ the miner incurs
by including the MEV\-extracting transactions.

As transactions in the mempool are ephemeral, it is impossible to
measure geff _a posteriori_ from only blockchain data and logs. We
resort to an approximation that also serves as a lower bound for the
value realized by the miner:

(4)REVM≳sMEV.(gMEV−gtail),

where gtail is the gas price of the last transaction in the
block[\[4\]](https://hackmd.io/@flashbots/quantifying-REV#fn4).

Plugging equations (2) and (4) we get for the total realized value:

(5)REV≳Vin−Vout−sMEV.gtail.

In this rendition the miner and searcher roles are blurred, but we can
clearly identify the _extraction costs_ of the opportunity, given by the
subtrahend sMEV.gtail.

Finally, note that the value split between searcher and miner at this
stage is entirely decided by the choice of gMEV, which is in turn
affected by the nature of the opportunity and the presence of other
searchers trying to exploit it.

## [](https://hackmd.io/@flashbots/quantifying-REV#Including-Externalities "Including-Externalities")Including Externalities

The scenario presented so far ignores the fact that while
single-searcher successful value extractions exist, they constitute only
a small fraction of all MEV activity. In practice, each time an
opportunity arises in the network, several searchers will try to take it
by engaging in Priority Gas Auctions or submitting multiple competing
transactions to backrun a target state change. Moreover, sometimes
searchers perform onchain calculations to validate the existence of an
opportunity (“preflights”). When these checks fail, there is no value
extracted, but miners will still benefit from the collected gas fees.

Note, however, that all of this activity is zero-sum: all costs incurred
by searchers by competing with each other, validating state, etc.,
directly becomes miner profit. From the miner’s perspective, the fee
paid by a searcher’s preflight is no different from, say, the one coming
from an unsuspecting token transfer. This goes to say that none of this
value amounts to a contribution to the REV. However, it is of interest
of us to quantify it, since it is precisely what generates trouble for
regular users of the network not involved in this commerce.

We will then need to take a broader view of MEV, and define a new term,
the _Extractable Value Cost_ (EVC), which summarizes all the extra value
_induced_ by MEV extraction activity, that is not part of the extracted
value itself. With this definition, we have:

(6)Total MEV Activity\=REVS+REVM+EVC.

In words, the _total MEV activity_ is composed of the extracted MEV
(REV, divided among searchers and miners), and the global costs of
extractable value, going directly to miners and quantified by EVC. Note
that EVC only encompasses _on-chain_ activity, ignoring off-chain costs
like network bloating due same-nonce transaction replacement.

We can compute the EVC as follows:

(7)EVC\=∑tx∈Xstx.gtx,X\={preflights,failures,cancellations}.

While altogether eliminating MEV is likely
impossible[\[5\]](https://hackmd.io/@flashbots/quantifying-REV#fn5), it
is Flashbots’
[core mission](https://ethresear.ch/t/flashbots-frontrunning-the-mev-crisis/8251)
to reduce the negative externalities of MEV\-related activities by
improving the overall efficiency of the extraction process. The present
framework allows us to state this mission concisely as that of reducing
EVC.

## [](https://hackmd.io/@flashbots/quantifying-REV#Flashbots-Bundles "Flashbots-Bundles")Flashbots Bundles

Flashbots optimizes MEV extraction by allowing searchers to submit
bundles of ordered transactions, effectively transferring part of the
ordering privileges from the miners to the searchers. These bundles are
included by the miners provided they get more out of them than by mining
regular transactions. While searchers can still set a gas fee, the
preferred way to pay the miners for inclusion is via a direct `coinbase`
transfer included in the
bundle[\[6\]](https://hackmd.io/@flashbots/quantifying-REV#fn6).

We thus need to account for this extra term in our miner revenue formula
(4):

(8)REVMFlashbots≳sMEV.(gMEV−gtail)+Vdirect,

where Vdirect is the total value transferred to the `coinbase` address.
Note that this new term doesn’t affect the total REV as it is accounted
for by a corresponding increase of the Vout term.

Apart from the extra term, we now expand the set of transactions that
contribute to the terms in the formula to include all transactions
included in the bundle. In particular, if a bundle includes the “meat”
in an arbitrage, its size and gas price count towards the extracted
value. This ensures we account for the opportunity cost incurred by
miners when including bundles instead of regular transactions.

Finally, expression (2) for searcher value stays the same, but also
requires expanding the implied transaction set to all transactions in
the bundle. The rest of the model remains unchanged by the utilization
of Flashbots’ bundles. With these changes, the model also encompasses
alternative relay services like private mempools.

It is worth noting that Flashbots reducing EVC does not imply a decrease
in miners’ revenue, since their share of extracted value might increase
as a result of the extraction optimization. Flashbots executions are
deterministic and therefore searchers are likely to pay the miners more
than if they risked paying for reverts or cancellations. Finding the
revenue sharing equilibrium is ultimately a game-theoretic problem which
deserves independent treatment.

## [](https://hackmd.io/@flashbots/quantifying-REV#Final-Thoughts "Final-Thoughts")Final Thoughts

By unifying various quantities involved in MEV extraction, our framework
enables us to pose clear-cut questions like “how big are the costs of
MEV extraction activities for the network?”, or “to what extent has
Flashbots helped in reducing these costs?”. These and other interesting
perspectives on MEV extraction based on this framework will be included
in coming versions of MEV\-Explore.

Throughout this work, we have swept under the rug the complications
involved in actually measuring the “atomic terms” entering the
definitions, like Vout, or the actual set of MEV\-extracting
transactions. This task involves _ad hoc_ heuristics for an ever-growing
number of MEV extraction strategies, and while we strive for
establishing a useful classification, there will always be unforeseen
opportunities that will elude
detection[\[7\]](https://hackmd.io/@flashbots/quantifying-REV#fn7).

We pass no judgment as of which types of MEV extraction are “good” and
which are “bad”, although there’s certainly ways in which this question
could be meaningfully approached (“has an unrelated third party incurred
loss due to the extraction?”). We leave this subtle question for future
work, but we restate our belief that EVC is undesirable and we shall
strive to minimize it.

## [](https://hackmd.io/@flashbots/quantifying-REV#Join-our-Efforts "Join-our-Efforts")Join our Efforts!

At Flashbots, we perform research and build systems for mitigating the
upcoming MEV crisis, and we would love your help. We are a distributed
organization with the principles of a
[pirate hacker collective](https://www.youtube.com/watch?v=T0fAznO1wA8),
and have several
[open positions](https://github.com/flashbots/pm/tree/main/jobs). We
also issue grants to external researchers doing work aligned with ours,
please find out more in our
[Research repository](https://github.com/flashbots/mev-research), or
join our [Discord](https://discord.gg/7hvTycdNcK)!

Special thanks to Scott Bigelow, Phil Daian, Stephane Gosselin, Alex
Obadia, Tina Zhen, and Jason Paryani for welcoming me onboard and all
Flashbots’ crew for the work and discussions leading to this post.

---

1.  Note however that most of what is presented here should apply with
    minor variations to other blockchains that have actors with
    transaction-ordering privileges.
    [Work is underway](https://github.com/flashbots/mev-research/blob/main/FRPs/FRP-8.md)
    to flesh out these variations.
    [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref1)
2.  The definitions here are consistent with a theoretical approach to
    MEV to be published in an upcoming paper (sneak peek
    [here](https://github.com/flashbots/pm/issues/16)).
    [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref2)
3.  It’s up for discussion whether the (non-measurable) MEV should also
    depend on this.
    [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref3)
4.  One would need to look into adjacent block gas prices if the entire
    block was taken up by MEV\-extracting transactions.
    [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref4)
5.  Note however that it can likely be reduced to some extent with smart
    protocol design, there’s some
    [ongoing efforts](https://github.com/flashbots/pm/issues/16) to this
    avail. [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref5)
6.  A direct `coinbase` transfer could also be present in a standard,
    non-bundled extraction, but it would make little sense for the
    searcher to do it since miners typically only look at gas prices for
    transaction inclusion and ordering.
    [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref6)
7.  See [this paper](https://arxiv.org/abs/2102.03347) for a
    complementary, protocol agnostic approach to MEV detection based on
    flagging certain types of “transaction dynamics” (displacement,
    insertion, and suppression).
    [↩︎](https://hackmd.io/@flashbots/quantifying-REV#fnref7)
