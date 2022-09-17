+++
title = "Mev Boost Docs"
weight = 1
sort_by = "weight"
template = "section.html"
+++


# MEV Boost and PBA Documentation


##  Current Understanding

- The Builder will set their own feeRecipient for a block
- They will then send a share of their earnings to the proposer (to their specified "feeRecipient" account in a transaction

#### The Problem
For a staking provider with multiple customers, it is difficult to:
a) Prove to customers they have received the agreed upon earning.
b) Know how much to charge customers (if fees are based on a percentage of rewards)

> Some kind of indicator or marker on the transaction is necessary


Builders setting their own address as the feeRecipient  in the block header and including a transaction to the proposer is the correct implementation approach. The gas overhead is warranted and can be enforced by relays and by the mev-boost implementation through payment proofs. 

> See #99 

The main question is if the payment proofs should be on the builder to proposer transaction only or on the total balance change of the proposer's address.

### Payment proof at transaction level

This can be implemented using a simple Merkle proof on the transaction trie. Routing through a contract as suggested by @bertmiller seems preferable. Replay / reorg protection needs to be added to these transactions.

The drawback of this solution is that it does not "accurately" measure block value. In particular, it will not capture payment transaction by end users directly to the proposer which bypass the payment contract. Does this undermine the incentive compatibility of mev-boost or allow for implementation of undesirable features like reorg bribery at the smart contract level?

### Payment proof at the account balance level

This approach to payment proofs looks at the total difference in balance of the proposer's eth account between the previous block and the current block. This can be implemented with two Merkle proofs.

The drawback of this solution is that any withdrawals from the proposer's account balance will count against the value of the block. This means the validator will need to use a new account for every block, causing issues with notifying block builders of their desired fee recipient address, or will need to only withdraw from their account on blocks proposed by other validators.

_Originally posted by @thegostep in https://github.com/flashbots/mev-boost/issues/220#issuecomment-1192565817_


Here is some additional context on the various payment methods which can be used in mev-boost.

For clarity, lets refer to the fee recipient address set by the block builder in the block header as `feeRecipient` with the understanding that the builder will set this as their own address for the blocks they produce. We can refer to the payment address requested by the validator as the `proposerAccount`.

- `base_fee`: amount defined by protocol, always paid from user --> network, user can define upper bound they are willing to pay using maxFeePerGas , the user needs to have sufficient ETH balance in their account before transaction execution - this is not MEV since there is no way for the validator to get this payment. The payment cannot be made within of EVM execution (unfortunately).
- `priority_fee`: amount defined by the user as maxPriorityFeePerGas, always paid from user --> feeRecipient. The user needs to have sufficient ETH balance in their account before transaction execution. The priority fee is debited from the user account and credited to the fee recipient immediately after execution. The block builder is expected to collect this payment
- `block.coinbase transfer`: the EVM has an opcode which allows end user to send funds directly to the `feeRecipient` address from the block header. The recipient of this payment is the same as the `priority_fee` payment recipient, but this transfer triggers EVM execution including associated gas costs and security risks. The block builder is expected to collect this payment
- `proposerAccount transfer`: anyone can create a transaction which sends eth to any other Ethereum account. Since the proposer is publishing their desired payment address to the public, it's possible for any user to send payments directly to this account. While this is technically MEV, there is no way for the block builder to capture this value! This is the suggested method for the builder to pay the validator for the blockspace used.

_Originally posted by @thegostep in https://github.com/flashbots/mev-boost/issues/220#issuecomment-1192801577_



Reopening this issue to discuss question raised in https://github.com/ethereum/builder-specs/issues/16

My current position on payment proofs is that it is a necessary component of the three pronged security model of mev-boost: https://hackmd.io/bTmbknkGRM6RdVCCIrRblg

Here are two approaches to implementing payment proofs:
1) inclusion proof on transaction trie

This approach requires the builder to set their own account as the feeRecipient address in the payloadHeader. The builder then includes a transaction at the end of the block which transfers ETH to the feeRecipient defined by the validator. Finally, the builder publishes this transaction along with the payload header and an inclusion proof.

2) account proof on post execution state trie

Any address can be set as the feeRecipient. Builder provides an account proof on the post execution state trie (see below).

What are desirable properties of payment proofs?
- provide transparency to the identity of builders
- defense in depth, even if fraud proofs protect against invalid payments, payment proofs can be verified pre-execution thus providing stronger protection
- makes accounting easier, can monitor the value of the payload bids without needing to simulate blocks

What are potential concerns?
- potential overhead of 21k gas in every block

---

#### AccountProof

Refer to [EIP-1186](https://eips.ethereum.org/EIPS/eip-1186).

- `balance`: `QUANTITY` - the balance of the account.
- `nonce`: `QUANTITY`, - nonce of the account.
- `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot.
- `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will return "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
- `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.

_Originally posted by @thegostep in https://github.com/flashbots/mev-boost/issues/99#issuecomment-1130039956_



https://github.com/ethereum/consensus-specs/pull/2730

 This PR implements a fix for the [LMD balancing attacks](https://arxiv.org/abs/2009.04987), as described [here](https://notes.ethereum.org/@vbuterin/lmd_ghost_mitigation).
 
 **Note**: Old PR for this feature was #2353.
 
 ## Proposer Score Boost
 A new "proposer score boost" has been introduced, which boosts the LMD score of blocks that are received in a timely manner. The boost increases the score of the block by `committee_weight // 4` for that slot. If a block for slot `X` is received in the first `SECONDS_PER_SLOT // INTERVALS_PER_SLOT` (= 4) seconds of the slot, then the block receives the boost for the duration of slot `X`. After slot `X` is over, the boost is removed and the usual LMD score calculations from only attestations are done.
 
 The boost is not applied to blocks that are not received in the first `SECONDS_PER_SLOT // INTERVALS_PER_SLOT` seconds of their slots, and this PR does not affect LMD score calculations for such blocks.
 
 ![lmd-proposer-score-fix](https://user-images.githubusercontent.com/25324105/115930549-86b70100-a43e-11eb-8834-c01d6f8e0976.png)
 
 In the above example:
 
 * block `B` is received in a timely manner and qualifies for the boost. `B`'s score is boosted for only slot `X`.
 * block `C` is not received in a timely manner and does not qualify for the boost.
 
 ## Summary of Changes
 * Parameters:
   
   * Added new parameter `ATTESTATION_OFFSET_QUOTIENT`, which is used to specify the time at which attestations are produced within a slot
 * `Store`:
   
   * Added new field `store.proposer_score_boost`, which is a special `LatestMessage` that stores the boost
 * Fork Choice:
   
   * Updated `get_latest_attesting_balance` to take into account `store.proposer_score_boost`
   * Updated `on_block` & `on_tick` to appropriately set/reset `store.proposer_score_boost`
 * Testing:
   
   * Added test for `store.proposer_score_boost` accounting
   * Updated existing tests to work correctly after introducing proposer score boosting

