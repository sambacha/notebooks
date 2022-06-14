| **OPCODE** | **NAME**       | **MINIMUM GAS** | **STACK INPUT**                                   | **STACK OUPUT** | **DESCRIPTIONExpand**                                                                                                     |
| ---------- | -------------- | --------------- | ------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 0          | STOP           | 0               |                                                   |                 | Halts execution                                                                                                           |
| 1          | ADD            | 3               | ab                                                | a + b           | Addition operation                                                                                                        |
| 2          | MUL            | 5               | ab                                                | a \* b          | Multiplication operation                                                                                                  |
| 3          | SUB            | 3               | ab                                                | a - b           | Subtraction operation                                                                                                     |
| 4          | DIV            | 5               | ab                                                | a // b          | Integer division operation                                                                                                |
| 5          | SDIV           | 5               | ab                                                | a // b          | Signed integer division operation (truncated)                                                                             |
| 6          | MOD            | 5               | ab                                                | a % b           | Modulo remainder operation                                                                                                |
| 7          | SMOD           | 5               | ab                                                | a % b           | Signed modulo remainder operation                                                                                         |
| 8          | ADDMOD         | 8               | abN                                               | (a + b) % N     | Modulo addition operation                                                                                                 |
| 9          | MULMOD         | 8               | abN                                               | (a \* b) % N    | Modulo multiplication operation                                                                                           |
| 0A         | EXP            | 10              | aexponent                                         | a \*\* exponent | Exponential operation                                                                                                     |
| 0B         | SIGNEXTEND     | 5               | bx                                                | y               | Extend length of two’s complement signed integer                                                                          |
| 10         | LT             | 3               | ab                                                | a < b           | Less-than comparison                                                                                                      |
| 11         | GT             | 3               | ab                                                | a > b           | Greater-than comparison                                                                                                   |
| 12         | SLT            | 3               | ab                                                | a < b           | Signed less-than comparison                                                                                               |
| 13         | SGT            | 3               | ab                                                | a > b           | Signed greater-than comparison                                                                                            |
| 14         | EQ             | 3               | ab                                                | a == b          | Equality comparison                                                                                                       |
| 15         | ISZERO         | 3               | a                                                 | a == 0          | Simple not operator                                                                                                       |
| 16         | AND            | 3               | ab                                                | a & b           | Bitwise AND operation                                                                                                     |
| 17         | OR             | 3               | ab                                                | a \| b          | Bitwise OR operation                                                                                                      |
| 18         | XOR            | 3               | ab                                                | a ^ b           | Bitwise XOR operation                                                                                                     |
| 19         | NOT            | 3               | a                                                 | ~a              | Bitwise NOT operation                                                                                                     |
| 1A         | BYTE           | 3               | ix                                                | y               | Retrieve single byte from word                                                                                            |
| 1B         | SHL            | 3               | shiftvalue                                        | value << shift  | Left shift operation                                                                                                      |
| 1C         | SHR            | 3               | shiftvalue                                        | value >> shift  | Logical right shift operation                                                                                             |
| 1D         | SAR            | 3               | shiftvalue                                        | value >> shift  | Arithmetic (signed) right shift operation                                                                                 |
| 20         | SHA3           | 30              | offsetsize                                        | hash            | Compute Keccak-256 hash                                                                                                   |
| 30         | ADDRESS        | 2               |                                                   | address         | Get address of currently executing account                                                                                |
| 31         | BALANCE        | 700             | address                                           | balance         | Get balance of the given account                                                                                          |
| 32         | ORIGIN         | 2               |                                                   | address         | Get execution origination address                                                                                         |
| 33         | CALLER         | 2               |                                                   | address         | Get caller address                                                                                                        |
| 34         | CALLVALUE      | 2               |                                                   | value           | Get deposited value by the instruction/transaction responsible for this execution                                         |
| 35         | CALLDATALOAD   | 3               | i                                                 | data[i]         | Get input data of current environment                                                                                     |
| 36         | CALLDATASIZE   | 2               |                                                   | size            | Get size of input data in current environment                                                                             |
| 37         | CALLDATACOPY   | 3               | destOffsetoffsetsize                              |                 | Copy input data in current environment to memory                                                                          |
| 38         | CODESIZE       | 2               |                                                   | size            | Get size of code running in current environment                                                                           |
| 39         | CODECOPY       | 3               | destOffsetoffsetsize                              |                 | Copy code running in current environment to memory                                                                        |
| 3A         | GASPRICE       | 2               |                                                   | price           | Get price of gas in current environment                                                                                   |
| 3B         | EXTCODESIZE    | 700             | address                                           | size            | Get size of an account’s code                                                                                             |
| 3C         | EXTCODECOPY    | 700             | addressdestOffsetoffsetsize                       |                 | Copy an account’s code to memory                                                                                          |
| 3D         | RETURNDATASIZE | 2               |                                                   | size            | Get size of output data from the previous call from the current environment                                               |
| 3E         | RETURNDATACOPY | 3               | destOffsetoffsetsize                              |                 | Copy output data from the previous call to memory                                                                         |
| 3F         | EXTCODEHASH    | 700             | address                                           | hash            | Get hash of an account’s code                                                                                             |
| 40         | BLOCKHASH      | 20              | blockNumber                                       | hash            | Get the hash of one of the 256 most recent complete blocks                                                                |
| 41         | COINBASE       | 2               |                                                   | address         | Get the block’s beneficiary address                                                                                       |
| 42         | TIMESTAMP      | 2               |                                                   | timestamp       | Get the block’s timestamp                                                                                                 |
| 43         | NUMBER         | 2               |                                                   | blockNumber     | Get the block’s number                                                                                                    |
| 44         | DIFFICULTY     | 2               |                                                   | difficulty      | Get the block’s difficulty                                                                                                |
| 45         | GASLIMIT       | 2               |                                                   | gasLimit        | Get the block’s gas limit                                                                                                 |
| 46         | CHAINID        | 2               |                                                   | chainId         | Get the chain ID                                                                                                          |
| 47         | SELFBALANCE    | 5               |                                                   | balance         | Get balance of currently executing account                                                                                |
| 50         | POP            | 2               | y                                                 |                 | Remove item from stack                                                                                                    |
| 51         | MLOAD          | 3               | offset                                            | value           | Load word from memory                                                                                                     |
| 52         | MSTORE         | 3               | offsetvalue                                       |                 | Save word to memory                                                                                                       |
| 53         | MSTORE8        | 3               | offsetvalue                                       |                 | Save byte to memory                                                                                                       |
| 54         | SLOAD          | 800             | key                                               | value           | Load word from storage                                                                                                    |
| 55         | SSTORE         | 800             | keyvalue                                          |                 | Save word to storage                                                                                                      |
| 56         | JUMP           | 8               | counter                                           |                 | Alter the program counter                                                                                                 |
| 57         | JUMPI          | 10              | counterb                                          |                 | Conditionally alter the program counter                                                                                   |
| 58         | PC             | 2               |                                                   | counter         | Get the value of the program counter prior to the increment corresponding to this instruction                             |
| 59         | MSIZE          | 2               |                                                   | size            | Get the size of active memory in bytes                                                                                    |
| 5A         | GAS            | 2               |                                                   | gas             | Get the amount of available gas, including the corresponding reduction for the cost of this instruction                   |
| 5B         | JUMPDEST       | 1               |                                                   |                 | Mark a valid destination for jumps                                                                                        |
| 60         | PUSH1          | 3               |                                                   | value           | Place 1 byte item on stack                                                                                                |
| 61         | PUSH2          | 3               |                                                   | value           | Place 2 byte item on stack                                                                                                |
| 62         | PUSH3          | 3               |                                                   | value           | Place 3 byte item on stack                                                                                                |
| 63         | PUSH4          | 3               |                                                   | value           | Place 4 byte item on stack                                                                                                |
| 64         | PUSH5          | 3               |                                                   | value           | Place 5 byte item on stack                                                                                                |
| 65         | PUSH6          | 3               |                                                   | value           | Place 6 byte item on stack                                                                                                |
| 66         | PUSH7          | 3               |                                                   | value           | Place 7 byte item on stack                                                                                                |
| 67         | PUSH8          | 3               |                                                   | value           | Place 8 byte item on stack                                                                                                |
| 68         | PUSH9          | 3               |                                                   | value           | Place 9 byte item on stack                                                                                                |
| 69         | PUSH10         | 3               |                                                   | value           | Place 10 byte item on stack                                                                                               |
| 6A         | PUSH11         | 3               |                                                   | value           | Place 11 byte item on stack                                                                                               |
| 6B         | PUSH12         | 3               |                                                   | value           | Place 12 byte item on stack                                                                                               |
| 6C         | PUSH13         | 3               |                                                   | value           | Place 13 byte item on stack                                                                                               |
| 6D         | PUSH14         | 3               |                                                   | value           | Place 14 byte item on stack                                                                                               |
| 6E         | PUSH15         | 3               |                                                   | value           | Place 15 byte item on stack                                                                                               |
| 6F         | PUSH16         | 3               |                                                   | value           | Place 16 byte item on stack                                                                                               |
| 70         | PUSH17         | 3               |                                                   | value           | Place 17 byte item on stack                                                                                               |
| 71         | PUSH18         | 3               |                                                   | value           | Place 18 byte item on stack                                                                                               |
| 72         | PUSH19         | 3               |                                                   | value           | Place 19 byte item on stack                                                                                               |
| 73         | PUSH20         | 3               |                                                   | value           | Place 20 byte item on stack                                                                                               |
| 74         | PUSH21         | 3               |                                                   | value           | Place 21 byte item on stack                                                                                               |
| 75         | PUSH22         | 3               |                                                   | value           | Place 22 byte item on stack                                                                                               |
| 76         | PUSH23         | 3               |                                                   | value           | Place 23 byte item on stack                                                                                               |
| 77         | PUSH24         | 3               |                                                   | value           | Place 24 byte item on stack                                                                                               |
| 78         | PUSH25         | 3               |                                                   | value           | Place 25 byte item on stack                                                                                               |
| 79         | PUSH26         | 3               |                                                   | value           | Place 26 byte item on stack                                                                                               |
| 7A         | PUSH27         | 3               |                                                   | value           | Place 27 byte item on stack                                                                                               |
| 7B         | PUSH28         | 3               |                                                   | value           | Place 28 byte item on stack                                                                                               |
| 7C         | PUSH29         | 3               |                                                   | value           | Place 29 byte item on stack                                                                                               |
| 7D         | PUSH30         | 3               |                                                   | value           | Place 30 byte item on stack                                                                                               |
| 7E         | PUSH31         | 3               |                                                   | value           | Place 31 byte item on stack                                                                                               |
| 7F         | PUSH32         | 3               |                                                   | value           | Place 32 byte (full word) item on stack                                                                                   |
| 80         | DUP1           | 3               | value                                             | valuevalue      | Duplicate 1st stack item                                                                                                  |
| 81         | DUP2           | 3               | ab                                                | bab             | Duplicate 2nd stack item                                                                                                  |
| 82         | DUP3           | 3               | abc                                               | cabc            | Duplicate 3rd stack item                                                                                                  |
| 83         | DUP4           | 3               | ...value                                          | value...value   | Duplicate 4th stack item                                                                                                  |
| 84         | DUP5           | 3               | ...value                                          | value...value   | Duplicate 5th stack item                                                                                                  |
| 85         | DUP6           | 3               | ...value                                          | value...value   | Duplicate 6th stack item                                                                                                  |
| 86         | DUP7           | 3               | ...value                                          | value...value   | Duplicate 7th stack item                                                                                                  |
| 87         | DUP8           | 3               | ...value                                          | value...value   | Duplicate 8th stack item                                                                                                  |
| 88         | DUP9           | 3               | ...value                                          | value...value   | Duplicate 9th stack item                                                                                                  |
| 89         | DUP10          | 3               | ...value                                          | value...value   | Duplicate 10th stack item                                                                                                 |
| 8A         | DUP11          | 3               | ...value                                          | value...value   | Duplicate 11th stack item                                                                                                 |
| 8B         | DUP12          | 3               | ...value                                          | value...value   | Duplicate 12th stack item                                                                                                 |
| 8C         | DUP13          | 3               | ...value                                          | value...value   | Duplicate 13th stack item                                                                                                 |
| 8D         | DUP14          | 3               | ...value                                          | value...value   | Duplicate 14th stack item                                                                                                 |
| 8E         | DUP15          | 3               | ...value                                          | value...value   | Duplicate 15th stack item                                                                                                 |
| 8F         | DUP16          | 3               | ...value                                          | value...value   | Duplicate 16th stack item                                                                                                 |
| 90         | SWAP1          | 3               | ab                                                | ba              | Exchange 1st and 2nd stack items                                                                                          |
| 91         | SWAP2          | 3               | abc                                               | cba             | Exchange 1st and 3rd stack items                                                                                          |
| 92         | SWAP3          | 3               | a...b                                             | b...a           | Exchange 1st and 4th stack items                                                                                          |
| 93         | SWAP4          | 3               | a...b                                             | b...a           | Exchange 1st and 5th stack items                                                                                          |
| 94         | SWAP5          | 3               | a...b                                             | b...a           | Exchange 1st and 6th stack items                                                                                          |
| 95         | SWAP6          | 3               | a...b                                             | b...a           | Exchange 1st and 7th stack items                                                                                          |
| 96         | SWAP7          | 3               | a...b                                             | b...a           | Exchange 1st and 8th stack items                                                                                          |
| 97         | SWAP8          | 3               | a...b                                             | b...a           | Exchange 1st and 9th stack items                                                                                          |
| 98         | SWAP9          | 3               | a...b                                             | b...a           | Exchange 1st and 10th stack items                                                                                         |
| 99         | SWAP10         | 3               | a...b                                             | b...a           | Exchange 1st and 11th stack items                                                                                         |
| 9A         | SWAP11         | 3               | a...b                                             | b...a           | Exchange 1st and 12th stack items                                                                                         |
| 9B         | SWAP12         | 3               | a...b                                             | b...a           | Exchange 1st and 13th stack items                                                                                         |
| 9C         | SWAP13         | 3               | a...b                                             | b...a           | Exchange 1st and 14th stack items                                                                                         |
| 9D         | SWAP14         | 3               | a...b                                             | b...a           | Exchange 1st and 15th stack items                                                                                         |
| 9E         | SWAP15         | 3               | a...b                                             | b...a           | Exchange 1st and 16th stack items                                                                                         |
| 9F         | SWAP16         | 3               | a...b                                             | b...a           | Exchange 1st and 17th stack items                                                                                         |
| A0         | LOG0           | 375             | offsetsize                                        |                 | Append log record with no topics                                                                                          |
| A1         | LOG1           | 750             | offsetsizetopic                                   |                 | Append log record with one topic                                                                                          |
| A2         | LOG2           | 1125            | offsetsizetopic1topic2                            |                 | Append log record with two topics                                                                                         |
| A3         | LOG3           | 1500            | offsetsizetopic1topic2topic3                      |                 | Append log record with three topics                                                                                       |
| A4         | LOG4           | 1875            | offsetsizetopic1topic2topic3topic4                |                 | Append log record with four topics                                                                                        |
| F0         | CREATE         | 32000           | valueoffsetsize                                   | address         | Create a new account with associated code                                                                                 |
| F1         | CALL           | 700             | gasaddressvalueargsOffsetargsSizeretOffsetretSize | success         | Message-call into an account                                                                                              |
| F2         | CALLCODE       | 700             | gasaddressvalueargsOffsetargsSizeretOffsetretSize | success         | Message-call into this account with alternative account’s code                                                            |
| F3         | RETURN         | 0               | offsetsize                                        |                 | Halt execution returning output data                                                                                      |
| F4         | DELEGATECALL   | 700             | gasaddressargsOffsetargsSizeretOffsetretSize      | success         | Message-call into this account with an alternative account’s code, but persisting the current values for sender and value |
| F5         | CREATE2        | 32000           | valueoffsetsizesalt                               | address         | Create a new account with associated code                                                                                 |
| FA         | STATICCALL     | 700             | gasaddressargsOffsetargsSizeretOffsetretSize      | success         | Static message-call into an account                                                                                       |
| FD         | REVERT         | 0               | offsetsize                                        |                 | Halt execution reverting state changes but returning data and remaining gas                                               |
| FE         | INVALID        | NaN             |                                                   |                 | Designated invalid instruction                                                                                            |
| FF         | SELFDESTRUCT   | 5000            | address                                           |                 | Halt execution and register account for later deletion                                                                    |

