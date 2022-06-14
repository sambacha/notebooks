---
created: 2021-10-19T14:17:53 (UTC -07:00)
tags: []
source: file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga06fc87d81c62e9abb8790b6e5713c55ba1db9144f8af4e62865f0c003c07a02bc
author: 
---

# EVMC: EVMC

> ## Excerpt
> EVMC: Ethereum Client-VM Connector API.  
More...

---
EVMC: Ethereum Client-VM Connector API. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#details)

## Classes

struct  

[evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html)

 

The fixed size array of 32 bytes. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html#details)  

 

struct  

[evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html)

 

Big-endian 160-bit hash suitable for keeping an Ethereum address. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html#details)  

 

struct  

[evmc\_message](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html)

 

The message describing an EVM call, including a zero-depth calls from a transaction origin. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html#details)  

 

struct  

[evmc\_tx\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__tx__context.html)

 

The transaction and block data for execution. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__tx__context.html#details)  

 

struct  

[evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html)

 

The EVM code execution result. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html#details)  

 

struct  

[evmc\_host\_interface](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__interface.html)

 

The Host interface. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__interface.html#details)  

 

struct  

[evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html)

 

The VM instance. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html#details)  

 

struct  

[evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html)

 

The opaque data type representing the Host execution context. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html#details)  

 

## Typedefs

typedef struct [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) 

[evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab19677b7977fc98a8d1182256486c8e9)

 

The fixed size array of 32 bytes. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab19677b7977fc98a8d1182256486c8e9)  

 

typedef struct [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) 

[evmc\_uint256be](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga260738d59f9a23d039dc7a290e0c0a3b)

 

The alias for [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html "The fixed size array of 32 bytes.") to represent a big-endian 256-bit integer. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga260738d59f9a23d039dc7a290e0c0a3b)  

 

typedef struct [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) 

[evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga0a566da7d9e3c337abf4ef4045d8f5c5)

 

Big-endian 160-bit hash suitable for keeping an Ethereum address. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga0a566da7d9e3c337abf4ef4045d8f5c5)  

 

typedef struct [evmc\_tx\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__tx__context.html)(\* 

[evmc\_get\_tx\_context\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7b403c029b5b9ad627ffafb8c41ac84b)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context)

 

Get transaction context callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7b403c029b5b9ad627ffafb8c41ac84b)  

 

typedef [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html)(\* 

[evmc\_get\_block\_hash\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga97c2981658d797d3031720a54740a4b3)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, int64\_t number)

 

Get block hash callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga97c2981658d797d3031720a54740a4b3)  

 

typedef void(\* 

[evmc\_release\_result\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga297c7c7ca966c82296a54683143157b1)) (const struct [evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html) \*result)

 

Releases resources assigned to an execution result. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga297c7c7ca966c82296a54683143157b1)  

 

typedef bool(\* 

[evmc\_account\_exists\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4c5464305402bf2a10d94bf2d828d82b)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address)

 

Check account existence callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4c5464305402bf2a10d94bf2d828d82b)  

 

typedef [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html)(\* 

[evmc\_get\_storage\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7aff77bf67e8fad5819807b8aafff7cb)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, const [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) \*key)

 

Get storage callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7aff77bf67e8fad5819807b8aafff7cb)  

 

typedef enum [evmc\_storage\_status](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae012fd6b8e5c23806b507c2d3e9fb1aa)(\* 

[evmc\_set\_storage\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaf7481ac7c3f1071d5d4d8256d0687e83)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, const [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) \*key, const [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) \*value)

 

Set storage callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaf7481ac7c3f1071d5d4d8256d0687e83)  

 

typedef [evmc\_uint256be](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga260738d59f9a23d039dc7a290e0c0a3b)(\* 

[evmc\_get\_balance\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga5208ee08734b69bb0a28793f0ecfbc48)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address)

 

Get balance callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga5208ee08734b69bb0a28793f0ecfbc48)  

 

typedef size\_t(\* 

[evmc\_get\_code\_size\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga38e37a3a70dec828829cccb461e99de2)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address)

 

Get code size callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga38e37a3a70dec828829cccb461e99de2)  

 

typedef [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html)(\* 

[evmc\_get\_code\_hash\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7971754ea6e237ffb9e9b7ab102fa16e)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address)

 

Get code hash callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7971754ea6e237ffb9e9b7ab102fa16e)  

 

typedef size\_t(\* 

[evmc\_copy\_code\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7dc696d1491951200ac5dc4f852a4499)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, size\_t code\_offset, uint8\_t \*buffer\_data, size\_t buffer\_size)

 

Copy code callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7dc696d1491951200ac5dc4f852a4499)  

 

typedef void(\* 

[evmc\_selfdestruct\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga72021774388d535436b0c532f8c6de6c)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*beneficiary)

 

Selfdestruct callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga72021774388d535436b0c532f8c6de6c)  

 

typedef void(\* 

[evmc\_emit\_log\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaab96621b67d653758b3da15c2b596938)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, const uint8\_t \*data, size\_t data\_size, const [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) topics\[\], size\_t topics\_count)

 

Log callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaab96621b67d653758b3da15c2b596938)  

 

typedef enum [evmc\_access\_status](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9f71195f3873f9979d81d7a5e1b3aaf0)(\* 

[evmc\_access\_account\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga8eb6233115c660f8d779eb9b132e93c5)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address)

 

