# In-protocol separation of priority-sensitive and insensitive transactions

[TOC]

## Too long;  will I read?

Here &#39;s a short summary of the post, so you can decide if it &#39;s worth your time to read the long version.

A separation of priority sensitive and insensitive transactions already exists today, in the form of Flashbots bundles and regular transactions, respectively, but since it is done outside of the protocol there &#39;s no conditions that can be imposed on it to either capture some of the value or to protect regular transactions from exploitation. 

To enact it in protocol, blocks are split into a priority area and a regular area, filled by two different types of transactions. All transactions in the priority area are in front of the ones in the regular area, and execution of the latter is delayed and done in randomized order, so the current block proposer has no (simple) way to ignore the priority area and retain control of ordering. Inclusion in the priority area has a higher cost determined in-protocol, potentially similarly to the 1559 basefee, allowing some of MEV which relies on priority to be burnt or otherwise redistributed in ways that mitigate the risks to of instability and centralization. Restrictions are put on what transactions (or rather bundles) can go in the priority area, with the goal of mitigating some of the harmful effects of MEV on users.


In the future, if block proposer/builder separation is implemented, the priority area could be built by a specialized builder market and the regular area by a regularly elected proposed. I am going to argue that non-exploitative MEV can be almost entirely extracted in the priority area, making this the ideal way to split the block to maximize censorship resistance without harming the goals of the proposer/builder separation scheme.




## Priority MEV 

There &#39;s two very different kinds of transactions in Ethereum blocks: ones that care about the order and ones that do not, or at least not strongly enough to compete for it. The most common kind of transaction of the first type cares specifically about priority, because it obtains its value by being first to some MEV extraction opportunity, and is willing to pay much higher fees to be first among the relevant competing transactions.

We define the value extractable by such transactions as Priority MEV, from now on called pMEV. One example of this is &#34;previous block state MEV &#34;, which is all MEV that depends only on the state of the previous block, rather that also on new transactions, and will thus be extracted by the first relevant tx in the new block. Closing arbitrage opportunities opened in a previous block is one instance as is CEX arbitrage. Another one are liquidations on Compound, because their open oracle model allows any Ethereum address to relay signed updates on-chain, and thus also atomically execute liquidation opportunities that might arise. Some backrunning MEV can be converted into pMEV with the right design, as the latter example shows. In fact, this is also one of the effects of Flashbots bundles: instead of trying to backrun an oracle update or a large swap through spam, these txs can be included in a bundle and backrun there. The competition is therefore shifted to getting at the front of the block, which in this case means providing the most valuable bundle, at least among the ones competing for this specific opportunity. 

The value from such transactions is currently almost entirely harvested by miners, because the protocol has no control over ordering nor makes any restrictions about it, and thus it can only indiscriminately charge for blockspace, without making any distinction about more or less valuable space. Moreover, variability in MEV and in miners &#39;(and later proposers) ability to extract it create risks of centralization and consensus instability.

I am proposing explicitly separating priority-sensitive and insensitive transactions in-protocol, through different transaction types. Such a separation already exists in most blocks, where the priority transactions are Flashbots bundles, but the fact that this is not apparent to the protocol has a few drawbacks. Firstly, none of the value of the priority-sensitive transactions can be recaptured and redistributed, which could help mitigate some of the risks mentioned above. Moreover, bundles can efficiently exploit any publicly available user transactions.

While this is written thinking about Ethereum L1, it could just as well apply to a rollup. 



## Priority Transactions

Transactions, or whole bundles, could be marked as priority transactions, ptxs, distinguished from rtxs, regular transactions. Ptxs can only be executed in the first position of a block which is at a specified height and built on top of a specified head of the chain. Possibly something like Flashbots &#39;bundle merging could be implemented, and independent bundles could all be executed as ptxs, in arbitrary order (since they are independent) but before all  rtxs. 

To prevent block proposers from ignoring ptxs, control over the ordering of the rtxs would have to be taken away from them, through randomization and delayed execution. One can think of it as the block being split into a priority area, P, whose transactions are executed all at the same time, and a regular (or randomized) area, R, whose order is determined later so it cannot be manipulated by the proposer 

Ptxs can be priced differently from rtxs, in-protocol, and this can be used to reduce the risks associated with MEV, for example through burning or socializing profits.

## Relationship with Flashbots:

The Flashbots effort and infrastructure is complementary to such a scheme. Something that Flashbots offers that this scheme cannot offer is a private relay channel for searchers, offering pre-trade privacy and failed trade privacy (mostly). These are quite important guarantees, because the lack thereof is a centralization vector, potentially leading searchers to make deals with large proposers they can trust, which makes their earning potential greater than that of the ones that are excluded. This relay channel can keep working exactly in the same way, and whatever list of bundles it produces can be utilized to fill the priority area, if the fee can be paid. Any such relay service also handles bundle merging and the DoS risks that come with that, which are not trivial to deal with directly in protocol.

