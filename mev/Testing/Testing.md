All of these steps are for Ubuntu 22.04 in the goerli test network.

If you want to contribute with guides and testing, please [open an issue](https://github.com/flashbots/mev-boost/issues).

**Make sure that you are only using test ether, test accounts and test passwords. Do not reuse anything from your real accounts. When in doubt, please [ask](https://github.com/flashbots/mev-boost/issues/new)**.

We will add instructions for more consensus clients as they complete the Builder API implementation.

Let's start...

Make a workspace directory:

```
mkdir -p ~/workspace/
cd ~/workspace/
```

```
sudo apt install git
```

Get the testnet configuration:

```
git clone https://github.com/eth-clients/merge-testnets
```

Generate a secret:

```
openssl rand -hex 32 | tr -d "\n" > ~/workspace/secret
```

Get the key generator:

```
cd ~/workspace
wget https://github.com/ethereum/staking-deposit-cli/releases/download/v2.3.0/staking_deposit-cli-76ed782-linux-amd64.tar.gz
tar xvf staking_deposit-cli-76ed782-linux-amd64.tar.gz
```

Install [metamask](https://metamask.io/).

# Register as a validator

1. Get goerli test ether. See [Where to get test ether?](https://github.com/flashbots/mev-boost/issues/199)

2. Connect your metamast to the goerli network.

3. Create your validator keys:

```
cd ~/workspace/staking_deposit-cli-76ed782-linux-amd64
./deposit new-mnemonic --num_validators 1 --chain goerli
mv validator_keys validator_keys-goerli
```

4. Go to the goreli launchpad and follow the instructions to become a validator: https://goerli.launchpad.ethereum.org/en/

# mev-boost

Last verified: 2022-08-26

[Install go](#go).

Install development tools:

```
sudo apt install make gcc
```

Get the source code and compile:

```
cd ~/workspace
git clone https://github.com/flashbots/mev-boost
cd mev-boost
make build
```

Run:

```
./mev-boost -goerli -relay-check -relays https://0xafa4c6985aa049fb79dd37010438cfebeb0f2bd42b115b89dd678dab0670c1de38da0c4e9138c9290a398ecd9a0b3110@builder-relay-goerli.flashbots.net
```


# Run an execution client

`mev-boost` is independent of the execution client. You can run anyone.

## Nethermind

Last verified: 2022-08-25

Install dotnet:

```
sudo apt install dotnet6
```

Install development libraries:

```
sudo apt install libsnappy-dev libc6-dev libc6
sudo ln -s /usr/lib/x86_64-linux-gnu/libdl.so.2 /usr/lib/x86_64-linux-gnu/libdl.so
```

Get the source code and compile:

```
cd ~/workspace/
git clone --recursive https://github.com/NethermindEth/nethermind
cd nethermind/src/Nethermind
dotnet build Nethermind.sln -c Release
```

Make sure that you have opened the TCP and UDP port 30303.

Run in goerli:

```
cd ~/workspace/nethermind/src/Nethermind/Nethermind.Runner
dotnet run -c Release -- --config goerli --JsonRpc.Host=0.0.0.0 --JsonRpc.Enabled true --JsonRpc.JwtSecretFile=/home/$USER/workspace/secret 
```

# Run a consensus client

We will add instructions for more consensus clients as they complete the Builder API implementation. Look at the [consensus clients implementation status](https://github.com/flashbots/mev-boost#consensus-clients-implementation-status).

## Teku

Last verified: 2022-08-26

Status: https://github.com/flashbots/mev-boost/issues/156

Known issues:
- https://github.com/ConsenSys/teku/issues/5885

Install java:

```
sudo apt install default-jre
```

Get the source code and compile:

```
cd ~/workspace
git clone https://github.com/ConsenSys/teku
cd teku
./gradlew installDist
```

Prepare the validator keys. These are the keys created when you registered your validator. Teku requires you to put the password to the validator keys in a `.txt` file with the same name as the keystore. And then, to pass the paths as parameters as shown below, replacing `<path-to-keystore.json>:<path-to-password.txt>` with your paths.

More details: https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#validator-keys

Also note to replace <fee-recepient-eth-address> with the address of your test account for validators-proposer-default-fee-recipient in order to earn test rewards.

Run the validator and beacon nodes:

```
./build/install/teku/bin/teku \
  --data-path "datadir-teku-goerli" \
  --network goerli \
  --ee-endpoint=http://localhost:8551 \
  --ee-jwt-secret-file "/home/$USER/workspace/secret" \
  --log-destination console \
  --validator-keys=<path-to-keystore.json>:<path-to-password.txt> \
  --validators-proposer-default-fee-recipient=<fee-recepient-eth-address> \
  --validators-builder-registration-default-enabled=true \
  --builder-endpoint="http://127.0.0.1:18550"
  --initial-state=https://goerli.checkpoint-sync.ethdevops.io/eth/v2/debug/beacon/states/finalized
```

## Prysm

Last verified: 2022-07-06

Status: https://github.com/flashbots/mev-boost/issues/158

Known issues:
- https://github.com/prysmaticlabs/prysm/issues/8072#issuecomment-1169746714

[Install go](#go).

Install libraries and development tools:

```
sudo apt install cmake libssl-dev libgmp-dev libtinfo5 libprotoc-dev g++
export PATH=$PATH:~/go/bin
```

Get the source code:

```
cd ~/workspace
git clone -b develop https://github.com/prysmaticlabs/prysm.git
cd prysm
```

### Run in kiln

(note to replace <fee-recepient-eth-address> with the address of your test account, to earn test rewards)

Run a beacon node:

```
go run ./cmd/beacon-chain/... \
  --genesis-state=/home/$USER/workspace/merge-testnets/kiln/genesis.ssz \
  --datadir=datadir-prysm-kiln  \
  --http-web3provider=http://localhost:8551  \
  --chain-config-file=/home/$USER/workspace/merge-testnets/kiln/config.yaml \
  --bootstrap-node=enr:-Iq4QMCTfIMXnow27baRUb35Q8iiFHSIDBJh6hQM5Axohhf4b6Kr_cOCu0htQ5WvVqKvFgY28893DHAg8gnBAXsAVqmGAX53x8JggmlkgnY0gmlwhLKAlv6Jc2VjcDI1NmsxoQK6S-Cii_KmfFdUJL2TANL3ksaKUnNXvTCv1tLwXs0QgIN1ZHCCIyk \
  --jwt-secret=/home/$USER/workspace/secret \
  --suggested-fee-recipient=<fee-recepient-eth-address> \
  --http-mev-relay=http://127.0.0.1:18550
```

To do: run a validator. See https://github.com/prysmaticlabs/prysm/issues/11001

### Run in ropsten

(note to replace <fee-recepient-eth-address> with the address of your test account, to earn test rewards)

Run a beacon node:

```
go run ./cmd/beacon-chain/... \
  --ropsten \
  --genesis-state=/home/$USER/workspace/merge-testnets/ropsten-beacon-chain/genesis.ssz \
  --datadir=datadir-prysm-ropsten  \
  --http-web3provider=http://localhost:8551  \
  --jwt-secret=/home/$USER/workspace/secret \
  --suggested-fee-recipient=<fee-recepient-eth-address> \
  --http-mev-relay=http://127.0.0.1:18550
```

Import the validator keys:

```
go run ./cmd/validator/... accounts import --keys-dir=/home/$USER/workspace/staking_deposit-cli-9ab0b05-linux-amd64/validator_keys-ropsten --ropsten
```

Run a validator node:

```
go run ./cmd/validator/... \
  --ropsten \
  --enable-validator-registration \
  --suggested-fee-recipient=<fee-recepient-eth-address>
```

## Lighthouse

(in progress)

Install libraries and development tools:

```
sudo apt install -y git gcc g++ make cmake pkg-config llvm-dev libclang-dev clang curl
```

Install rust:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

Get the source code and compile:

```
cd ~/workspace
git clone -b builder-api https://github.com/sigp/lighthouse.git
cd lighthouse
make
```

## Lodestar

(In progress)

Install nodejs:

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
sudo corepack enable
```

Get the source code and compile:

```
cd ~/workspace
git clone https://github.com/chainsafe/lodestar
cd lodestar
yarn install --ignore-optional
yarn run build
```

### Run in Kiln

Run the beacon node:

```
./lodestar beacon --network --builder.enabled --builder.urls http://127.0.0.1:18550 --jwt-secret=/home/$USER/workspace/secret                              
```

Run the validator node:

```
./lodestar validator --network kiln --defaultFeeRecipient <fee-recepient-eth-address> --builder.enabled --importKeystoresPath <path-to-keystore.json> --importKeystoresPassword <path-to-password.txt>
```

## Nimbus

(In progress)

Install development tools:

```
sudo apt install build-essential
```

Get the source code and compile:

```
cd ~/workspace
git clone https://github.com/status-im/nimbus-eth2 --branch unstable
cd nimbus-eth2
make -j4 nimbus_beacon_node
```

# Common requirements

## Go

For prysm and mev-boost.

Install go:

```
cd ~/workspace/
wget https://go.dev/dl/go1.18.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go 
sudo tar -C /usr/local -xzf go1.18.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

# References

- https://notes.ethereum.org/@launchpad/kiln
- https://notes.ethereum.org/@launchpad/ropsten
- https://hackmd.io/@prysmaticlabs/BJeinxFsq
- https://hackmd.io/@StefanBratanov/BkMlo1RO9