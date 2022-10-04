---------- Forwarded message --------- From: Leslie Lamport <Unknown>
Date: Tuesday, July 6, 2021 at 10:04:14 AM UTC-7 Subject: Re: [tlaplus]
Fairness and either statement To: tlaplus <Unknown>

Fairness is probably the part of TLA+ that most people find hardest to
understand. This is not a problem with TLA+. Most other formalisms don't
have this problem because they simply can't express the kind of fairness
that you need. The fundamental reason fairness, and liveness in general,
are hard to understand is that they are properties of infinite
behaviors, and people have trouble understanding the infinite. For
example, their minds are usually blown by "Hilbert's hotel", which is
always full but always has room for another guest because it has an
infinite number of rooms. (You can look it up on the web.)

If you learn PlusCal and enough about TLA+ to understand how to express
the fairness properties you will need, you should have no trouble
learning to write TLA+ specs. You will then have the freedom to use
either PlusCal or TLA+, whichever is best for an application. You can
also use PlusCal together with TLA+ specifications of fairness. You can
write a PlusCal algorithm with no fairness requirements, which will be
translated to a specification named Spec. You can then add, after the
translation, the definition

FairSpec == Spec /\ some fairness conditions

and use FairSpec as your specification. (Don't modify the definition of
Spec because your modifications will disappear the next time you run the
translator.) You can also put some fairness conditions in the PlusCal
code and put additional fairness conditions that can't be expressed
easily in PlusCal in the definition of FairSpec.

Incidentally, you can always express any TLA+ fairness conditions in
PlusCal. However, this often requires changing the process structure of
the PlusCal code. In your example, that can be done by replacing the
process that executes either branch1 or branch2 with two processes: one
that executes branch1 and one that executes branch2. When you understand
TLA+, you will understand that processes are not inherent in an
algorithm but represent a particular way of writing the TLA+ formula
that is the algorithm.

Leslie

On Tuesday, July 6, 2021 at 9:13:48 AM UTC-7 hwa...@gmail.com wrote: IMO
needing to put fairness on a non-deterministic decision is one of the
points where you should be considering switching to TLA+ over using
PlusCal.

H On 7/6/2021 1:34 AM, Stephan Merz wrote: Hello,

requiring strong fairness for the branch1 action won't help because the
non-deterministic decision of which branch to enter is taken earlier (at
the "either" statement labeled "example"). This is one of the cases
where the intended fairness condition has to be expressed in TLA+. You
probably want to write something like

/\ SF_vars(example /\ pc' = [pc EXCEPT !["test"] = "branch1"]) /\
SF_vars(example /\ pc' = [pc EXCEPT !["test"] = "branch2"])

in order to express that both branches will be taken infinitely often if
execution arrives infinitely often at the "either" statement.

Hope this helps, Stephan

On 1 Jul 2021, at 14:53, p.to...@studenti.unipi.it
<p.to...@studenti.unipi.it> wrote:

Hi all, i don't know how to use the either statement in pluscal with
fairness condition on the options of the either or statement. I have
tried the following example with a label for each option of the
statement but it doesn't seems to work:

begin example:

    while TRUE do

        either

            branch1:

                set := {1};

        or

            branch2:

                set := {2};

        end either;

        later:

            skip;

    end while;

and the formula prop2 == <>(set={1}) doesn't hold true, the system cycle
over all branch2 options. I have tried to add the fairness in the tla
translated specification putting an /\ SF_vars(branch1) but the problem
persists, here is the tla+ translation from pluscal:

VARIABLES set, pc

(_ define statement _)

prop2 == <>(set={1})

vars == << set, pc >>

ProcSet == {"test"}

Init == (_ Global variables _)

        /\ set = {}

        /\ pc = [self \in ProcSet |-> "example"]

example == /\ pc["test"] = "example"

           /\ \/ /\ pc' = [pc EXCEPT !["test"] = "branch1"]

              \/ /\ pc' = [pc EXCEPT !["test"] = "branch2"]

           /\ set' = set

later == /\ pc["test"] = "later"

         /\ TRUE

         /\ pc' = [pc EXCEPT !["test"] = "example"]

         /\ set' = set

branch1 == /\ pc["test"] = "branch1"

           /\ set' = {1}

           /\ pc' = [pc EXCEPT !["test"] = "later"]

branch2 == /\ pc["test"] = "branch2"

           /\ set' = {2}

           /\ pc' = [pc EXCEPT !["test"] = "later"]

test == example \/ later \/ branch1 \/ branch2

Next == test

Spec == /\ Init /\ [][next]\_vars

        /\ WF_vars(Next)

        /\ SF_vars(test)

        /\ SF_vars(branch1)

someone can help? thanks

-- You received this message because you are subscribed to the Google
Groups "tlaplus" group. To unsubscribe from this group and stop
receiving emails from it, send an email to
tlaplus+u...@googlegroups.com. To view this discussion on the web visit
https://groups.google.com/d/msgid/tlaplus/932afbd1-f11a-4be3-a69a-ac1289ad7e11n%40googlegroups.com.

