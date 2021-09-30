Trident pool ERC-20 with EIP-2612 extension.

## Functions

### constructor

```solidity
  function constructor(
  ) internal
```

### \_calculateDomainSeparator

```solidity
  function _calculateDomainSeparator(
  ) internal returns (bytes32 domainSeperator)
```

### DOMAIN_SEPARATOR

```solidity
  function DOMAIN_SEPARATOR(
  ) public returns (bytes32 domainSeperator)
```

EIP-712 typehash for this contract's domain.

### approve

```solidity
  function approve(
    address spender,
    uint256 amount
  ) external returns (bool)
```

Approves `amount` from `msg.sender` to be spent by `spender`.

#### Parameters:

| Name      | Type    | Description                                                            |
| :-------- | :------ | :--------------------------------------------------------------------- |
| `spender` | address | Address of the party that can pull tokens from `msg.sender`'s account. |
| `amount`  | uint256 | The maximum collective `amount` that `spender` can pull.               |

#### Return Values:

| Name      | Type    | Description          |
| :-------- | :------ | :------------------- |
| `Returns` | address | 'true' if succeeded. |

### transfer

```solidity
  function transfer(
    address recipient,
    uint256 amount
  ) external returns (bool)
```

Transfers `amount` tokens from `msg.sender` to `recipient`.

#### Parameters:

| Name        | Type    | Description                    |
| :---------- | :------ | :----------------------------- |
| `recipient` | address | The address to move tokens to. |
| `amount`    | uint256 | The token `amount` to move.    |

#### Return Values:

| Name      | Type    | Description          |
| :-------- | :------ | :------------------- |
| `Returns` | address | 'true' if succeeded. |

### transferFrom

```solidity
  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool)
```

Transfers `amount` tokens from `sender` to `recipient`. Caller needs approval from `from`.

#### Parameters:

| Name        | Type    | Description                    |
| :---------- | :------ | :----------------------------- |
| `sender`    | address | Address to pull tokens `from`. |
| `recipient` | address | The address to move tokens to. |
| `amount`    | uint256 | The token `amount` to move.    |

#### Return Values:

| Name      | Type    | Description          |
| :-------- | :------ | :------------------- |
| `Returns` | address | 'true' if succeeded. |

### permit

```solidity
  function permit(
    address owner,
    address spender,
    uint256 amount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Triggers an approval from `owner` to `spender`.

#### Parameters:

| Name       | Type    | Description                                                      |
| :--------- | :------ | :--------------------------------------------------------------- |
| `owner`    | address | The address to approve from.                                     |
| `spender`  | address | The address to be approved.                                      |
| `amount`   | uint256 | The number of tokens that are approved (2^256-1 means infinite). |
| `deadline` | uint256 | The time at which to expire the signature.                       |
| `v`        | uint8   | The recovery byte of the signature.                              |
| `r`        | bytes32 | Half of the ECDSA signature pair.                                |
| `s`        | bytes32 | Half of the ECDSA signature pair.                                |

### \_mint

```solidity
  function _mint(
  ) internal
```

### \_burn

```solidity
  function _burn(
  ) internal
```

## Events

### Transfer

```solidity
  event Transfer(
  )
```

### Approval

```solidity
  event Approval(
  )
```
