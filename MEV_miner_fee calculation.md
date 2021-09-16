-   Call TMEV the transaction fees netted by MEV transactions (in Gwei)
-   MEV transactions use an amount of gas gMEV
-   Non-MEV transactions pay a miner fee δ (in Gwei per gas unit)
-   Non-MEV transactions use gN gas
-   The whole block (MEV + non-MEV) uses g\=gMEV+gN gas
-   The block reward is R (in Gwei)
-   The uncle reward is U (in Gwei)
-   There is a rate p such that for each unit of gas added in the block, the uncle risk increases by p. It was once measured that 10M gas adds about 2.5% risk, so we take p\=2.5×10−9

The expected revenue from a block including only MEV transactions is

A\=(1−pgMEV)(R+TMEV)+pgMEVU

The expected revenue from a block providing g gas in total is

B\=(1−pg)(R+TMEV+δgN)+pgU

We look for δ such that B≥A, which yields

δ≥p(R+TMEV−U)1−pg

Note that this measure is independent of the quantity of gas used by MEV vs non-MEV transactions, but simply a function of the total gas used by the block g. Calculating for TMEV∈\[0,2×109\] (i.e., MEV in block netting between 0 and 2 ETH), we obtain the following values for δ, assuming 15 million gas is provided:

![](https://storage.googleapis.com/ethereum-hackmd/upload_446153c9902a55fa224b31223c2361b1.png)

Recently, Tim Beiko argued that the value of p may be different:

![](https://storage.googleapis.com/ethereum-hackmd/upload_85a7111b4cf68db268c74e66e52cfd65.png)

> If we eyeball it, the gas limit goes from ~12.25m to ~14.75m, so +2.5m. In that, it seems like the uncle rates go from clustering around .045 to .049 (being somewhat generous), so a ~0.004 increase in uncle rate for a 2.5m increase. This means a 10m gas would add ~1.6% uncle risk, not 2.5% as your note assumes.

Note that as p decreases, so does the required miner fee.

![](https://storage.googleapis.com/ethereum-hackmd/upload_61fd15eacb8798e9efa5ba04fb4d57fc.png)  
_With p\=2.0×10−9_

[Notebook source](https://github.com/ethereum/abm1559/blob/master/notebooks/uncle_risk.ipynb)

### [](https://notes.ethereum.org/@barnabe/rk5ue1WF_#How-much-MEV-should-I-expect-in-the-block "How-much-MEV-should-I-expect-in-the-block")How much MEV should I expect in the block?

See [Flashbots mev-explore](https://dashboard.flashbots.net/miners), reporting around 200 USD profit per bundle, i.e., ~0.1 ETH (@ 2000 ETH/USD).

![](https://storage.googleapis.com/ethereum-hackmd/upload_2074a9c14a7f9281d5115fc698725a5a.png)

Note that since the above calculation is based on averages, there could be bundles netting much more than 0.1 ETH sometimes, and bundles netting much less than 0.1 ETH most times. A priority fee of ~2Gwei seems fine for most cases however.