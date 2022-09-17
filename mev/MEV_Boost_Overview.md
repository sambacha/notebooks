# MEV-Boost in a Nutshell

Created: September 5, 2022 7:19 PM URL: https://boost.flashbots.net/

[MEV-Boost%20in%20a%20Nutshell%20aff422483d384e169dc750a734964c38/image](MEV-Boost%20in%20a%20Nutshell%20aff422483d384e169dc750a734964c38/image)

MEV-Boost is free, open-source, neutral software built with love, for
the community. For information on MEV-Boost software and roadmap, see
the [MEV-Boost Repository](https://github.com/flashbots/mev-boost/).

1. Connect MEV-Boost to desired network relay URL from the
   [relay list](https://boost.flashbots.net/#block-8816bf07534945d08658c0dc35c7e48b)
   using the commands below. For node operators that have been assigned
   a unique identifier, replace **<identifier>** with the one assigned.

# Flashbots Goerli Relay (without identifier)

```bash
./mev-boost -goerli -relays https://0xafa4c6985aa049fb79dd37010438cfebeb0f2bd42b115b89dd678dab0670c1de38da0c4e9138c9290a398ecd9a0b3110@builder-relay-goerli.flashbots.net
```

# Flashbots Goerli Relay (with identifier)

```bash
./mev-boost -goerli -relays https://0xafa4c6985aa049fb79dd37010438cfebeb0f2bd42b115b89dd678dab0670c1de38da0c4e9138c9290a398ecd9a0b3110@builder-relay-goerli.flashbots.net?id=<identifier>
```

Remember to use the appropriate network flag for the specific network
and relay URL, e.g. `-mainnet`, `-kiln`, `-ropsten`, `-sepolia` or
` -goerli`. You can add multiple relays comma-separated to the -relays
flag,

like this: -relays https://relay1,https://relay2

Configure a supported consensus client. Detailed instructions are
available on the MEV-boost testing wiki, and guides for connecting the
client to mev-boost can be found in the consensus client compatibility
table below.

```csv
Mainnet,Flashbots,https://0xac6e77dfe25ecd6110b8e780608cce0dab71fdd5ebea22a16c0205200f2f8e2e3ad3b71d3499c54ad14d6c21b41a37ae@boost-relay.flashbots.net
Mainnet Ethical Relay,bloXroute,https://0xad0a8bb54565c2211cee576363f3a347089d2f07cf72679d16911d740262694cadb62d7fd7483f27afd714ca0f1b9118@bloxroute.ethical.blxrbdn.com
Goerli,Flashbots,https://0xafa4c6985aa049fb79dd37010438cfebeb0f2bd42b115b89dd678dab0670c1de38da0c4e9138c9290a398ecd9a0b3110@builder-relay-goerli.flashbots.net
Goerli,bloXroute,https://0x821f2a65afb70e7f2e820a925a9b4c80a159620582c1766b1b09729fec178b11ea22abb3a51f07b288be815a1a2ff516@bloxroute.max-profit.builder.goerli.blxrbdn.com
Ropsten,Flashbots,https://0xb124d80a00b80815397b4e7f1f05377ccc83aeeceb6be87963ba3649f1e6efa32ca870a88845917ec3f26a8e2aa25c77@builder-relay-ropsten.flashbots.net
Ropsten,bloXroute,http://0xb8a0bad3f3a4f0b35418c03357c6d42017582437924a1e1ca6aee2072d5c38d321d1f8b22cd36c50b0c29187b6543b6e@builder-relay.virginia.ropsten.blxrbdn.com
Kiln,Flashbots,https://0xb5246e299aeb782fbc7c91b41b3284245b1ed5206134b0028b81dfb974e5900616c67847c2354479934fc4bb75519ee1@builder-relay-kiln.flashbots.net
Sepolia,Flashbots,https://0x845bd072b7cd566f02faeb0a4033ce9399e42839ced64e8b2adcfc859ed1e8e1a5a293336a49feac6d9a5edb779be53a@builder-relay-sepolia.flashbots.net
```
