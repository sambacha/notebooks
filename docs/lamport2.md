Jeremy,

You have discovered what makes the TLA logic better than any other
temporal logic for dealing with liveness. The practical way to specify
safety properties is with a state machine. In TLA, that's the Init /\
[][next]\_vars part of the spec. Hundreds (probably thousands) of ways
of specifying a state machines have been proposed. They all more or less
work for specifying safety. But safety just says what may happen. It's
nice to be able to say that your system must do something, which means
that you have to add a liveness property.

Temporal logic is the best way I know to describe liveness properties.
However, the only way to add a liveness property to a state machine that
makes the state machine understandable is to add a fairness property. If
S is a safety property, adding a fairness property means writing S /\ L
where L is a liveness property that doesn't add any safety property.
What that means is the S /\ L does not rule out anything that may happen
that S allows to happen. More precisely, note that Init /\ [][next]\_var
is false of a behavior if and only if either Init is false on the
initial state or [Next]\_var is false on some pair of successive states.
So, we can talk about it being true on a finite behavior. L is a
fairness property for S if any finite behavior satisfying S can be
extended to an infinite behavior satisfying S /\ L. (Instead of saying
that L is a liveness property for S, we usually say that the pair S,L is
machine closed.)

The problem with your spec is that the liveness property <>[](A=0) is
not a fairness property for your safety spec Init /\ [][next]\_vars.
It's an egregious form of non-fairness that rules out all finite
behaviors satisfying the safety property. But you can get into trouble
by writing less extreme examples. You almost never want to add a
liveness property that is not fairness. (I've written one spec during my
career that did it.) But I know of no way to tell if an arbitrary
liveness property is a fairness property for your spec. And, I don't
know any easy way to make sure you're writing a fairness property in any
temporal logic except TLA.

In TLA it's very simple. You just write your liveness condition as the
conjunction of formulas of the form WF_vars(Act) or SF_vars(Act), where
Next can be written as Act \/ SomethingElse. If you don't follow that
rule, you're asking for trouble.

Leslie

P.S. The one spec I've written that used a non-fairness liveness
property was for the condition that database people call
serializability. The fact that I had to do that to get a simple spec was
a sign that serializability, although it looks like a simple, reasonable
condition, is actually very weird when you examine it closely.
