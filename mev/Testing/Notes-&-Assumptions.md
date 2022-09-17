# Block Properties

Builders need the following data:

| Field          | Where it comes from                     | Notes                                            |
| -------------- | --------------------------------------- | ------------------------------------------------ |
| `feeRecipient` | validator (`builder_registerValidator`) |                                                  |
| `gasLimit`     | validator (`builder_registerValidator`) |                                                  |
| `timestamp`    | relay (BN)                              | value for the timestamp field of the new payload |
| `prevRandao`   | relay (BN)                              | from previous slot                               |
| `extraData`    | builder                                 | graffiti from builder, not proposer              |

Semi-related conversations:

-   https://github.com/ethereum/beacon-APIs/pull/206
-   https://discord.com/channels/595666850260713488/874767108809031740/969532892759879700
    (ETH R&D `#block-construction`)

---

# Various

-   mev-boost will regularly resend validator registrations, in case a
    relay or builder comes online just after a previous registration was
    sent out and missed that.
-   mev-boost needs to query all the relays for headers in parallel
-   relays need to have started the build process already and
    immediately return the best header they have

### validator-index vs pubkey

validator index will in the future be reused (see also
[comment by alexstokes](https://github.com/ethereum/execution-apis/pull/209#discussion_r863744274)).
If index is used in the registerValidator call, the builder will need to
look up the pubkey before block construction.
