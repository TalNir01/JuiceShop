# CSRF
**Description**
Change the name of a user by performing Cross-Site Request Forgery from another origin.

Link to `https://htmledit.squarefree.com/` on the `another origin` words

Style: -
Topic: Broken Access Control

## Solution

### What CSRF Is?
Basically a way to cause a user to make an action but do it by injecting client side code into another website.

I went to first craft an URL (API) call that changes the username...

It's a `POST` request to `/profile`

It's an request from type `application/x-www-form-urlencoded`.

Raw request
```python
POST /profile HTTP/1.1
Host: 172.29.63.151:3000
Content-Length: 14
Cache-Control: max-age=0
Accept-Language: en-US,en;q=0.9
Origin: http://172.29.63.151:3000
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://172.29.63.151:3000/profile
Accept-Encoding: gzip, deflate, br
Cookie: language=en; welcomebanner_status=dismiss; cookieconsent_status=dismiss; show_tool_calls=false; continueCodeFindIt=1k7NpoOzvM56VgRemXnB0GPZqKuWTPs9WHRn8YlL32E1qwW9JyDxrQbdajKr; continueCodeFixIt=l0de9Q7JW2kYZ4Lvz8jO5wB1ZmuRTVfqlCeOaDqgGnNKl3E6XyMRpVPmobr7; continueCode=VQyEzdvmH3tpcoT6sOUjcLSLtPPhLPcx5T4LtM7TPXcakI8OhQWtK8A4LgYX; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MiwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImppbUBqdWljZS1zaC5vcCIsInBhc3N3b3JkIjoiZTU0MWNhN2VjZjcyYjhkMTI4NjQ3NGZjNjEzZTVlNDUiLCJyb2xlIjoiY3VzdG9tZXIiLCJkZWx1eGVUb2tlbiI6IiIsImxhc3RMb2dpbklwIjoiIiwicHJvZmlsZUltYWdlIjoiYXNzZXRzL3B1YmxpYy9pbWFnZXMvdXBsb2Fkcy9kZWZhdWx0LnN2ZyIsInRvdHBTZWNyZXQiOiIiLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNi0wNi0xMyAxMToyNjo1NS41MjEgKzAwOjAwIiwidXBkYXRlZEF0IjoiMjAyNi0wNi0xMyAxMToyNjo1NS41MjEgKzAwOjAwIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNzgxMzUyODAzfQ.qJPC7uF--GAZ4O7Ft5heYbDPLghoIORJQwMkh5jpKgbQ-btITMJ7sMy7ufEeyu9galhpwU9PUCoJJl94RW4cm8Rpo7UVGvm6jnk3Uov2n3L3aANQnsPBXQNmNNkARKtUWrQO0Hd5-if-b-lH7bMczOR8NAikcu3xmasBCbODa4E
Connection: keep-alive

username=test1
```

So i asked claude to generate a simple HTML JS code and then I went and put it in the cool HTML render they provided us!!

It sent a request (with origin of the outside site) but for some reason we got `Error: Blocked illegal activity by ::fff:172.29.48.1`.

Which is my 'HOST' IP (using windows and NAT WSL)

Here is the request that was sent
```bash
curl 'http://172.29.63.151:3000/profile' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Origin: https://htmledit.squarefree.com' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' \
  --data-raw 'username=test4' \
  --insecure
```

For some reason it didn't used our already authenticated user.... Pretty weird!!

Maybe browser had protection for it? maybe we need something more elaborate or using old one...


Couldn't get this to work, browser kept not sending JWT headers from localstorage