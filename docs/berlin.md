---
created: 2022-05-15T02:23:37 (UTC -07:00)
tags: []
source: https://hackmd.io/@fvictorio/gas-costs-after-berlin
author: fvictorio
---

# Understanding gas costs after Berlin - HackMD

> Understanding gas costs after Berlin The Berlin hard fork will [go >
> live on mainnet on April 14](h

The Berlin hard fork will
[go live on mainnet on April 14](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/),
introducing four new EIPs. Two of them
([EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) and
[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)) affect how the gas
cost of a transaction is computed. This article explains how (some) gas
costs were calculated before Berlin, how this will change with EIP-2929,
and how to use the Access Lists feature introduced by EIP-2930.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#tldr "tldr")tl;dr

This is a long article, so you can just read this and close the tab:

-   The Berlin hard fork changes the gas cost of some opcodes. If you
    have a hardcoded gas value in a dapp or a smart contract, they might
    stop working. And if this happens and the smart contract is
    non-upgradeable, consumers will need to employ access lists
    (EIP-2930) to use it.
-   Access lists can be used to reduce gas costs a little, but they
    could actually increase the total gas consumed in some scenarios.
-   `geth` includes a new RPC method called `eth_createAccessList` to
    simplify the creation of access lists.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Gas-costs-before-Berlin "Gas-costs-before-Berlin")Gas costs before Berlin

Each opcode executed by the EVM has an associated gas cost. For most of
them, this cost is fixed: `PUSH1` always consumes 3 units of gas, `MUL`
consumes 5, and so on. For others it is variable: the `SHA3` opcode’s
cost depends on the size of its input, for example.

We’ll focus on the `SLOAD` and `SSTORE` opcodes since they are the ones
most affected by the Berlin hard fork. We’ll talk later about those that
target an address, like all the `EXT*` and `CALL*` opcodes, since their
gas cost changes too.

### [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#SLOAD-before-Berlin "SLOAD-before-Berlin")`SLOAD` before Berlin

Without EIP-2929, the cost of `SLOAD` is simple: it always costs 800 of
gas. So there isn’t much to say about it (for now).

### [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#SSTORE-before-Berlin "SSTORE-before-Berlin")`SSTORE` before Berlin

`SSTORE` is maybe the most complex opcode in terms of gas because its
cost depends on things like the current value of the storage slot, the
new value, and whether it was previously modified. We’ll analyze only
some scenarios to get a basic understanding; if you want to learn more,
read the EIPs linked at the end of this article.

-   If the value of the slot changes from 0 to 1 (or any non-zero
    value), the cost is 20000
-   If the value of the slot changes from 1 to 2 (or any other non-zero
    value), the cost is 5000.
-   If the value of the slot changes from 1 (or any non-zero value) to
    0, the cost is _also_ 5000, but you get a gas refund at the end of
    the transaction. We won’t cover refunds in this article since they
    are not affected by Berlin.
-   If the value was previously modified during the same transaction,
    all the subsequent `SSTORE`s cost 800.

The details are not that interesting here. The important part is that
`SSTORE` is _expensive_ and that its cost depends on several factors.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Gas-costs-after-EIP-2929 "Gas-costs-after-EIP-2929")Gas costs after EIP-2929

EIP-2929 changes all these values. But before getting into that, we need
to talk about an important concept introduced by the EIP: **accessed
addresses and accessed storage keys**.

An address or a storage key is considered accessed if it was previously
“used” during the transaction. For example, when you `CALL` another
contract, the address of that contract is marked as accessed. Similarly,
when you `SLOAD` or `SSTORE` some slot, it will be considered accessed
for the rest of the transaction. It doesn’t matter which opcode did it:
if an `SLOAD` reads a slot, it will be considered accessed for both the
next `SLOAD`s and the next `SSTORE`s.

Something important to notice here is that storage keys are “inside”
some address. As the EIP explains it:

> When executing a transaction, maintain a set
> `accessed_addresses: Set[Address]` and
> `accessed_storage_keys: Set[Tuple[Address, Bytes32]]`

That is, when we say that a storage slot is accessed, we are actually
saying that a pair `(address, storageKey)` was accessed.

With that being said, let’s talk about the new gas costs.

### [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#SLOAD-after-Berlin "SLOAD-after-Berlin")`SLOAD` after Berlin

