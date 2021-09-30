Trident pool interface.

## Functions

### swap

```solidity
  function swap(
    bytes data
  ) external returns (uint256 finalAmountOut)
```

Executes a swap from one token to another.

The input tokens must've already been sent to the pool.

#### Parameters:

| Name   | Type  | Description                                |
| :----- | :---- | :----------------------------------------- |
| `data` | bytes | ABI-encoded params that the pool requires. |

#### Return Values:

| Name             | Type  | Description                                             |
| :--------------- | :---- | :------------------------------------------------------ |
| `finalAmountOut` | bytes | The amount of output tokens that were sent to the user. |

### flashSwap

```solidity
  function flashSwap(
    bytes data
  ) external returns (uint256 finalAmountOut)
```

Executes a swap from one token to another with a callback.

This function allows borrowing the output tokens and sending the input tokens in the callback.

#### Parameters:

| Name   | Type  | Description                                |
| :----- | :---- | :----------------------------------------- |
| `data` | bytes | ABI-encoded params that the pool requires. |

#### Return Values:

| Name             | Type  | Description                                             |
| :--------------- | :---- | :------------------------------------------------------ |
| `finalAmountOut` | bytes | The amount of output tokens that were sent to the user. |

### mint

```solidity
  function mint(
    bytes data
  ) external returns (uint256 liquidity)
```

Mints liquidity tokens.

The input tokens must've already been sent to the pool.

#### Parameters:

| Name   | Type  | Description                                |
| :----- | :---- | :----------------------------------------- |
| `data` | bytes | ABI-encoded params that the pool requires. |

#### Return Values:

| Name        | Type  | Description                                                   |
| :---------- | :---- | :------------------------------------------------------------ |
| `liquidity` | bytes | The amount of liquidity tokens that were minted for the user. |

### burn

```solidity
  function burn(
    bytes data
  ) external returns (struct IPool.TokenAmount[] withdrawnAmounts)
```

Burns liquidity tokens.

The input LP tokens must've already been sent to the pool.

#### Parameters:

| Name   | Type  | Description                                |
| :----- | :---- | :----------------------------------------- |
| `data` | bytes | ABI-encoded params that the pool requires. |

#### Return Values:

| Name               | Type  | Description                                                     |
| :----------------- | :---- | :-------------------------------------------------------------- |
| `withdrawnAmounts` | bytes | The amount of various output tokens that were sent to the user. |

### burnSingle

```solidity
  function burnSingle(
    bytes data
  ) external returns (uint256 amountOut)
```

Burns liquidity tokens for a single output token.

The input LP tokens must've already been sent to the pool.

#### Parameters:

| Name   | Type  | Description                                |
| :----- | :---- | :----------------------------------------- |
| `data` | bytes | ABI-encoded params that the pool requires. |

#### Return Values:

| Name        | Type  | Description                                             |
| :---------- | :---- | :------------------------------------------------------ |
| `amountOut` | bytes | The amount of output tokens that were sent to the user. |

### poolIdentifier

```solidity
  function poolIdentifier(
  ) external returns (bytes32)
```

#### Return Values:

| Name | Type | Description                          |
| :--- | :--- | :----------------------------------- |
| `A`  |      | unique identifier for the pool type. |

### getAssets

```solidity
  function getAssets(
  ) external returns (address[])
```

#### Return Values:

| Name | Type | Description                            |
| :--- | :--- | :------------------------------------- |
| `An` |      | array of tokens supported by the pool. |

### getAmountOut

```solidity
  function getAmountOut(
    bytes data
  ) external returns (uint256 finalAmountOut)
```

Simulates a trade and returns the expected output.

The pool does not need to include a trade simulator directly in itself - it can use a library.

#### Parameters:

| Name   | Type  | Description                                |
| :----- | :---- | :----------------------------------------- |
| `data` | bytes | ABI-encoded params that the pool requires. |

#### Return Values:

| Name             | Type  | Description                                                                         |
| :--------------- | :---- | :---------------------------------------------------------------------------------- |
| `finalAmountOut` | bytes | The amount of output tokens that will be sent to the user if the trade is executed. |

## Events

### Swap

```solidity
  event Swap(
  )
```

This event must be emitted on all swaps.
