# NFT Takeover

**Description**
Take over the wallet containing our official Soul Bound Token (NFT).

Style: Contraption, Good For Demos, Web3, With Coding Challenge
Topic: Sensitive Data Exposure

## Solutions

### Web Challenge Solution

Started by login in as admin (via username and password, `admin@juice-sh.op`:`admin123`). Went to `/#/wallet` webpage.

So a promotion named 'Try out our new Crypto Wallet'. -> Redirects to `/#/wallet-web3`.

There it asked for logging in with `MetaMask`.

we found `wallet-web3.module-UAFGEO2L.js` file.

So I think the auth enforcement is via the frontend.

I put a `breakpoint` at `handleAuth` function..

Put a `b` after the `isConnected` assignment, before the check.

Then, at console do `e = true` and `e` to make sure you were correct.

After that the next line is this condition

```js
if (e && (yield le()), !window.ethereum) {
    this.snackBarHelperService.open("PLEASE_INSTALL_WEB3_WALLET", "errorBar");
    return
}
```

we have `e = true`, we must make `yield le()` be equal `true` and the `window.ethereum` to `true` as well.

```js
function le() { return true; }
(yield le())// Test that failed for some reason
```

and do 
```js
window.ethereum = true
```
--- Summarize

```js
e = true
function le() { return true; }
window.ethereum = true
```
Anyway, it worked and we reached the `ce`. and then we felt.

We failed at the `yield ce` line...

I got really really tired from doing it and it seems to hard...


So the walkthrough said to find the code.

I went to `about us` and found a comment mentioning NFT, led me to a web page `/#/juicy-nft`, It asks for a `Private Key` which in crypto is usually a list of random meaning less words (they were at the post.)

*"purpose betray marriage blame crunch monitor spin slide donate sport lift clutch"* (Seed phrase)

It returned an error, let try generate a private key...


Asked GPT to write a script that converts seed-phrase to a private key...

Executed the script (pressed enter when needed):

```bash
uv run ./Walkthrough/2-Star/NFT\ Takeover/generate-private-key.py
```

Results:
```bash
Account index [0]: 

Derivation path : m/44'/60'/0'/0/0
BIP-39 seed     : 552b89904540a9d8751f1c7e31f71feb584bb62af857fbfb65bcb8e48c80dcb8654614379a2a1e294f759134c0008beeee778fb353f98e15edf3adad2a728e17
Private key     : 0x5bcc3e9d38baa06e7bfaab80ae5957bbe8ef059e640311d7d6d465e6bc948e3e
Address         : 0x8343d2eb2B13A2495De435a1b15e85b98115Ce05

Keep the private key and seed phrase secret. Anyone holding either controls this account.
```