## Appendix - Dynamic Gas Costs

> NOTE: This Entire section is shamelessly copied from
> https://github.com/wolflo/evm-opcodes/blob/main/gas.md

> All Credits go to the original authors, we make no claim on their work

### A0-0: Intrinsic Gas

Intrinsic gas is the amount of gas paid prior to execution of a
transaction. That is, the gas paid by the initiator of a transaction,
which will always be an externally-owned account, before any state
updates are made or any code is executed.

Gas Calculation:

-   `gas_cost = 21000`: base cost
-   **If** `tx.to == null` (contract creation tx):
    -   `gas_cost += 32000`
-   `gas_cost += 4 * bytes_zero`: gas added to base cost for every zero
    byte of memory data
-   `gas_cost += 16 * bytes_nonzero`: gas added to base cost for every
    nonzero byte of memory data

### A0-1: Memory Expansion

An additional gas cost is paid by any operation that expands the memory
that is in use. This memory expansion cost is dependent on the existing
memory size and is `0` if the operation does not reference a memory
address higher than the existing highest referenced memory address. A
reference is any read, write, or other usage of memory (such as in a
`CALL`).

Terms:

-   `new_mem_size`: the highest referenced memory address after the
    operation in question (in bytes)
-   `new_mem_size_words = (new_mem_size + 31) // 32`: number of
    (32-byte) words required for memory after the operation in question
