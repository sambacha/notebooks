Here we collect resources and pointers to topics related to MEV in proof-of-stake Ethereum and research questions about the journey from mev-boost to in-protocol proposer-builder separation (PBS).

# Papers

- [Combining GHOST and Casper](https://arxiv.org/abs/2003.03052) Buterin et al. (2020)
  - [elopio's annotations](https://elopio.keybase.pub/papers/2020-combining_ghost_and_casper.pdf) 
- [Three Attacks on Proof-of-Stake Ethereum](https://arxiv.org/abs/2110.10086) Schwarz-Schilling et al. (2021)
- [Two Attacks on Proof-of-Stake Ghost/Ethereum](https://arxiv.org/abs/2203.01315) Neu et al. (2022)
- [Single Secret Leader Election](https://eprint.iacr.org/2020/025.pdf) Boneh et al. (2020)

# Posts
- [Proposer/block builder separation-friendly fee market designs](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) by Vitalik Buterin (EF)
- [Two-slot proposer/builder separation](https://ethresear.ch/t/two-slot-proposer-builder-separation/10980) by Vitalik Buterin (EF)
- [State of research: increasing censorship resistance of transactions under proposer/builder separation (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) by Vitalik Buterin (EF)
- [PBS Censorship-Resistance Alternatives](https://notes.ethereum.org/@fradamt/H1TsYRfJc) by Francesco D'Amato (EF)
- [Current CrList Proposal](https://notes.ethereum.org/@fradamt/H1ZqdtrBF) by Francesco D'Amato
- [MEV in eth2](https://writings.flashbots.net/research/mev-eth2/) ([associated repo](https://github.com/flashbots/eth2-research)) by Alex Obadia & Taarush Vemulapalli (Flashbots)
- [Commitee-driven MEV smoothing](https://ethresear.ch/t/committee-driven-mev-smoothing/10408) by Francesco D'Amato (EF)
- [Exploring Inequality in Proof of Stake](https://ethereum.github.io/beaconrunner/notebooks/naiveurn.html) by Barnabe Monnot (RIG/EF)
- [Endgame](https://vitalik.ca/general/2021/12/06/endgame.html) by Vitalik Buterin (EF)
- [Updated Ethereum Roadmap](https://twitter.com/VitalikButerin/status/1466411377107558402?s=20) by Vitalik Buterin (EF)
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) by Vitalik Buterin (EF)
- [What Happens After Finality in eth2](https://hackmd.io/@prysmaticlabs/finality) by Raul Jordan (Prysmatic)
- [RNG exploitability analysis assuming pure RANDAO-based main chain](https://ethresear.ch/t/rng-exploitability-analysis-assuming-pure-randao-based-main-chain/1825) by Vitalik Buterin (EF)
- [Exploring the RANDAO game in PoS Ethereum](https://ethereum.github.io/beaconrunner/notebooks/randao/randao.html) by Caspar Schwarz-Schilling & Barnabe Monnot (RIG/EF)
- [Rocketpool Post-Merge research](https://github.com/rocket-pool/rocketpool-research/tree/master/Post%20Merge)
- [Proposer Boost Considerations](https://notes.ethereum.org/@casparschwa/H1T0k7b85) by Caspar Schwarz-Schilling (RIG/EF)
- [(Un-)Timeliness in PoS Ethereum](https://notes.ethereum.org/@casparschwa/ByHu1XZUq) by Caspar Schwarz-Schilling (RIG/EF)
- [Retroactive Proposer Rewards](https://notes.ethereum.org/@casparschwa/S1vcyXZL9) by Caspar Schwarz-Schilling (RIG/EF)


# Talks
* [Flashbots Incentives for Geographical Diversity](https://youtu.be/GJwS7VF40wk?t=23285) at EthStaker Amsterdam by Leo Arias & Alex Obadia (Flashbots)
* [MEV & Cryptography](https://youtu.be/jLHf6yw7b5Y) by Justin Drake (EF)
* [Flashbots MEV Roast #15: PBS on Ethereum Roadmap](https://youtu.be/8mcm-jT2nq4)
* [“Dude, what’s the Danksharding situation?” Workshop](https://youtu.be/e9oudTr5BE4) by Dankrad Feist & Vitalik Buterin (EF)
* [MEV after EIP-1559 and the Merge](https://youtu.be/XhZ2FDMdVUM) at EthCC 4 by Alex Obadia & Alejo Salles (Flashots)
* [The MEV in Nethermind in eth2](https://youtu.be/6MeKNSqC2es) at EthCC 4 by Tomasz Stańczak & Marcello Bardus (Flashbots/Nethermind)
* [MEV on eth2](https://youtu.be/zsgC6mNP9eU) at ETHGlobal Scaling Ethereum Roast by Alex Obadia (Flashbots)
* [MEV after The Merge with Nethermind and Flashbots](https://youtu.be/Hjd9WowOa3g) at ETHGlobal Scaling Ethereum conference by Alex Obadia & Tomasz Stańczak (Flashbots/Nethermind)




# Open questions

- [Late block proposal](https://github.com/flashbots/mev-boost/issues/111)
- [Header and bid publicly accessible](https://github.com/flashbots/mev-boost/issues/112)
- [Transaction cancellation](https://github.com/flashbots/mev-boost/issues/113)
- [Relays gossiping payloads between each other & multiple relays with the same payload](https://github.com/flashbots/mev-boost/issues/122)
- [Distributed Block-Building](https://github.com/flashbots/mev-boost/issues/139)
- [CrLists in mev-boost](https://github.com/flashbots/mev-boost/issues/215)