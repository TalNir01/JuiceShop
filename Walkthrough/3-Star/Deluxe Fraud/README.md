# Deluxe Fraud
**Description**:
Obtain a Deluxe Membership without paying for it.

Topic: Improper Input Validation

## Solution
I went to the `/#/deluxe-membership` and it prompted me that "You are not eligible for deluxe membership!"

How did it knew all of that??

We identified an endpoint `GET /rest/deluxe-membership`. let see how initiated it!!

So I started reading the "frontend" website.
We view the "possible" rules:
```javascript
var zn = {
    customer: "customer",
    deluxe: "deluxe",
    accounting: "accounting",
    admin: "admin"
};
```

We might want to register a user and modify his `role`, we already did it to admin... so why not for deluxe...

I did this
```bash
POST /api/Users/ HTTP/1.1
Host: 172.29.63.151:3000
...
Connection: keep-alive

{
  "email":"test4@test.com",
  "role":"deluxe",
  "password":"12345",
  "passwordRepeat":"12345",
  "securityQuestion":{
    "id":1,
    "question":"Your eldest siblings middle name?",
    "createdAt":"2026-06-26T09:11:23.175Z",
    "updatedAt":"2026-06-26T09:11:23.175Z"
  },
  "securityAnswer":"1"
}
```

No we can login as this user..
This didn't worked, so I quit and viewed the solution: https://www.youtube.com/watch?v=4ft0oCnB8HI

It didn't worked for me.