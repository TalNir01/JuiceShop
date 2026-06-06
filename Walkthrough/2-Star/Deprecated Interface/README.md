# Deprecated Interface


**Description**
Use a deprecated B2B interface that was not properly shut down.

Style: Contraption, Prerequisite
Topic: `Security Misconfiguration`

## Solution

While just searching `b2b` at `main.js` I found this content:
```javascript
consts: [...["ng2FileSelect", "", "id", "file", "type", "file", "accept", ".pdf,.zip", "aria-label", "Input area for uploading a single invoice PDF or XML B2B order file or a ZIP archive containing multiple invoices or orders<!---->", 3, "uploader"]...],
```
So couldn't understand what it means, but found an invoice prompt at the `http://127.0.0.1:3000/#/complain`...

When opening the page via `devtools` and search we enocunter the same text as the previous strings. so this page if probably important some how.

Also we figured that when I upload a file it does send a request to a `/file-upload` endpoint (no sure the exact flow due to me being a shitty at js...)

So I tried uploading an xml (via UI) it blocked me.

Later I tried via caido replay as a multipart data. Received an error message

```bash
POST /file-upload HTTP/1.1
Host: 127.0.0.1:3000
Content-Length: 74849
sec-ch-ua-platform: "macOS"
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsInJvbGUiOiJhZG1pbiIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMDYgMTM6MTk6MjIuNzUxICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjYtMDYtMDYgMTM6MTk6MjIuNzUxICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc4MDc1MjUzOX0.snZOujw_zmEXj_2NfKL3IP2bhwfkBL-hLfcEA6izI72tfcfXbzovZYZnmkANwg1W01pmstnQetdV86vaQqvsCMbx_j_S4oX1kcpdVw9hunMg_XCQ8xHsqArS8QvNer5hbF-2JgSXXsR4vZa15pic_t6h2qEklPuLFsPzWbavZFs
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36
sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryCSi3b53yxQnmGCMG
sec-ch-ua-mobile: ?0
Accept: */*
Origin: http://127.0.0.1:3000
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: http://127.0.0.1:3000/
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en-US,en;q=0.9
Cookie: language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; show_tool_calls=false; continueCodeFindIt=6mYY3VNqaP0Eg2bdynWDkBm9OZGoHwwtyMZ6MvRXr1LQjwx5pGeozJlK7Gzb; continueCodeFixIt=kpz6b8MwnEBzlj4KZYXrLq0k5aKwCrrhMKaeOvgWoV7pGQd92J3NmRPyDRBg; continueCode=v5LK9Vzj81YlXaPmebdgzcWSxxhegtmyF2OIg7h52AxoONB6q74R2WyDJkrQ; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsInJvbGUiOiJhZG1pbiIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjYtMDYtMDZUMTM6MTk6MjIuNzUxWiIsInVwZGF0ZWRBdCI6IjIwMjYtMDYtMDZUMTM6MTk6MjIuNzUxWiIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTc4MDc1NjkwMn0.xucS7S4xBorkEcRW2Nk96fu5mbMgDahbzzAXWQPiNgWFr8ts0hrUrRiBAnBJITXvSAsoNvR1eFj1jtb1yURrnZvFQ4kA9YfJwQgHI9s5fNICu7YUrZ6onTpR2vy_GTJcFxehliyTT77CUNQpwG1OeOfAhwvnHXN-kuKFEBg3AYw

------WebKitFormBoundaryCSi3b53yxQnmGCMG
Content-Disposition: form-data; name="file"; filename="basic-text.xml"
Content-Type: application/xml


<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
  <book category="tech">
    <title lang="en">Clean Code</title>
    <author>Robert C. Martin</author>
    <year>2008</year>
    <price>39.99</price>
  </book>
</bookstore>
------WebKitFormBoundaryCSi3b53yxQnmGCMG--
```