Access account callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga8eb6233115c660f8d779eb9b132e93c5)  

 

typedef enum [evmc\_access\_status](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9f71195f3873f9979d81d7a5e1b3aaf0)(\* 

[evmc\_access\_storage\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gac33551d757c3762e4cc3dd9bdfeee356)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, const [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html) \*key)

 

Access storage callback function. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gac33551d757c3762e4cc3dd9bdfeee356)  

 

typedef struct [evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html)(\* 

[evmc\_call\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga54f569386b52be6eee15ca9e14ed1ef8)) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const struct [evmc\_message](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html) \*msg)

 

Pointer to the callback function supporting EVM calls. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga54f569386b52be6eee15ca9e14ed1ef8)  

 

typedef void(\* 

[evmc\_destroy\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga1f54475fc7dc20a0c4d370272e39d755)) (struct [evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html) \*vm)

 

Destroys the VM instance. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga1f54475fc7dc20a0c4d370272e39d755)  

 

typedef enum [evmc\_set\_option\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga28d9f527bda67277bccccc100e32260a)(\* 

[evmc\_set\_option\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga5531cee5b83d76c71b06475454f4633b)) (struct [evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html) \*vm, char const \*name, char const \*value)

 

Configures the VM instance. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga5531cee5b83d76c71b06475454f4633b)  

 

typedef struct [evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html)(\* 

[evmc\_execute\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaed9a4ab5609b55c5e3272d6d37d84ff7)) (struct [evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html) \*vm, const struct [evmc\_host\_interface](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__interface.html) \*host, struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, enum [evmc\_revision](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae5759b1590071966ccf6a505b52a0ef7) rev, const struct [evmc\_message](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html) \*msg, uint8\_t const \*code, size\_t code\_size)

 

Executes the given code using the input from the message. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaed9a4ab5609b55c5e3272d6d37d84ff7)  

 

typedef uint32\_t 

[evmc\_capabilities\_flagset](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga714bc8ca946adc759403fe072bdd2aa0)

 

Alias for unsigned integer representing a set of bit flags of EVMC capabilities. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga714bc8ca946adc759403fe072bdd2aa0)  

 

typedef [evmc\_capabilities\_flagset](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga714bc8ca946adc759403fe072bdd2aa0)(\* 

[evmc\_get\_capabilities\_fn](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9bac25459c5a09d42606e7bd9320445c)) (struct [evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html) \*vm)

 

Return the supported capabilities of the VM instance. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9bac25459c5a09d42606e7bd9320445c)  

 

## Enumerations

enum  

{ [EVMC\_ABI\_VERSION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga06fc87d81c62e9abb8790b6e5713c55ba1db9144f8af4e62865f0c003c07a02bc) = 10 }

 

enum  

[evmc\_call\_kind](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab2fa68a92a6828064a61e46060abc634) {  
  [EVMC\_CALL](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggab2fa68a92a6828064a61e46060abc634abcf3ae29d9a88ff70b98374fc665694a) = 0 , [EVMC\_DELEGATECALL](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggab2fa68a92a6828064a61e46060abc634a6face22070bace91b429297e88d3ab1a) = 1 , [EVMC\_CALLCODE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggab2fa68a92a6828064a61e46060abc634ae9c5b431a0c823f368341c9f026642ef) = 2 , [EVMC\_CREATE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggab2fa68a92a6828064a61e46060abc634a1d15450429f540677caea05143344d33) = 3 ,  
  [EVMC\_CREATE2](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggab2fa68a92a6828064a61e46060abc634a9ec7e0da8dde8e9bc420d806c621b418) = 4  
}

 

The kind of call-like instruction. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab2fa68a92a6828064a61e46060abc634)  

 

enum  

[evmc\_flags](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga187a3a658849da19a0c4e8f7b51fa70d) { [EVMC\_STATIC](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga187a3a658849da19a0c4e8f7b51fa70da1d8bef8b2bd39a6bd1936e87b18e95bf) = 1 }

 

The flags for [evmc\_message](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html "The message describing an EVM call, including a zero-depth calls from a transaction origin."). [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga187a3a658849da19a0c4e8f7b51fa70d)  

 

enum  