Before Berlin, `SLOAD` had a fixed cost of 800. Now, it depends on
whether that storage slot was already accessed or not. If it wasn’t
accessed, the cost is 2100; if it was, it is 100. So, an `SLOAD` costs
2000 less if the slot is in the list of accessed storage keys.

### [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#SSTORE-after-Berlin "SSTORE-after-Berlin")`SSTORE` after Berlin

Let’s revisit our previous `SSTORE` examples in the context of EIP-2929:

-   If the value of the slot changes from 0 to 1 (or any non-zero
    value), the cost is:
    -   22100 if the storage key wasn’t accessed
    -   20000 if it was
-   If the value of the slot changes from 1 to 2 (or any other non-zero
    value), the cost is:
    -   5000 if the storage key wasn’t accessed
    -   2900 if it was
-   If the value of the slot changes from 1 (or any non-zero value) to
    0, the cost is the same as the previous item, plus the refund.
-   If the value was previously modified during the same transaction,
    all the subsequent `SSTORE`s cost 100.

As you can see, the first `SSTORE` costs 2100 less if the slot it’s
modifying was previously accessed.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Putting-it-all-together "Putting-it-all-together")Putting it all together

That was a mouthful, so here’s a table comparing all the values
mentioned so far:

| OPCODE                                                                       | Before Berlin | After Berlin |
| ---------------------------------------------------------------------------- | ------------- | ------------ | ----- |
| Not accessed                                                                 | Accessed      |
| ---                                                                          | ---           |
| SLOAD                                                                        | 800           | 2100         | 100   |
| SSTORE from 0 to 1                                                           | 20000         | 22100        | 20000 |
| SSTORE from 1 to 2                                                           | 5000          | 5000         | 2900  |
| SLOAD + SSTORE\*                                                             | 5800          | 5000         | 3000  |
| SSTORE\* + SLOAD                                                             | 5800          | 5100         | 3000  |
| SSTORE of an already written slot                                            | 800           | 100          |
| \*From a non-zero value to a different non-zero value, like in the third row |

Notice that in the last row it doesn’t make sense to talk about the slot
having been accessed or not because, if it was previously written, then
it was also accessed.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#EIP-2930-Optional-Access-List-transactions "EIP-2930-Optional-Access-List-transactions")EIP-2930: Optional Access List transactions

The other EIP we mentioned at the beginning was EIP-2930. This EIP adds
a new type of transaction that can include an access list in the
transaction payload. This means that you can declare beforehand which
addresses and slots should be considered as accessed before the
transaction’s execution starts. For example, an `SLOAD` of a
non-accessed slot costs 2100, but if that slot was included in the
transaction’s access list, then that same opcode will cost 100.

But if the gas costs are lower when an address or storage key is already
accessed, does this mean that we can add everything to the transaction’s
access list and get a gas reduction? Yay, free gas! Well, not exactly,
because you also need to pay gas for each address and each storage key
that you add.

Let’s see an example. Say we are sending a transaction to contract `A`.
An access list could look like this:

```
accessList: [{
  address: "<address of A>",
  storageKeys: [
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ]
}]
```

If we send a transaction with this access list, and the first opcode
that uses the `0x0` slot is a `SLOAD`, it will cost 100 instead of 2100.
That’s a gas reduction of 2000. But each storage key included in the
transaction’s access list has a cost of 1900. So we only save 100 of
gas. (If the first opcode to access that slot is an `SSTORE` instead, we
would save 2100 of gas, which means that we’d save 200 of gas in total
if we consider the cost of the storage key.)

Does this mean that we always save gas when using transaction’s with
access lists? Well, no, because we also pay gas for the address in the
access list (`"<address of A>"` in our example).

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Accessed-addresses "Accessed-addresses")Accessed addresses

So far, we’ve been talking only about the `SLOAD` and `SSTORE` opcodes,
but those aren’t the only ones that change after Berlin. For example,
the `CALL` opcode had a fixed cost of 700. But after EIP-2929 its cost
is 2600 if the address is not in the access list and 100 if it is. And,
like the accessed storage keys, it doesn’t matter what OPCODE accessed
that address before (for example, if an `EXTCODESIZE` was called first,
then that opcode will cost 2600, and any subsequent `EXTCODESIZE`,
`CALL`, `STATICCALL` **that uses the same address** will cost 100).

How is this affected by transactions with access lists? For example, if
we send a transaction to contract `A`, and that contract calls another
contract `B`, then we can include an access list like this:

```
accessList: [{ address: "<address of B>", storageKeys: [] }]
```