-- You received this message because you are subscribed to the Google
Groups "tlaplus" group. To unsubscribe from this group and stop
receiving emails from it, send an email to
tlaplus+u...@googlegroups.com. To view this discussion on the web visit
https://groups.google.com/d/msgid/tlaplus/12016527-CCB4-422F-965E-0D71CA237511%40gmail.com.

---------- Forwarded message --------- From: Leslie Lamport <Unknown>
Date: Wednesday, February 6, 2019 at 6:06:41 PM UTC-8 Subject: Re: How
does Fairness relate to the State Graph To: tlaplus <Unknown>

One question remains would it be reasonable for an engineer (say one of
my students) to expect my simple algorithm to terminate given fair
behavior. If so that would mean the technical definition of fairness in
TLA+ is at odds with this engineer's intuitions.

It is pointless to ask what corresponds to someone's intuition of what
fairness means. We are concerned with specifying systems, not reading
people's minds. The concept of fairness in this context has been
discussed since the 70s. In 1986 Nissim Francez published a book titled
"Fairness". One of the strengths of TLA is that it is the only formalism
I know of capable of simply and elegantly expressing what computer
scientists have meant by fairness.

So how can I explain intuitively where their intuitions have led them

astray or at least are different to the notion of fairness embedded in
PlusCal / TLA+?

People have difficulty understanding fairness and, more generally,
liveness. I suspect that this stems from not having a good understanding
of quantification, so they can't immediately "feel in their gut" the
difference between \A x : \E y and \E y : \A x. But for whatever reason,
you should expect that you and your students will have difficulty with
fairness. The only thing to do is to patiently explain the WF and SF
operators to your students in terms of assertions about behaviors. Since
teaching something is a great way to learn it, at least you'll come to
understand it fairly quickly.

I could say fairness is only understandable at the TLA+ code level and
not at the PlusCal level but this would not be very helpful to the
student.

Your students shouldn't be surprised that there are things they can
express in PlusCal that they can't express in C++. It won't surprise
them to learn that there are things they can express in TLA+ that aren't
easily expressed in PlusCal. The farther away you get from the math that
describes what's really going on, the less expressive the language is.
PlusCal looks more familiar to your students than TLA+, and can be more
convenient to use for some things--mainly for multithreaded algorithms
because it handles the pc variable for you. But that comes at a cost.
It's always possible to modify the fairness property produced by the
PlusCal translator. Remember that if the PlusCal code is

      A : either x' = x+1 or y' = y+1 ;

you can express fairness of an A action that increments x by writing
WF_vars(A /\ x'#x).

Leslie

if the translation made the branch occur between different steps

The translation doesn't make anything happen. The translation maps a
PlusCal algorithm to a TLA+ formula. If you can explain what TLA+
formula you would like the either...or statement to be mapped to, we can
discuss whether that would be a good translation.

But all of this is only relevant if other peoples intuition is that a
fair execution of the small program would indeed terminate.

People's intuition about concepts they don't understand is irrelevant. I
have no trouble accepting that the earth is moving me at over 1000 km
per hour as I type this, even though it contradicts people's intuition.

I don't understand Hillel's point 1, since I assumed the proposed
translation would apply only when there is no code between label b and
label c1 or d1. His point 2 isn't compelling either, because the
difference between control in process p being at b or at c1 or at c2 is
observable only by reading value of pc[p], and in multiprocess
algorithms, other processes are usually assumed not to be able to access
that value.

However, the proposal is unacceptable because it would provide a quite
unexpected translation if C1 or D1 were a while loop.

Leslie

---------- Forwarded message --------- From: Leslie Lamport <Unknown>
Date: Thursday, February 7, 2019 at 3:15:28 PM UTC-8 Subject: Re: How
does Fairness relate to the State Graph To: tlaplus <Unknown>

A more straightforward translation might be: ... b == \* /\ pc = "b" The
definitions of b_BRANCH\* make this conjunct redundant.

        /\ \/ b__BRANCH1
           \/ b__BRANCH2

But this doesn't solve the problem. The desired fairness condition is
fairness of both b_BRANCH1 and b_BRANCH2, and how is that supposed to be
indicated in the PlusCal code?

Before we waste any more time discussing this, everyone should realize
that it is just one of many kinds of fairness conditions one might want
that aren't expressible in PlusCal. For example in

w : with (n \in 1..42) { x := n }

one might want the fairness condition

\A n \in 1..42 : SF\_...(pc = "w" /\ x' = n)

Other specification methods that have been proposed write a spec with a
next-state relation as the disjunction of a particular set of (named)
actions. Some of them can specify liveness with fairness conditions on
those particular actions. But TLA+ is more expressive than any other
formalism I know of because it isn't limited to fairness of those
particular named actions. I know no way to get that expressiveness when
using PlusCal other than by defining a spec that is the conjunction of
the formula Spec generated by the PlusCal translation with additional
fairness formulas.

Perhaps someone else can find a way to do this that I haven't been able
to think of in the last 14 years. But please realize the scope and
difficulty of the problem and let's not clutter the group with ad hoc
proposals that may or may not work in one particular example.

Leslie
