## Wallet Redux Doc V0 

### High Level Functionalities 

1. Generate a user seed phrase, encrypt it with a user input password, serialize the seed to a binary array and store it in the local storage. Use `UnlockedUserAccount` from Wallet SDK. 

An util func: seedToUserAccount (mnemonic, options?) => UserAccountBase 

action func 1: storeUserAccount (unlockedUserAccount, accountIndex) => void
action func 2: loadUserAccount (password, accountIndex) => UnlockedUserAccount

2. Resolve remote requests - ref: WalletRequest[]

    /resolve?request=<base64 encoded WalletRequest[]>&callback=<base64 encoded callback url base>

    - list all remote requests on the wallet webpage 
    - parse requests (i.e. sendTransaction, requestSingature, requestEncrypion, requestDecryption)
    - fetch user key: `loadUserAccount` - and popup window for user to input password
    - resolve requests one by one - ask user to click "Confirm" or "Deny" button
    - sendBack the response through the `callback` link with serialized response `WalletResponse[]`