[evmc\_status\_code](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4c0be97f333c050ff45321fcaa34d920) {  
  [EVMC\_SUCCESS](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a4bc3069fec2bab2a55355a72b7db68b7) = 0 , [EVMC\_FAILURE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920aed5b2a4afa5a47af732569445920a4a9) = 1 , [EVMC\_REVERT](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920aed708e84d49cc1270e54ec20b0ca0a05) = 2 , [EVMC\_OUT\_OF\_GAS](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920abfc47f75656c996c0b29c0553c00fc18) = 3 ,  
  [EVMC\_INVALID\_INSTRUCTION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a8ea4f35a269f5fd3a722f2054c993637) = 4 , [EVMC\_UNDEFINED\_INSTRUCTION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a443084a263a2325f1e4c629e97685367) = 5 , [EVMC\_STACK\_OVERFLOW](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920ae1a613949fe1c994a36488b0bc4c86c4) = 6 , [EVMC\_STACK\_UNDERFLOW](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a640106fdec78d04a1098c512898d4efc) = 7 ,  
  [EVMC\_BAD\_JUMP\_DESTINATION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a6acf000dfa802a949063a87046f4bb26) = 8 , [EVMC\_INVALID\_MEMORY\_ACCESS](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a2981ec30896486ac69bab7c0a1be591b) = 9 , [EVMC\_CALL\_DEPTH\_EXCEEDED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920ac139d631ff852379d566c8a60f86ddc0) = 10 , [EVMC\_STATIC\_MODE\_VIOLATION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a92ccaaeb3fd1ee5aa1ad022678c13bac) = 11 ,  
  [EVMC\_PRECOMPILE\_FAILURE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920ab960d50047f87925e540bee6230aafb7) = 12 , [EVMC\_CONTRACT\_VALIDATION\_FAILURE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920ac0e1bf525f51da5b3d34d4f67ca549e1) = 13 , [EVMC\_ARGUMENT\_OUT\_OF\_RANGE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a1cc537c5875de1b42aa5d556f33223d8) = 14 , [EVMC\_WASM\_UNREACHABLE\_INSTRUCTION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920ac99fbd9645011663df070ae3c367eb4e) = 15 ,  
  [EVMC\_WASM\_TRAP](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920aaf0c6c7a736ec498bd390884f143e57b) = 16 , [EVMC\_INSUFFICIENT\_BALANCE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a12f7061f20d077ce0d14ca86b2d5975d) = 17 , [EVMC\_INTERNAL\_ERROR](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920abb1dcac202eac2ed8fd3025645a2fb28) = -1 , [EVMC\_REJECTED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a2f3e0d8777f8d974ead27ae2a6eb2005) = -2 ,  
  [EVMC\_OUT\_OF\_MEMORY](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a63aa9b3ac3af61c39c20562509347b86) = -3  
}

 

The execution status code. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4c0be97f333c050ff45321fcaa34d920)  

 

enum  

[evmc\_storage\_status](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae012fd6b8e5c23806b507c2d3e9fb1aa) {  
  [EVMC\_STORAGE\_UNCHANGED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae012fd6b8e5c23806b507c2d3e9fb1aaad6d527edcbe8a63edad5be80f252330c) = 0 , [EVMC\_STORAGE\_MODIFIED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae012fd6b8e5c23806b507c2d3e9fb1aaaf102ce749767d5277923c221089da2c6) = 1 , [EVMC\_STORAGE\_MODIFIED\_AGAIN](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae012fd6b8e5c23806b507c2d3e9fb1aaa072394aca7925f8de8facf8f8a5e477c) = 2 , [EVMC\_STORAGE\_ADDED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae012fd6b8e5c23806b507c2d3e9fb1aaa8afd1741edf799d44264654d9f04a5a9) = 3 ,  
  [EVMC\_STORAGE\_DELETED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae012fd6b8e5c23806b507c2d3e9fb1aaae5b6ea5ec988f3b3ceb323ce3c0fa53f) = 4  
}

 

The effect of an attempt to modify a contract storage item. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae012fd6b8e5c23806b507c2d3e9fb1aa)  

 

enum  

[evmc\_access\_status](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9f71195f3873f9979d81d7a5e1b3aaf0) { [EVMC\_ACCESS\_COLD](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga9f71195f3873f9979d81d7a5e1b3aaf0a3a719b69a4c3f9d6b9913b47312b5a76) = 0 , [EVMC\_ACCESS\_WARM](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga9f71195f3873f9979d81d7a5e1b3aaf0a584ba0f1ab5c1e5e8a126fdcdde5d994) = 1 }

 

Access status per EIP-2929: Gas cost increases for state access opcodes. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9f71195f3873f9979d81d7a5e1b3aaf0)  

 

enum  

[evmc\_set\_option\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga28d9f527bda67277bccccc100e32260a) { [EVMC\_SET\_OPTION\_SUCCESS](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga28d9f527bda67277bccccc100e32260aa4e458cfd9a8d5da0ed5e93a3d3ad5d3b) = 0 , [EVMC\_SET\_OPTION\_INVALID\_NAME](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga28d9f527bda67277bccccc100e32260aa462712eea718b1a9088aaaf995bcb80e) = 1 , [EVMC\_SET\_OPTION\_INVALID\_VALUE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga28d9f527bda67277bccccc100e32260aa7be8628edb4ac9b2d195894f112d0924) = 2 }

 

Possible outcomes of evmc\_set\_option. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga28d9f527bda67277bccccc100e32260a)  

 

enum  

[evmc\_revision](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae5759b1590071966ccf6a505b52a0ef7) {  
  [EVMC\_FRONTIER](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a622480509359764aa2a258b074812a5f) = 0 , [EVMC\_HOMESTEAD](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a04f0bf686d2b1c50612f9a96480f70a9) = 1 , [EVMC\_TANGERINE\_WHISTLE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a8305858ab32b80a6eced7bf177d6dee2) = 2 , [EVMC\_SPURIOUS\_DRAGON](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7abbbcae1af73ad1efc570b40bb0363879) = 3 ,  
  [EVMC\_BYZANTIUM](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7ac4b0c9cfb5d408f17255a15e26938ea6) = 4 , [EVMC\_CONSTANTINOPLE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a7a2ed5cf3d25c8c4a68691721bb969fc) = 5 , [EVMC\_PETERSBURG](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a6d913d4917e87b1fc798b450735acdeb) = 6 , [EVMC\_ISTANBUL](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a5f0e287935fd0afd65afea34b51dcf8c) = 7 ,  
  [EVMC\_BERLIN](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7af53e0cb0d793d60b5fb07c6b4c3c6ab7) = 8 , [EVMC\_LONDON](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7acfe86739fa2a0882d49cf19a94d8ee09) = 9 , [EVMC\_SHANGHAI](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7ac79d6325f9e74fd00a6b98eaea3e30a5) = 10 , [EVMC\_MAX\_REVISION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a8b67f41f15bc079b8ad40dcd7156f576) = EVMC\_SHANGHAI ,  
  [EVMC\_LATEST\_STABLE\_REVISION](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ggae5759b1590071966ccf6a505b52a0ef7a0dd8bdd55816359290e8fb8648aeb03e) = EVMC\_LONDON  
}

 

