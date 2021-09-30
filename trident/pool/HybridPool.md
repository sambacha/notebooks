Trident exchange pool template with hybrid like-kind formula for swapping between an ERC-20 token pair.

The reserves are stored as bento shares. However, the stableswap invariant is applied to the underlying amounts.
The API uses the underlying amounts.

## Functions

### constructor

```solidity
  function constructor(
  ) public
```

### mint

```solidity
  function mint(
  ) public returns (uint256 liquidity)
```

Mints LP tokens - should be called via the router after transferring `bento` tokens.
The router must ensure that sufficient LP tokens are minted by using the return value.

### burn

```solidity
  function burn(
  ) public returns (struct IPool.TokenAmount[] withdrawnAmounts)
```

Burns LP tokens sent to this contract. The router must ensure that the user gets sufficient output tokens.

### burnSingle

```solidity
  function burnSingle(
  ) public returns (uint256 amountOut)
```

Burns LP tokens sent to this contract and swaps one of the output tokens for another

- i.e., the user gets a single token out by burning LP tokens.

### swap

```solidity
  function swap(
  ) public returns (uint256 amountOut)
```

Swaps one token for another. The router must prefund this contract and ensure there isn't too much slippage.

### flashSwap

```solidity
  function flashSwap(
  ) public returns (uint256 amountOut)
```

Swaps one token for another with payload. The router must support swap callbacks and ensure there isn't too much slippage.

### updateBarFee

```solidity
  function updateBarFee(
  ) public
```

Updates `barFee` for Trident protocol.

### \_processSwap

```solidity
  function _processSwap(
  ) internal
```

### \_getReserves

```solidity
  function _getReserves(
  ) internal returns (uint256 _reserve0, uint256 _reserve1)
```

### \_getReservesAndBalances

```solidity
  function _getReservesAndBalances(
  ) internal returns (uint256 _reserve0, uint256 _reserve1, uint256 balance0, uint256 balance1)
```

### \_updateReserves

```solidity
  function _updateReserves(
  ) internal
```

### \_balance

```solidity
  function _balance(
  ) internal returns (uint256 balance0, uint256 balance1)
```

### \_getAmountOut

```solidity
  function _getAmountOut(
  ) internal returns (uint256 dy)
```

### \_transfer

```solidity
  function _transfer(
  ) internal
```

### \_computeLiquidity

```solidity
  function _computeLiquidity(
  ) internal returns (uint256 liquidity)
```

Get D, the StableSwap invariant, based on a set of balances and a particular A.
See the StableSwap paper for details.

Originally https://github.com/saddle-finance/saddle-contract/blob/0b76f7fb519e34b878aa1d58cffc8d8dc0572c12/contracts/SwapUtils.sol#L319.

#### Return Values:

| Name        | Type    | Description                                  |
| :---------- | :------ | :------------------------------------------- |
| `liquidity` | uint256 | The invariant, at the precision of the pool. |

### \_computeLiquidityFromAdjustedBalances

```solidity
  function _computeLiquidityFromAdjustedBalances(
  ) internal returns (uint256 computed)
```

### \_getY

```solidity
  function _getY(
    uint256 x
  ) internal returns (uint256 y)
```

Calculate the new balances of the tokens given the indexes of the token
that is swapped from (FROM) and the token that is swapped to (TO).
This function is used as a helper function to calculate how much TO token
the user should receive on swap.

Originally https://github.com/saddle-finance/saddle-contract/blob/0b76f7fb519e34b878aa1d58cffc8d8dc0572c12/contracts/SwapUtils.sol#L432.

#### Parameters:

| Name | Type    | Description                         |
| :--- | :------ | :---------------------------------- |
| `x`  | uint256 | The new total amount of FROM token. |

#### Return Values:

| Name | Type    | Description                                            |
| :--- | :------ | :----------------------------------------------------- |
| `y`  | uint256 | The amount of TO token that should remain in the pool. |

### \_mintFee

```solidity
  function _mintFee(
  ) internal returns (uint256 _totalSupply, uint256 d)
```

### \_nonOptimalMintFee

```solidity
  function _nonOptimalMintFee(
  ) internal returns (uint256 token0Fee, uint256 token1Fee)
```

This fee is charged to cover for `swapFee` when users add unbalanced liquidity.

### getAssets

```solidity
  function getAssets(
  ) public returns (address[] assets)
```

### getAmountOut

```solidity
  function getAmountOut(
  ) public returns (uint256 finalAmountOut)
```

### getReserves

```solidity
  function getReserves(
  ) public returns (uint256 _reserve0, uint256 _reserve1)
```

### getVirtualPrice

```solidity
  function getVirtualPrice(
  ) public returns (uint256 virtualPrice)
```

## Events

### Mint

```solidity
  event Mint(
  )
```

### Burn

```solidity
  event Burn(
  )
```

### Sync

```solidity
  event Sync(
  )
```
