1

Hex ValueInstruction NameRemoves from StackPushes to
StackDescriptionPseudocode

2

0s: Stop and Arithmetic Operations  
All arithmetic is modulo 2\*\*256 unless otherwise noted. The zero-th
power of zero 0\*\*0 is defined to be one.

3

0x00STOP00Halts execution.---

4

0x01ADD21Addition operation.a, b = stack.pop(2)  
stack.push(a + b)

5

0x02MUL21Multiplication operation.a, b = stack.pop(2)  
stack.push(a \* b)

6

0x03SUB21Subtraction operation.a, b = stack.pop(2)  
stack.push(a - b)

7

0x04DIV21Integer division operation.a, b = stack.pop(2)  
b == 0 ? stack.push(0) : stack.push(a / b)

8

0x05SDIV21Signed integer division operation (truncated).a, b =
stack.pop(2)  
if b == 0:  
stack.push(0)  
elif a == -2\*\*255 && b == -1:  
stack.push(-2\*\*255)  
else:  
s = floor(abs(a / b))  
stack.push(sgn(a/b) \* s)

9

0x06MOD21Modulo remainder operation.a, b = stack.pop(2)  
b == 0 ? stack.push(0) : stack.push(a % b)

10

0x07SMOD21Signed modulo remainder operation.a, b = stack.pop(2)  
if b == 0:  
stack.push(0)  
else:  
stack.push(sgn(a) \* (abs(a) % abs(b))

11

0x08ADDMOD31Modulo addition operation.a, b, c = stack.pop(3)  
c == 0 ? stack.push(0) : stack.push((a + b) % c)

12

0x09MULMOD31Modulo multiplication operation.a, b, c = stack.pop(3)  
c == 0 ? stack.push(0) : stack.push((a \* b) % c)

13

0x0AEXP21Exponential operation.a, b = stack.pop(2)  
stack.push(a\*\*b)

14

0x0BSIGNEXTEND21Extend length of two’s complement signed integer.a, b =
stack.pop(2)  
stack.push(extend_sign(a, b))

15

10s: Comparison & Bitwise Logic Operations

16

0x10LT21Less-than comparison.a, b = stack.pop(2)  
c = a < b ? 1 : 0  
stack.push(c)

17

0x11GT21Greater-than comparison.a, b = stack.pop(2)  
c = a > b ? 1 : 0  
stack.push(c)

18

0x12SLT21Signed less-than comparison.a, b = stack.pop(2)  
c = a < b ? 1 : 0  
stack.push(c)

19

0x13SGT21Signed greater-than comparison.a, b = stack.pop(2)  
c = a > b ? 1 : 0  
stack.push(c)

20

0x14EQ21Equality comparison.a, b = stack.pop(2)  
c = a == b ? 1 : 0  
stack.push(c)

21

0x15ISZERO11Simple not operator.a = stack.pop()  
c = a == 0 ? 1 : 0  
stack.push(c)

22

0x16AND21Bitwise AND operation.a, b = stack.pop(2)  
stack.push(a & b)

23

0x17OR21Bitwise OR operation.a, b = stack.pop(2)  
stack.push(a | b)

24

0x18XOR21Bitwise XOR operation.a, b = stack.pop(2)  
stack.push(a ^ b)

25

0x19NOT11Bitwise NOT operation.a = stack.pop()  
stack.push(~a)

26

0x1ABYTE21Retrieve single byte from word.n, v = stack.pop(2)  
byte = get_byte(v, n) # returns n'th byte from b  
stack.push(byte)

27

0x1BSHL21Left shift operation.to_shift, val = stack.pop(2)  
stack.push(val << to_shift)

28

0x1CSHR21Logical right shift operation.to_shift, val = stack.pop(2)  
stack.push(val >> to_shift)

29

0x1DSAR21Arithmetic (signed) right shift operation.to_shift, val =
stack.pop(2)  
stack.push(val >> uint(to_shift))

30

20s: SHA3

31

0x20SHA321Compute Keccak-256 hash.a, b = stack.pop(2)  
KEC = sha3(a, b)  
stack.push(KEC)

32

30s: Environmental Information

33

0x30ADDRESS01Get address of currently executing account.address =
exec_env.get_address()  
stack.push(address)

34

0x31BALANCE11Get balance of the given account.address = stack.pop()  
balance = STATE.get_balance(address)  
stack.push(balance)reads  
stack dependant

35

0x32ORIGIN01Get execution origination address.origin =
exec_env.get_origin()  
stack.push(origin)

36

0x33CALLER01Get caller address.caller = exec_env.get_caller()  
stack.push(caller)

37

0x34CALLVALUE01Get deposited value by the instruction/transaction
responsible for this execution.value = exec_env.get_value()  
stack.push(value)

38

0x35CALLDATALOAD11Get input data of current environment.offset =
stack.pop()  
bytes = exec_env.input\[offset:offset+32\]  
stack.push(bytes.to_uint256())

39

0x36CALLDATASIZE01Get size of input data in current environment.size =
exec_env.input.size()  
stack.push(size)

40

0x37CALLDATACOPY30Copy input data in current environment to
memory.mem_offset, data_offset, size = stack.pop(3)  
data = exec_env.input\[data_offset:data_offset + size\]  
memory\[mem_offset:mem_offset + size\] = data

41

0x38CODESIZE01Get size of code running in current environment.code_size
= exec_env.machine_code.size()  
stack.push(code_size)

42

0x39CODECOPY30Copy code running in current environment to
memory.mem_offset, code_offset, size = stack.pop(3)  
code = exec_env.machine_code\[code_offset:code_offset + size\]  
memory\[mem_offset:mem_offset + size\] = code

43

0x3AGASPRICE01Get price of gas in current environment.price =
exec_env.price  
stack.push(price)

44

0x3BEXTCODESIZE11Get size of an account’s code.address = stack.pop()  
code_size = STATE.get_code_size(address)  
stack.push(code_size)reads  
stack dependant

45

0x3CEXTCODECOPY40Copy an account’s code to memory.address, mem_offset,
code_offset, size = stack.pop(4)  
code = STATE.get_code(address)  
code_copy = code\[code_offset:code_offset + size\]  
memory\[mem_offset:mem_offset + size\] = code_copyreads  
stack dependant

46

0x3DRETURNDATASIZE01Get size of output data from the previous call from
the current environment.stack.push(return_data)

47

0x3ERETURNDATACOPY30Copy output data from the previous call to
memory.mem_offset, data_offset, size = stack.pop(3)  
data = return_data\[data_offset:data_offset + size\]  
memory\[mem_offset:mem_offset + size\] = data

48

0x3FEXTCODEHASH11Get hash of an account’s code.address = stack.pop()  
code_hash = STATE.get_code_hash(address)  
stack.push(code_hash)reads  
stack dependant

49

40s: Block Information

50

0x40BLOCKHASH11Get the hash of one of the 256 most recent complete
blocks.a = stack.pop()  
number = block.number  
result = hash_func(number, a, 0)  
stack.push(result)

51

0x41COINBASE01Get the current block’s beneficiary address.coin_base =
block.coin_base  
stack.push(coin_base)

52

0x42TIMESTAMP01Get the current block’s timestamp.timestamp =
block.timestamp  
stack.push(timestamp)

53

0x43NUMBER01Get the current block’s number.number = block.number  
stack.push(number)

54

0x44DIFFICULTY01Get the current block’s difficulty.difficulty =
block.difficulty  
stack.push(difficulty)

55

0x45GASLIMIT01Get the current block’s gas limit.gas_limit =
block.gas_limit  
stack.push(gas_limit)

56

0x46CHAINID01Get the chain ID.chain_id = exec_env.chain_info.id  
stack.push(chain_id)

57

0x47SELFBALANCE01Get balance of currently executing account.address =
exec_env.get_address()  
balance = STATE.get_balance(address)  
stack.push(balance)reads  
contract address

58

50s: Stack, Memory, Storage and Flow Operations

59

0x50POP10Remove item from stack.stack.pop()

60

0x51  
MLOAD11Load word from memory.offset = stack.pop()  
word = memory\[offset:offset + 32\] # byte array  
stack.push(word.to_uint256())

61

0x52MSTORE20Save word to memory.offset, value = stack.pop(2)  
memory\[offset:offset+32\] = value.to_bytes()

62

0x53MSTORE820Save byte to memory.offset, value = stack.pop(2)  
memory\[offset:offset+8\] = value.to_bytes()\[24:\]

63

0x54SLOAD11Load word from storage.idx = stack.pop()  
address = exec_env.get_address()  
storage = STATE.get_storage(address)  
stack.push(storage\[idx\])reads  
contract address

64

0x55SSTORE20Save word to storage.idx, value = stack.pop(2)  
address = exec_env.get_address()  
storage = STATE.get_storage(address)  
storage\[idx\] = valuewrites  
contract address

65

0x56JUMP10Alter the program counter.position = stack.pop()  
pc = position

66

0x57JUMPI20Conditionally alter the program counter.position, condition =
stack.pop(2)  
pc = condition != 0 ? position : position + 1

67

0x58PC01Get the value of the program counter prior to the increment
corresponding to this instruction.stack.push(pc)

68

0x59MSIZE01Get the size of active memory in
bytes.stack.push(memory.size())

69

0x5AGAS01Get the amount of available gas, including the corresponding
reduction for the cost of this instruction.gas = contract.gas  
stack.push(gas)

70

0x5BJUMPDEST00Mark a valid destination for jumps.  
This operation has no effect on machine state during execution.---

71

60s & 70s: Push Operations

72

0x60PUSH101Place 1 byte item on stack.code = exec_env.machine_code  
start, end = pc + 1, pc + 2  
stack.push(code\[start:end\])  
pc = end

73

0x61PUSH201Place 2-byte item on stack.code = exec_env.machine_code  
start, end = pc + 1, pc + 3  
stack.push(code\[start:end\])  
pc = end

74

...............

75

0x7FPUSH3201Place 32-byte (full word) item on stack.code =
exec_env.machine_code  
start, end = pc + 1, pc + 33  
stack.push(code\[start:end\])  
pc = end

76

80s: Duplication Operations

77

0x80DUP112Duplicate 1st stack item.stack.push(stack\[len(stack)-1\])

78

0x81DUP223Duplicate 2nd stack item.stack.push(stack\[len(stack)-2\])

79

...............

80

0x8FDUP161617Duplicate 16th stack
item.stack.push(stack\[len(stack)-16\])

81

90s: Exchange Operations

82

0x90SWAP122Exchange 1st and 2nd stack items.\_l = len(stack)  
stack\[\_l - 1\], stack\[\_l - 2\] = stack\[\_l - 2\], stack\[\_l - 1\]

83

0x91SWAP233Exchange 1st and 3rd stack items.\_l = len(stack)  
stack\[\_l - 1\], stack\[\_l - 3\] = stack\[\_l - 3\], stack\[\_l - 1\]

84

............

85

0x9FSWAP161717Exchange 1st and 17th stack items.\_l = len(stack)  
stack\[\_l - 1\], stack\[\_l - 16\] = stack\[\_l - 16\], stack\[\_l -
1\]

86

a0s: Logging Operations

87

0xA0LOG020Append log record with no topics.mem_start, mem_size =
stack.pop(2)  
data = memory\[mem_start: mem_start + mem_size\]  
topics = vector(0)  
STATE.add_log(contract.address(), topics, data, exec_env.block.number)

88

0xA1LOG130Append log record with one topic.mem_start, mem_size =
stack.pop(2)  
data = memory\[mem_start: mem_start + mem_size\]  
topics = vector(1)  
topics\[0\] = stack.pop().to_bytes()  
STATE.add_log(contract.address(), topics, data, exec_env.block.number)

89

...............

90

0xA4LOG460Append log record with four topics.mem_start, mem_size =
stack.pop(2)  
data = memory\[mem_start: mem_start + mem_size\]  
topics = vector(4)  
for i in 4:  
topics\[i\] = stack.pop().to_bytes()  
STATE.add_log(contract.address(), topics, data, exec_env.block.number)

91

f0s: System operations

92

0xF0CREATE31Create a new account with associated code.value, offset,
size = stack.pop(3)  
input = memory\[offset:offset + size\]  
gas = contract.gas  
return_val, addr, return_gas, success = CREATE(input, gas, value)  
success ? stack.push(addr) : stack.push(0)  
contract.gas += return_gascreates new  
execution frame

93

0xF1CALL71Message-call into an account.gas, addr, value, a_offset,
a_size, b_offset, b_size = stack.pop(7)  
input = memory\[a_offset:a_offset + a_size\]  
return_val, return_gas, success = CALL(addr, input, gas, value)  
success ? stack.push(1) : stack.push(0)  
memory\[b_offset:b_offset + b_size\] = return_val  
contract.gas += return_gas  
creates new  
execution frame

94

0xF2CALLCODE71Message-call into this account with an alternative
account’s code.gas, addr, value, a_offset, a_size, b_offset, b_size =
stack.pop(7)  
input = memory\[a_offset:a_offset + a_size\]  
return_val, return_gas, success = CALL_CODE(addr, input, gas, value)  
if success:  
stack.push(1)  
memory\[b_offset:b_offset + b_size\] = return_val  
else:  
stack.push(0)  
contract.gas += return_gascreates new  
execution frame

95

0xF3RETURN20Halt execution returning output data.offset, size =
stack.pop(2)  
output_data = memory\[offset:offset + size\]  
return output_data

96

0xF4DELEGATECALL61Message-call into this account with an alternative
account’s code, but persisting the current values for sender and
value.gas, addr, a_offset, a_size, b_offset, b_size = stack.pop(6)  
input = memory\[a_offset:a_offset + a_size\]  
return_val, return_gas, success = DELEGATE_CALL(addr, input, gas)  
if success:  
stack.push(1)  
memory\[b_offset:b_offset + b_size\] = return_val  
else:  
stack.push(0)  
contract.gas += return_gascreates new  
execution frame

97

0xF5CREATE241Create a new account with associated code.endowment,
offset, size, salt = stack.pop(4)  
input = memory\[offset:offset + size\]  
gas = contract.gas  
return_val, addr, return_gas, success = CREATE2(input, gas, endowment,
salt)  
success ? stack.push(addr) : stack.push(0)  
contract.gas += return_gascreates new  
execution frame

98

\-

99

\-

100

\-

101

\-

102

0xFASTATICCALL61Static message-call into an account.gas, addr, a_offset,
a_size, b_offset, b_size = stack.pop(6)  
input = memory\[a_offset:a_offset + a_size\]  
return_val, return_gas, success = STATIC_CALL(addr, input, gas)  
if success:  
stack.push(1)  
memory\[b_offset:b_offset + b_size\] = return_val  
else:  
stack.push(0)  
contract.gas += return_gascreates new  
execution frame

103

\-

104

\-

105

0xFDREVERT20Halt execution reverting state changes but returning data
and remaining gas.offset, size = stack.pop(2)  
data = memory\[offset:offset + size\]  
return data

106

0xFEINVALID--Designated invalid instruction.---

107

0xFFSELFDESTRUCT10Halt execution and register account for later
deletionaddr = stack.pop()  
caller = contract.address  
balance = STATE.get_balance(caller)  
STATE.add_balance(addr, balance)  
STATE.SUICIDE(caller)account deletion