EVM revision. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae5759b1590071966ccf6a505b52a0ef7)  

 

enum  

[evmc\_capabilities](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga44f9ecb88cf6422a0072936494fd6ac7) { [EVMC\_CAPABILITY\_EVM1](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga44f9ecb88cf6422a0072936494fd6ac7a36fd3cfe936b9525eed7f88a7b43a2a8) = (1u << 0) , [EVMC\_CAPABILITY\_EWASM](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga44f9ecb88cf6422a0072936494fd6ac7af1240f950b5b9ca4369bcac424443e54) = (1u << 1) , [EVMC\_CAPABILITY\_PRECOMPILES](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga44f9ecb88cf6422a0072936494fd6ac7a43ea2aa7b099a2d67bc53c118ff3683d) = (1u << 2) }

 

Possible capabilities of a VM. [More...](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga44f9ecb88cf6422a0072936494fd6ac7)  

 

EVMC: Ethereum Client-VM Connector API.

Copyright

Copyright 2016-2019 The EVMC Authors. Licensed under the Apache License, Version 2.0.

## Terms

1.  **VM** – An Ethereum Virtual Machine instance/implementation.
2.  **Host** – An entity controlling the VM. The Host requests code execution and responses to VM queries by callback functions. This usually represents an Ethereum Client.

## Responsibilities

### VM

-   Executes the code (obviously).
-   Calculates the running gas cost and manages the gas counter except the refund counter.
-   Controls the call depth, including the exceptional termination of execution in case the maximum depth is reached.

### Host

-   Provides access to State.
-   Creates new accounts (with code being a result of VM execution).
-   Handles refunds entirely.
-   Manages the set of precompiled contracts and handles execution of messages coming to them.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab420e51ab90ccc579dce3f6860b69627) EVMC\_DEPRECATED

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga8eb6233115c660f8d779eb9b132e93c5) evmc\_access\_account\_fn

Access account callback function.

This callback function is used by a VM to add the given address to accessed\_addresses substate (EIP-2929).

Parameters

context

The Host execution context.

address

The address of the account.

Returns

EVMC\_ACCESS\_WARM if accessed\_addresses already contained the address or EVMC\_ACCESS\_COLD otherwise.

Definition at line [647](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00647) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gac33551d757c3762e4cc3dd9bdfeee356) evmc\_access\_storage\_fn

Access storage callback function.

This callback function is used by a VM to add the given account storage entry to accessed\_storage\_keys substate (EIP-2929).

Parameters

context

The Host execution context.

address

The address of the account.

key

The index of the account's storage entry.

Returns

EVMC\_ACCESS\_WARM if accessed\_storage\_keys already contained the key or EVMC\_ACCESS\_COLD otherwise.

Definition at line [647](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00647) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4c5464305402bf2a10d94bf2d828d82b) evmc\_account\_exists\_fn

Check account existence callback function.

This callback function is used by the VM to check if there exists an account at given address.

Parameters

context

The pointer to the Host execution context.

address

The address of the account the query is about.

Returns

true if exists, false otherwise.

Definition at line [480](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00480) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga0a566da7d9e3c337abf4ef4045d8f5c5) evmc\_address

Big-endian 160-bit hash suitable for keeping an Ethereum address.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab19677b7977fc98a8d1182256486c8e9) evmc\_bytes32

The fixed size array of 32 bytes.

32 bytes of data capable of storing e.g. 256-bit hashes.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga54f569386b52be6eee15ca9e14ed1ef8) evmc\_call\_fn

Pointer to the callback function supporting EVM calls.

Parameters

context

The pointer to the Host execution context.

msg

The call parameters.

Returns

The result of the call.

Definition at line [647](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00647) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga714bc8ca946adc759403fe072bdd2aa0) evmc\_capabilities\_flagset

Alias for unsigned integer representing a set of bit flags of EVMC capabilities.

See also

[evmc\_capabilities](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga44f9ecb88cf6422a0072936494fd6ac7 "Possible capabilities of a VM.")

Definition at line [960](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00960) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7dc696d1491951200ac5dc4f852a4499) evmc\_copy\_code\_fn

typedef size\_t(\* evmc\_copy\_code\_fn) (struct [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html) \*context, const [evmc\_address](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__address.html) \*address, size\_t code\_offset, uint8\_t \*buffer\_data, size\_t buffer\_size)

Copy code callback function.

This callback function is used by an EVM to request a copy of the code of the given account to the memory buffer provided by the EVM. The Client MUST copy the requested code, starting with the given offset, to the provided memory buffer up to the size of the buffer or the size of the code, whichever is smaller.

