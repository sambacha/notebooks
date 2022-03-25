---
title: When should you use Result?
description: Against Railway-Oriented Programming
version: published
author: https://github.com/swlaschin/fsharpforfunandprofit.com
---

# When should you use Result?

> [source https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/#when-should-you-use-result](https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/#when-should-you-use-result)


So after all that negativity, what situations should you use Result for?

As I said in my book Domain Modeling Made Functional, I like to classify errors 
into three classes:

**Domain Errors**. These are errors that are to be expected as part of the business 
process, and therefore must be included in the design of the domain. For 
example, an order that is rejected by billing, or an order than contains an 
invalid product code. The business will already have procedures in place to deal 
with this kind of thing, and so the code will need to reflect these processes. 
Domain errors are part of the domain, like anything else, and so should be 
incorporated into our domain modeling, discussed with domain experts, and 
documented in the type system if possible. Note that diagnostics are not needed 
– we are using Result as a glorified bool.

**Panics.** These are errors that leave the system in an unknown state, such as 
unhandleable system errors (e.g. "out of memory") or errors caused by programmer 
oversight (e.g. "divide by zero," "null reference"). Panics are best handled by 
abandoning the workflow and raising an exception which is then caught and logged 
at the highest appropriate level (e.g. the main function of the application or 
equivalent).

**Infrastructure Errors**. These are errors that are to be expected as part of the 
architecture, but are not part of any business process and are not included in 
the domain. For example, a network timeout, or an authentication failure. 
Sometimes handling these should be modeled as part of the domain, and sometimes 
they can be treated as panics. If in doubt, ask a domain expert!
So using the definitions above:

Result should only be used as part of the domain modeling process, to document  expected return values. And then to ensure at compile-time that you handle all 
the possible expected error cases.

**Micro-domain**s, such as libraries, could also use Result if appropriate.
So to sum up, I think the Result type and railway-oriented programming are 
extremely useful when used appropriately, but the use-cases are more limited 
than you might think, and they shouldn’t be used everywhere just because it’s 
cool and interesting.
