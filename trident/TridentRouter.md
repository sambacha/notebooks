Router contract that helps in swapping across Trident pools.

## Functions

### constructor

```solidity
  function constructor(
  ) public
```

### receive

```solidity
  function receive(
  ) external
```

### exactInputSingle

```solidity
  function exactInputSingle(
    struct ITridentRouter.ExactInputSingleParams params
  ) public returns (uint256 amountOut)
```

Swaps token A to token B directly. Swaps are done on `bento` tokens.

Ensure that the pool is trusted before calling this function. The pool can steal users' tokens.

#### Parameters:

| Name     | Type                                         | Description                                                            |
| :------- | :------------------------------------------- | :--------------------------------------------------------------------- |
| `params` | struct ITridentRouter.ExactInputSingleParams | This includes the address of token A, pool, amount of token A to swap, |

minimum amount of token B after the swap and data required by the pool for the swap.

### exactInput

```solidity
  function exactInput(
    struct ITridentRouter.ExactInputParams params
  ) public returns (uint256 amountOut)
```

Swaps token A to token B indirectly by using multiple hops.

Ensure that the pools are trusted before calling this function. The pools can steal users' tokens.

#### Parameters:

| Name     | Type                                   | Description                                                                  |
| :------- | :------------------------------------- | :--------------------------------------------------------------------------- |
| `params` | struct ITridentRouter.ExactInputParams | This includes the addresses of the tokens, pools, amount of token A to swap, |

minimum amount of token B after the swap and data required by the pools for the swaps.

### exactInputLazy

```solidity
  function exactInputLazy(
    uint256 path,
    struct ITridentRouter.Path[] amountOutMinimum
  ) public returns (uint256 amountOut)
```

Swaps token A to token B by using callbacks.

Ensure that the pools are trusted before calling this function. The pools can steal users' tokens.
This function will unlikely be used in production but it shows how to use callbacks. One use case will be arbitrage.

#### Parameters:

| Name               | Type                         | Description                                                          |
| :----------------- | :--------------------------- | :------------------------------------------------------------------- |
| `path`             | uint256                      | Addresses of the pools and data required by the pools for the swaps. |
| `amountOutMinimum` | struct ITridentRouter.Path[] | Minimum amount of token B after the swap.                            |

### exactInputSingleWithNativeToken

```solidity
  function exactInputSingleWithNativeToken(
    struct ITridentRouter.ExactInputSingleParams params
  ) public returns (uint256 amountOut)
```

Swaps token A to token B directly. It's the same as `exactInputSingle` except
it takes raw ERC-20 tokens from the users and deposits them into `bento`.

Ensure that the pool is trusted before calling this function. The pool can steal users' tokens.

#### Parameters:

| Name     | Type                                         | Description                                                            |
| :------- | :------------------------------------------- | :--------------------------------------------------------------------- |
| `params` | struct ITridentRouter.ExactInputSingleParams | This includes the address of token A, pool, amount of token A to swap, |

minimum amount of token B after the swap and data required by the pool for the swap.

### exactInputWithNativeToken

```solidity
  function exactInputWithNativeToken(
    struct ITridentRouter.ExactInputParams params
  ) public returns (uint256 amountOut)
```

Swaps token A to token B indirectly by using multiple hops. It's the same as `exactInput` except
it takes raw ERC-20 tokens from the users and deposits them into `bento`.

Ensure that the pools are trusted before calling this function. The pools can steal users' tokens.

#### Parameters:

| Name     | Type                                   | Description                                                                  |
| :------- | :------------------------------------- | :--------------------------------------------------------------------------- |
| `params` | struct ITridentRouter.ExactInputParams | This includes the addresses of the tokens, pools, amount of token A to swap, |

minimum amount of token B after the swap and data required by the pools for the swaps.

### complexPath

```solidity
  function complexPath(
    struct ITridentRouter.ComplexPathParams params
  ) public
```

Swaps multiple input tokens to multiple output tokens using multiple paths, in different percentages.
For example, you can swap 50 DAI + 100 USDC into 60% ETH and 40% BTC.

