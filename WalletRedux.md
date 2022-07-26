## Wallet & DApp Dataflow Doc V0 

### Description
We have to build a two part product 
    - a wallet that handles request with user's private key (e.g. sendTransaction, requestSignature, requestDecryption)

    - a Dapp SDK to enable easy access to the wallet interface and some wrapper around Polkadotjs for easy development. 

### High Level Concepts
- `UserAccount` should be either locked or unlocked. 
    - Locked `UserAccoun` has no `privateKey`
    - Unlocked `UserAccount` has a `privateKey`

- `WalletRequest[]` is a serious of request to interact with keystore or blockchain interface. 
    - is an array of requests to be resolved. 
    - `WalletRequest` are created by the Dapp and resolved by either the Dapp or the Wallet.
    - each request can be either `local` or `remote`. Local requests are resolved by Dapp, while remote requests are resolved by the wallet. 
    - For remote requests - wallet will return `WalletResponse` to `WalletRequest`.

### Implementation of the Wallet 

1. Either create or import a user 12 words seed and require a user password to protect the seed. 

    utility function needed: seedToUserAccount (mnemonic, options?) => UserAccount (unlocked)

    utility function needed: lockUserAccount(UserAccount, password) => 
        - if (UserAccount.isLocked === false) ->
        - encryptedUserAccount: Uint8Array = UserAccount.lockWithPassword(password)
        - UserAccount.lock() // remove privateKey and set isLocked to true 
        - return encryptedUserAccount

    utility function needed: unlockUserAccount(encryptedUserAccount: Uint8Array, password) => 
        - UserAccount = UserAccount.unlockFromEncrypted(encryptedUserAccount, password)
        - return UserAccount

    utility function: saveUserAccount ( encryptedUserAccount ) => write an encryptedUserAccount to local storage; 

    utility function: loadEncryptedUserAccount ( accountIndex ) => load an encryptedUserAccount from local storage


    **Storage**: Record<AccountIndex (number), UserAccount>

    redux action 1: loadUserAccount (password, accountIndex) => 
        - use `loadEncryptedUserAccount` to load an encrypted user account from local storage
        - use password to `unlockUserAccount` and get the `UserAccount(unlocked)`
        - save the UnlockedUserAccount to redux store
    
    redux action 2: unloadUserAccount (accountIndex) => 
        - call UserAccount.lock() and remove private key from account 

2. Resolve remote requests

    from route like 
    ```
        /wallet/resolve?
            request = <base64 encoded WalletRequest[]> &
            callback = <base64 encoded callback url route to the Dapp that implements handler to `WalletResponse`> &
            account = instruct the wallet of which account to be used, either AccountIndex or an address
    ```

    Inside of the Route 

    - parse the {request: WalletRequests[], callback: URL, account: UserAccount (locked)} from router.queryParams 
    - Display requests on the Wallet UI somehow 
    - ask user to input a password and request for `loadUserAccount` from redux action
    - for each request, ask the user whether they `Allow` or `Deny`
    - When `Allow`, use `UserAccount`(unlocked) from redux storagae to resolve each requests 
    - Collect `WalletResponse` from each request
    - call redux `unloadUserAccount` and remove privateKey from redux store
    - serialize `WalletResponse` to base64 and redirect to callback url with `WalletResponse`

### Implementing the SDK (Without React)

### Implementing the SDK (With React)

### Implementing `@choko-wallet/networks`

The `@choko-wallet/networks` is a package contains a set of default network configurations shared between wallet and sdk. 

