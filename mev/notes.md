# Lifecycle of a transaction as it touches p2p, miner, state, EVM

We'll be jumping around lots of different parts of the geth codebase

## First stop - talking to the network

Let's start with the `TxFetcher`, it is responsible for "pulling" txns
from the p2p layer - uh - but where did it get it from...

Okay - so our first backing up - eth's p2p layer works in layers,
(subprotocols).

So we have for example the ethereum protocol part but we also have the
snap sync. subprotocol, so let's look at
`eth/protocols/eth/handlers.go:395`, at the
`handleNewPooledTransactionHashes`. Notice that we can't accept txns
(announcements at this point) until we are synced....so what is an
announcement? When an eth peer has a transaction to give out to the
network, it first sends out the transaction hash to its connected peers
(usually just a sqrt(peerCount))

(This the latest version of eth, old version would send out the entire
txn itself)

So - now the connected peer sent us a notification of a new possible
txn, where will it get picked up? at: `eth/handler_eth.go:93` (this is
golang's version of polymorphism)

And now we are back at the `TxFetcher`, notice it calls `.Notify`, which
itself some very basic sanity checks before adding it to the queue of
"txns to pull"

This then goes into a very complicated logic of scheduling when to
download the actual transaction, let's skip this hairy part. The next
step is the actual download of the transaction , after the announce was
scheduled, and it basically just goes back to `eth/handler_eth.go` , and
`eth/protocols/eth/handlers.go`

...lets stop for questions, otherwise lets assume the txn made it to the
mempool

## Now we have it in the mempool - what now?

Let's go into the miner code (current eth code) for how the block is
actually made

go into `miner/worker.go:982` in the `commitNewWork` method, here the
miner pulls txns from the mempool and assembles the block (this includes
receipts as well)

and the key point is the `commitTransaction` method of the worker, this
takes us into core code...

...lets stop for questions

## Now go into state/Apply message

...And now we jump into the state processor - this part it helps to
read/have the yellow paper handy, lets jump to
`core/state_processor.go:144`, to the function `ApplyTransaction` - here
we see one of the warts of ethereum, the awkward jump from a transaction
to an EVM "message" (this wart also manifest as the `CallArgs`) struct
of ethclient/gethclient. One thing to deeply note is that the EVM is not
thread safe, and each "message" call needs its own, freshly made EVM. It
would be like having to do a fresh python interpreter each time you ran
python code instead of having one longly running interpreter. Also
notice that the EVM is not thread safe with respect to the input
parameters given, that is, need fresh state per EVM as well.

The next critical code to examine is the method `.TransitionDb` of the
`StateTransition` data type. (keep the yellow paper handy), every fork
makes this code more complicated with more if/elses

...lets stop for questions

## go into EVM, the works

Now lets jump into the EVM itself -

So the EVM is a weirdo interpreter insofar as it can't really do much on
its own, all the interesting stuff has to be injected into its
environment. Like the python interpreter, where did the `map` or `len`
function come from? they are injected into the interpreter, so same
thing with the EVM but with things like `State`, `Coinbase`, `BlockHash`
stuff like that. The types `BlockContext` and `TxContext` capture. these
ideas and provide them for the EVM.

let me note again **NOTHING WITH THE EVM IS THREAD SAFE**

Lets stop here.