-   <code><em>C<sub>mem</sub>(machine_state)</em></code>: the memory
    cost function for a given machine state

Gas Calculation:

-   <code>gas_cost = <em>C<sub>mem</sub>(new_state)</em> -
    <em>C<sub>mem</sub>(old_state)</em></code>
-   <code>gas_cost = (new_mem_size_words ^ 2 // 512) + (3 \*
    new_mem_size_words) - <em>C<sub>mem</sub>(old_state)</em></code>

Useful Notes:

-   The following opcodes incur a memory expansion cost in addition to
    their otherwise static gas cost: `RETURN`, `REVERT`, `MLOAD`,
    `MSTORE`, `MSTORE8`.
-   Referencing a zero length range does not require memory to be
    extended to the beginning of the range.
-   The memory cost function is linear up to 724 bytes of memory used,
    at which point additional memory costs substantially more.

### A0-2: Access Sets

As of [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929), two
transaction-wide access sets are maintained. These access sets keep
track of which addresses and storage slots have already been touched
within the current transaction.

-   `touched_addresses : Set[Address]`
    -   a set where every element is an address
    -   initialized to include `tx.origin`, `tx.to`\*, and all
        precompiles
    -   \* For a contract creation transaction, `touched_addresses` is
        initialized to include the address of the created contract
        instead of `tx.to`, which is the zero address.
