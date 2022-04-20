# MetaMask JSON-RPC API

MetaMask exposes methods to untrusted parties like websites to interact with the user's wallet via an Ethereum JSON-RPC API. Some of its methods are simple pass-throughs to the user's current selected Ethereum network node, as defined by the Ethereum JSON-RPC API. Additional methods are provided by the wallet to interact with the user's accounts, including:

- `eth_requestAccounts`: To request access to the user's accounts.
- `eth_accounts`: Access to the user's accounts.
- `eth_sendTransaction`: To propose Ethereum transactions to the user.
- `wallet_watchAssets`: To propose ERC-20 assets to the user's
- `personal_sign`: To propose human-readable signature challenges to the user.
- `eth_signTypedData_v3`: To propose the signature of structured data to the user.
- `eth_signTypedData_v4`: To propose the signature of structured data to the user which can also support recursive structs and null values.
- `eth_sign`: To propose low-level binary signatures to the user (this method will show the user a hazardous warning and is not recommended for good user experience)
- `wallet_getEncryptionKey`: (Desktop only) To request a public encryption key from the user that can be used to send them encrypted messages.
- `wallet_decrypt`: (Desktop only) To propose the user decrypts a message that is intended for their public encryption key. The prompt allows the user to view the message before optionally returning it to the requesting site.

## EIP 2255 Permissions System

On desktop, an invocation of `eth_requestAccounts` will prompt the user to select any number of accounts to expose to the requesting website, and only those selected accounts will be exposed to the website.

On mobile, after a user connected to a website, subsequent calls to `eth_accounts` will return whatever the user's current selected account is, which is whatever account the user has most recently looked at.