This function is not optimized for single swaps and should only be used in complex cases where
the amounts are large enough that minimizing slippage by using multiple paths is worth the extra gas.

#### Parameters:

| Name     | Type                                    | Description                                                                                            |
| :------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `params` | struct ITridentRouter.ComplexPathParams | This includes everything needed for the swap. Look at the `ComplexPathParams` struct for more details. |

### addLiquidity

```solidity
  function addLiquidity(
    struct ITridentRouter.TokenInput[] tokenInput,
    address pool,
    uint256 minLiquidity,
    bytes data
  ) public returns (uint256 liquidity)
```

Add liquidity to a pool.

#### Parameters:

| Name           | Type                               | Description                                   |
| :------------- | :--------------------------------- | :-------------------------------------------- |
| `tokenInput`   | struct ITridentRouter.TokenInput[] | Token address and amount to add as liquidity. |
| `pool`         | address                            | Pool address to add liquidity to.             |
| `minLiquidity` | uint256                            | Minimum output liquidity - caps slippage.     |
| `data`         | bytes                              | Data required by the pool to add liquidity.   |

### addLiquidityLazy

```solidity
  function addLiquidityLazy(
  ) public returns (uint256 liquidity)
```

Add liquidity to a pool using callbacks - same as `addLiquidity`, but now with callbacks.

The input tokens are sent to the pool during the callback.

### burnLiquidity

```solidity
  function burnLiquidity(
    address pool,
    uint256 liquidity,
    bytes data,
    struct IPool.TokenAmount[] minWithdrawals
  ) public
```

Burn liquidity tokens to get back `bento` tokens.

#### Parameters:

| Name             | Type                       | Description                                      |
| :--------------- | :------------------------- | :----------------------------------------------- |
| `pool`           | address                    | Pool address.                                    |
| `liquidity`      | uint256                    | Amount of liquidity tokens to burn.              |
| `data`           | bytes                      | Data required by the pool to burn liquidity.     |
| `minWithdrawals` | struct IPool.TokenAmount[] | Minimum amount of `bento` tokens to be returned. |

### burnLiquiditySingle

```solidity
  function burnLiquiditySingle(
    address pool,
    uint256 liquidity,
    bytes data,
    uint256 minWithdrawal
  ) public
```

Burn liquidity tokens to get back `bento` tokens.

The tokens are swapped automatically and the output is in a single token.

#### Parameters:

| Name            | Type    | Description                                  |
| :-------------- | :------ | :------------------------------------------- |
| `pool`          | address | Pool address.                                |
| `liquidity`     | uint256 | Amount of liquidity tokens to burn.          |
| `data`          | bytes   | Data required by the pool to burn liquidity. |
| `minWithdrawal` | uint256 | Minimum amount of tokens to be returned.     |

### tridentSwapCallback

```solidity
  function tridentSwapCallback(
  ) external
```

Used by the pool 'flashSwap' functionality to take input tokens from the user.

### tridentMintCallback

```solidity
  function tridentMintCallback(
  ) external
```

Can be used by the pool 'mint' functionality to take tokens from the user.

### sweepBentoBoxToken

```solidity
  function sweepBentoBoxToken(
  ) external
```

Recover mistakenly sent `bento` tokens.

### sweepNativeToken

```solidity
  function sweepNativeToken(
  ) external
```

Recover mistakenly sent ERC-20 tokens.

### refundETH

```solidity
  function refundETH(
  ) external
```

Recover mistakenly sent ETH.

### unwrapWETH

```solidity
  function unwrapWETH(
  ) external
```

Unwrap this contract's `wETH` into ETH

### deployPool

```solidity
  function deployPool(
  ) external returns (address)
```

### \_depositToBentoBox

```solidity
  function _depositToBentoBox(
  ) internal
```

### \_depositFromUserToBentoBox

```solidity
  function _depositFromUserToBentoBox(
  ) internal
```

### isWhiteListed

```solidity
  function isWhiteListed(
  ) internal
```