-   `touched_storage_slots : Set[(Address, Bytes32)]`
    -   a set where every element is a tuple, `(address, storage_key)`
    -   initialized to the empty set, `{}`

The access sets above are relevant for the following operations:

-   `ADDRESS_TOUCHING_OPCODES := { EXTCODESIZE, EXTCODECOPY, EXTCODEHASH, BALANCE, CALL, CALLCODE, DELEGATECALL, STATICCALL, SELFDESTRUCT }`
-   `STORAGE_TOUCHING_OPCODES := { SLOAD, SSTORE }`

#### Updating the Access Sets

When an address is the target of one of the `ADDRESS_TOUCHING_OPCODES`,
the address is immediately added to the `touched_addresses` set.

-   <code>touched addresses = touched_addresses &#x222A; {
    target_address }</code>

When a storage slot is the target of one of the
`STORAGE_TOUCHING_OPCODES`, the `(address, key)` pair is immediately
added to the `touched_storage_slots` set.

-   <code>touched_storage_slots = touched_storage_slots &#x222A; {
    (current_address, target_storage_key) }</code>

Important Notes:

-   Adding duplicate elements to these sets is a no-op. Performant
    implementations will use a map with more complicated addition logic.
-   If an execution frame reverts, the access sets will return to the
    state they were in before the frame was entered.