Parameters

context

The pointer to the Host execution context. See [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html "The opaque data type representing the Host execution context.").

address

The address of the account.

code\_offset

The offset of the code to copy.

buffer\_data

The pointer to the memory buffer allocated by the EVM to store a copy of the requested code.

buffer\_size

The size of the memory buffer.

Returns

The number of bytes copied to the buffer by the Client.

Definition at line [614](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00614) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga1f54475fc7dc20a0c4d370272e39d755) evmc\_destroy\_fn

typedef void(\* evmc\_destroy\_fn) (struct [evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html) \*vm)

Destroys the VM instance.

Parameters

vm

The VM instance to be destroyed.

Definition at line [772](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00772) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaab96621b67d653758b3da15c2b596938) evmc\_emit\_log\_fn

Log callback function.

This callback function is used by an EVM to inform about a LOG that happened during an EVM bytecode execution.

Parameters

context

The pointer to the Host execution context. See [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html "The opaque data type representing the Host execution context.").

address

The address of the contract that generated the log.

data

The pointer to unindexed data attached to the log.

data\_size

The length of the data.

topics

The pointer to the array of topics attached to the log.

topics\_count

The number of the topics. Valid values are between 0 and 4 inclusively.

Definition at line [647](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00647) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaed9a4ab5609b55c5e3272d6d37d84ff7) evmc\_execute\_fn

Executes the given code using the input from the message.

This function MAY be invoked multiple times for a single VM instance.

Parameters

vm

The VM instance. This argument MUST NOT be NULL.

host

The Host interface. This argument MUST NOT be NULL unless the `vm` has the [EVMC\_CAPABILITY\_PRECOMPILES](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga44f9ecb88cf6422a0072936494fd6ac7a43ea2aa7b099a2d67bc53c118ff3683d "The VM is capable of executing the precompiled contracts defined for the range of code addresses.") capability.

context

The opaque pointer to the Host execution context. This argument MAY be NULL. The VM MUST pass the same pointer to the methods of the `host` interface. The VM MUST NOT dereference the pointer.

rev

The requested EVM specification revision.

msg

The call parameters. See [evmc\_message](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html "The message describing an EVM call, including a zero-depth calls from a transaction origin."). This argument MUST NOT be NULL.

code

The reference to the code to be executed. This argument MAY be NULL.

code\_size

The length of the code. If `code` is NULL this argument MUST be 0.

Returns

The execution result.

Definition at line [772](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00772) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga5208ee08734b69bb0a28793f0ecfbc48) evmc\_get\_balance\_fn

Get balance callback function.

This callback function is used by a VM to query the balance of the given account.

Parameters

context

The pointer to the Host execution context.

address

The address of the account.

Returns

The balance of the given account or 0 if the account does not exist.

Definition at line [567](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00567) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga97c2981658d797d3031720a54740a4b3) evmc\_get\_block\_hash\_fn

Get block hash callback function.

This callback function is used by a VM to query the hash of the header of the given block. If the information about the requested block is not available, then this is signalled by returning null bytes.

Parameters

context

The pointer to the Host execution context.

number

The block number.

Returns

The block hash or null bytes if the information about the block is not available.

Definition at line [237](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00237) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9bac25459c5a09d42606e7bd9320445c) evmc\_get\_capabilities\_fn

Return the supported capabilities of the VM instance.

This function MAY be invoked multiple times for a single VM instance, and its value MAY be influenced by calls to [evmc\_vm::set\_option](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html#a20fd85c822ba5f3296206fc8fe3e90b2 "Optional pointer to function modifying VM's options.").

Parameters

Returns

The supported capabilities of the VM.

See also

[evmc\_capabilities](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga44f9ecb88cf6422a0072936494fd6ac7 "Possible capabilities of a VM.").

Definition at line [971](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00971) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7971754ea6e237ffb9e9b7ab102fa16e) evmc\_get\_code\_hash\_fn

Get code hash callback function.

This callback function is used by a VM to get the keccak256 hash of the code stored in the account at the given address. For existing accounts not having a code, this function returns keccak256 hash of empty data.

Parameters

context

The pointer to the Host execution context.

address

The address of the account.

Returns

The hash of the code in the account or null bytes if the account does not exist.

Definition at line [594](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00594) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga38e37a3a70dec828829cccb461e99de2) evmc\_get\_code\_size\_fn

Get code size callback function.

This callback function is used by a VM to get the size of the code stored in the account at the given address.

Parameters

context

The pointer to the Host execution context.

address

The address of the account.

Returns

The size of the code in the account or 0 if the account does not exist.

Definition at line [580](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00580) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7aff77bf67e8fad5819807b8aafff7cb) evmc\_get\_storage\_fn

Get storage callback function.

This callback function is used by a VM to query the given account storage entry.

Parameters

context

The Host execution context.

address

The address of the account.

key

The index of the account's storage entry.

Returns

The storage value at the given storage key or null bytes if the account does not exist.

Definition at line [494](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00494) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga7b403c029b5b9ad627ffafb8c41ac84b) evmc\_get\_tx\_context\_fn

Get transaction context callback function.

This callback function is used by an EVM to retrieve the transaction and block context.

Parameters

context

The pointer to the Host execution context.

Returns

The transaction context.

