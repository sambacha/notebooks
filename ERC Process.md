2. The ERC process:

1. Bring initiative, there’s forks, solve the problems –– being polite,
   being political, making phone calls to reach consensus.

1. Problems:

1. Problem #1: Ethereum is centralized. Code / governance is handled by
   one party.

1. This is the “EIP” process.

1. These aren’t technical reasons, they’re political reasons.

1. The EIP process:

1. Anybody writes an EIP – must be technically valid, describes a change
   to the Ethereum ecosystem. “I want a sidechain”, “i want to change
   the gas for this opcode”, etc

1. If the EIP is implementable (i.e. it compiles), it’s accepted as a
   draft.

1. If there is community support, it’ll be reviewed by all core devs.

1. If it is supported by core devs, it is implemented.

1. If people support it, then people will upgrade the clients.

1. How it actually works:

1. You publish the EIP. There is a storm of discussion; emotional,
   backhanded.

1. Blackballed for mentioning cultural/political taboos

1. PR is not the right word for it. More like a wiki.

1. They discuss it at the core dev meeting. They implement the code,
   clients upgrade it.

1. Someone puts it on Hudson’s PM meeting agenda

1. How Swift (from Apple) handles this:

1. You go to the mailing lists, you start a discussion.

1. This takes a lot of effort, so you wanna be sure your stuff is legit.

1. Big discussion in the community. Swift is centralized (one party).
   You need code already, a test case or something, you explain
   technically in-depth. You get it to review, 2 week review period,
   it’s posted on top of Apple Swift website + goes out to mailing list.

1. The key point is: the 2 week speed pump. Everyone has to pass through
   that.

1. How DARPA handles bounties

1. Here’s a very specific problem and you need a 100x improvement

1. Come up with working solution that can support network of 10k

1. If you can do it elegantly, here’s 50k and we’ll study it further
   before implementing

1. The community expects full-time people; they don’t cater to part-time
   contributors.

1. A contributor needs to look at all issues and PRs –– there’s no
   queueing system. One could get approved at any time.

1. The ERC process:

1. Write an interface for a contract. He wrote 165 and 721.

1. A ton of new token standards.

1. First mover advantage to writing standards/interfaces - something
   like street cred for devs.

1. Over-standardization occuring

1. Not enough focus on what people would actually want/need to use

1. I don’t see the need for a package manager, the existing tools seem
   adequate.

1. Not enough money allocation from teams to bug bounties.
   https://github.com/status-im/ETHPrize-interviews/blob/master/bounties_report/analysis/William%20Entriken.txt

1. My workflow:

1. Change code.

1. Run geth with --cpu-prof

1. Generate graph from .prof file.

1. Run on cloud overnight.
