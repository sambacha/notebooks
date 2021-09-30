Trident exchange pool template with constant product formula for swapping between an ERC-20 token pair.

The reserves are stored as bento shares.
The curve is applied to shares as well. This pool does not care about the underlying amounts.

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

Swaps one token for another. The router must support swap callbacks and ensure there isn't too much slippage.

### updateBarFee

```solidity
  function updateBarFee(
  ) public
```

Updates `barFee` for Trident protocol.

### \_getReserves

```solidity
  function _getReserves(
  ) internal returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)
```

### \_balance

```solidity
  function _balance(
  ) internal returns (uint256 balance0, uint256 balance1)
```

### \_update

```solidity
  function _update(
  ) internal
```

### \_mintFee

```solidity
  function _mintFee(
  ) internal returns (uint256 _totalSupply, uint256 computed)
```

### \_getAmountOut

```solidity
  function _getAmountOut(
  ) internal returns (uint256 amountOut)
```

### \_transfer

```solidity
  function _transfer(
  ) internal
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
  ) public returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)
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
