Trident router helper contract.

## Functions

### constructor

```solidity
  function constructor(
  ) public
```

### batch

```solidity
  function batch(
    bytes[] data
  ) external returns (bytes[] results)
```

Provides batch function calls for this contract and returns the data from all of them if they all succeed.
Adapted from https://github.com/Uniswap/uniswap-v3-periphery/blob/main/contracts/base/Multicall.sol, License-Identifier: GPL-2.0-or-later.

The `msg.value` should not be trusted for any method callable from this function.

#### Parameters:

| Name   | Type    | Description                                                        |
| :----- | :------ | :----------------------------------------------------------------- |
| `data` | bytes[] | ABI-encoded params for each of the calls to make to this contract. |

#### Return Values:

| Name      | Type    | Description                                              |
| :-------- | :------ | :------------------------------------------------------- |
| `results` | bytes[] | The results from each of the calls passed in via `data`. |

### balanceOfThis

```solidity
  function balanceOfThis(
    address token
  ) internal returns (uint256 balance)
```

Provides gas-optimized balance check on this contract to avoid redundant extcodesize check in addition to returndatasize check.

#### Parameters:

| Name    | Type    | Description              |
| :------ | :------ | :----------------------- |
| `token` | address | Address of ERC-20 token. |

#### Return Values:

| Name      | Type    | Description                         |
| :-------- | :------ | :---------------------------------- |
| `balance` | address | Token amount held by this contract. |

### permitThis

```solidity
  function permitThis(
    address token,
    uint256 amount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Provides EIP-2612 signed approval for this contract to spend user tokens.

#### Parameters:

| Name       | Type    | Description                                                 |
| :--------- | :------ | :---------------------------------------------------------- |
| `token`    | address | Address of ERC-20 token.                                    |
| `amount`   | uint256 | Token amount to grant spending right over.                  |
| `deadline` | uint256 | Termination for signed approval (UTC timestamp in seconds). |
| `v`        | uint8   | The recovery byte of the signature.                         |
| `r`        | bytes32 | Half of the ECDSA signature pair.                           |
| `s`        | bytes32 | Half of the ECDSA signature pair.                           |

### permitThisAllowed

```solidity
  function permitThisAllowed(
    address token,
    uint256 nonce,
    uint256 expiry,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Provides DAI-derived signed approval for this contract to spend user tokens.

#### Parameters:

| Name     | Type    | Description                                                 |
| :------- | :------ | :---------------------------------------------------------- |
| `token`  | address | Address of ERC-20 token.                                    |
| `nonce`  | uint256 | Token owner's nonce - increases at each call to {permit}.   |
| `expiry` | uint256 | Termination for signed approval - UTC timestamp in seconds. |
| `v`      | uint8   | The recovery byte of the signature.                         |
| `r`      | bytes32 | Half of the ECDSA signature pair.                           |
| `s`      | bytes32 | Half of the ECDSA signature pair.                           |

### safeTransfer

```solidity
  function safeTransfer(
    address token,
    address recipient,
    uint256 amount
  ) internal
```

Provides 'safe' ERC-20 {transfer} for tokens that don't consistently return true/false.

#### Parameters:

| Name        | Type    | Description                |
| :---------- | :------ | :------------------------- |
| `token`     | address | Address of ERC-20 token.   |
| `recipient` | address | Account to send tokens to. |
| `amount`    | uint256 | Token amount to send.      |

### safeTransferFrom

```solidity
  function safeTransferFrom(
    address token,
    address sender,
    address recipient,
    uint256 amount
  ) internal
```

Provides 'safe' ERC-20 {transferFrom} for tokens that don't consistently return true/false.

#### Parameters:

| Name        | Type    | Description                  |
| :---------- | :------ | :--------------------------- |
| `token`     | address | Address of ERC-20 token.     |
| `sender`    | address | Account to send tokens from. |
| `recipient` | address | Account to send tokens to.   |
| `amount`    | uint256 | Token amount to send.        |

### withdrawFromWETH

```solidity
  function withdrawFromWETH(
    uint256 amount
  ) internal
```

Provides low-level `wETH` {withdraw}.

#### Parameters:

| Name     | Type    | Description                      |
| :------- | :------ | :------------------------------- |
| `amount` | uint256 | Token amount to unwrap into ETH. |

### safeTransferETH

```solidity
  function safeTransferETH(
    address recipient,
    uint256 amount
  ) internal
```

Provides 'safe' ETH transfer.

#### Parameters:

| Name        | Type    | Description             |
| :---------- | :------ | :---------------------- |
| `recipient` | address | Account to send ETH to. |
| `amount`    | uint256 | ETH amount to send.     |

### getSelector

```solidity
  function getSelector(
    bytes _data
  ) internal returns (bytes4 sig)
```

function to extract the selector of a bytes calldata

#### Parameters:

| Name    | Type  | Description        |
| :------ | :---- | :----------------- |
| `_data` | bytes | the calldata bytes |