Definition at line [65](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00065) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga297c7c7ca966c82296a54683143157b1) evmc\_release\_result\_fn

typedef void(\* evmc\_release\_result\_fn) (const struct [evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html) \*result)

Releases resources assigned to an execution result.

This function releases memory (and other resources, if any) assigned to the specified execution result making the result object invalid.

Parameters

result

The execution result which resources are to be released. The result itself it not modified by this function, but becomes invalid and user MUST discard it as well. This MUST NOT be NULL.

Note

The result is passed by pointer to avoid (shallow) copy of the [evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html "The EVM code execution result.") struct. Think of this as the best possible C language approximation to passing objects by reference.

Definition at line [388](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00388) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga72021774388d535436b0c532f8c6de6c) evmc\_selfdestruct\_fn

Selfdestruct callback function.

This callback function is used by an EVM to SELFDESTRUCT given contract. The execution of the contract will not be stopped, that is up to the EVM.

Parameters

context

The pointer to the Host execution context. See [evmc\_host\_context](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__host__context.html "The opaque data type representing the Host execution context.").

address

The address of the contract to be selfdestructed.

beneficiary

The address where the remaining ETH is going to be transferred.

Definition at line [630](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00630) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga5531cee5b83d76c71b06475454f4633b) evmc\_set\_option\_fn

Configures the VM instance.

Allows modifying options of the VM instance. Options:

-   code cache behavior: on, off, read-only, ...
-   optimizations,

Parameters

vm

The VM instance to be configured.

name

The option name. NULL-terminated string. Cannot be NULL.

value

The new option value. NULL-terminated string. Cannot be NULL.

Returns

The outcome of the operation.

Definition at line [772](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00772) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gaf7481ac7c3f1071d5d4d8256d0687e83) evmc\_set\_storage\_fn

Set storage callback function.

This callback function is used by a VM to update the given account storage entry. The VM MUST make sure that the account exists. This requirement is only a formality because VM implementations only modify storage of the account of the current execution context (i.e. referenced by [evmc\_message::recipient](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html#a63643daa5f3a30df28d42360a20e39e2 "The recipient of the message.")).

Parameters

context

The pointer to the Host execution context.

address

The address of the account.

key

The index of the storage entry.

value

The value to be stored.

Returns

The effect on the storage item.

Definition at line [494](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00494) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga260738d59f9a23d039dc7a290e0c0a3b) evmc\_uint256be

The alias for [evmc\_bytes32](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__bytes32.html "The fixed size array of 32 bytes.") to represent a big-endian 256-bit integer.

Definition at line [65](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00065) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga06fc87d81c62e9abb8790b6e5713c55b) anonymous enum

Enumerator

EVMC\_ABI\_VERSION 

The EVMC ABI version number of the interface declared in this file.

The EVMC ABI version always equals the major version number of the EVMC project. The Host SHOULD check if the ABI versions match when dynamically loading VMs.

See also

[Versioning](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/index.html#versioning)

Definition at line [37](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00037) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

38{

48};

@ EVMC\_ABI\_VERSION

The EVMC ABI version number of the interface declared in this file.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga9f71195f3873f9979d81d7a5e1b3aaf0) evmc\_access\_status

Access status per EIP-2929: Gas cost increases for state access opcodes.

Enumerator

EVMC\_ACCESS\_COLD 

The entry hasn't been accessed before – it's the first access.

EVMC\_ACCESS\_WARM 

The entry is already in accessed\_addresses or accessed\_storage\_keys.

Definition at line [657](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00657) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

658{

663

668};

@ EVMC\_ACCESS\_COLD

The entry hasn't been accessed before – it's the first access.

@ EVMC\_ACCESS\_WARM

The entry is already in accessed\_addresses or accessed\_storage\_keys.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gab2fa68a92a6828064a61e46060abc634) evmc\_call\_kind

The kind of call-like instruction.

Enumerator

EVMC\_CALL 

Request CALL.

EVMC\_DELEGATECALL 

Request DELEGATECALL.

Valid since Homestead. The value param ignored.

EVMC\_CALLCODE 

Request CALLCODE.

EVMC\_CREATE 

Request CREATE.

EVMC\_CREATE2 

Request CREATE2.

Valid since Constantinople.

Definition at line [75](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00075) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

76{

83};

@ EVMC\_CREATE

Request CREATE.

@ EVMC\_DELEGATECALL

Request DELEGATECALL.

@ EVMC\_CREATE2

Request CREATE2.

@ EVMC\_CALLCODE

Request CALLCODE.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga44f9ecb88cf6422a0072936494fd6ac7) evmc\_capabilities

Possible capabilities of a VM.

Enumerator

EVMC\_CAPABILITY\_EVM1 

The VM is capable of executing EVM1 bytecode.

EVMC\_CAPABILITY\_EWASM 

The VM is capable of executing ewasm bytecode.

EVMC\_CAPABILITY\_PRECOMPILES 

The VM is capable of executing the precompiled contracts defined for the range of code addresses.

