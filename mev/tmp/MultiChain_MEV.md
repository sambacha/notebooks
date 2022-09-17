## Inter-chain and Intra-chain MEV

Maximal/miner extractable (MEV) value is the topic du jour in crypto.

It's a phenomenon whose ramifications have
[been](https://www.cs.princeton.edu/~arvindn/publications/mining_CCS.pdf)
[theorized](https://www.reddit.com/r/ethereum/comments/2d84yv/miners_frontrunning/)
for years. It's become
[observable at a large scale](https://explore.flashbots.net/) within the
last year or two, in part thanks to the DeFi explosion of 2020.

It affects projects at all parts of the stack and there's been a rush
over the last few months to form opinions about it across the ecosystem.
This rush has created a simplicity in thinking that hides a lot of
nuance.

It's probably not just the case that 'MEV good' or 'MEV bad.' Or even
'all MEV inevitable' or 'all MEV mitigable.'

I've been spending a lot of time in the weeds recently and want to
explore the nuance today. I posit that the sloppiness/oversimplification
of thought around MEV has to do with conflation of two 'types' of MEV.
MEV that exists 'inter'-chain and MEV that exists 'intra'-chain.

Inter-chain MEV is largely inevitable and the best we can do for
decentralization of the systems we're building is to democratize the
profits from it. Intra-chain MEV, on the other hand might be mitigated
considerably and it's worth our time to spend effort researching
mitigation.

### inter vs. intra

Intra-chain MEV is what we talk about most of the time we talk about
MEV. It's the opportunities that exist within a single synchronous block
in a single chain. Things like atomic sandwich arbs on Uniswap.

Inter-chain MEV is anything captured between two synchronous chains. So
rollup-to-rollup MEV, rollup-to-L1 MEV, and L1-to-L1 MEV. It's defined
by situations where there are >1 transaction inclusion/ordering
mechanisms that an entity needs to interface with to extract profit.

I assume that we're headed to a multi-chain world. This was less clear 3
years ago than it is today. One shared, synchronous blockspace is not
going to be gas-cost-effective for all things that want to decentralize.

It's worth thinking about the future of MEV as an interplay between
intra-chain and inter-chain opportunities.

### democratize inter-chain MEV

Why even talk about inter-chain MEV? It seems like the fundamentally
'less interesting' category. It feels analogous to opportunities one has
being a market maker on multiple centralized exchanges.

The main argument that MEV is 'inevitable' has to do with the
subjectivity of 'fairness' in what people call
[fair ordering protocols](https://blog.chain.link/chainlink-fair-sequencing-services-enabling-a-provably-fair-defi-ecosystem/).
To be honest, I hate the word 'fairness' here. It suggests that there's
some global, moral notion of a correctness. A better phrase might be
_deterministic random_ ordering.

Anyways, it's totally feasible that in a multi-chain world we'll have
different deterministic random orderings on different chains. Thus there
will be MEV opportunities available between these chains.

A similar principle carries over to 'privacy' oriented MEV mitigation
techniques, like timelock encryption. Not every chain that exists in the
future will want the cost/latency tradeoff that comes with these
techniques and so there will (likely) always be _some_ inter-chain MEV
to pick up between those that don't.

Inter-chain MEV truly is inevitable because the factors defining
mitigation within a chain are very chain-subjective. Thus, if we want
our systems to stay decentralized, we should work to democratize the
extraction of it.

### mitigate intra-chain MEV?

So what about intra-chain MEV? Will it all be mitigated? How does it
compare to 'inter-chain' MEV in terms of its effect on user experience?
The answer isn't as clear cut here.

Intra-chain MEV feels 'more interesting' than inter-chain because any
MEV opportunity here can be captured atomically, within a single block.
If an entity has a monopoly on creating a block at some point in time,
there is no sliver of time in which another entity can stop them from
capturing an opportunity in that block.

Flash mints and flash loans are tools you can use when capturing an
intra-chain MEV opportunity (and not for inter-chain ones).

It's also less obvious to me that there's the same inevitability here
that exists with inter-chain MEV. There are a number of chains that seem
likely to adopt some level of mitigation.

The aforementioned 'privacy' flavor of mitigation could _entirely_
mitigate MEV from a chain, but at a latency cost. Deterministic ordering
mechanisms are also likely to
[make their way](https://eprint.iacr.org/2020/269.pdf) into chains.

Efforts to mitigate intra-chain MEV seem well-worth researching to
completion and well-worth consideration by the governing
structure/process of any chain.

### democratize inter, mitigate intra?

The two predominant narratives about MEV today are that we should
democratize it all or we should mitigate it all.

As I've covered here, there's a little more nuance here. I currently
believe that we should democratize inter-chain MEV extraction while
developing ideas and technology to mitigate intra-chain MEV.
