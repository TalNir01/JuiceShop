# Exposed Credentials

**Description**
A developer was careless with hardcoding unused, but still valid credentials for a testing account on the client-side.

## Solution

I just played with the website for a bit (should be automated...)

Then I wrote a custom cadio-http-history filter: `req.host.cont:"127.0.0.1" AND resp.raw.cont:"testing"`

Then it found a match at `/main.js`
and found the result

```javascript
testingUsername = "testing@juice-sh.op";
testingPassword = "IamUsedForTesting";
```

Just remains to check it...