The EIP-1352 ([https://eips.ethereum.org/EIPS/eip-1352](https://eips.ethereum.org/EIPS/eip-1352)) specifies the range 0x000...0000 - 0x000...ffff of addresses reserved for precompiled and system contracts.

This capability is **experimental** and MAY be removed without notice.

Definition at line [930](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00930) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

931{

936

941

953};

@ EVMC\_CAPABILITY\_EVM1

The VM is capable of executing EVM1 bytecode.

@ EVMC\_CAPABILITY\_PRECOMPILES

The VM is capable of executing the precompiled contracts defined for the range of code addresses.

@ EVMC\_CAPABILITY\_EWASM

The VM is capable of executing ewasm bytecode.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga187a3a658849da19a0c4e8f7b51fa70d) evmc\_flags

The flags for [evmc\_message](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__message.html "The message describing an EVM call, including a zero-depth calls from a transaction origin.").

Enumerator

EVMC\_STATIC 

Static call mode.

Definition at line [86](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00086) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

87{

89};

@ EVMC\_STATIC

Static call mode.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae5759b1590071966ccf6a505b52a0ef7) evmc\_revision

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga28d9f527bda67277bccccc100e32260a) evmc\_set\_option\_result

Possible outcomes of evmc\_set\_option.

Enumerator

EVMC\_SET\_OPTION\_SUCCESS 

EVMC\_SET\_OPTION\_INVALID\_NAME 

EVMC\_SET\_OPTION\_INVALID\_VALUE 

Definition at line [777](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00777) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

778{

782};

@ EVMC\_SET\_OPTION\_INVALID\_NAME

@ EVMC\_SET\_OPTION\_SUCCESS

@ EVMC\_SET\_OPTION\_INVALID\_VALUE

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4c0be97f333c050ff45321fcaa34d920) evmc\_status\_code

The execution status code.

Successful execution is represented by [EVMC\_SUCCESS](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a4bc3069fec2bab2a55355a72b7db68b7 "Execution finished with success.") having value 0.

Positive values represent failures defined by VM specifications with generic [EVMC\_FAILURE](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920aed5b2a4afa5a47af732569445920a4a9 "Generic execution failure.") code of value 1.

Status codes with negative values represent VM internal errors not provided by EVM specifications. These errors MUST not be passed back to the caller. They MAY be handled by the Client in predefined manner (see e.g. [EVMC\_REJECTED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a2f3e0d8777f8d974ead27ae2a6eb2005 "The execution of the given code and/or message has been rejected by the EVM implementation.")), otherwise internal errors are not recoverable. The generic representant of errors is [EVMC\_INTERNAL\_ERROR](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920abb1dcac202eac2ed8fd3025645a2fb28 "EVM implementation generic internal error.") but an EVM implementation MAY return negative status codes that are not defined in the EVMC documentation.

Note

