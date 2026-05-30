# Zero Stars
Give a devastating zero-star feedback to the store.

## Solution
Submit a regular feedback to the store (store, not a product) and view the API call at burp.

Found the original `POST` request to `/api/Feedbacks/`
Which it value was
```json
{
    "UserId":24,
    "captchaId":1,
    "captcha":"0",
    "comment":"boom (***t@test.com)",
    "rating":1
}
```
So I just switched `rating` value to `0`, and send, it was successful. 