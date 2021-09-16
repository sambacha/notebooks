## RPC Performance

mostly likely your performance issue is because RPC daemon does not use
shared memory with Erigon, so all communication is happening via sockets
RPC daemon needs to specify --datadir. I think it did not use to work
with docket, but now it can take a look at this:
https://github.com/ledgerwatch/erigon/blob/devel/docker-compose.yml RPC
daemon is using --datadir, also their are in the same PID space pid:
service:erigon # Use erigon's PID namespace. It's required to open
Erigon's DB from another process (RPCDaemon local-mode)
