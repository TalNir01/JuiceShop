# DOM XSS
Read: https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
## Part 1 - Challenge
### Instructions
Perform a DOM XSS attack with 
```js
<iframe src="javascript:alert(`xss`)"/>
http://172.29.63.151:8080/hello.html
<iframe src="http://172.29.63.151:8080/hello.html"/>

```

### Solution

First question is "What DOM actuall is?", Decided to ask my claude (pro...) partner

#### What DOM (HTML / Web) Is?

When a browser loads a webpage, it reads the raw HTML file — basically just a long string of text — and converts it into a living, interactive structure in memory. That structure is called the Document Object Model, or DOM.

***HTML is the blueprint, the DOM is the actual building. Once the building exists, JavaScript can walk through every room, move furniture, add new rooms, or tear walls down — all in real time, without reloading the page.***

he DOM is not a passive parse tree. It's a mutable, event-driven runtime object graph managed by the browser's rendering engine (Blink in Chrome/Edge, Gecko in Firefox, WebKit in Safari). Every node implements a W3C-specified interface — Element, Node, EventTarget — and these interfaces are exposed to the JavaScript engine via bindings.

**The DOM and the HTML source are not the same thing**

**DOM sinks are where data lands:** Properties like innerHTML, outerHTML, document.write(), eval(), location.href, src, and href are "sinks" — places where attacker-controlled strings can escape into executable or navigatable contexts.

**DOM sources are where attacker data enters:** location.hash, location.search, document.referrer, window.name, postMessage payloads, and localStorage values are all sources. The path from source → sink without sanitization is the attack path.

**The key mental model:** the DOM is not a passive display — it's a programmable tree, and anytime untrusted data flows into that tree through a parsing sink (innerHTML, document.write, eval), you've handed an attacker the keys to a user's browser session. Understanding the DOM deeply — its sources, its sinks, its event model — is table stakes for any serious web security researcher.


#### In Website
I keept playing with parameters and found that the VALUE i put into the product search bar, isn't passed out to the API call `GET http://127.0.0.1:3000/rest/products/search?q= HTTP/1.1`

So I understood the input is **CLIENT-SIDE**

So I put the `<iframe src="http://172.29.63.151:8080/hello.html"/>` Also I started a `nc -lnvvp 8080` on a server at the IP 172.29.63.151. It worked...


For some reason I couldn't get their `iframe` to work, but I hope it will be sufficient to "PROOF" the concept is working...

At the end this `<iframe src="javascript:alert(`xss`)">` input for the `search` bar worked!!

##### Coding Challenge

From given code we might see a bit of "cleaning" of input, but now security sanitization...
The most critical line is 6: `this.searchValue = this.sanitizer.bypassSecurityTrustHtml(queryParam)`

The internal user input should not contain HTML, so no need to santaize or parser it, just deploy as text, meaning we picked solution 4
```javascript
this.searchValue = queryParam
```