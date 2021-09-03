https://gist.github.com/pdaian/957d8772edf5ed9a10987a64e4845cc0/ca7aa81a37556ba6b32e403fe131bf65f98ef71d

# Flashbots Research Roadmap

Phase 1: MVP Systems Description / Ethical Structure - Practical /
Ultra-Applied Research - Close loop with Development: "Industry" R&D -
Developers doing most of legwork (currently contractors in Flashbots
R&D) - Phil guiding outline / goals / high-level questions, assigning
tasks - Subgoal: get contributors writing research-grade papers -
Outcome immediately relevant to proving MVP / communicating intentions
to community - Describe remainder of research roadmap in-depth in first
document ("Future Work") Paper 1: Whitepaper / proof-of-concept Paper
style/field: Cryptocurrency systems paper, short paper/PoC (9pgs)
Similar papers: bloxroute, Thunderella, FlyClient Venue: FC22? USENIX?
Potential Collaborators: Likely all internal. Ethereum Foundation? -
Research question: How can we build a "good" auction mechanism for
validator priority "bribes"? - "Good": - Gas efficiency for community -
Measure: gas saved with perfectly efficient arbs, gas currently wasted
on-chain - Network overhead for community - Measure: current arb-bot
network overhead, full node bandwidth wasted - Prefer off-chain
computation whenever possible for equivalent security - Formalize
trade-off between on-chain / off-chain arb computation - Is there any
computation we should move off-chain (into bundle
processing/switching)? - Efficiently express preferences of all network
actors - Enumerate current arb use cases, show that system covers all of
them - Discuss trade-offs in order type complexity vs. latency -
Permissionless: no KYC / ad-hoc trust required in design - Create
security criteria for users not needing to trust miners/pools in PGA -
Enumerate where current design falls short, impliations of
shortcomings - Better for miners unilaterally than vanilla Geth -
Measure miner latency: assuming both no Flashbots txs / saturation -
Measure required resources on miner side - Measure latency penalty of
minimal viable switching algorithm [critical] - Academic definition for
"strictly dominating" client in game theory? - Research question: How
can we leverage existing auction literature? - Survey: ad auctions /
other priority bidding games. Known pathologies / design trade-offs -
Discuss traade-off of first vs. second price auction, continuous vs.
discrete auctions - Mempool auction theory? - Research question: How
does architecture differ across chains? PoW/PoS/leaderless/other? -
Hypothesis: architecture is general and will allow for priority in all
systems - Measure percent of hashpower / probability of success for PoW
/ PoS, leaderless protocols Paper 2: Ethical / community charter -
Research question: Should we build a "good" auction mechanism for
validator priority "bribes"?

    	- Intended to open discussion, describe future goals, elicit community priority
    	- Open question: what is state-of-the-art in discussion on parasitic vs. helpful arbitrage / "MEV"
    	- Open question: what are market designs that synergize with Flashbots / provide benefits to users other than arbers

    	- Research question: How do we minimize possible user harm of priority bribe incentives?

    	- Research question: How do we minimize possible consensus harms of priority bribe incentives?

    	- Resarch question: Should we allow for any MEV on the system?  Should we bound the MEV?

    	- Engineering question: What kind of transparency should we allow?  Fully transparent MEV portal?
    		- Who leads?

    Paper 3: Toolkit for understanding MEV
    	- Research question: how do new contracts measure their own MEV?  Formally, what determines and affects MEV?

    	- Artifacts: "MVP" tools for measuring, calculating, and reasoning about MEV.

    	- To be released by Phil within next 30 days independently, released through Cornell
    	- TODO after paper is written: how to support artifacts inside FlashBots organization?  Collab w. external orgs?


    - Papers 1-3 represent "MVP" research milestone (3 months?)
    - Should be done before community announcements (critical)
    - Question: Develop 1-2 page document with norms and goals of organization / supporting research?  In case of leak?

Phase 2: Ethical Consideratons / Community Goals

    	Paper style/field: CS ethics / social sciences paper, short paper (10-12pgs)
    	Similar papers: On the Moral Character of Cryptographic Work, Will the Market Fix the Market
    	Venue: IEEE S&B?  Ledger journal?
    	Potential Collaborators: Ethereum Foundation?  Community call?


    - Continue exploration mapped out by Phase 1>>Paper 2
    - How can we create a robust organization to support our aims of commons infrastructure?
    - Depends on MVP gaining traction

Phase 3: Refinements and Product Implications

    	Paper style/field: CS systems / systems security
    	Similar papers: ??
    	Venue: ??
    	Potential Collaborators: ??


    - Continue exploration mapped out by Phase 1>>Paper 1
    - Derive list of metrics to collect from deployed product
    - Depends on MVP gaining traction

Phase 4: Long-Term Game Theory and Profit Distribution

    	Paper style/field: CS / econ, computational economics
    	Similar papers: quadratic voting, ad auctions
    	Venue: EC?
    	Potential Collaborators: ??

    - Research Question: What does value capture / extraction look like in an auction-based ecosystem?  Compared to defi as a whole?

    - Research Question: How best to distribute profits?
    	- Incentive alignment between miners, users, defi developers, etcetc.

    _ Research Question: How best to hold the auctions?

Phase 5: ???

    - To be determined after MVP phase

Team: - Phil: Write roadmaps, outlines, final writing of all
manuscripts - Dev team / contractors: Data collection, write initial
drafts, publish data / release artifacts - Open question: do we want
more involvement? More funding? A formal budget? etc. - Full
organization: Review, Round 1, "semi open" - Community: Reviw, Round 2,
"open". All research artifacts (except Cornell-affiliated)

```OPEN CALL FOR FEEDBACK / INVOLVEMENT! ~~~~

```