What does this scheme offer that Flashbots does not? Blocks containing Flashbots bundles already have this division between a priority area (the bundles) and the rest of the block, but there &#39;s a few important differences:

- Flashbots does a great job democratizing MEV extraction, which mitigates its centralizing effects. On the other end, it does not do much for minimization, and very likely even increases extraction [^bignote2], which means it does not help mitigate risks of consensus instability. Having the separation of priority area and regular area be in-protocol allows us to reduce MEV, by imposing a higher cost to extraction. 
- Flashbots does not reduce user exploitation even in theory, and in practice it increases it [^bignote4]. A tx cannot opt-out of being included in a Flashbots bundle, which enables (mostly) safe exploitation of any tx in them, as is the case with sandwich bundles, which by my rough account make up around 50% of miners &#39;revenue from bundles. \
To mitigate user exploitation, we can restrict priority bundles to contain only txs signed by the issuer of the bundle and other txs that opt-in, and are able to require a payment for it, as will be expanded on in the next section. Even if Flashbots tried to limit exploitation of non-consenting transactions by imposing some similar requirements on the composition of their bundles, there is hardly a reason for proposers to go along with it, since other similar infrastructure could be built without any self-imposed limitation. On the other hand, the proper composition of priority bundles can be part of the validity conditions of a block, and thus non-circumventable 


[^bignote2]: As far as I know this is somewhat contentious. On one end, Flashbots makes extraction more efficient, which can allow protocols to pay less for the same service and thus expose less MEV. For example, liquidations can pay less and still sufficiently incentivize bots to perform them. On the other end, greater extraction efficiency is a negative when it comes to MEV that is not necessary and thus does not need to be actively incentivized, because it allows profitable extraction of a wider range of such MEV opportunities. This is for example the case with sandwiching. To my knowledge, the latter effect currently outweighs the former, though it is not clear that this necessarily has to be the case in the long run, if protocols really reduce the MEV they expose to the minimum allowed by this greater efficiency. Still, incentivizing unnecessary MEV which harms users has negative externalities other than consensus instability or centralization effects.

[^bignote4]: It does not increase it if we assume all miners participating in Flashbots would just extract just as much by themselves if Flashbots didn &#39;t exist, or would anyway build their own infrastructure to connect to searchers. This would probably be close to be true eventually, but Flashbots certainly accelerated this process for the sake of mitigating the centralization risks

## Advantages


