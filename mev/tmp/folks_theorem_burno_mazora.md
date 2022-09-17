---
title:  Is Folk's theorem the Blockchain's nightmare
date: May, 20, 2022
author: Bruno Mazorra
---

# Is Folk's theorem the Blockchain's nightmare?

> [source, https://youtu.be/WsrzWuA0xdo](https://youtu.be/WsrzWuA0xdo)


## Editors Note:

Could not find these slides, so these are my own notes. There is more content than this in the presentation.

## Economic rationality

### Individual rationality
An agent is individually rational if they try to maximize its own revenue.
Example: Construct block with max fees

A miner receives a set of transactions $xx _{1}, \ldots, tx x _{n}$ with gas price $b_{1}, \ldots, b_{n}$ and $g_{1}, \ldots, g_{n}$ units of gas. The miner can choose any subset of transactions $T X$ such that $\sum_{t x \in T X } g_{ tx } \leq \max$ Gas.


\begin{equation*}
    T X \text { such that } \sum_{ tx \in T X } g_{ tx } \leq \max \text { Gas. }
    \end{equation*}





### Example: Transaction inclusion
- A "dummy" node orders transaction by timestamp, by transaction hash or randomly.
- A rational node tries to solve the following optimization problem:
\begin{equation*}
\begin{array}{ll}
\max & \sum_{i=1}^{n} x_{i} b_{i} g_{i} \\
\text { s.t. } & \sum_{i=1}^{n} x_{i} g_{i} \leq \max G a s, \\
& x_{i} \in\{0,1\} \text { for } i=1, \ldots, n
\end{array}
\end{equation*}

> This is known as the Knapsack problem and is a NP-problem. In general, Ethereum nodes use a greedy approximation algorithm to obtain an approximation of the optimal solution.
> [source, https://youtu.be/WsrzWuA0xdo?t=157](https://youtu.be/WsrzWuA0xdo?t=157)

## Game Theory

### The Stage Game
A game is a tuple $G =(N, A, u)$ where:
- $N=\{1, \ldots, n\}$ is the set of players.
- $A=\prod_{i=1}^{n} A_{i}$, where $A_{i}$ denotes the set of actions for a player $i$.
- $u_{i}: A \rightarrow R$ is the utility function of a player $i$.
- Players want to maximize $u_{i}$ and take actions simultaneously.

### Strategy
A pure strategy can be thought as a plan subject to the observations they make during the course of the game of play. A mixed strategy is an assignment of a probability to each pure strategy.

### Nash equilibrium

A mixed strategy $s=\left(s_{1}, \ldots, s_{n}\right)$ is a Nash equilibrium if for every player $i$, and any strategy $\tilde{s}_{i}$, we have that
\begin{equation*}
u_{i}\left(s_{i}, s_{-i}\right) \geq u_{i}\left(\tilde{s}_{i}, s_{-i}\right)
\end{equation*}

### Theorem

#### Every game has a Nash equilibrium.


#### Example 2: L2 game
Game

Assume $N=\{1,2\}$ and $t=2$.
- $EV =$ The value that can be extracted if players know the content of txs per block.
- $CR =$ Commit and Reveal. If possible, slash the other player.
- RC $=$ Reveal and Commit. If possible, extract EV.
- $R =$ Reward per Block.
- $S =$ Slashing value s.t. $S >> EV$.


Problems and difficulties to cooperate
- Anonymous players.
- Unable to commit to future strategies.
- Economic incentives to deviate from commitment.
Conclusion on stage game cooperation
Hard to achieve consensus to cooperate.

#### What if games are played indefinitely?

##### Non-Myopic
Players are non-myopic if they are concerned for presents and future payoffs.
Given an infinite sequence of payoffs $r_{0}, r_{1}, r_{2}, \ldots$ for a player $i$ and a discount factor $\delta$ with $0 \leq \delta<1, i^{\prime}$ s future discounted reward is
\begin{equation*}
\sum_{i=0}^{\infty} \delta^{i} r_{i}
\end{equation*}
Intuition on discount factor:
- The agent values about near term profits than future profits.
- The discount factor models the players' patience.

\begin{equation*}
    \sum_{i=0}^{\infty} \delta^{i} r_{i}
    \end{equation*}


### Repeated game

#### Repeated games
The stage game is played indefinitely many times. Players can observe past actions. All player: share the same discount factor $\delta$.
Player's utility
Let $x_{t}$ be the tuple of actions played at round $t$, then the utility of a player $i$ with discount factor $\delta$ is:
\begin{equation*}
U_{i}=\sum_{t=0}^{\infty} \delta^{t} u_{i}\left(x_{t}\right)
\end{equation*}

### Folk theorem with perfect monitoring

#### Folk Theorem

Let $G$ be any $n$-player game.
- For all strictly pure-action individually rational action profiles ã, that is, $u_{i}(\tilde{a})>\operatorname{minmax}_{i}$ for all $i$, there is a $\bar{\delta} \in(0,1)$ such that for every $\delta \in(\bar{\delta}, 1)$, there exists a subgame-perfect equilibrium of the infinitely repeated game with discount factor $\delta$ in which $\tilde{a}$ is played in every period.
- For all feasible tuple $v$, there is a $\bar{\delta} \in(0,1)$ such that for every $\delta \in(\bar{\delta}, 1)$, there exists a subgame-perfect equilibrium, with payoff $v$, of the infinitely repeated game with public correlation and discount factor $\delta$.


#### Example 1: Arbitrage competition and the Folk theorem
Since $(50 \,/\ 50 )$ is a feasible payoff, we have by Folk theorem that, if both players are enough patient (for $\delta \geq 2 / 3$ holds), there exists a Nash equilibrium $$\left(s_{1}, s_{2}\right)$ such that $u_{i}\left(s_{1}, s_{2}\right)=50 \$$.
In these setting, we have that collision among searchers induce:
- $+$ profits for searchers,
- profits for miners.
compared to the stage game.

#### System performance

There exists Nash equilibrium that do not lead to egalitarian distribution of rewards.

> [source, https://youtu.be/WsrzWuA0xdo?t=924](https://youtu.be/WsrzWuA0xdo?t=924)



#### Example 2: L2 with Threshold decryption scheme

##### Repeated game: All for nothing
If players are enough patient $(\delta \approx 1)$, then there exists a Nash Equilibrium where both players, play the Reveal-Commit strategy and extract the MEV.
System performance
Since miners extract MEV from users, the users' revenue decreases compared to the myopic model.

> [source, https://youtu.be/WsrzWuA0xdo?t=966](https://youtu.be/WsrzWuA0xdo?t=966)

