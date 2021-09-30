Minimal BentoBox vault interface.

`token` is aliased as `address` from `IERC20` for simplicity.

## Functions

### balanceOf

```solidity
  function balanceOf(
  ) external returns (uint256)
```

Balance per ERC-20 token per account in shares.

### toShare

```solidity
  function toShare(
    address token,
    uint256 amount,
    bool roundUp
  ) external returns (uint256 share)
```

Helper function to represent an `amount` of `token` in shares.

#### Parameters:

| Name      | Type    | Description                                 |
| :-------- | :------ | :------------------------------------------ |
| `token`   | address | The ERC-20 token.                           |
| `amount`  | uint256 | The `token` amount.                         |
| `roundUp` | bool    | If the result `share` should be rounded up. |

#### Return Values:

| Name    | Type    | Description                             |
| :------ | :------ | :-------------------------------------- |
| `share` | address | The token amount represented in shares. |

### toAmount

```solidity
  function toAmount(
    address token,
    uint256 share,
    bool roundUp
  ) external returns (uint256 amount)
```

Helper function to represent shares back into the `token` amount.

#### Parameters:

| Name      | Type    | Description                         |
| :-------- | :------ | :---------------------------------- |
| `token`   | address | The ERC-20 token.                   |
| `share`   | uint256 | The amount of shares.               |
| `roundUp` | bool    | If the result should be rounded up. |

#### Return Values:

| Name     | Type    | Description                                       |
| :------- | :------ | :------------------------------------------------ |
| `amount` | address | The share amount back into native representation. |

### registerProtocol

```solidity
  function registerProtocol(
  ) external
```

Registers this contract so that users can approve it for BentoBox.

### deposit

```solidity
  function deposit(
    address token_,
    address from,
    address to,
    uint256 amount,
    uint256 share
  ) external returns (uint256 amountOut, uint256 shareOut)
```

Deposit an amount of `token` represented in either `amount` or `share`.

#### Parameters:

| Name     | Type    | Description                                                                    |
| :------- | :------ | :----------------------------------------------------------------------------- |
| `token_` | address | The ERC-20 token to deposit.                                                   |
| `from`   | address | which account to pull the tokens.                                              |
| `to`     | address | which account to push the tokens.                                              |
| `amount` | uint256 | Token amount in native representation to deposit.                              |
| `share`  | uint256 | Token amount represented in shares to deposit. Takes precedence over `amount`. |

#### Return Values:

| Name        | Type    | Description                                |
| :---------- | :------ | :----------------------------------------- |
| `amountOut` | address | The amount deposited.                      |
| `shareOut`  | address | The deposited amount repesented in shares. |

### withdraw

```solidity
  function withdraw(
    address token_,
    address from,
    address to,
    uint256 amount,
    uint256 share
  ) external returns (uint256 amountOut, uint256 shareOut)
```

Withdraws an amount of `token` from a user account.

#### Parameters:

| Name     | Type    | Description                                                        |
| :------- | :------ | :----------------------------------------------------------------- |
| `token_` | address | The ERC-20 token to withdraw.                                      |
| `from`   | address | which user to pull the tokens.                                     |
| `to`     | address | which user to push the tokens.                                     |
| `amount` | uint256 | of tokens. Either one of `amount` or `share` needs to be supplied. |
| `share`  | uint256 | Like above, but `share` takes precedence over `amount`.            |

### transfer

```solidity
  function transfer(
    address token,
    address from,
    address to,
    uint256 share
  ) external
```

Transfer shares from a user account to another one.

#### Parameters:

| Name    | Type    | Description                      |
| :------ | :------ | :------------------------------- |
| `token` | address | The ERC-20 token to transfer.    |
| `from`  | address | which user to pull the tokens.   |
| `to`    | address | which user to push the tokens.   |
| `share` | uint256 | The amount of `token` in shares. |

### totals

```solidity
  function totals(
  ) external returns (struct Rebase total)
```

Reads the Rebase `totals`from storage for a given token