We’ll have to pay a cost of 2400 to include this access list in the
transaction, but then the first opcode that uses the address of `B` will
cost 100 instead of 2600. So we saved 100 of gas by doing this. And if
`B` uses its storage somehow and we know which keys it will use, then we
can also include them in the access list and save 100/200 of gas for
each one (depending on whether the first opcode is an `SLOAD` or an
`SSTORE`).

But why are we talking about another contract? What happens with the
contract that we are calling? Why don’t we do this?

```
accessList: [
  {address: "<address of A>", storageKeys: []},
  {address: "<address of B>", storageKeys: []},
]
```

We could do it, but it wouldn’t be worth it because EIP-2929 specifies
that the address of the contract that is being called (that is, `tx.to`)
is always included in the `accessed_addresses` list. So we are paying
2400 more for nothing.

Let’s analyze our example of the previous section again:

```
accessList: [{
  address: "<address of A>",
  storageKeys: [
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ]
}]
```

This will actually be wasteful unless we include several storage keys
more. If we assume that a storage key is always used first by an
`SLOAD`, then we need at least 24 storage keys just to break even.

As you can imagine, analyzing this and creating an access list by hand
is not fun. Luckily, there is a better way.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#The-eth_createAccessList-RPC-method "The-eth_createAccessList-RPC-method")The `eth_createAccessList` RPC method

Geth (starting from version 1.10.2) includes a new
`eth_createAccessList` RPC method that you can use to generate access
lists. It is used like `eth_estimateGas`, but instead of a gas
estimation, it returns something like this:

```
{
  "accessList": [
    {
      "address": "0xb0ee076d7779a6ce152283f009f4c32b5f88756c",
      "storageKeys": [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ]
    }
  ],
  "gasUsed": "0x8496"
}
```

That is, it gives you the list of addresses and storage keys that will
be used by that transaction, plus the gas consumed _if the access list
is included_. (And, like `eth_estimateGas`, this is an estimation; the
list could change when the transaction is actually mined.) But, again,
this doesn’t mean that this gas will be lower than the gas used if you
just send the same transaction without an access list!

I suppose we’ll discover over time what’s the proper way of doing this,
but my pseudo-code guess is this:

```
let gasEstimation = estimateGas(tx)
let { accessList, gasUsed } = createAccessList(tx)
if (gasUsed > gasEstimation) {
  delete accessList[tx.to]
}
tx.accessList = accessList;
sendTransaction(tx)
```

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Unbricking-contracts "Unbricking-contracts")Unbricking contracts

It is important to mention that the main purpose of Access Lists is not
to use gas. As the EIP
[explains it](https://eips.ethereum.org/EIPS/eip-2930#motivation):

> Mitigates contract breakage risks introduced by EIP-2929, as
> transactions could pre-specify and pre-pay for the accounts and
> storage slots that the transaction plans to access; as a result, in
> the actual execution, the SLOAD and EXT\* opcodes would only cost 100
> gas: low enough that it would not only prevent breakage due to that
> EIP but also “unstuck” any contracts that became stuck due to
> EIP 1884.

This means that if a contract makes assumptions about the cost of
executing something, the increase in gas costs could break it. For
example, a contract makes a call to another contract like
`someOtherContract.someFunction{gas: 34500}()` because it assumes that
`someFunction` will use exactly 34500 of gas, then it will break. But if
you include the proper access list in the transaction, then the contract
will work again.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Check-it-yourself "Check-it-yourself")Check it yourself

If you want to test this yourself, clone
[this repo](http://github.com/fvictorio/berlin-gas-costs) which has
several examples that can be executed using Hardhat and geth. Check the
README for the instructions.

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#Was-this-fun "Was-this-fun")Was this fun?

If this low-level mumbo-jumbo is your idea of fun, you should know that
[Nomic Labs](https://nomiclabs.io/) is
[hiring](https://www.notion.so/Nomic-Labs-jobs-991b37c547554f75b89a95f437fd5056).

## [](https://hackmd.io/@fvictorio/gas-costs-after-berlin#References "References")References

-   [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) and
    [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) are the two
    Berlin EIPs relevant to this article.
-   EIP-2930 depends on another part of Berlin:
    [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), also called
    Typed Transactions.
-   EIP-2929 refers to
    [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) a lot, so if you
    want to understand gas costs more in depth, you should start there.
-   For more complex examples comparing how gas usage changes, check
    [this](https://gist.github.com/holiman/aa7d2d28a9747548a0a14321a1572b22).
