# Outdated Allowlist
Read: https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
**Description**
Let us redirect you to one of our crypto currency addresses which are not promoted any longer.

Type: `Code Analysis`, `With Coding Challenge`

## Solution

### Web Part

While reading the `main.js` (ctrl-f "redirect") we have found few redirects that are related to crypto currency

```javascript
showBitcoinQrCode() {
    this.dialog.open(Es, {
        data: {
            data: "bitcoin:1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm",
            url: "./redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm",
            address: "1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm",
            title: "TITLE_BITCOIN_ADDRESS"
        }
    })
}
showDashQrCode() {
    this.dialog.open(Es, {
        data: {
            data: "dash:Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW",
            url: "./redirect?to=https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW",
            address: "Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW",
            title: "TITLE_DASH_ADDRESS"
        }
    })
}
showEtherQrCode() {
    this.dialog.open(Es, {
        data: {
            data: "0x0f933ab9fCAAA782D0279C300D73750e1311EAE6",
            url: "./redirect?to=https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6",
            address: "0x0f933ab9fCAAA782D0279C300D73750e1311EAE6",
            title: "TITLE_ETHER_ADDRESS"
        }
    })
}
```

I put breakpoing to these functions, but couldn't reach a flow which these functions are executed.

I just put the one of urls as request and it solved the challenge: `http://127.0.0.1:3000/redirect?to=https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW`, the other 2 might will solve the challenge as well.

### Coding Solution

In the `redirectAllowlist` there are 3 crypto related address, just remove them from the "array".
