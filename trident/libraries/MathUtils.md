A library that contains functions for calculating differences between two uint256.

## Functions

### within1

```solidity
  function within1(
    uint256 a,
    uint256 b
  ) internal returns (bool)
```

Compares a and b and returns 'true' if the difference between a and b
is less than 1 or equal to each other.

#### Parameters:

| Name | Type    | Description              |
| :--- | :------ | :----------------------- |
| `a`  | uint256 | uint256 to compare with. |
| `b`  | uint256 | uint256 to compare with. |
