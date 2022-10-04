In response to the evolving ecosystem of searchers, miners, and the
broader Ethereum ecosystem, Flashbots is making changes that impact
searcher bundle pricing and selection criteria. These changes are being
rolled out today (4/13/2021) and we expect miner adoption of these
changes to be swift.

## [](https://hackmd.io/@flashbots/SJhErqQ8u#Bundles-can-no-longer-include-ANY-reverting-or-failing-transactions "Bundles-can-no-longer-include-ANY-reverting-or-failing-transactions")Bundles can no longer include ANY reverting or failing transactions

There has been a class of tokens released with unexpected behavior that
targets Flashbots searchers. These tokens have one behavior in
simulation and a different behavior when executing on-chain. The problem
occurs when one of a searcher’s transactions reverts, noticing this
unexpected behavior. However, a single transaction reverting might not
be enough to prevent the bundle from landing on-chain. If the successful
transactions that land on-chain provide enough value to the miner, the
bundle could still be included.

A founding principle of Flashbots is avoiding wasted space on the
Ethereum mainnet chain, with reverted transactions being one of most
common culprits. Given the unexpected token behavior and lack of
economic benefit from reverted transactions, keeping more reverted
transactions off the chain aligns with Flashbots goals and we are
excited to release this feature.

### [](https://hackmd.io/@flashbots/SJhErqQ8u#Landing-reverted-transaction-in-a-bundle "Landing-reverted-transaction-in-a-bundle")Landing reverted transaction in a bundle

This `0.2-prerelease` includes non-breaking API changes that we felt
were important and production ready. We will be shipping the rest of
`0.2` in May 2021, including API-breaking changes that will require
searchers to update to a new RPC interface. This new RPC relay interface
will include the ability to specify transactions which should be allowed
to revert on-chain, as specified explicitly by the searcher.

This change will give the searcher, not an untrusted contract author,
control over their bundle’s validity.

## [](https://hackmd.io/@flashbots/SJhErqQ8u#Effective-Gas-Price-changes "Effective-Gas-Price-changes")Effective Gas Price changes

In `Flashbots 0.1`, bundles were evaluated using an effective gas price
as specified by:

(AllGasFees+AllCoinbaseTransfers)AllGasUsed

Effectively calculating the `average` gas price across the entire bundle
to compare bundles for profitability. This system allows `mev-geth` to
select the single, highest-paying bundle for inclusion at the head of a
block.

We are updating this formula to:

AllCoinbaseTransfersAllGasUsed

Removing all gas-price fees from the calculation **even if gas-price
fees are present in the bundle**. This has two major impacts:

1.) Paying the miner MUST be done by transferring value, either via
contract call (e.g. `block.coinbase.transfer`) or direct transfer from
an EOA (very uncommon). Even if you are including only a single
transaction, gas-fees are no longer used for bundle selection.

2.) If your bundle includes transactions from the pending pool, the
gas-fees from any included transaction will NOT count toward your
bundle’s effective gas price.

The easiest way to think about or model this is to consider ALL
gas-prices in a bundle equal to `0`, for the purpose of effective gas
price calculation.

This does not change what you pay when you land on-chain, this is ONLY a
change to the mev-geth profitability comparison between competing
bundles.

## [](https://hackmd.io/@flashbots/SJhErqQ8u#Why-was-this-change-made "Why-was-this-change-made")Why was this change made?

An unintended consequence of `0.1` bundle pricing allowed a malicious
searcher to include unrelated, high-paying transactions in their bundle,
tricking the calculation into classifying their bundle as more
profitable than competing bundles. Additionally, since Flashbot
transaction ordering must be MORE profitable than the “vanilla”
transaction ordering, this “bundle stuffing” caused `mev-geth` to select
this less-profitable bundles which lost against a vanilla block. This
was effectively a DOS strategy when other bundles couldn’t beat large
gas prices at the top 1% of a block.

## [](https://hackmd.io/@flashbots/SJhErqQ8u#More-complex-bundles-now-available "More-complex-bundles-now-available")More complex bundles now available!

In order to combat this `bundle stuffing`, `mev-relay` implemented a
restriction ensuring a bundle not exceed two unique EOAs and two unique
destinations. Given the new pricing mechanism, this restriction will be
lifted allowing significantly more advanced and profitable bundles!

We will see even more changes in the next month as Flashbots deploys
`0.2`. Be sure to check out `#searchers` on the
[Flashbots Discord](https://discord.gg/PWGS6PsK) to keep informed.
