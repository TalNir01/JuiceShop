# Reflected XSS

**Description**
Perform a reflected XSS attack with <iframe src="javascript:alert(`xss`)">. (This challenge is potentially harmful on Docker!)

Type: `Tutorial`, `Danger Zone`, `Good For Demos`

## Solution

### WTF is "Reflected XSS"
The malicious script is not stored — it's embedded in a URL and "reflected" back in the server's response immediately.
**Flow:**

1. Attacker crafts a malicious URL with a payload in a query parameter
2. Victim clicks the link (usually via phishing)
3. Server echoes the input back in the HTML response
4. Browser executes the script in the victim's context


Core IDEA, search for web pages were there are parameters in the request (url parameters usually) and the same ones appear at the response, match strings that are in both.

**NOTE:** This should be quite easy to implement in a fuzzer. maybe an AI based fuzzer...

### JuiceShop

When completeing the `checkout` flow we are redirected to a `order-track` page, which takes a `id` value and display it details (and the ID name as well)

```bash
http://127.0.0.1:3000/#/track-result/new?id=b642-21a3cd9498612fbc
curl -kv http://127.0.0.1:3000/#/track-result/new?id=b642-21a3cd9498612fbc

# No new, just view current state
http://127.0.0.1:3000/#/track-result?id=<iframe src="javascript:alert(`xss`)">
```

Due to me using docker, I don't think it works...