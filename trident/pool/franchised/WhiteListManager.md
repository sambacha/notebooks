## Functions

### DOMAIN_SEPARATOR

```solidity
  function DOMAIN_SEPARATOR(
  ) public returns (bytes32 domainSeperator)
```

### whitelistAccount

```solidity
  function whitelistAccount(
  ) external
```

### setWhitelisting

```solidity
  function setWhitelisting(
    address operator,
    address account,
    bool approved,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Approves or revokes whitelisting for accounts.

#### Parameters:

| Name       | Type    | Description                                                  |
| :--------- | :------ | :----------------------------------------------------------- |
| `operator` | address | The address of the operator that approves or revokes access. |
| `account`  | address | The address who gains or loses access.                       |
| `approved` | bool    | If 'true', approves access - if 'false', revokes access.     |
| `deadline` | uint256 | The time at which to expire the signature.                   |
| `v`        | uint8   | The recovery byte of the signature.                          |
| `r`        | bytes32 | Half of the ECDSA signature pair.                            |
| `s`        | bytes32 | Half of the ECDSA signature pair.                            |

### isWhitelisted

```solidity
  function isWhitelisted(
  ) public returns (bool success)
```

\*\*\*\* WHITELISTING

Adapted from OpenZeppelin utilities and Uniswap merkle distributor.

### joinWhitelist

```solidity
  function joinWhitelist(
  ) external
```

### setMerkleRoot

```solidity
  function setMerkleRoot(
  ) external
```

## Events

### WhiteListAccount

```solidity
  event WhiteListAccount(
  )
```

### SetMerkleRoot

```solidity
  event SetMerkleRoot(
  )
```

### JoinWithMerkle

```solidity
  event JoinWithMerkle(
  )
```
