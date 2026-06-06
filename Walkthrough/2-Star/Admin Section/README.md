# Admin Section

**Description**
Access the administration section of the store.

Style: Good For Demos, With Coding Challenge
Topic: `Broken Access Control`

## Solution

### Web Challenge

Searched for `admin` at `main.js` and found the following array (which configure a route)

```javascript
        JZ = [{
            path: "administration",
            component: z_,
            canActivate: [y3]
        }, {
            path: "a
```
So according to convention we must try `http://127.0.0.1:3000/#/administration`
We can see latest customer feedbacks and the registerd users

### Coding Challenge
We have a `routes: Routes` array, the first elemnt is the `administration` chunk...

The real solution is just to move this capabilites to another application which is only accessible from the corporate network...

The owsap juiceshop explination: *While attempts could be made to limit access to administrative functions of a web shop through access control, it is definitely safer to apply the "separation of concerns" pattern more strictly by internally hosting a distinct admin backend application with no Internet exposure.*