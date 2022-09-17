:::warning This is just a draft, the final solution may be different
from the one described here :::

## Abstract

Now the protocol collects only Beacon chain staking rewards. After the
merge, validators will start to receive another two types of rewards:
transaction fees and MEV which would be payed on the execution layer.
More details in
[this document](https://hackmd.io/O_8v0OQvSyu7n5nn0-qtQw).

To make sure that all validators have the correct software running with
the correct settings, it is suggested to have monitoring on blocks that
are signed by Lido validators.

## Daemon

The daemon waits for new proposed blocks and checks each one. Since we
don &#39;t need an immediate reaction, we can look at the finalized
epoch.

After receiving the block, the daemon inspect:

-   if the block proposer is one of the Lido validators
-   if `feeRecipient` in `ExecutionPayload` is the Lido MEV Vault
    address
-   if the block is made by Flashbots software

The daemon saves the inspection result to the storage. Then the results
are used to build the dashboard: metrics are exported to Prometheus or
DB is used directly as data source in Grafana.

```sequence
Storage -&gt;Daemon: Get last block
CL Node -&gt;Daemon: Get next\nproposed block
Daemon -&gt;Inspector: Inspect the block
Registry -&gt;Inspector: Get validators
Note over Inspector: Block proposer\nis Lido validator
Note over Inspector: feeRecipient is\nLido Vault address
MEV -&gt;Inspector: Get posible payloads
Note over Inspector: Execution payload is\nprovided by Flashbots
Inspector -&gt;Daemon: Inspection result
Daemon -&gt;Storage: Save results
```

:::warning We should check that Registry and MEV services keep up with
the main daemon :::

:::spoiler Metrics

-   Last block timestamp
-   Inspected blocks number _ Labels: _ proposer: `operator_id` or
    `unknown` _ fee_recipient: `lido_vault` or `unknown` _
    execution_payload_source: `flashbots` or `unknown` :::

## Storage

Requirements for the database:

-   Up to 100 records per second during synchronization
-   32 records every 12 \* 32 seconds during a normal run cycle

## Inspector

The service collects block data and inspects it by performing the
following checks:

1. Whether the block proposer is one of the Lido validators. To find
   this out the service looks for the validator index stored in
   `block.message.proposer_index`[^1], in the map of our validators
   obtained from the Registry service.

[^1]:
    `BeaconBlock` container spec:
    https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#beaconblock
    (⚠️ it &#39;s phase0 spec, that changed a lot for the merge)

2. Whether the feeRecipientis is the Lido Vault address. To find this
   out the service compares the constant Lido Vault address with the
   `block.message.body.execution_payload.fee_recipient`[^2].

[^2]:
    `ExecutionPayload` container spec:
    https://github.com/ethereum/consensus-specs/blob/dev/specs/merge/beacon-chain.md#executionpayload

3. Whether the execution payload is provided by Flashbots. This is the
   most obscure part at the moment and we are considering several
   solutions depending on how the
   [MEV-boost](https://github.com/flashbots/mev-boost) middleware will
   be arranged. Possible options are described in the
   [MEV service](#MEV-service) section.

## Registry service

The service fetches operators keys from the Node Operators Registry
contract, gets the
[validator indexes](https://github.com/ethereum/consensus-specs/blob/395fdd456657482b7257c8b9a9d68bea68917aaf/specs/phase0/validator.md#validator-index)
by the keys from the CL node and stores the validator data in memory.
Since we need only used keys that do not change, the service can be
represented as a simplified scheme:

```sequence
Cache -&gt;Registry: Get cached validators
Registry --&gt;EL Node: Subscribe to new blocks
EL Node -&gt;Registry: New block
EL Node -&gt;Registry: Operators data
Note over Registry: Filter ids of\nnew used keys
EL Node -&gt;Registry: New used keys (uncached)
CL Node -&gt;Registry: Get validator indexes by pubkeys
Note over Registry: Merge\nvalidators data
Registry -&gt;Cache: Save validators to cache
```

The service can be isolated into a microservice of its own. In the
future, it may be useful to develop it as a separate solution that is
used in different projects.

:::spoiler Metrics

-   A number of operators
-   A number of keys _ Labels: _ operator: `operator_id` \* status:
    `used` or `unused` :::

## MEV service

The main goal of this service is to collect the possible
`transaction_root` that the Flasbots software offered for each block.
This data will be used to compare with what a validator actually
proposed in the `ExecutionPayload`.

:::danger Now this is the most unclear part, and we are looking at
several options. :::

### 🥇 Extra relay API

Since we minimally need only a `transaction_root` and a `block_number`,
the best place to collect information is a relay.

The perfect option is to have a special endpoint for monitoring that
returns all payloads in the relay memory or over the last X blocks
(depends on the design of the relay itself). To avoid data compromise,
only `transaction_root` and `block_number` can be obtained instead of
the whole list of transactions and other fields.

Options:

1. Implement the endpoint for monitoring in the original relay code. In
   this case we connect to those relays that are used by our validators
   and collect all possible payloads for all blocks.
2. If the relay code will be opensource, we can fork the original code,
   add the necessary endpoint and run several relays that will be
   whitelisted in the mev-boost of our node operators.

### Existing relay API

The other option is to try to use the current API. According to
[the specification](https://github.com/lightclient/execution-apis/blob/add-builder-api/src/builder/specification.md),
we can retrieve data using the `builder_getHeaderV1` method.

The method requires a `feeRecipient` to be set for the validator in the
relay. We assume that our validators set it themselves using the
`builder_registerValidatorV1` method, so we can use
`builder_getHeaderV1` method.

Unclear parts:

-   Whether historical data is available and how many blocks back can be
    obtained using the `builder_getHeaderV1` method.
-   Whether the payload is fixed after responding. It looks like the
    validator may get one payload and we may get another when collecting
    the data.

### MEV boost

In case the relay code is private and we can &#39;t get all the data we
need from it, we can fork the mev-boost and ask our operators to use our
version.

#### Data collection

We can collect required data from the `builder_getHeaderV1` response,
which contains all payload header and a builder info.

#### Data pushing

The collected data can be sent directly to our endpoint. There should be
a queue for sending data on the mev-boost side, and cleaning up old
data.

#### Data fraud

Since the data is collected on the validators &#39;side, the data should
be checked for fraud. We consider the following data manipulation
methods:

1. Pretend that payload was offered by relay. Since
   [the specification](https://github.com/flashbots/mev-boost/blob/main/docs/specification.md#response-1)
   assumes a `publicKey` and `signature` of the builder over payload in
   the response we will be able to collect them and verify that the
   payload was provided by the whitelisted builder.
2. Pretend the relay is unavailable and the validator uses a local
   payload. Described in the
   [Relay availability monitoring](#Relay-availability-monitoring)

### 🚫 MEV inspect

We can use [mev-inspect](https://github.com/flashbots/mev-inspect-py) to
inspect all transactions in a block and see how much MEV we could get
from that block and compare the result to what we got. So far, this
option does not look good, it &#39;s not clear how to count the possible
validator &#39;s profit. And this option doesn &#39;t answer the
question of whether the Flashbots software was used or not. But it gives
the opportunity to explore historical data, which may be useful.

### 🚫 Centralized API from Flashbots

It would be great to have something like the existing API:
[blocks.flashbots.net](https://blocks.flashbots.net/), but in the
current multiple relay architecture, it seems unlikely to have such a
service.

### Relay availability monitoring

Since the specification suggests using a local payload in case the relay
is not available, the validator can pretend that the relay is
unavailable and create a local payload using a modified version of the
node. In this case, a validator will be able to include transactions in
the block, receiving a value past Lido.

It &#39;s suggested to have monitoring for relays from the white list
and collect data of their availability and a respond time. It doesn
&#39;t guarantee that the validator doesn &#39;t use this cheat, but it
will give us statistics on local payload usage and relay availability,
from which we can make some conclusions.

### Relay white list

We want to have a whitelist to avoid relays that may be in collusion
with the validators.
