# Web3 Sandbox

**Description**
Find an accidentally deployed code sandbox for writing smart contracts on the fly.

Type: `Web3`, `With Coding Challenge`

## Solution
I have no clue, I don't even understand smart contracts...

### Web Solution
So I gave the description to claude and it told me to find some kinf of interactive code ide environment.

So I opened `main.js` and searched for `web3`, so that there are few JS

But interesting is 
```javascript
    XZ = () => Pe(null, null, function*() {
        return (yield import("./web3-sandbox.module-GG5AZS6F.js")).Web3SandboxModule
    }),
```

And according to the convention at the website, this `js` belongs to `http://127.0.0.1:3000/#/web3-sandbox`, And thats it! solved the challenge

### Coding Solution

So before deepdive into the challenge it self I gathered all the path that are mentioned at the website (See description below)

We just block the `web3-sandbox` path (and the line after) and we remove the ability to access this forgotten dev environment... So we just removed this section... even admin shouldn't use a dev portal on a prod site...


### URL That Were Mentioned At Coding Challenge
path: 'change-password',
path: 'data-export',
path: 'last-login-ip',
path: 'privacy-policy',
path: 'two-factor-authentication',
path: '**',
path: '2fa/enter',
path: '403',
path: 'about',
path: 'accounting',
path: 'address/create',
path: 'address/edit/:addressId',
path: 'address/saved',
path: 'address/select',
path: 'administration',
path: 'basket',
path: 'bee-haven',
path: 'chatbot',
path: 'complain',
path: 'contact',
path: 'delivery-method',
path: 'deluxe-membership',
path: 'forgot-password',
path: 'hacking-instructor',
path: 'juicy-nft',
path: 'login',
path: 'order-completion/:id',
path: 'order-history',
path: 'order-summary',
path: 'payment/:entity',
path: 'photo-wall',
path: 'privacy-security',
path: 'recycle',
path: 'register',
path: 'saved-payment-methods',
path: 'score-board',
path: 'search',
path: 'track-result',
path: 'track-result/new',
path: 'wallet',
path: 'wallet-web3',
path: 'web3-sandbox',