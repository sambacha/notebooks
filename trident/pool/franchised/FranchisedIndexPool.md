Trident exchange franchised pool template with constant mean formula for swapping among an array of ERC-20 tokens.

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

### \_balance

```solidity
  function _balance(
  ) internal returns (uint256 balance)
```

### \_getAmountOut

```solidity
  function _getAmountOut(
  ) internal returns (uint256 amountOut)
```

### \_compute

```solidity
  function _compute(
  ) internal returns (uint256 output)
```

### \_computeSingleOutGivenPoolIn

```solidity
  function _computeSingleOutGivenPoolIn(
  ) internal returns (uint256 amountOut)
```

### \_pow

```solidity
  function _pow(
  ) internal returns (uint256 output)
```

### \_powApprox

```solidity
  function _powApprox(
  ) internal returns (uint256 sum)
```

### \_subFlag

```solidity
  function _subFlag(
  ) internal returns (uint256 difference, bool flag)
```

### \_mul

```solidity
  function _mul(
  ) internal returns (uint256 c2)
```

### \_div

```solidity
  function _div(
  ) internal returns (uint256 c2)
```

### \_transfer

```solidity
  function _transfer(
  ) internal
```

### getAssets

```solidity
  function getAssets(
  ) public returns (address[] assets)
```

### getAmountOut

```solidity
  function getAmountOut(
  ) public returns (uint256 amountOut)
```

### getReservesAndWeights

```solidity
  function getReservesAndWeights(
  ) public returns (uint256[] reserves, uint136[] weights)
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
