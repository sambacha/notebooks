[![hackmd-github-sync-badge](https://hackmd.io/MU12HqHvTougtvWC9GYHog/badge)](https://hackmd.io/MU12HqHvTougtvWC9GYHog)

Phase

Deadline

Navigator

Description

P1-POC

30/10/2020

@thegostep

Minimal proof of concept and benchmarks

P2-MVP

30/01/2021

@thegostep

Pool integrations

 hierarchy
 FlashBots
FlashBots 
 Illuminate
Illuminate 
 FlashBots->Illuminate 
 Democratize
Democratize 
 FlashBots->Democratize 
 Reduce
Reduce 
 FlashBots->Reduce 
 Distribute
Distribute 
 FlashBots->Distribute 
 mev\_inspect
mev\_inspect 
 Illuminate->mev\_inspect 
 mev\_explore
mev\_explore 
 Illuminate->mev\_explore 
 mev\_relay
mev\_relay 
 Democratize->mev\_relay 
 mev\_extract
mev\_extract 
 Democratize->mev\_extract 
 mev\_geth
mev\_geth 
 mev\_extract->mev\_geth 

![](https://i.imgur.com/SHhZJFK.png)

## [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Phase-1---POC "Phase-1---POC")Phase 1 - POC

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Deliverable "Deliverable")Deliverable

-   Order templates
-   Benchmarks
-   Geth Fork
-   ETHResearch post

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Core-Devs "Core-Devs")Core Devs

-   @thegostep
-   @jparyani
-   @epheph
-   @vaibhavchellani
-   @samczsun

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Communication "Communication")Communication

-   twice-weekly core dev call

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#mev-geth-todo "mev-geth-todo")mev-geth todo

-   rpc gateway
-   rpc documentation
-   integration tests (local)
-   profile performance

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#mev-inspect-todo "mev-inspect-todo")mev-inspect todo

-   review data labels / presentation
-   host public dashboard
-   add profitability metrics
-   add inspectors
-   inspector contribution guide

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Spec "Spec")Spec

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Order-templates "Order-templates")Order templates

-   What are the 80/20 most profitable strategies?
-   How to modify transaction object to express these strategies?
-   How are payments settled?

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Benchmarks "Benchmarks")Benchmarks

-   MEV backtester
    -   metrics
        -   opportunity size (user value taken)
        -   current value sent to miners per opportunity
        -   num failed transactions
        -   amount of blockspace used by failed transactions
        -   inflated gas price?
    -   modular plugins for new strategies
        -   what strategies should be built next?
    -   output accounts and nonces involved in PGA
-   research relevance
    -   dashboard
    -   breadth first search for quantifying coverage (how much of the strategy space are we catching, how to distribute per protocol/strategy/bot)
-   What is the MEV strategy taxonomy and how to express strategies in order types?
-   What is miner upside from running flashbots?
-   What is expected network relief? (assuming all front-running activity moved to flashbots)
-   What is backtest of benchmarks over last 6 months?
-   What is live performance over one week? (assuming 100% flashbot penetration)

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Geth-Fork-Spec "Geth-Fork-Spec")Geth Fork Spec

-   Key considerations
    -   make minimal changes to geth in order to make setup and auditing easy
    -   avoid impact existing operations (latency, validity, security)
    -   have flashbot system failure revert to regular geth operation
    -   consider spamming of invalid bundles
    -   provide similar infrastructure transparency guarantees as regular mempool
    -   provide strategy privacy until inclusion
-   Components
    -   [Bundle interface](https://github.com/MEV-Ship/flashbots/issues/3)
    -   [Networking](https://github.com/MEV-Ship/flashbots/issues/4)
    -   [Bundle validation](https://github.com/MEV-Ship/flashbots/issues/5)
    -   [Block template generation](https://github.com/MEV-Ship/flashbots/issues/6)
    -   [Profit switching algo](https://github.com/MEV-Ship/flashbots/issues/7)
    -   [Integration tests](https://github.com/MEV-Ship/flashbots/issues/7)
-   TODO
    -   how do we notify the network that a block contains a flashbots bundle?
        -   require trader to emit event and validate by miner
        -   miner adds data to block header
    -   should we send receipts to the traders about their position in the auction?
    -   how should block template profitability be communicated to profit switching algo?
    -   how to setup environment for integration tests

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#ETHResearch-post "ETHResearch-post")ETHResearch post

-   Introduction to FlashBots
-   Expected positive externalities
-   MEV Taxonomy
-   Benchmarks
-   Setup instructions
-   Further Discussion

## [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Phase-2---MVP "Phase-2---MVP")Phase 2 - MVP

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Deliverable1 "Deliverable1")Deliverable

-   2+ pool integrations
-   economics proposal
-   implementation of key research topics
-   roadmap for future integrations
-   roadmap for future improvements

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#mev-relay "mev-relay")mev-relay

-   build and host an optional gateway for propagating bundles to miners

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#mev-geth "mev-geth")mev-geth

-   deploy to production, build hashrate
-   improve searcher interface
-   improve reporting

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#mev-inspect "mev-inspect")mev-inspect

-   build library for efficient identification of mev opportunities

#### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#mev-explore "mev-explore")mev-explore

-   build dashboard for making sense of mev extraction activity in the wild

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Core-Devs1 "Core-Devs1")Core Devs

-   @thegostep

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Communication1 "Communication1")Communication

-   twice-weekly core dev call

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Timeline "Timeline")Timeline

Week

Task - @thegostep

Task - @

Task - @

Task - @

Nov-1

Kickoff

Nov-3

Dec-1

Dec-3

Jan-1

Jan-3

### [](https://hackmd.io/MU12HqHvTougtvWC9GYHog#Spec1 "Spec1")Spec