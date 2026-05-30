# Repetitive Registration
Read https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
**Description**
Follow the DRY principle while registering a user.

## Solution
I asked claude what DRY principle is

### DRY (Don't Repeat Yourself)

DRY in Security Research
Core idea: **Don't duplicate security logic, checks, or controls across your codebase — centralize them.** From a security researcher's perspective, violations of DRY are attack surface.

### Web Solution
I went and found the `API` call that register a user

```bash
POST /api/Users/ HTTP/1.1
Host: 127.0.0.1:3000
...

{
    "email":"test2@test.com",
    "password":"12345",
    "passwordRepeat":"12343",
    "securityQuestion":
        {
            "id":2",
            "question":"Yourldestsiblingsmiddlename?",
            "createdAt":"2026-05-30T06:37:56.251Z",
            "updatedAt":"2026-05-30T06:37:56.251Z",
        },
    "securityAnswer":"1"
}
```

I saw that the repeat password isn't really needed, this can be a client side logic, that prevent users from registration if the passwords aren't match, no need to use server code for it.

We can even find this at the devtools, so I "saw" it user level but didn't found the actual JS logic
```javascript
w(a.repeatPasswordControl.invalid && a.repeatPasswordControl.errors.notSame ? 36 : -1),
```

Anyway according to the DRY principle I just played with the repeatpassword and it solved the challenge, because the password matches has already been implemented so it doesn't make sense to reimplement this.