- **Reduction of MEV-driven risk to decentralized consensus:** if successful at capturing a substantial portion of the &#34;basal level &#34;pMEV, it would help to mitigate the potential of consensus instability and centralization caused by what &#39;s perhaps the largest, most consistent component of MEV. Quite simply, both burning and socializing profits among validators reduce the effective amount of MEV that can be stolen by destabilizing consensus or which can give a higher earning potential to powerful proposers.
- **Harm-minimizing way of taking ordering away from proposers:**  having a ptx (or bundle) which executes most pMEV might allow randomization of transaction ordering with milder negative externalities. In particular, it gives an avenue for pMEV to happen without having to compete via spamming, wasting blockspace and increasing gas fees, which is what would happen in a fully randomized block. The remaining issue is other potential spam sources, some of which are partially addressed in the next bullet point. 

    The assumption here is that randomized ordering of transactions is an improvement if it can be implemented without hindering positive MEV or creating spam. The idea is that controlling ordering makes extraction of many kinds of MEV risk-free, including the kinds that directly harms users, like sandwiching. For example, if the latter can be performed risk-free by a proposer (or by a searcher, as through Flashbots), the [Minimum Victim Input](https://arxiv.org/pdf/2009.14021.pdf) to be profitable in expectation decreases, and more txs become sandwichable. By randomizing, there is no participant that can sandwich risk-free, not even proposers. 
    
    Moreover, the cost is necessarily higher: if you want to frontrun in this new kind of block, you either pay the higher priority fee or have to do statistical frontrunning by sending a few txs (which is costly even for proposers after EIP 1559). Both result in higher costs than what is possible now: even post EIP 1559, a proposer/flashbots searcher does not need to pay the basefee for any failed txs. The backrunning part of sandwiching can only be done statistically, also subject to strictly higher costs than currently.
    
    Finally, randomization makes it so the risks of sandwiching increase with the number of $txs/block$ that a pool gets. The higher the number of txs to the pool in a block, the more expensive it becomes to target a specific one. This acts against the fact that users need to set higher slippage when interacting with pools that are receiving many txs. When this is not the case, setting a low slippage already serves as protection.
    
    


- **Backrunning spam mitigation (with benefits):** one of the positive consequences of FlashBots is that most extraction now happens in bundles, with the competition happening off-chain and without the need for probabilistic extraction techniques which necessitate sending lots of transactions. This reduces the blockspace consumption of MEV extraction, leaving more space for other activities, and reducing the impact on gas fees. While there is instances where the greater extraction efficiency allowed by FlashBots is damaging to users, as just discussed for risk-free sandwiching, we would like to preserve these benefits in all victimless extraction instances, even with the transaction order being randomized.
 
   To do so, tx could be marked by its issuer as &#34;bundlable &#34;, meaning it can be inserted into a priority bundle. If it is inserted, the issuer of the tx receives some payment from that of the priority bundle. Maybe the latter simply pays for gas, or the former is able to express what payment they require, which they could do based on some estimation of the MEV that the tx creates. Such a tx could also be normally inserted in R, and in that case it behaves like every rtx, so that there &#39;s no downside to being marked this way for txs which are not frontrunnable 
    
    Oracle txs, zero slippage swaps [^bignote0] and any txs that are not at risk of being frontrun but can be profitably backrun could be marked this way, so they can be backrun in the priority bundle. Effectively, this converts some MEV to pMEV. Moreover, the value they expose is partially returned to the issuers, and there &#39;s less incentives for spam. The gain for oracles might be particularly meaningful, since they especially suffer from high tx fees due to the very high time preference. Moreover, gas fees tend to be highest when the updates are needed the most, but on the other end that &#39;s also when backrunning them can be most valuable and thus when they are likeliest to be included in a bundle gas-free or with some payment.[^bignote1]
    
    
[^bignote0]: Backrunning swaps to close the arbitrage they expose is most of the time probably not better than using a DEX aggregator, but some users who choose to trade directly through a DEX frontend could benefit from this. Also, some low value swaps might not be able to benefit from on-chain aggregation because of the gas costs of the required overhead, but might be able to still get back some value this way.

[^bignote1]: Have to look into how oracles are paid. This amounts to the protocol paying a part of the liquidation to the oracle indirectly, meaning that the cost of liquidation goes up. Is there a good reason for this payment? Either way, oracle payments could be redesigned taking this subsidy into account.





## Pricing 

These are some of the possible schemes, involving what exactly is priced and how the price is dynamically adjusted.

1. **Gas-based fee**: Ptxs pay a gas price higher than the basefee (though no more than the basefee needs to be burnt, the rest can also be shared among validators). The price can be adjusted in different ways, for example simply as a constant multiple of the basefee. Alternatively, P and R can have their own separate EIP-1559 fee mechanism, with separate gas targets. P does not need necessarily need to have a hard gas limit, and probably shouldn &#39;t. The target is necessary for pricing, but otherwise you would want as many ptxs as possible to be in P rather than being converted to spam in R.
2. **One-off fee:** The block proposer has to pay a one-off fee for the block to have a priority area at all. Transactions just pay the basefee and otherwise compensate the proposer however they wish. The fee decreases if the priority area is empty, otherwise it increases. How much &#34;priority gas &#34;is consumed is irrelevant for the price. A priority gas limit might be needed.
3. **Hybrid:** A one-off fee is required for there to be a priority area at all, but each ptx is also charged a higher fee for gas.



There are tradeoffs involved, which I am trying to explore by using data from the [Flashbots API](https://blocks.flashbots.net/). This is an ongoing effort, which you can take a look at here: [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/frankdfr96/MEVresearch/HEAD)

The main tradeoff, involving how many blocks have priority transactions (or how much of the demand for priority transactions is satisfied) and how much pMEV can be captured by the pricing scheme, is explained in a following [section](#Priority-transactions-being-forced-into-the-regular-area)




#### Gas-based fee

One major issue with the gas-based fee is that dynamically adjusting the fee requires a target for the consumption of priority gas, which is necessarily somewhat arbitrary, since there is no hard costraint like there is for the normal gas limit. This can be dynamically adjusted, but it introduces additional complexity, since the target and the fee are dependent and must be adjusted based on the same on-chain data.

An advantage over a one-off fee is instead that inclusion of each ptx or bundle is not related to inclusion of any other ones, so we never price out a profitable bundle just because there is no other ones which can meaningfully contribute to the overall fee. This can maybe lead to a more efficient use of the available priority gas, though having a priority gas target has the opposite effect.


#### One-off-fee

A nice property of using a one-off fee is that it can give us a fine-tuned control of the first side of the above mentioned tradeoff.

Assuming that there is a minimum fee below which P will always be non-empty and a maximum fee above which P will always be empty (which basically means that there is a minimum and maximum level of pMEV per block), and if we are not at all charging a gas-based fee, we can dynamically update the one-off fee in such a way that we can control the percentage of blocks with non-empty P (from now on I &#39;ll just say filled P). In particular, we choose $d$ and $h$ so that consecutive $d$ blocks with filled P make the one-off fee double, and $h$ consecutive blocks with empty P make it halve, and we get that the percentage of blocks with filled P is $p =\frac{d}{d+h}$.

The fee update in this case is:

$fee = \begin{cases}
fee\cdot2^{\frac{1}{d}}&amp;if \ P \text{ is filled} \\
fee\cdot0.5^{\frac{1}{h}} &amp;if \ P \text{ is empty}
\end{cases}$

If we have so far had $n$ blocks, $f$ of which have filled P, the current fee is the initial one multiplied by $2^{\frac{f}{d}}\cdot0.5^{\frac{n-f}{h}} =2^{\frac{f}{d} - \frac{n - f}{h}}$

Let now $\frac{f}{n} = p + \epsilon$ for some $\epsilon \in [-1, 1]$. We then have that $2^{\frac{f}{d} - \frac{n - f}{h}} = 2^{\frac{n(p+\epsilon)}{d} - \frac{n(1 - p - \epsilon)}{h}} = 2^{\frac{n}{d+h} - \frac{n}{d + h} +  n\epsilon(\frac{1}{d} + \frac{1}{h})} = 2^{n\epsilon(\frac{1}{d} + \frac{1}{h})}$

When $n$ is large enough (there have been many blocks), we must have $\epsilon \approx 0$, or we get a contradiction with regards to the maximum and minimum fee mentioned at the beginning.

For example, setting $d = h$ guarantees that in the long run half of the blocks have empty P and half of the blocks do not. Setting $d = 4h$ means $20\%$ of blocks will have empty P. 





## Issues: 

### Risk of OCA (Off-Chain Agreement) to avoid randomization:

This particular OCA is possible in general, but it is especially easy in a post-EIP3074 world. An Invoker contract is setup by a miner/validator cartel, and when the priority fee becomes too high with respect to the available pMEV, participating users and searchers are required to submit auth-messages and tx data off-chain, which are all are bundled in one tx to the Invoker, leaving the cartel in control of the order without paying the required fee.

This does not even require the users/searchers to setup a special smart contract wallet which does the signature verification (which would be the case without 3074), since the authcall executes the calls with the desired sender. It is also not too complicated from an organizational standpoint, since sending EIP3074 transactions might become commonplace and easy to do.

The main hurdle becomes at this point the fact that normal users won &#39;t have any reason to go through the extra steps to submit txs this way, except for the risk of being censored. On the contrary, many will have an incentive not to do so, because they would allow themselves to be exploited.
Block proposers don &#39;t gain much from including regular txs post EIP1559, but repeated exclusion would make tips rise, and thus sustaining the OCA more costly. Moreover, the obvious situations in which there might a lot to gain from avoiding the priority fee are a flash crash, a period of high volatility, a token launch etc... In these, there might be a sustained level of high pMEV, at least for long enough for the priority fee to catch up and create a compelling incentive to avoid it. On the other end, in these situations blocks might also be often full and tips higher than normal, also making the OCA more expensive.

### Limited ability to capture substantial portions of pMEV

As explored in the notebook, a substantial component of MEV appears to be &#34;spike MEV &#34;, that is a high level of MEV which is not correlated to the MEV in surrounding blocks. No dynamic pricing scheme can try to capture it, because by definition it is not predictable from the priority transactions of the previous blocks. The top 1% of rewards from Flashbots blocks accounts for over 25% of all the rewards, and we have no hope of capturing almost any of that without setting fees that are so consistently high that most blocks end up not having a priority transaction, which is not a desirable outcome, as we discuss next.

Such a limitation severely impacts the abilility of any such scheme in mitigating consensus level risks. In particular, undercutting attacks are most likely to happen as a result of one of these outliers, and most of their MEV will still be available to incentivize such attacks. On the other end, reducing MEV on average should be an effective mitigation against long range time-bandit attacks. Moreover, it should also be effective in mitigating the centralizing effect of MEV, since average returns are what &#39;s important for that.


### Priority transactions being forced into the regular area

There &#39;s a tradeoff between the percentage of blocks with empty P and the amount of captured pMEV (the fees paid for inclusion in P). Since demand for &#34;priority space &#34;fluctuates very much (much more than demand for regular space), due to the fluctuations in MEV, no pricing scheme can really escape this tradeoff. If the pricing scheme tries to &#34;aggressively &#34;catch up to a rising demand, it causes more blocks to price out all priority transactions by reacting to temporary spikes in the demand. If the pricing scheme is not aggressive enough, it is less effective in mitigating MEV because it cannot adjust fast enough when the demand is rising.

If pricing is gas-based, a higher fee enables more value to be recovered from the highest value ptxs, which can be significantly more valuable than other ptxs, with a power-law-like distribution, which can lead to more burning or redistribution. On the other end, less ptxs are allowed in P.

If the pricing is through a one-off fee, a higher fee does not necessarily price out low-value ptxs, because any profitable one is worth including if the one-off fee can be at all paid. Nonetheless, capturing a substantial portion of pMEV requires &#34;aggressive &#34;price adjustements which can cause the one-off fee to at times be too onerous, pricing out all ptxs at once. 

As already mentioned, the reason why we don &#39;t want to price out too many priority txs is that they could end up being converted into spam in R, taking up valuable blockspace and thus raising gas fees for everyone. 


##### Bundle Merging
To mitigate this issue, we &#39;d like to be able to include multiple priority bundles, as Flashbots currently does. Trying to do this in a trustless way (no trust-based relationship between proposers and searchers) leads to some issues. In particular, we have three simple candidate solutions, all with flaws:


- The simplest option is to allow dependent ptxs and require a payment regardless of how they execute. Proposers would then be incentivized to include all ptxs, including all failed ones, which is bad for searchers and needlessly fills up the block, negating the positive effects of moving the MEV competition off-chain.
- The proposer pays for the fee and is paid directly by the ptxs if they execute successfully (as with Flashbots). This does not require an additional block validity criterion about state independence, because the proposer is the only one that has something to lose from including failed ptxs. The problem with this is that the proposer has to execute potentially computationally intensive txs without being sure about the payment, so it introduces a DoS risk. 
- There could be a validity criterion requiring the txs to be independent, and all payments could then be upfront, meaning the proposer would just check that the sender has a sufficient balance to pay the specified fee. This does not put senders in jeopardy of paying a fee without earning enough from the tx, because they know exactly how their ptx will execute. In fact, independence means any state in which their ptx could execute is equivalent to the state of the last block, as far as they &#39;re concerned. The problem with this is that it doesn &#39;t solve the issue from before: payment is only guaranteed after independence is verified, and checking for independence requires running the txs. \
Moreover, this solution does not allow searchers to pay any more than what they have available.


We propose a specification for a transaction type, or rather a bundle type, that attempts to solve these issues. On one hand, it tries to offer DoS protection to the network, and in particular to proposers, while on the other hand preserving the guarantee that bundles only end up on chain if profitable. As part of the ensuring the latter, priority bundles would be required to be independent as part of the validity conditions of a block. These are the important fields, explained below:

```csvpreview
senderAddress, blockNumber, prevHash, gasConsumed
successPayment, bond, accessList, processingFee
``` 


- ```prevHash``` is the hash of the block which must be the predecessor of the one in which the transaction is executed. The block height of the latter must be ```blockNumber```. They provide execution guarantees to the searcher. ```prevHash``` ensures that the transaction executes against the expected state, ```blockNumber``` that it executes in the expected block. Even with ```blockNumber```, ```prevHash``` is necessary in case of a fork which skips the previous head of the chain. Even with ```prevHash```, ```blockNumber``` is necessary in case a few blocks are skipped and the transaction is time sensitive (e.g. blind frontrunning, responding to price information which might change by the next slot). It could be left blank if that &#39;s not the case, for example if the profitability of the transaction is entirely dependent on the on-chain state (e.g. DEX arbitrage)
- ```gasConsumed``` is the amount of gas the transaction consumes when executed against the expected state (specified by ```prevHash```), as claimed by the searcher. Moreover, it is the maximum amount of gas which any network participant should consume when attempting to execute the transaction, regardless of whether or not the execution terminates.
- ```successPayment``` is the amount that will be paid to the proposer if the transaction executes against the expected state, as claimed by the searcher.
- ```bond``` is the amount that will be paid to the proposer if the transaction fails to make the full ```successPayment``` when executed against the expected state, regardless of why that is, or if the ```accessList``` is incorrect. The transaction sender must therefore have a balance of at least ```bond```. ```bond/gasConsumed``` is the minimum gas price that will be paid by the transaction if faulty, so the transaction should only be propagated if this is a competitive gas price for the relevant block. This way, we avoid the DoS vector given by submitting faulty transactions with high ```successPayment``` and low ```bond```. Moreover, ```bond``` should be higher for transactions with high ```successPayment```, because they risk displacing other valuable transactions, possibly even maliciously.
- ```accessList``` indicates what part of the state is touched by the transaction, when executed against the expected state. As already mentioned, the searcher &#39;s ```bond``` goes to the proposer if it is incorrect. To avoid the DoS vector given by submitting transactions which execute correctly but are likely to not end up in the block due to dependence (for example one could submit multiple dependent transactions with high payment, force simulation of all and only pay for one), the decision about the set of transactions to include in P could be made without any execution, just through the transaction fields (```accessList```, ```gasConsumed``` and the various payment fields). Only the ones which are included would be executed. 
- ```processingFee``` is a small fee which might be paid even if the transaction is neither included in P nor faulty (wrong access list or incorrect execution), or if it is faulty but it does not get executed (not even off-chain). This fee is meant to compensate the additional work that each priority transaction contributes to the process of building P (comparing access lists, prices etc...). Without it, similarly to the DoS attack just mentioned above one could spam the network with transactions with conflicting access lists, creating a heavy work load even if they are not all simulated.


TO DO: 

- Add something about adding new transactions as failures are detected. Only a limited amount of these can happen maliciously for high values transactions, because bonds are supposed to be high for them (a few thousands, let &#39;s say)
- Add something about why bundle merging in procol makes sense

### Risk increasing Delta MEV

Globally minimizing MEV, in the sense of minimizing the total MEV over a span of blocks, is not necessarily a mitigation, and might even risk making things worse. It very much matters how exactly it is minimized, i.e. what is the resulting distribution of MEV over the given span, rather than just what the new total is.

For example, if it were somehow possible to burn all MEV from blocks which contain less than the median amount of MEV over a certain span of blocks, doing so would incentivize undercutting attacks, because the blocks whose MEV has been burnt were not likely victims but rather likely attackers, and are now even more so. Moreover, it would further increase the centralizing effect of MEV, because it would make validator rewards even more unevenly distributed.

TO DO: look at $\Delta$MEV before and after the fee. Maybe it gets worse because blocks with lots of mev can always pay, the fee increases and the blocks coming after them pay even more than they do. the only case when this does not happen is if the next block cannot pay the fee, because then the revenue hit they take is not necessarily bigger than what the previous block took, so the $\Delta$MEV might decrease.
For this to happen often, it seems like we &#39;d have to sacrifice the percentage of filled blocks. 


### Properties of the randomization

Ideally, randomization would happen in a way that is not manipulable by the current proposer (even if they are the proposer for the next block as well) and whose results are available before the next block is posted, so that there &#39;s a period of time in which the state is known and can be interacted with deterministically. This is especially important for ptxs themselves, for a few reasons:

- It allows in-protocol bundle merging using the ```accessList``` field, because there is some time in which the previous state is known and the sender of a transaction can compute a correct ```accessList```, which lets us punish incorrect ones for DoS prevention.
- It makes some extraction more efficient because it is deterministic, in the sense that it doesn &#39;t require a probabilistic assessment of what the new state might be like. For example, it is possible to now the exact state of AMMs &#39;reserves, and thus send exact arbitrage transactions.

To my knowledge, the current design of randomness in ETH2 does not satisfy these properties. Would they be feasible to satisfy with a different design, perhaps in an L2? Is this the case for any of the coming ones?

&lt;!---
Something to think about: randomization and EIP 1559
--&gt;## How it can fit in the long term Ethereum roadmap

### Proposers and builders separation

In the future of the Ethereum network, we should not expect regular validators to propose blocks, at least not fully. One reason for that is  MEV, whose extraction needs to be outsourced to avoid its centralizing effects. In fact, most miners already outsource production of something similar to our proposed priority area, through FlashBots. The centralizing forces are only going to get worse, as maximal extraction will involve rollups and other chains, and as the Ethereum economy keeps growing

Moreover, as detailed in this great [post about statelessness](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html), we eventually want validators to have much lighter hardware and bandwidth requirement and to quickly be able to switch between shards, i.e. to be stateless clients. This is incompatible with proposing in the traditional sense, which requires having the full state in order to execute transactions. A solution to both of these problems is discussed in this [ethresear.ch post about proposer/builders separation](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725/41), which proposes to outsource the creation of the content of the whole block to a market of specialized actors. Some flavor of it seems likely to end up being the mechanism by which a sharded, stateless Ethereum produces block content, centralizing block production in favor of maximal decentralization of the consensus building nodes.

Also from the above mentioned post about statelessness, it is argued that centralization of block production after the Merge is not nearly as problematic as it is now. This is because block proposals have a very limited effect on consensus, and in particular even an overwhelming majority of block proposers cannot censor the remaining ones, so long-term censorship resistance requires something more similar to a $\frac{1}{N}$-honest assumption than to a honesty majority assumption (to be precise, some honest percentage of proposers is needed, whose size inversely depends on the timescale over which censorship resistance is needed). Nonetheless, short-term censorship can also be very problematic. Think for example of censoring the repayment of a loan in order to later liquidate it, or a market maker censoring a large order to have more time to decide whether to collect fees or withdraw liquidity.


A solution can be to allow proposers (meaning here the validators randomly chosen by the protocol to choose and sign a block, irrispective of the origin of the block content) to still include some transactions in the block, which they can do even as stateless clients. What they cannot do is executing transactions, as they can only validate them when given witnesses for state read/write operations, which must come from a stateful client. On the other hand, they can use the user-provided witnesses for each transaction to check transaction validity conditions (nonce, sufficient balance) and include them without executing anything. The state root for the whole block can immediately be computed by any stateful client, which can also provide proofs to stateless clients, and the next block can actually contain it. 

This could be optional, but short-term censorship resistance would definitely benefit from it being a requirement, and even better a requirement involving a substantial portion of the block rather than few additional transactions. The question is then how can we balance these goals with the goal of keeping the complexity of proposing away from stateless validators. \
As already mentioned, such validators are well capable of recognizing valid transactions and ordering them by fee, they are just not capable of executing them. On the other end, choosing transactions which maximize MEV extraction is much more complicated, especially without the ability to simulate transactions, and we don &#39;t want to impose this burden on validators. Luckily, both of these constraints happen to work perfectly with our separation scheme!

Transactions in the regular area are already not immediately executed, because they have to first be randomized. Moreover, the vast majority of MEV extraction should happen in the priority area, as it does now with FlashBots. All that &#39;s left is either exploitative, in which case we can (and in my opinion should) attempt to minimize it rather than just trading some negative externalities for others, or it is simply not valuable enough to be included in the priority area, in which case it is likely not very relevant to MEV maximization. Therefore, the regular area is perfectly suited to be made by a normal proposer, while the priority area to be obtained from a specialized market.

TO DO: add somewhere else a bit more about why maximization can happen in the priority area only.


### Delayed execution for MEV protection

Let &#39;s first clarify what is meant by delayed execution. The first kind  involves the lack of a state root in a block, because at least some transactions are included but they are not executed by the proposer, as in the previous section. The execution is then basically only delayed from the chain perspective, and not from that of any observer with sufficient information (either the previous state or some proofs). To be precise, there &#39;s some additional delay because some full node needs to process the block before there is anyone that knows the new state, but this should be close to negligible. The second kind involves some processing step which makes the result of executing the block not computable when the block is published, for example because transactions need to be randomized and/or decrypted. This actually creates an additional delay on top of the block time. From now on I &#39;ll use &#34;delayed execution &#34;to refer exclusively to the second kind, unless otherwise specified. Since our scheme needs randomization of transaction order in R, delayed execution is necessary to it, with all of its downsides. Nonetheless, accepting some delay can bring about many more benefits than just the ones we have discussed for our separation scheme, in the form of further MEV mitigations.

In fact, delayed execution is also necessary to the use of cryptographic techniques such as timelock encryption or threshold encryption, which I think will be needed to attempt to minimize exploitative MEV. Some will argue that this is an application layer problem, that users can just avoid using dApps that allow them to be exploited and dApps can adopt their own mitigations to avoid losing users, and that MEV only concerns the base layer insofar as it creates a threat to consensus and a centralizing force. While it is hard to make predictions about the long-term evolution of MEV extraction, it should be kept in mind that for now exploitative MEV accounts for at least about a half of all MEV extracted through FlashBots. More precisely, I have considered all FlashBots bundles in a few months of activity and made a simple classication of the most standard kind of sandwich bundles, and it turns out that the miner rewards from them add up to around half of the total rewards. If exploitative MEV keeps being a very large component of all MEV, it can &#39;t be ignored at the base layer even if you believe that dApp-specific users are not the network &#39;s problem. 
Moreover, it can &#39;t be ignored that user exploitation on Ethereum is damaging to the public image of the network, and by reflection of the entire space, and has the potential to bring about harsher regulations than needed.

When it comes to downsides of delayed execution, financial applications are the use case that suffers from them the most, because their centralized counterparts run on almost continuous time.
They are also responsible for the vast majority of exploitative MEV, with their users being the victims, so they are also the use case which needs solutions for it the most. Were many DeFi protocols to implement their own application-specific solutions which require delayed execution, most of the downsides from it would already materialize, without the benefits of protocol level solutions:

- Application specific solutions break composability, because they require contracts adopting them to only accept transactions through the proper channel (e.g. some relay contract). This issue applies also to solutions which don &#39;t require delayed execution, such as ChainLink &#39;s FSS. For example, an AMM utilizing the latter for frontrunning protection could only accept calls made during the execution of a transaction that was also ordered by relevant oracle network, because accepting other calls would let them frontrun. Similar considerations apply to Shutter Network &#39;s mechanism based on threshold encryption, because the transaction containing the decryption key can be frontrun. In general, such solutions require contracts to enforce that incoming calls originate from a transaction using the same MEV protection mechanism, and thus any two protocols using different MEV protection mechanisms would be unable to compose, at least not with protected functionality.
On the other end, a base layer implementation of such solutions does not suffer from this issue, assuming it is sufficient for the needs of the vast majority of protocols and thus there &#39;s no need for further ad-hoc solutions.
- A base layer solution does not force dApps to choose between protecting users or preserving composability and a better user experience relatively to competitors.
- Base layer solutions can work more efficiently, because they don &#39;t need to worry about the costs of on-chain operations. For example, Shutter Network &#39;s threshold encryption mechanism plans to work on a multi-block batch basis, meaning that participating contracts will receive transactions once every few block, due to the gas costs for the on-chain overhead of each batch. Therefore, the effective block time for the participating protocols becomes this longer batch time. The same exact solution could be implemented in protocol, with a committee of validators being what Shutter Network calls keypers (the holders of key shares), in which case transactions could be decrypted every block. The committee members would just publish key shares as soon as the block has been published, and any full node would be able to execute the block as soon as they have received enough shares, with minimal delay.


### Removing randomization

The simpler form of our separation scheme needs randomization of transaction ordering in R, which requires a sophisticated randomness process. If this proves to be too onerous, it is possible to do away with this requirement, by putting together all the ingredients that we have introduced in the last two sections (and a bit more): 

1. We would need P and R to be created separately, something that &#39;s already highly desirable. Moreover, we &#39;d need the choice of P to be made in a decentralized way, and in particular we &#39;d want the current proposer to not have control over it.
2. Some suitable MEV protection would need to be built in the base layer, for example threshold encryption through a decryption committee, or anything which provides temporary privacy. 


Each of these two ingredients lets us reach one of the two goals of randomizing transaction ordering, without the need for it:

1. We can have a priority fee that is not gameable by just ignoring P. Now the choice of P is not controlled by the proposer, so they can &#39;t just ignore P and do blind frontrunning in R.
2. Giving users an extra layer of protection against exploitative MEV extraction, such as sandwiching, by making it less efficient. Now transactions are encrypted, so the vast majority of attack vectors are not feasible. Randomization wouldn &#39;t add much at this point, just some extra protection against metadata-based attacks. Note that this is not necessary just to protect users from malicious MEV, but to minimize the amount of MEV in R, which is required for the goals of the builders/proposer separation scheme.


### MEV smoothing

Assuming it is feasible to have a Priority Area which is chosen in such a decentralized way, maybe by a large enough committee, we could also attempt to make another significant protocol level MEV mitigation: MEV smoothing. The idea is similar to the $l$-smoothed fee mechanism from [Tim Roughgarden &#39;s EIP1559 paper](https://timroughgarden.org/papers/eip1559.pdf), which pays the basefee forward rather than burning it, to smooth out the variance in the rewards collected by each proposer. Here we &#39;d try to smooth out variance in MEV, with the goal of having all stakers earning a share of all rewards that is roughly proportional to their stake.

As in EIP1559 (or the $l$-smoothed mechanism), the key difficulty is needing an estimate based on past on-chain data, for something that &#39;s best estimated from current off-chain data. In 1559 that is the current equilibrium fee, while in our case it is the current maximum extractable value, or at least the maximum that the block market is able to achieve. In this case, however, it is not possible to get a good enough estimate based on past on-chain information, because MEV lacks sufficient temporal correlation. Quite simply, even knowing the exact amount of MEV in the last block or in all of the previous blocks does not allow for reliable predictions of the current block &#39;s MEV.

We thus need to rely on some oracle functionality, bringing information about the real time state of the off-chain block market. This is very easy if we are ok with having the proposer choose and receive all the profits (as in the original builders/proposers separation proposal), because it is in their own interest to choose the most profitable block.  The problems start as soon we try to use this information to reduce profits, whether immediate ones, by burning or sharing, or future ones through a (better informed) fee mechanism, because the proposer can find ways to still choose the most profitable block for themselves without &#34;declaring &#34;the full amount on-chain. 

