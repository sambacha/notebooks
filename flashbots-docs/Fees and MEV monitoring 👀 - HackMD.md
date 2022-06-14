---
created: 2022-02-25T13:05:21 (UTC -08:00)
tags: []
source: https://hackmd.io/@george-avs/rJ14Rv7qF
author: 
---

# Fees and MEV monitoring 👀 - HackMD

> ## Excerpt
> # Fees and MEV monitoring 👀  :::warning This is just a draft, the final solution may be different f

---
This is just a draft, the final solution may be different from the one described here

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#Abstract "Abstract")Abstract

Now the protocol collects only Beacon chain staking rewards. After the merge, validators will start to receive another two types of rewards: transaction fees and MEV which would be payed on the execution layer. More details in [this document](https://hackmd.io/O_8v0OQvSyu7n5nn0-qtQw).

To make sure that all validators have the correct software running with the correct settings, it is suggested to have monitoring on blocks that are signed by Lido validators.

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#Daemon "Daemon")Daemon

The daemon waits for new proposed blocks and checks each one. Since we don’t need an immediate reaction, we can look at the finalized epoch.

After receiving the block, the daemon inspect:

-   if the block proposer is one of the Lido validators
-   if `feeRecipient` is address in `ExecutionPayload` is the Lido Vault

The daemon saves the inspection result to the storage. Then the results are used to build the dashboard: metrics are exported to Prometheus or DB is used directly as data source in Grafana.

```
Created with Raphaël 2.2.0StorageStorageDaemonDaemonCL NodeCL NodeInspectorInspectorRegistryRegistryMEVMEVGet last blockGet nextproposed blockInspect the blockGet validatorsBlock proposeris Lido validatorfeeRecipient isLido Vault addressGet posible payloadsExecution payload isprovided by FlashbotsInspection resultSave results
```

We should check that Registry and MEV services keep up with the main daemon

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Metrics "Metrics")Metrics

-   Last block timestamp
-   Inspected blocks number
    -   Labels:
        -   proposer: `operator_id` or `other`
        -   fee\_recipient: `lido_vault` or `other`
        -   execution\_payload\_source: `flashbots` or `unknown`

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#Providers "Providers")Providers

Cl and EL providers are services that provide API access to the nodes.

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Metrics1 "Metrics1")Metrics

-   Response time
    -   Labels:
        -   status\_code: HTTP response code

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#Storage "Storage")Storage

Any database will work.

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#Inspector "Inspector")Inspector

The service collects blocks data and inspects the blocks that are signed by Lido validators.

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Collected-data "Collected-data")Collected data

Since we check each block we can additionally index the data in order to use it later for statistics. This is not a required part and can be done later.

-   feeRecipient address
-   Fees value
-   MEV value
-   block status

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Checks "Checks")Checks

The inspector makes the following checks:

#### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Whether-the-block-proposer-is-one-of-the-Lido-validators "Whether-the-block-proposer-is-one-of-the-Lido-validators")Whether the block proposer is one of the Lido validators

To find this out the service looks for the validator index stored in `block.message.proposer_index`[\[1\]](https://hackmd.io/@george-avs/rJ14Rv7qF#fn1), in the map of our validators obtained from the Registry service.

#### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Whether-the-feeRecipientis-is-the-Lido-Vault-address "Whether-the-feeRecipientis-is-the-Lido-Vault-address")Whether the feeRecipientis is the Lido Vault address

To find this out the service compares the constant Lido Vault address with the `block.message.body.execution_payload.fee_recipient`[\[2\]](https://hackmd.io/@george-avs/rJ14Rv7qF#fn2).

#### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Whether-the-execution-payload-is-provided-by-Flashbots "Whether-the-execution-payload-is-provided-by-Flashbots")Whether the execution payload is provided by Flashbots

This is the most obscure part at the moment and we are considering several solutions depending on how the [MEV-boost](https://github.com/flashbots/mev-boost) middleware will be arranged. Possible scenarios are described in the [MEV service](https://hackmd.io/@george-avs/rJ14Rv7qF#MEV-service) section.

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#Registry-service "Registry-service")Registry service

The service fetches operators keys from the Node Operators Registry contract, gets the [validator indexes](https://github.com/ethereum/consensus-specs/blob/395fdd456657482b7257c8b9a9d68bea68917aaf/specs/phase0/validator.md#validator-index) by the keys from the CL node and stores the validator data in memory. Since we need only used keys that do not change, the service can be represented as a simplified scheme:

```
Created with Raphaël 2.2.0CacheCacheRegistryRegistryEL NodeEL NodeCL NodeCL NodeGet cached validatorsSubscribe to new blocksNew blockOperators dataFilter ids ofnew used keysNew used keys (uncached)Get validator indexes by pubkeysMergevalidators dataSave validators to cache
```

The service can be isolated into a microservice of its own. In the future, it may be useful to develop it as a separate solution that is used in different projects.

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Metrics2 "Metrics2")Metrics

-   A number of operators
-   A number of keys
    -   Labels:
        -   operator: `operator_id`
        -   status: `used` or `unused`

## [](https://hackmd.io/@george-avs/rJ14Rv7qF#MEV-service "MEV-service")MEV service

Now this is the most unclear part, and we are looking at a good and a bad scenarios.

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Good-scenario "Good-scenario")Good scenario

In a good scenario there is an API from Flashbots that lets us know if a particular block is made with their software or not. If the new API is similar to the [current implementation](https://blocks.flashbots.net/), we can also pull additional information from it.

```
Created with Raphaël 2.2.0MEVMEVEL NodeEL NodeFlashbotsFlashbotsSubscribe to new blocksNew blockGet block
```

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Bad-scenario "Bad-scenario")Bad scenario

In a bad scenario to understand whether a block is made with flashbots or not, we collect all `ExecutionPayloads` by pretending to be a validator and connecting to the MEV-boost. Then we check if one of the collected `ExecutionPayloads` was used in the block signed by the Lido validator.

```
Created with Raphaël 2.2.0MEVMEVCL NodeCL NodeMEV boostMEV boostDBDBSubscribe to new slotsNew slotGet payloadSave payload
```

### [](https://hackmd.io/@george-avs/rJ14Rv7qF#Metrics3 "Metrics3")Metrics

_TODO_

___

1.  `BeaconBlock` container spec: [https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock) (⚠️ it’s phase0 spec, that changed a lot for the merge) [↩︎](https://hackmd.io/@george-avs/rJ14Rv7qF#fnref1)
    
2.  `ExecutionPayload` container spec: [https://github.com/ethereum/consensus-specs/blob/dev/specs/merge/beacon-chain.md#executionpayload](https://github.com/ethereum/consensus-specs/blob/dev/specs/merge/beacon-chain.md#executionpayload) [↩︎](https://hackmd.io/@george-avs/rJ14Rv7qF#fnref2)