In case new status codes are needed, please create an issue or pull request in the EVMC repository ([https://github.com/ethereum/evmc](https://github.com/ethereum/evmc)).

Enumerator

EVMC\_SUCCESS 

Execution finished with success.

EVMC\_FAILURE 

Generic execution failure.

EVMC\_REVERT 

Execution terminated with REVERT opcode.

In this case the amount of gas left MAY be non-zero and additional output data MAY be provided in [evmc\_result](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__result.html "The EVM code execution result.").

EVMC\_OUT\_OF\_GAS 

The execution has run out of gas.

EVMC\_INVALID\_INSTRUCTION 

The designated INVALID instruction has been hit during execution.

The EIP-141 ([https://github.com/ethereum/EIPs/blob/master/EIPS/eip-141.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-141.md)) defines the instruction 0xfe as INVALID instruction to indicate execution abortion coming from high-level languages. This status code is reported in case this INVALID instruction has been encountered.

EVMC\_UNDEFINED\_INSTRUCTION 

An undefined instruction has been encountered.

EVMC\_STACK\_OVERFLOW 

The execution has attempted to put more items on the EVM stack than the specified limit.

EVMC\_STACK\_UNDERFLOW 

Execution of an opcode has required more items on the EVM stack.

EVMC\_BAD\_JUMP\_DESTINATION 

Execution has violated the jump destination restrictions.

EVMC\_INVALID\_MEMORY\_ACCESS 

Tried to read outside memory bounds.

An example is RETURNDATACOPY reading past the available buffer.

EVMC\_CALL\_DEPTH\_EXCEEDED 

Call depth has exceeded the limit (if any)

EVMC\_STATIC\_MODE\_VIOLATION 

Tried to execute an operation which is restricted in static mode.

EVMC\_PRECOMPILE\_FAILURE 

A call to a precompiled or system contract has ended with a failure.

An example: elliptic curve functions handed invalid EC points.

EVMC\_CONTRACT\_VALIDATION\_FAILURE 

Contract validation has failed (e.g.

due to EVM 1.5 jump validity, Casper's purity checker or ewasm contract rules).

EVMC\_ARGUMENT\_OUT\_OF\_RANGE 

An argument to a state accessing method has a value outside of the accepted range of values.

EVMC\_WASM\_UNREACHABLE\_INSTRUCTION 

A WebAssembly `unreachable` instruction has been hit during execution.

EVMC\_WASM\_TRAP 

A WebAssembly trap has been hit during execution.

This can be for many reasons, including division by zero, validation errors, etc.

EVMC\_INSUFFICIENT\_BALANCE 

The caller does not have enough funds for value transfer.

EVMC\_INTERNAL\_ERROR 

EVM implementation generic internal error.

EVMC\_REJECTED 

The execution of the given code and/or message has been rejected by the EVM implementation.

This error SHOULD be used to signal that the EVM is not able to or willing to execute the given code type or message. If an EVM returns the [EVMC\_REJECTED](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gga4c0be97f333c050ff45321fcaa34d920a2f3e0d8777f8d974ead27ae2a6eb2005 "The execution of the given code and/or message has been rejected by the EVM implementation.") status code, the Client MAY try to execute it in other EVM implementation. For example, the Client tries running a code in the EVM 1.5. If the code is not supported there, the execution falls back to the EVM 1.0.

EVMC\_OUT\_OF\_MEMORY 

The VM failed to allocate the amount of memory needed for execution.

Definition at line [259](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00259) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

260{

263

266

274

277

287

290

296

299

302

309

312

315

322

328

334

339

345

348

351

364

367};

@ EVMC\_INSUFFICIENT\_BALANCE

The caller does not have enough funds for value transfer.

@ EVMC\_ARGUMENT\_OUT\_OF\_RANGE

An argument to a state accessing method has a value outside of the accepted range of values.

@ EVMC\_INVALID\_MEMORY\_ACCESS

Tried to read outside memory bounds.

@ EVMC\_REJECTED

The execution of the given code and/or message has been rejected by the EVM implementation.

@ EVMC\_UNDEFINED\_INSTRUCTION

An undefined instruction has been encountered.

@ EVMC\_SUCCESS

Execution finished with success.

@ EVMC\_OUT\_OF\_MEMORY

The VM failed to allocate the amount of memory needed for execution.

@ EVMC\_STACK\_UNDERFLOW

Execution of an opcode has required more items on the EVM stack.

@ EVMC\_BAD\_JUMP\_DESTINATION

Execution has violated the jump destination restrictions.

@ EVMC\_INVALID\_INSTRUCTION

The designated INVALID instruction has been hit during execution.

@ EVMC\_STATIC\_MODE\_VIOLATION

Tried to execute an operation which is restricted in static mode.

@ EVMC\_WASM\_TRAP

A WebAssembly trap has been hit during execution.

@ EVMC\_PRECOMPILE\_FAILURE

A call to a precompiled or system contract has ended with a failure.

@ EVMC\_INTERNAL\_ERROR

EVM implementation generic internal error.

@ EVMC\_OUT\_OF\_GAS

The execution has run out of gas.

@ EVMC\_CONTRACT\_VALIDATION\_FAILURE

Contract validation has failed (e.g.

@ EVMC\_CALL\_DEPTH\_EXCEEDED

Call depth has exceeded the limit (if any)

@ EVMC\_WASM\_UNREACHABLE\_INSTRUCTION

A WebAssembly unreachable instruction has been hit during execution.

@ EVMC\_STACK\_OVERFLOW

The execution has attempted to put more items on the EVM stack than the specified limit.

@ EVMC\_FAILURE

Generic execution failure.

@ EVMC\_REVERT

Execution terminated with REVERT opcode.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#gae012fd6b8e5c23806b507c2d3e9fb1aa) evmc\_storage\_status

The effect of an attempt to modify a contract storage item.

For the purpose of explaining the meaning of each element, the following notation is used:

-   0 is zero value,
-   X != 0 (X is any value other than 0),
-   Y != X, Y != 0 (Y is any value other than X and 0),
-   Z != Y (Z is any value other than Y),
-   the "->" means the change from one value to another.

Enumerator

EVMC\_STORAGE\_UNCHANGED 

The value of a storage item has been left unchanged: 0 -> 0 and X -> X.

EVMC\_STORAGE\_MODIFIED 

The value of a storage item has been modified: X -> Y.

EVMC\_STORAGE\_MODIFIED\_AGAIN 

A storage item has been modified after being modified before: X -> Y -> Z.

EVMC\_STORAGE\_ADDED 

A new storage item has been added: 0 -> X.

EVMC\_STORAGE\_DELETED 

A storage item has been deleted: X -> 0.

Definition at line [510](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html#l00510) of file [evmc.h](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/evmc_8h_source.html).

511{

516

521

526

531

536};

@ EVMC\_STORAGE\_MODIFIED\_AGAIN

A storage item has been modified after being modified before: X -> Y -> Z.

@ EVMC\_STORAGE\_ADDED

A new storage item has been added: 0 -> X.

@ EVMC\_STORAGE\_UNCHANGED

The value of a storage item has been left unchanged: 0 -> 0 and X -> X.

@ EVMC\_STORAGE\_DELETED

A storage item has been deleted: X -> 0.

@ EVMC\_STORAGE\_MODIFIED

The value of a storage item has been modified: X -> Y.

## [◆](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/group__EVMC.html#ga4ba5aae5d0250d9c4f6987a78602e795) evmc\_create\_example\_vm()

struct [evmc\_vm](file:///Users/sbacha/evm_llvm.wiki/evmc/DOXYGEN/structevmc__vm.html) \* evmc\_create\_example\_vm

(

void 

)

Example of a function creating an instance of an example EVM implementation.

Each EVM implementation MUST provide a function returning an EVM instance. The function SHOULD be named `evmc_create_<vm-name>(void)`. If the VM name contains hyphens replaces them with underscores in the function names.

Binaries naming convention

For VMs distributed as shared libraries, the name of the library SHOULD match the VM name. The convetional library filename prefixes and extensions SHOULD be ignored by the Client. For example, the shared library with the "beta-interpreter" implementation may be named `libbeta-interpreter.so`.

Returns

The VM instance or NULL indicating instance creation failure.
