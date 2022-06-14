**General Philosophy:

-   Consider some set of transactions in an L2. Unless you come up with a trustless way to prevent MEV entirely (i.e., crypto magic), somebody is gonna have the power to reorder them on some timescale. MEV is thus an inevitable fact of life. 
    

-   There are two possibilities: either they're ordered by some entity on L2 (the “Sequencer”), in which case the L1 miners can't extract any MEV from them. Or they're ordered by the L1 miners, who can do their usual MEV extractions.
    

-   The former is a better situation if you trust the Sequencer more than the miners. If you don’t trust either, either, however, the second is preferable, since the sequencer [inevitably has stronger MEV extraction capabilities](https://medium.com/offchainlabs/meva-what-is-it-good-for-de8a96c0e67c) than the L1 miners do.
    
-   In designing Arbitrum, we thus generally tend towards minimizing L2 MEV capabilities. 
    

  

Arbitrum Background: The Inbox the Sequencer: 

-   Transaction ordering on Arbitrum is determined by a contract on L1, which we call the Inbox. The Sequencer is an entity given the special privilege to reorder the latest transactions in the Inbox (within, say, a 15 minute window.)
    
-   This is desirable, as it effectively gives the Sequencer the ability to show users the resulting state of their transactions off-chain/instantly. It has the undesirable side effect, however, of giving the Sequencer front-running / value-extraction capabilities. 
    

  

An Arbitrum chain can be created in one of several different modes; the particular mode determines the level of potential L2 MEV that enters the picture:

  

3 Modes of Arbitrum:

  

1.  Single Sequencer: L2 MEV-Potential (Mainnet Beta) 

For Arbitrum’s initial, flagship Mainnet beta release, the Sequencer will simply be controlled by a single entity. This entity has transaction ordering rights within the narrow / 15 minute window; users are trusting the Sequencer not to frontrun them. 

  

2. Distributed Sequencer With Fair Ordering: L2-MEV-minimized Mainnet Final Form

The Arbitrum flagship chain will eventually have a distributed set of independent parties controlling the Sequencer. They will collectively propose state updates via [the first (!) BFT algorithm that enforces fair ordering within consensus](https://eprint.iacr.org/2020/269.pdf). Here, L2 MEV is only possible if >1/3 of the sequencing-parties maliciously collude, hence “MEV-minimized.” 

  

3. No Sequencer: No L2 MEV(!)

A chain can be created in which no permissioned entities have Sequencing rights — why not! Here, ordering is determined entirely by the Inbox contract; we lose the ability to get lower latency than L1, but what we gain is that no party involved in L2, including Arbitrum validators, has any say in transaction ordering, and thus no L2 MEV enters the picture.**