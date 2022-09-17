# MEV Boost Relay API

> MEV-Boost Relay API specification v1.0.0

The Flashbots relay is open source:
[https://github.com/flashbots/mev-boost-relay](https://github.com/flashbots/mev-boost-relay)

A relay has several responsibilities:

-   APIs for proposers
    ([builder-spec](https://ethereum.github.io/builder-specs/#/Builder)),
    block builders and data transparency
-   Handling validator registrations and block proposals in a scalable
    manner
-   Block escrow, data availability, redundancy
-   Simulate and verify blocks sent by block-builders, rate-limit if
    necessary
    -   correct amount of fees paid to most recent feeRecipient of
        validator
    -   correct block attributes and transactions
    -   within the gasLimit requested by the validator

## Data types

A reference implementation of the data types with correct SSZ encoding
and signing routines can be found in this repository:
[https://github.com/flashbots/go-boost-utils](https://github.com/flashbots/go-boost-utils)

#### [builder-specs](https://github.com/ethereum/builder-specs) and [beacon-APIs](https://github.com/ethereum/beacon-APIs)

-   [ValidatorRegistration](https://github.com/ethereum/beacon-APIs/blob/master/types/registration.yaml)
-   [SignedBuilderBid](https://github.com/ethereum/builder-specs/blob/main/types/bellatrix/bid.yaml)
-   [SignedBlindedBeaconBlock](https://github.com/ethereum/beacon-APIs/blob/master/types/bellatrix/block.yaml#L83)
-   [ExecutionPayload](https://github.com/ethereum/beacon-APIs/blob/master/types/bellatrix/execution_payload.yaml)

#### BidTrace

Represents public information about a block sent by a builder to the
relay, or from the relay to the proposer. Depending on the context,
`value` might represent the claimed value by a builder (not necessarily
a value confirmed by the relay).

```json
{
	"slot": "123",
	"parent_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
	"block_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
	"builder_pubkey": "0x7b2cb8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
	"proposer_pubkey": "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
	"proposer_fee_recipient": "0x2b7a7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
	"gas_used": "3371033",
	"gas_limit": "30000000",
	"value": "1234567"
}
```

See also the
[reference implementation of `BidTrace`](https://github.com/flashbots/go-boost-utils/blob/main/types/builder.go#L217)

#### SignedBidTrace

```json
{
	"message": BidTrace
  "signature": "0x..."
}
```

Note: BLS signature using the builder domain (relative to the genesis
fork and with a zero genesis validators root).

See also the
[reference implementation of `SignedBidTrace`](https://github.com/flashbots/go-boost-utils/blob/main/types/builder.go#L230)

#### ValidatorRegistration

```json
{
	"message": {
		"fee_recipient": "0xabcf8e0d4e9587369b2301d0790347320302cc09",
		"gas_limit": "1",
		"timestamp": "1",
		"pubkey": "0x93247f2209abcacf57b75a51dafae777f9dd38bc7053d1af526f220a7489a6d3a2753e5f3e8b1cfe39b56f43611df74a"
	},
	"signature": "0x1b66ac1fb663c9bc59509846d6ec05345bd908eda73e670af888da41af171505cc411d61252fb6cb3fa0017b679f8bb2305b26a285fa2737f175668d0dff91cc1b66ac1fb663c9bc59509846d6ec05345bd908eda73e670af888da41af171505"
}
```

([reference implementation](https://github.com/flashbots/go-boost-utils/blob/main/types/builder.go#L170))

#### ErrorResponse

All API errors follow this schema:

```json
{
	"code": 400,
	"message": "description about the error"
}
```

```jsonc
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"type": "object",
	"properties": {
		"code": {
			"type": "integer"
		},
		"message": {
			"type": "string"
		}
	},
	"required": ["code", "message"]
}
```

---

## Proposer API

Standard APIs as per
[builder spec](https://ethereum.github.io/builder-specs/#/Builder):

-   [registerValidator](https://ethereum.github.io/builder-specs/#/Builder/registerValidator):
    `POST /eth/v1/builder/validators`
-   [getHeader](https://ethereum.github.io/builder-specs/#/Builder/getHeader):
    `GET /eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` - Get an
    execution payload header.
-   [submitBlindedBlock](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock):
    `POST /eth/v1/builder/blinded_blocks` - Submit a signed blinded
    block and get unblinded execution payload.
-   [status](https://ethereum.github.io/builder-specs/#/):
    `GET /eth/v1/builder/status`

## Block Builder API

### getValidators

Get a list of validator registrations for validators scheduled to
propose in the current and next epoch.

`GET /relay/v1/builder/validators`

**Success Response**

Array of validatorRegistrations for the current and next epoch. Each
entry includes a slot and the validator with assigned duty (if he
submitted a registration previously). Slots without a registered
validator are omitted.

Payload:

```json
[{
	"slot": "123",
	"entry": ValidatorRegistration
},
...]
```

Example - API on Goerli:
[https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators](https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators)

### submitBlock

Submit a new block to the relay.

Notes:

-   Builder signature is over SSZ encoded `message` (for
    accountability). The message doesn’t include the transactions and
    can be made public with the (Data API), allowing anyone to verify
    the builder signature.

`POST /relay/v1/builder/blocks`

Request payload:

```json
// Type:
{
  "signature": "0x8c795f751f812eabbabdee85100a06730a9904a4b53eedaa7f546fe0e23cd75125e293c6b0d007aa68a9da4441929d16072668abb4323bb04ac81862907357e09271fe414147b3669509d91d8ffae2ec9c789a5fcd4519629b8f2c7de8d0cce9"
	"message": BidTrace
  "execution_payload": ExecutionPayload
}

// Example:
{
  "signature": "0x8c795f751f812eabbabdee85100a06730a9904a4b53eedaa7f546fe0e23cd75125e293c6b0d007aa68a9da4441929d16072668abb4323bb04ac81862907357e09271fe414147b3669509d91d8ffae2ec9c789a5fcd4519629b8f2c7de8d0cce9"
	"message": {
	  "slot": "123",
    "parent_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "block_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "builder_pubkey": "0x7b2acb8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
    "proposer_pubkey": "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
    "proposer_fee_recipient": "0xf1469083b2cbab4d1f648176bf8e26e581ebabd4",
    "gas_used": "3371033",
    "gas_limit": "30000000",
		"value": "1234567",
	},
  "execution_payload": {
    "parent_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "fee_recipient": "0xabcf8e0d4e9587369b2301d0790347320302cc09",
    "state_root": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "receipts_root": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "logs_bloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "prev_randao": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "block_number": "1",
    "gas_used": "3371033",
    "gas_limit": "30000000",
    "timestamp": "1",
    "extra_data": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "base_fee_per_gas": "1",
    "block_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
    "transactions": [
        "0x02f878831469668303f51d843b9ac9f9843b9aca0082520894c93269b73096998db66be0441e836d873535cb9c8894a19041886f000080c001a031cc29234036afbf9a1fb9476b463367cb1f957ac0b919b69bbc798436e604aaa018c4e9c3914eb27aadd0b91e10b18655739fcf8c1fc398763a9f1beecb8ddc86"
    ]
  }
}
```

(See also the
[reference implementation for `BuilderSubmitBlockRequest`](https://www.notion.so/1c83e10de67d484f89c3e196579eac85))

**Notes**

-   `execution_payload` is the
    [ExecutionPayload from the CL Bellatrix spec](https://github.com/ethereum/consensus-specs/blob/v1.1.9/specs/bellatrix/beacon-chain.md#executionpayload).
-   The relay will simulate the block to verify properties and proposer
    payment

**Success response:**

Status code 200

The block was received (but not yet checked for correctness, because
simulation happens asynchronously). The response contains a receipt
which includes a timestamp and
`[BidTrace](https://www.notion.so/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)`.

Notes

-   With the receipt, builders could formulate a case for censorship
    without relying on potentially false "voluntary" metrics from relay.

```json
{
  "message": {
    "receive_timestamp": "1655906415",
    "bid_trace": [BidTrace](https://www.notion.so/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5),
  },
  "signature": "0x..."
}
```

Notes:

-   Builders will have an API to check success of block submission.
    -   The API could allow querying by `slot` + `parent_hash` +
        `block_hash` combination, or we could add should we add uid in
        the response payload
-   If using websockets/TCP connection, then the feedback about
    simulation status could be pushed to the builder.

---

## Data API

Provides data about received blocks from builders and header/payload
queries from proposers.

### ProposerPayloadsDelivered

This API provides BidTraces for payloads that were delivered to
proposers.

`GET /relay/v1/data/bidtraces/proposer_payload_delivered`

Optional query arguments:

-   `slot`: a specific slot
-   `cursor`: a slot cursor, where `limit` number of entries up until
    the cursor slot is returned (note only `slot` or `cursor` can be
    used)
-   `limit`: maximum number of entries (100 max)
-   `block_hash`: search for a specific blockhash
-   `block_number`: search for a specific EL block number

The response payload is an array of
[BidTrace](https://www.notion.so/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)
objects (which include blockhash, parenthash, etc). In case of reorgs
there could be multiple bids per slot.

```json
[[BidTrace](https://www.notion.so/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)]
```

This API is live on all our relays:
[https://builder-relay-ropsten.flashbots.net/relay/v1/data/bidtraces/proposer_payload_delivered?limit=2](https://builder-relay-ropsten.flashbots.net/relay/v1/data/bidtraces/proposer_payload_delivered?limit=2)

### BuilderBlocksReceived

This API provides BidTraces for the builder block submission for a given
slot (that were verified successfully).

`GET /relay/v1/data/bidtraces/builder_blocks_received`

Optional query arguments:

-   `slot`: a specific slot
-   `limit`: maximum number of entries (100 max)
-   `block_hash`: search for a specific blockhash
-   `block_number`: search for a specific EL block number

The response payload is an array of
[BidTrace](https://www.notion.so/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)
objects (which include blockhash, parenthash, and in this case also
`timestamp`).

```json
[[BidTrace](https://www.notion.so/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)WithTimestamp]
```

This API is live on all our relays:
[https://builder-relay-goerli.flashbots.net/relay/v1/data/bidtraces/builder_blocks_received?limit=5](https://builder-relay-goerli.flashbots.net/relay/v1/data/bidtraces/builder_blocks_received?limit=5)

### ValidatorRegistration

Return the latest validator registration for a given pubkey. Useful to
check whether your own registration was successful.

`GET /relay/v1/data/validator_registration?pubkey=_pubkey_`

The response payload is either an error or a validator registration:

```bash
ValidatorRegistration
```

[Example](https://boost-relay.flashbots.net/relay/v1/data/validator_registration?pubkey=0xb606e206c2bf3b78f53ebff8be8e8d4af2f0da68646b5642c4d511b15ab5ddb122ae57b48eab614f8ca5bafbe75a5999)

---

### Events API (WIP, TBD)

this events API is still work in progress and to be discussed and
decided upon.

#### Subscribing to events (TBD)

`GET /relay/v1/data/events/realtime`

The data is accessible by
[Server-Side-Events stream subscription](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events)
(like the `[/eth/v1/events` API exposed by
BN](https://ethereum.github.io/beacon-APIs/#/Events/eventstream)).
Consumers should
use [eventsource](https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface)
implementation to listen on those events. The events are delayed by a
few slots.

---

## Relay Infrastructure

This is a simplified infrastructure diagram:

![Screenshot 2022-06-22 at 17.54.56.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4460f24-9643-470a-a956-d886bf92e354/Screenshot_2022-06-22_at_17.54.56.png)

**Notes:**

-   Validator registrations need to be handled in a scalable fashion,
    independently of the other proposer APIs (`getHeader`,
    `submitBlindedBlock`). The burst of up to 1M validator registrations
    each epoch requires a lot of resources to process, verify and save
    to a database.
-   Block submissions need to be verified by simulating the full block,
    and the relay needs to be prepared to throttle any individual
    builder in case of spam or other issues (continuous invalid blocks
    or incorrect proposer payment).
-   Operating a relay is infrastructure-intensive, and bugs can
    negatively impact Eth2 consensus. One of the solutions Flashbots is
    working on is a service called
    [Relay Monitor](https://github.com/flashbots/mev-boost/issues/142),
    which tracks relay performance and helps proposers interact only
    with healthy ones.
