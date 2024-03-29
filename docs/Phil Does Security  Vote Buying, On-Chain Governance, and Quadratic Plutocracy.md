This post is a continuation/expansion of a previous post,
“[On-Chain Vote Buying and the DAO Dark Ages](http://hackingdistributed.com/2018/07/02/on-chain-vote-buying/)“,
published on HackingDistributed.  In this initial post, we provided an
efficient private vote buying infrastructure that could be used to
arbitrarily alter stable game theoretic equilibria in any on-chain
voting protocol by allowing votes, identities, and restrictions on
behaviors to be bought and sold on an efficient, private,
trust-minimizing market.

We also explored an attack on blockchain systems we called a “Dark DAO”,
in which a network of incentivized participants pooled to form a vote
buying or consensus attacking cartel that was opaque to outsiders. 
These attacks have implications on on-chain voting incentives, general
blockchain security, and e-voting in the permissionless model (where
users can generate their own keys using untrusted hardware).

We will now explore these ideas in the context of other complicating
factors, such as direct on-chain governance for consensus rules, and
schemes which explicitly allow for vote buying such as quadratic voting.

## Self-Evolving Systems

Beyond their use as signaling, a natural extension of a voting model in
blockchains is to use voting to decide critical community governance
questions.  Such questions have led to
[coin splits](https://cointelegraph.com/news/bitcoin-is-splitting-once-again-are-you-ready),
[community strife](https://www.theregister.co.uk/2017/08/01/bitcoin_forks/),
and
[personal and physical attacks](https://techcrunch.com/2017/10/17/bitcoin-engineer-jameson-lopp-swatted-by-angry-crypto-fans/)
on many occasions in past systems, and providing a natural upgrade
mechanism for rules governing the system seems an intuitive solution to
the strife.  Two concrete proposals include in
[Tezos](https://www.reddit.com/r/tezos/comments/6chhpy/how_does_voting_work_in_tezos/)
and
[EOS](https://github.com/EOSIO/Documentation/blob/master/TechnicalWhitePaper.md#governance).

Obviously, such schemes are vulnerable to the above attacks and
pathologies.  Given the
[relatively high level of drama](https://www.coindesk.com/inside-sprawling-ongoing-vote-will-decide-eos-launches/)
that has already been empirically observed in the EOS voting protocol,
and as such votes in many cases directly incentivize vote buying for
rational actors, it is likely that vote buying will prove a major
problem should any such systems reach maturity.

Using coinvotes in this manner does not directly affect the
possibilities available to a vote buyer, who could potentially buy any
behavior they would like to on any system.  That being said, using a
coinvote in this manner legitimizes any outcome of the community
process, and
[provides a convenient default](https://pagefair.com/blog/2015/the-tyranny-of-the-default/)
for users to converge on. Otherwise phrased, most users will likely
accept most outcomes of most coinvotes, so rigging such votes can allow
a malicious actor to impose their will on an ecosystem where the
majority of honest actors disagree (but follow along anyway, because the
vote appears clean).  This, along with the direct benefit provided by
many consensus rule changes to actors within the system (consider for
example the setting of block rewards, or the setting of block size /
participation hardware requirements, or the setting of minimum stake,
etc.) means that tampering with such votes is often directly financially
incentivized.

[![Election instances in the US where a popular vote loser was declared victor.](https://pdaian.com/blog/wp-content/uploads/2018/06/Electoral_college_win_popular_vote_lost_US_Presidents.png)](https://pdaian.com/blog/wp-content/uploads/2018/06/Electoral_college_win_popular_vote_lost_US_Presidents.png)

Populations will accept vote outcomes regardless of how bitterly they
disagree with the outcome or how nonsensical it seems… if they accept
the process.

Incentives for hijacking signaling votes may in some cases be less
direct, as these votes have less influence in forcing users to perform
an upgrade or accept an unpopular change.  Such “loose coupling” is
advocated for by both
[Vitalik Buterin](https://vitalik.ca/general/2017/12/17/voting.html) and
[Vlad Zamfir](https://medium.com/@Vlad_Zamfir/against-on-chain-governance-a4ceacd040ca),
with the former opining

> Here, note that there is a key difference between tightly coupled and
> loosely coupled votes. In a loosely coupled vote, direct or indirect
> vote bribing is also possible, but if the community agrees that some
> given proposal or set of votes constitutes a game-theoretic attack,
> they can simply socially agree to ignore it.

In my personal opinion, reality is a bit more subtle than this, as
deciding whether there is an attack in the presence of a credible threat
is a non-trivial social consensus problem vulnerable to false flag
attacks to stall progress.  Furthermore, unilaterally agreeing to
suspend in the presence of an attack simply does not go far enough, as
it opens a trivial DoS vector on any vote (don’t like the majority
opinion?  launch an attack and claim unfairness!).

In general, our previous post on this subject concluded that all
on-chain coin-based voting systems essentially emulate plutocracy.  If
they do not directly emulate plutocracy, perhaps through some external
system of identity, they can be made to emulate plutocracy through the
buying and selling of constraints on user actions, such as in the Dark
DAO example we provided.  Lastly, attacks can be hidden in nature, and
can (again as in the Dark DAO construction) remain undetectable and
unmeasurable.  While a classic response may be that plutocrats are
interested HODLers of the coin and will always vote in a coin’s best
interests, the existence of vote buying clearly separates HODLing from
voting behavior economically, and allows a range of new incentive
changing mechanisms that in equilibrium likely degenerate into sheer
plutocracy.

Such concerns are particularly severe when multiple ecosystem projects
leverage on-chain voting, as
[rational users of any system will always be incentivized to pledge some funds to directly attacking the security of the competition](https://www.coindesk.com/blockchains-feared-51-attack-now-becoming-regular/).
 The presence of multiple on-chain governance systems with intertwined
incentives makes outcomes even less clear, and it would be an extremely
surprising result if such a lack of clarity did not directly imply the
existence of a large number of complex black swan events.

## Quadratic Plutocracy

Despite the poorly understood nature of on-chain voting, many
cryptocurrencies wish to perform experiments that go further than
standard voting mechanisms.  Such experiments, considered
[radical proposals](https://press.princeton.edu/titles/11222.html) in
meatspace, are even less tested in the on-chain context. One example is
a proposed scheme called
[quadratic voting](http://ericposner.com/quadratic-voting/), which
explicitly aims to avoid plutocracy and solicit fair outcomes from users
by allowing users to buy votes at an exponentially increasing cost for
each vote.  In this way, intuitively, a large number of less-resourced
but passionate voters cannot be overwhelmed by a few dispassionate
wealthy voters. Also, a passionate minority cannot be overwhelmed by a
passive but primarily indifferent minority, a known pathology in some
traditional voting models.

Interestingly enough, rather than fighting vote buying as degenerating
into plutocracy as our initial article does, quadratic voting enforces
and enshrines vote buying as a _feature_ of the system.  The
exponentially increasing costs to buy these votes is the key mechanism
that produces fair outcomes.

Unfortunately, quadratic voting comes with several drawbacks in an
on-chain setting.  The first is the obvious requirement for identity;
even small amounts of Sybil-vulnerabilities completely break the scheme
by allowing wealthy users to amplify their funds through splitting.
 Settings with identities that depend on user-generated keys are
vulnerable to identity buying attacks through the same mechanisms used
for vote buying in the Dark DAO.

Even after surmounting these drawbacks and assuming a perfect system of
identity, the scheme inherently amplifies the effect of bribery
attacks.  As
[one survey on vote buying in political elections points out](https://www.buffalo.edu/content/www/baldycenter/events/conferences/redistribution/_jcr_content/par/download_9/file.res/ARPS_MaresYoung_Final.pdf):

> “Many have argued that positive inducements should have a greater
> impact on the voting behavior of the poor because the marginal utility
> of income of low-income voters is higher (Dixit & Londregan 1996,
> Calvo & Murillo 2004, Stokes 2005, Stokes et al. 2013). The evidence
> that vote buying is principally aimed at the poor is virtually
> uncontested.  In cases ranging from Lebanon (Corstange 2011) to
> Nigeria (Bratton 2008) and Argentina (Stokes 2005), studies find that
> politicians target poor voters with positive inducements, such as
> gifts and offers of food or money.”

It is not clear that the blockchain context will differ.  Especially in
quadratic voting, bribing poor voters even at a loss to what such votes
would cost the rich themselves could be profitable, essentially creating
an economic Sybil attack despite the identity system enforcing
real-world identities on-chain.  This makes quadratic voting likely
unsuitable for large blockchain elections with varied stakeholders, at
least without substantial modification.

The authors of the quadratic voting proposal
[claim in recent analysis](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2571012)
that the scheme is more resilient to bribery than traditional voting,
with the key mechanism as follows:

> However, in the bounded support case she would have to pass herself
> off as a number of identities comparable with the square root of the
> population size (many thousands of individuals in a state like
> California), which would be trivially easy for authorities to detect
> and prevent. Even when α = 3 she would have to pass herself off as
> being clones of the sixth root of population, or roughly a dozen
> individuals, which still seems quite detectable, before she would
> cause problems for efficiency.

They conclude that “collusion and fraud, except on a very large scale,
are deterred either by unilateral deviation incentives or by the
reactions of non-participants to the possibility of their occurring.” 
While this is true in a paper ballot or off-chain setting, it is clear
through the lens of our previous articles that such assumptions are not
tenable on-chain.  Buying votes of on the order of a dozen individuals
is likely extremely easily tractable, and also extremely hard to detect
in such a setting.  It is in fact the very privacy provided by the Dark
DAO scheme, combined with its ease of deployment, that provably violates
the authors’ assumptions of reacting to collusion or fraud being a
potentially feasible countermeasure.

This is all not to say that experimenting with new voting models in
blockchain is not useful or interesting, but to assert that **any voting
deployments must be mindful of the unique and hostile environment
on-chain voting demands**.  It is unlikely that schemes that work well
for in-person voting, boardroom meetings, or even coordinator-based
protocols will simply port to blockchains without substantial additional
work on defining and proving adversarial resilience to both technical
and economic attacks in a blockchain-specific context.  It is clear that
applying mechanisms that work in traditional information sciences or
economics is not sufficient to analyze and represent the equilibria that
will actually emerge when a given game is deployed (and matures to
importance) in a permissionless blockchain environment.

It is likely that if schemes without blockchain-specific analyses are
deployed for important political decisions, even past experimental
success will not grant them freedom from manipulation.

## Lessons

So, it is clear that the dangers of on-chain voting are exacerbated by
more complicated systems built on top of these technologies.

Self evolving systems directly incentivize vote buying and give the
outcome of purchased and rigged votes large amounts of power over system
operation.

Schemes like quadratic voting, that have been proposed in a blockchain
context, explicitly allow vote buying and attempt to mitigate its impact
through an identity-based scheme.  Such schemes may have unforeseen
properties in a blockchain environment, where identity is a murky
concept, and the existence of trusted hardware implies that a user can
sell only behaviors of their identity without transferring the identity
itself.
