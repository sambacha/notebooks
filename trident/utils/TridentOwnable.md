Trident access control contract.

## Functions

### constructor

```solidity
  function constructor(
  ) public
```

Initialize and grant deployer account (`msg.sender`) `owner` access role.

### claimOwner

```solidity
  function claimOwner(
  ) external
```

`pendingOwner` can claim `owner` account.

### transferOwner

```solidity
  function transferOwner(
    address recipient,
    bool direct
  ) external
```

Transfer `owner` account.

#### Parameters:

| Name        | Type    | Description                                   |
| :---------- | :------ | :-------------------------------------------- |
| `recipient` | address | Account granted `owner` access control.       |
| `direct`    | bool    | If 'true', ownership is directly transferred. |

## Events

### TransferOwner

```solidity
  event TransferOwner(
  )
```

### TransferOwnerClaim

```solidity
  event TransferOwnerClaim(
  )
```
