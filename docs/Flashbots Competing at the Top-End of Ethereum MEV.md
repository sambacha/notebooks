---
created: 2022-02-17T17:23:55 (UTC -08:00)
tags: []
source: https://mirror.xyz/totlsota.eth/fbl1rZtzFydSyRQ7ckIm6dGYJ8xJWPvIN0Gej-qadQQ
author:
---

# Flashbots: Competing at the Top-End of Ethereum MEV — totlsota.eth

> ## Excerpt
>
> This is a short continuation of an earlier Flashbots bot analysis. To
> be clear, this is on Ethereum, studying transactions sent via
> Flashbots only.

---

This is a short continuation of an earlier Flashbots bot analysis. To be
clear, this is on Ethereum, studying transactions sent via
[Flashbots](https://docs.flashbots.net/) only.

[My previous post](https://mirror.xyz/totlsota.eth/hyu-U2Q4qp0hTxnjYdW1sACynZRS1uHOBVQ4CY-uEoc)
has more information on the data source, as well as a number of
assumptions and disclaimers. They still hold, especially “DYOR”. This is
not a peer-reviewed study, _just some amusements in a notebook._

It is worth mentioning that there is still plenty of non-Flashbots-based
transaction activity that appear to be MEV related in this universe of
accounts. It is safe to assume that top participants may be doing
sending transactions various ways, included, but not limited to: 1)
Flashbots, 2) [Bloxroute](https://bloxroute.com/), 3)
direct-to-miner, 4) in the mempool, etc. There will also be important
related transactions off-chain (CEX for example, or on other chains).
These may make it less obvious what the transactions are “for”. You can
draw your own conclusions as to the purpose/meaning behind various
transaction bundles.

For this analysis:

-   It is focussed on the “top 10 bots” (shown a few ways). For any
    window, the top 10 bots account for ~40-50% of the transactions
    landed on chain via fbots.
-   I believe I've filtered out non-bot addresses, but there may be some
    accidentally included, especially if they are lower down the
    transaction count list (i.e.; don’t count uniswap et al as a “bot”).
-   The oldest block ([13134958](https://etherscan.io/block/13134958))
    is in August 2021. The newest block
    ([14141204](https://etherscan.io/block/14141204)) is 16h ago as of
    this writing, 4th Feb 2022.
-   In these analyses, transactions are chunked into windows\*.\* These
    windows are ~100k blocks each. There are 10 windows so around 1MM
    blocks. (Just to sanity check, at
    [block times of approx 14 sec](https://etherscan.io/chart/blocktime),
    [14MM seconds is around 162 days](https://www.wolframalpha.com/input?i=14000000+seconds+in+days),
    which checks as
    [end of Aug 2021](https://www.convertunits.com/dates/daysfromnow/-162).)

Here are a few simple pics that aim to give a feeling for what has been
going on at the top-end of this competition, and how it is all evolving.

### Top 10 Bots using recent rankings

This first plot shows the evolution of the **current** top 10 bots,
based on transaction count landed. You can see that several start
mid-period and start/come on strong.

![Top bot rank evolution using current top 10 bots](https://mirror.xyz/_next/image?url=https%3A%2F%2Fimages.mirror-media.xyz%2Fpublication-images%2FuUUX1jZSqytelvVVyT5KL.png&w=1920&q=90)

Top bot rank evolution using current top 10 bots

### Top 10 Bots using rankings from the start of the study

This second plot is similar, but shows the top 10 bots by transaction
count per window, **using the top 10 addresses at the start of the first
window.** You can see how some decrease, then stop.

![Top bot rank evolution using top 10 bots at first window of analysis](https://mirror.xyz/_next/image?url=https%3A%2F%2Fimages.mirror-media.xyz%2Fpublication-images%2F3rKxhnxKXeTiWzblpJB9A.png&w=1920&q=90)

Top bot rank evolution using top 10 bots at first window of analysis

One can conclude that these “new bots” above replace some of these older
bots for the same participants, or that they are out-competed and the
bots stop winning. Analysis of the EOAs related to these accounts may
answer some of those kinds of questions.

I’d have to guess that bots that debut in the top few positions must be
existing strong competitors evolving, but, of course, I could be wrong.

### By % of Transactions

The next plot shows transaction count as a percentage of all landed
fbots transactions through time, **using the ending rank**. Some of the
newer bots overtake the long-standing #1 bot in recent times.

![current top 10 bots, by transaction % through time](https://mirror.xyz/_next/image?url=https%3A%2F%2Fimages.mirror-media.xyz%2Fpublication-images%2Fy6KMCC_9eR34XVKca57UF.png&w=1920&q=90)

current top 10 bots, by transaction % through time

## Any bot that was in the top 10 at any time during the study

These plots are noisy, but they show **any bot that was in the top 10
during any window.** There are 21 addresses in total. The point of this
ugly, noisy plot is to show how much activity there is here at the top.
You can see a lot more on/off experimentation/competition.

![Any bot that was top 10 in any window](https://mirror.xyz/_next/image?url=https%3A%2F%2Fimages.mirror-media.xyz%2Fpublication-images%2FjHOKB1AZyR5JUR0iJOYRS.png&w=1920&q=90)

Any bot that was top 10 in any window

The only real “punchline” to this post is to show how much
**competition** and **experimentation** there is at the top of the game.

As before, there may be outright errors in this analysis, but I don’t
think there’s anything egregious. Please do contact me
[via twitter @totlsota](https://twitter.com/totlsota) with any feedback.
