# Login Bender
**Description**
Log in with Bender's user account.

Style: Tutorial, With Coding Challenge
Topic: Injection

## Solution

### Web Solution
We should use the `admin` user to get bender username (Search `/#/administration`), found `bender@juice-sh.op`

Then we will try the same trick as the ***Login Jim*** challenge.

Sent (via `POST`) a payload to `/rest/user/login`.
```json
{
    "email":"bender@juice-sh.op'--",
    "password":"asdf"
}
```
It returns a `200 OK` and a JWT token...

### Coding Challenge
Here is exactly the same as last time.

Line 15, the direct usage of external input inside a SQL query.

Fix is using some `bind` attributes
