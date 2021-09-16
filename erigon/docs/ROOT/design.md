## Storage Design

TG rely heavily to OS PageCache - it means most of reads are actually
going into PageCache (you can see it for example by sudo cachestat-bpfcc
from this tools iovisor/bcc)

It means OS need go to disk only on PageCache-miss (whole state is
32Gb - and it's hot part probably fits in memory)

It's true that some data can be prefetched in async manner - for example
"reading blocks"
https://github.com/ledgerwatch/turbo-geth/blob/master/eth/stagedsync/stage_execute.go#L188 -

they are never in PageCache because each block read/used only once
during "phase 5 (blocks execution)". what really can solve the problem -
parallel blocks execution - right now TG and Geth can exec 1
transactions only one-by-one. But it's very far from go live.

And here is some common architecture decisions made by TurboGeth:

almost no concurrency - because:

1. real disks (even NVMe) are much faster when no concurrency
2. It simlify code and profiling (1 thing happening at a time and you
   are clearly see the bottleneck).
3. Different cloud providers can do different magic - it's hard to fit
   them all (and fit real disks) in same time. good news - if you do
   serve lot's of RPC requests - they will happen in parallel without
   any locks.

so, generally - in TG only 1 write transaction can happen at a time (and
this TX will stay within 1 thread), and unlimited read transactions can
happen in the same time.

<!-- source: https://github.com/ledgerwatch/erigon/issues/1516#issuecomment-785612843 -->