-   Additions to the `touched_addresses` set for `*CALL` and `CREATE*`
    opcodes are made immediately _before_ the new execution frames are
    entered, so any failure within a call or contract creation will not
    remove the target address of the failing `*CALL` or `CREATE*` from
    the `touched_addresses` set. Some tricky edge cases: - For `*CALL`,
    if the call fails for exceeding the maximum call depth or attempting
    to send more value than the balance of the current address, the
    target address remains in the `touched_addresses` set. - For
    `CREATE*`, if the contract creation fails for exceeding the maximum
    call depth or attempting to send more value than the balance of the
    current address, the address of the created contract does **NOT**
    remain in the `touched_addresses` set. - If a `CREATE*` operation
    fails for attempting to deploy a contract to a non-empty account,
    the address of the created contract remains in the
    `touched_addresses` set.

#### Pre-populating the Access Sets

[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) introduced an
optional access _list_ that can be included as part of a transaction.
This access list allows elements to be added to the `touched_addresses`
and `touched_storage_slots` access _sets_ before execution of a
transaction begins. The cost for doing so is `2400` gas for each address
added to `touched_addresses` and `1900` gas for each
`(address, storage_key)` pair added to `touched_storage_slots`. This
cost is charged at the same time as
[intrinsic gas](#a0-0-intrinsic-gas).

Important Notes:

-   No `(ADDR, storage_key)` pair can be added to
    `touched_storage_slots` without also adding `ADDR` to
    `touched_addresses`.
-   The access list may contain duplicates. The addition of a duplicate
    item to one of the access sets is a no-op, but the cost of addition
    is still charged.
-   Providing an access list with a transaction can yield a modest
    discount for each unique access, but this is not always the case.
    See
    [@fvictorio/gas-costs-after-berlin](https://hackmd.io/@fvictorio/gas-costs-after-berlin)
    for a more complete discussion.

### A0-3: Gas Refunds

Originally intended to provide incentive for clearing unused state, the
total `gas_refund` is tracked throughout the execution of a transaction.
As of [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529), `SSTORE` is
the only operation that potentially provides a gas refund.

The maximum refund for a transaction is capped at 1/5<sup>th</sup> the
gas consumed for the entire transaction.

```
refund_amt := min(gas_refund, tx.gas_consumed // 5)
```

The gas consumed includes the [intrinsic gas](#a0-0-intrinsic-gas), the
cost of [pre-populating](#pre-populating-the-access-sets) the access
sets, and the cost of any code execution.

When a transaction is finalized, the gas used by the transaction is
decreased by `refund_amt`. This effectively reimburses
<code>refund_amt&#160;\*&#160;tx.gasprice</code> to `tx.origin`, but it
has the added effect of decreasing the impact of the transaction on the
total gas consumed in the block (for purposes of determining the block
gas limit).

Because the gas refund is not applied until the end of a transaction, a
nonzero refund will not affect whether or not a transaction results in
an `OUT_OF_GAS` exception.

#

## A1: EXP

Terms:

-   `byte_len_exponent`: the number of bytes in the exponent (exponent
    is `b` in the stack representation)

Gas Calculation:

-   `gas_cost = 10 + 50 * byte_len_exponent`

## A2: SHA3

Terms:

-   `data_size`: size of the message to hash in bytes (`len` in the
    stack representation)
-   `data_size_words = (data_size + 31) // 32`: number of (32-byte)
    words in the message to hash
-   `mem_expansion_cost`: the cost of any memory expansion required (see
    [A0-1](#a0-1-memory-expansion))

Gas Calculation:

-   `gas_cost = 30 + 6 * data_size_words + mem_expansion_cost`

## A3: \*COPY Operations

The following applies for the operations `CALLDATACOPY`, `CODECOPY`, and
`RETURNDATACOPY` (not `EXTCODECOPY`).

Terms:

-   `data_size`: size of the data to copy in bytes (`len` in the stack
    representation)
-   `data_size_words = (data_size + 31) // 32`: number of (32-byte)
    words in the data to copy
-   `mem_expansion_cost`: the cost of any memory expansion required (see
    [A0-1](#a0-1-memory-expansion))

Gas Calculation:

-   `gas_cost = 3 + 3 * data_size_words + mem_expansion_cost`

## A4: EXTCODECOPY

Terms:

-   `target_addr`: the address to copy code from (`addr` in the stack
    representation)
-   `access_cost`: The cost of accessing a warm vs. cold account (see
    [A0-2](#a0-2-access-sets))
    -   `access_cost = 100` **if** `target_addr` **in**
        `touched_addresses` (warm access)
    -   `access_cost = 2600` **if** `target_addr` **not in**
        `touched_addresses` (cold access)
-   `data_size`: size of the data to copy in bytes (`len` in the stack
    representation)
-   `data_size_words = (data_size + 31) // 32`: number of (32-byte)
    words in the data to copy
-   `mem_expansion_cost`: the cost of any memory expansion required (see
    [A0-1](#a0-1-memory-expansion))

Gas Calculation:

-   `gas_cost = access_cost + 3 * data_size_words + mem_expansion_cost`

## A5: BALANCE, EXTCODESIZE, EXTCODEHASH

The opcodes `BALANCE`, `EXTCODESIZE`, `EXTCODEHASH` have the same
pricing function based on making a single account access. See
[A0-2](#a0-2-access-sets) for details on EIP-2929 and
`touched_addresses`.

Terms:

-   `target_addr`: the address of interest (`addr` in the opcode stack
    representations)

Gas Calculation:

-   `gas_cost = 100` **if** `target_addr` **in** `touched_addresses`
    (warm access)
-   `gas_cost = 2600` **if** `target_addr` **not in**
    `touched_addresses` (cold access)

## A6: SLOAD

See [A0-2](#a0-2-access-sets) for details on EIP-2929 and
`touched_storage_slots`.

Terms:

-   `context_addr`: the address of the current execution context (i.e.
    what `ADDRESS` would put on the stack)
-   `target_storage_key`: The 32-byte storage index to load from (`key`
    in the stack representation)

Gas Calculation:

-   `gas_cost = 100` **if** `(context_addr, target_storage_key)` **in**
    `touched_storage_slots` (warm access)
-   `gas_cost = 2100` **if** `(context_addr, target_storage_key)` **not
    in** `touched_storage_slots` (cold access)

## A7: SSTORE

This gets messy. See
[EIP-2200](https://eips.ethereum.org/EIPS/eip-2200), activated in the
Istanbul hardfork.

The cost of an `SSTORE` operation is dependent on the existing value and
the value to be stored:

1. Zero vs. nonzero values - storing nonzero values is more costly than
   storing zero
1. The current value of the slot vs. the value to store - changing the
   value of a slot is more costly than not changing it
1. "Dirty" vs. "clean" slot - changing a slot that has not yet been
   changed within the current execution context is more costly than
   changing a slot that has already been changed

The cost is also dependent on whether or not the targeted storage slot
has already been accessed within the same transaction. See
[A0-2](#a0-2-access-sets) for details on EIP-2929 and
`touched_storage_slots`.

Terms:

-   `context_addr`: the address of the current execution context (i.e.
    what `ADDRESS` would put on the stack)
-   `target_storage_key`: The 32-byte storage index to store to (`key`
    in the stack representation)
-   `orig_val`: the value of the storage slot if the current transaction
    is reverted
-   `current_val`: the value of the storage slot immediately _before_
    the `sstore` op in question
-   `new_val`: the value of the storage slot immediately _after_ the
    `sstore` op in question

Gas Calculation:

-   `gas_cost = 0`
-   `gas_refund = 0`
-   **If** `gas_left <= 2300`:
    -   `throw OUT_OF_GAS_ERROR` (can not `sstore` with < 2300 gas for
        backwards compatibility)
-   **If** `(context_addr, target_storage_key)` **not in**
    `touched_storage_slots` ([cold access](#a0-2-access-sets)):
    -   `gas_cost += 2100`
-   **If** `new_val == current_val` (no-op):
    -   `gas_cost += 100`
-   **Else** `new_val != current_val`:
    -   **If** `current_val == orig_val` ("clean slot", not yet updated
        in current execution context):
        -   **If** `orig_val == 0` (slot started zero, currently still
            zero, now being changed to nonzero):
            -   `gas_cost += 20000`
        -   **Else** `orig_val != 0` (slot started nonzero, currently
            still same nonzero value, now being changed):
            -   `gas_cost += 2900` and update the refund as follows..
            -   **If** `new_val == 0` (the value to store is 0):
                -   `gas_refund += 4800`
    -   **Else** `current_val != orig_val` ("dirty slot", already
        updated in current execution context):
        -   `gas_cost += 100` and update the refund as follows..
        -   **If** `orig_val != 0` (execution context started with a
            nonzero value in slot):
            -   **If** `current_val == 0` (slot started nonzero,
                currently zero, now being changed to nonzero):
                -   `gas_refund -= 4800`
            -   **Else if** `new_val == 0` (slot started nonzero,
                currently still nonzero, now being changed to zero):
                -   `gas_refund += 4800`
        -   **If** `new_val == orig_val` (slot is reset to the value it
            started with):
            -   **If** `orig_val == 0` (slot started zero, currently
                nonzero, now being reset to zero):
                -   `gas_refund += 19900`
            -   **Else** `orig_val != 0` (slot started nonzero,
                currently different nonzero value, now reset to orig.
                nonzero value):
                -   `gas_refund += 2800`

## A8: LOG\* Operations

Note that for `LOG*` operations gas is paid per byte of data (not per
word).

Terms:

-   `num_topics`: the \* of the LOG\* op. e.g. LOG0 has
    `num_topics = 0`, LOG4 has `num_topics = 4`
-   `data_size`: size of the data to log in bytes (`len` in the stack
    representation).
-   `mem_expansion_cost`: the cost of any memory expansion required (see
    [A0-1](#a0-1-memory-expansion))

Gas Calculation:

-   `gas_cost = 375 + 375 * num_topics + 8 * data_size + mem_expansion_cost`

## A9: CREATE\* Operations

Common Terms:

-   `mem_expansion_cost`: the cost of any memory expansion required (see
    [A0-1](#a0-1-memory-expansion))
-   `code_deposit_cost`: the per-byte cost incurred for storing the
    deployed code (see [A9-F](#a9-f-code-deposit-cost)).

### A9-1: CREATE

Gas Calculation:

-   `gas_cost = 32000 + mem_expansion_cost + code_deposit_cost`

### A9-2: CREATE2

`CREATE2` incurs an additional dynamic cost over `CREATE` because of the
need to hash the init code.

Terms:

-   `data_size`: size of the init code in bytes (`len` in the stack
    representation)
-   `data_size_words = (data_size + 31) // 32`: number of (32-byte)
    words in the init code

Gas Calculation:

-   `gas_cost = 32000 + 6 * data_size_words + mem_expansion_cost + code_deposit_cost`

### A9-F: Code Deposit Cost

In addition to the static and dynamic cost of the `CREATE` and `CREATE2`
operations, a per-byte cost is charged for storing the returned runtime
code. Unlike the static and dynamic costs of the opcodes, this cost is
not applied until _after_ the execution of the initialization code
halts.

Terms:

-   `returned_code_size`: the length of the returned runtime code

Gas Calculation:

-   `code_deposit_cost = 200 * returned_code_size`

A note related to the code deposit step of contract creation: As of
[EIP-3541](https://eips.ethereum.org/EIPS/eip-3541), any code returned
from a contract creation (i.e. what _would_ become the deployed contract
code), results in an exceptional abort of the entire contract creation
if the code's first byte is `0xEF`.

## AA: CALL\* Operations

Gas costs for `CALL`, `CALLCODE`, `DELEGATECALL`, and `STATICCALL`
operations. A big piece of the gas calculation for these operations is
determining the gas to send along with the call. There's a good chance
that you are primarily interested in the `base_cost` and can ignore this
additional calculation, because the `gas_sent_with_call` is consumed in
the context of the called contract, and the unconsumed gas is returned.
If not, see the `gas_sent_with_call`
[section](#aa-f-gas-to-send-with-call-operations).

Similar to selfdestruct, `CALL` incurs an additional cost if it forces
an account to be added to the state trie by sending a nonzero amount of
eth to an address that was previously empty. "Empty", in this case is
defined according to [EIP-161](https://eips.ethereum.org/EIPS/eip-161)
(`balance == nonce == code == 0x`).

Common Terms:

-   `call_value`: the value sent with the call (`val` in the stack
    representation)
-   `target_addr`: the recipient of the call (`addr` in the stack
    representation)
-   `access_cost`: The cost of accessing a warm vs. cold account (see
    [A0-2](#a0-2-access-sets))
    -   `access_cost = 100` **if** `target_addr` **in**
        `touched_addresses` (warm access)
    -   `access_cost = 2600` **if** `target_addr` **not in**
        `touched_addresses` (cold access)
-   `mem_expansion_cost`: the cost of any memory expansion required (see
    [A0-1](#a0-1-memory-expansion))
-   `gas_sent_with_call`: the gas ultimately sent with the call

### AA-1: CALL

Gas Calculation:

-   `base_gas = access_cost + mem_expansion_cost`
-   **If** `call_value > 0` (sending value with call):
    -   `base_gas += 9000`
    -   **If** `is_empty(target_addr)` (forcing a new account to be
        created in the state trie):
        -   `base_gas += 25000`

Calculate the `gas_sent_with_call`
[below](#aa-f-gas-to-send-with-call-operations).

And the final cost of the operation:

-   `gas_cost = base_gas + gas_sent_with_call`

### AA-2: CALLCODE

Gas Calculation:

-   `base_gas = access_cost + mem_expansion_cost`
-   **If** `call_value > 0` (sending value with call):
    -   `base_gas += 9000`

Calculate the `gas_sent_with_call`
[below](#aa-f-gas-to-send-with-call-operations).

And the final cost of the operation:

-   `gas_cost = base_gas + gas_sent_with_call`

### AA-3: DELEGATECALL

Gas Calculation:

-   `base_gas = access_cost + mem_expansion_cost`

Calculate the `gas_sent_with_call`
[below](#aa-f-gas-to-send-with-call-operations).

And the final cost of the operation:

-   `gas_cost = base_gas + gas_sent_with_call`

### AA-4: STATICCALL

Gas Calculation:

-   `base_gas = access_cost + mem_expansion_cost`

Calculate the `gas_sent_with_call`
[below](#aa-f-gas-to-send-with-call-operations).

And the final cost of the operation:

-   `gas_cost = base_gas + gas_sent_with_call`

### AA-F: Gas to Send with CALL Operations

In addition to the base cost of executing the operation, `CALL`,
`CALLCODE`, `DELEGATECALL`, and `STATICCALL` need to determine how much
gas to send along with the call. Much of the complexity here comes from
a backward-compatible change made in
[EIP-150](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-150.md).
Here's an overview of why this calculation is used:

EIP-150 increased the `base_cost` of the `CALL` opcode from 40 to 700
gas, but most contracts in use at the time were sending
`available_gas - 40` with every call. So, when `base_cost` increased,
these contracts were suddenly trying to send more gas than they had left
(`requested_gas > remaining_gas`). To avoid breaking these contracts, if
the `requested_gas` is more than `remaining_gas`, we send
`all_but_one_64th` of `remaining_gas` instead of trying to send
`requested_gas`, which would result in an `OUT_OF_GAS_ERROR`.

Terms:

-   `base_gas`: the cost of the operation before taking into account the
    gas that should be sent along with the call. See
    [AA](#aa-call-operations) for this calculation.
-   `available_gas`: the gas remaining in the current execution context
    immediately before the execution of the opcode
-   `remaining_gas`: the gas remaining after deducting `base_cost` of
    the op but before deducting `gas_sent_with_call`
-   `requested_gas`: the gas requested to be sent with the call (`gas`
    in the stack representation)
-   `all_but_one_64th`: All but floor(1/64) of the remaining gas
-   `gas_sent_with_call`: the gas ultimately sent with the call

Gas Calculation:

-   `remaining_gas = available_gas - base_gas`
-   `all_but_one_64th = remaining_gas - (remaining_gas // 64)`
-   `gas_sent_with_call = min(requested_gas, all_but_one_64th)`

Any portion of `gas_sent_with_call` that is not used by the recipient of
the call is refunded to the caller after the call returns. Also, if
`call_value > 0`, a 2300 gas stipend is added to the amount of gas
included in the call, but not to the cost of making the call.

## AB: SELFDESTRUCT

The gas cost of a `SELFDESTRUCT` operation is dependent on whether or
not the operation results in a new account being added to the state
trie. If a nonzero amount of eth is sent to an address that was
previously empty, an additional cost is incurred. "Empty", in this case
is defined according to
[EIP-161](https://eips.ethereum.org/EIPS/eip-161)
(`balance == nonce == code == 0x`).

The cost also increases if the operation requires a cold access of the
recipient address. See [A0-2](#a0-2-access-sets) for details on EIP-2929
and `touched_addresses`.

Terms:

-   `target_addr`: the recipient of the self-destructing contract's
    funds (`addr` in the stack representation)
-   `context_addr`: the address of the current execution context (i.e.
    what `ADDRESS` would put on the stack)

Gas Calculation:

-   `gas_cost = 5000`: base cost
-   **If** `balance(context_addr) > 0 && is_empty(target_addr)` (sending
    funds to a previously empty address):
    -   `gas_cost += 25000`
-   **If** `target_addr` **not in** `touched_addresses` (cold access):
    -   `gas_cost += 2600`

## AF: INVALID

On execution of any invalid operation, whether the designated `INVALID`
opcode or simply an undefined opcode, all remaining gas is consumed and
the state is reverted to the point immediately prior to the beginning of
the current execution context.
