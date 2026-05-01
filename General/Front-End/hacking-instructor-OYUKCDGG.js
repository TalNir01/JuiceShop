import { a as be } from "./chunk-24EZLZ4I.js";
import { e as d, h as we, j as l } from "./chunk-TWZW5B45.js";
function E(t) {
    return t.replace(RegExp("^" + (t.match(/^(\t| )+/) || "")[0], "gm"), "")
}
function L(t) {
    return (t + "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function F(t) {
    var o = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm, r = [], n = "", c = 0, g = {}, f, w, i, y, m;
    function j(b) {
        var I = ve[b.replace(/\*/g, "_")[1] || ""]
            , A = r[r.length - 1] == b;
        return I ? I[1] ? (r[A ? "pop" : "push"](b),
            I[A | 0]) : I[0] : b
    }
    function M() {
        for (var b = ""; r.length;)
            b += j(r[r.length - 1]);
        return b
    }
    for (t = t.replace(/^\[(.+?)\]:\s*(.+)$/gm, function (b, I, A) {
        return g[I.toLowerCase()] = A,
            ""
    }).replace(/^\n+|\n+$/g, ""); i = o.exec(t);)
        w = t.substring(c, i.index),
            c = o.lastIndex,
            f = i[0],
            w.match(/[^\\](\\\\)*\\$/) || (i[3] || i[4] ? f = '<pre class="code ' + (i[4] ? "poetry" : i[2].toLowerCase()) + '">' + E(L(i[3] || i[4]).replace(/^\n+|\n+$/g, "")) + "</pre>" : i[6] ? (m = i[6],
                m.match(/\./) && (i[5] = i[5].replace(/^\d+/gm, "")),
                y = F(E(i[5].replace(/^\s*[>*+.-]/gm, ""))),
                m === ">" ? m = "blockquote" : (m = m.match(/\./) ? "ol" : "ul",
                    y = y.replace(/^(.*)(\n|$)/gm, "<li>$1</li>")),
                f = "<" + m + ">" + y + "</" + m + ">") : i[8] ? f = '<img src="' + L(i[8]) + '" alt="' + L(i[7]) + '">' : i[10] ? (n = n.replace("<a>", '<a href="' + L(i[11] || g[w.toLowerCase()]) + '">'),
                    f = M() + "</a>") : i[9] ? f = "<a>" : i[12] || i[14] ? (m = "h" + (i[14] ? i[14].length : i[13][0] === "=" ? 1 : 2),
                        f = "<" + m + ">" + F(i[12] || i[15]) + "</" + m + ">") : i[16] ? f = "<code>" + L(i[16]) + "</code>" : (i[17] || i[1]) && (f = j(i[17] || "--"))),
            n += w,
            n += f;
    return (n + t.substring(c) + M()).trim()
}
var ve, H, R = d(() => {
    ve = {
        "": ["<em>", "</em>"],
        _: ["<strong>", "</strong>"],
        "\n": ["<br />"],
        " ": ["<br />"],
        "-": ["<hr />"]
    };
    H = F
}
);
function P(t) {
    return l(this, null, function* () {
        try {
            return ((yield (yield fetch("/api/Challenges/")).json()).data || []).some(c => c.name === t && c.solved)
        } catch {
            return !1
        }
    })
}
function p(t) {
    return l(this, null, function* () {
        yield new Promise(o => {
            setTimeout(o, t)
        }
        )
    })
}
function u(t, o, r = {
    ignoreCase: !0,
    replacement: []
}) {
    return () => l(null, null, function* () {
        let n = document.querySelector(t);
        if (r.replacement?.length === 2) {
            S || (S = (yield (yield fetch("/rest/admin/application-configuration")).json()).config);
            let c = r.replacement[1].split(".")
                , g = S;
            for (let f of c)
                g = g[f];
            o = o.replace(r.replacement[0], g)
        }
        for (; !(r.ignoreCase && n.value.toLowerCase() === o.toLowerCase());) {
            if (!r.ignoreCase && n.value === o)
                break;
            yield p(100)
        }
    })
}
function C(t, o, r = {
    ignoreCase: !0
}) {
    return () => l(null, null, function* () {
        let n = document.querySelector(t);
        for (; ;) {
            if (n.value !== "") {
                if (r.ignoreCase && n.value.toLowerCase() !== o.toLowerCase())
                    break;
                if (!r.ignoreCase && n.value !== o)
                    break
            }
            yield p(100)
        }
    })
}
function B(t) {
    return () => l(null, null, function* () {
        let o = document.querySelector(t);
        for (; !(o.value && o.value !== "");)
            yield p(100)
    })
}
function s(t) {
    return () => l(null, null, function* () {
        let o = document.querySelector(t);
        o || console.warn(`Could not find Element with selector "${t}"`),
            yield new Promise(r => {
                o.addEventListener("click", () => {
                    r()
                }
                )
            }
            )
    })
}
function k(t, o) {
    return () => l(null, null, function* () {
        for (; ;) {
            let r = document.querySelector(t);
            if (r && r.innerHTML === o)
                break;
            yield p(100)
        }
    })
}
function e(t) {
    return () => l(null, null, function* () {
        S || (S = (yield (yield fetch("/rest/admin/application-configuration")).json()).config);
        let o = ye[S.hackingInstructor.hintPlaybackSpeed];
        o ??= 1,
            yield p(t * o)
    })
}
function a(t) {
    return () => l(null, null, function* () {
        for (; !window.location.hash.startsWith(`#/${t}`);)
            yield p(100)
    })
}
function _() {
    return () => l(null, null, function* () {
        for (; localStorage.getItem("token") === null;)
            yield p(100)
    })
}
function O() {
    return () => l(null, null, function* () {
        for (; ;) {
            let t = "";
            try {
                let o = localStorage.getItem("token");
                t = (0,
                    V.default)(o).data.role
            } catch {
                console.log("Role from token could not be accessed.")
            }
            if (t === "admin")
                break;
            yield p(100)
        }
    })
}
function x() {
    return () => l(null, null, function* () {
        for (; localStorage.getItem("token") !== null;)
            yield p(100)
    })
}
function v() {
    let t = window.innerHeight
        , o = window.innerWidth;
    return () => l(null, null, function* () {
        for (; !(window.innerHeight !== t || window.innerWidth !== o);)
            yield p(100)
    })
}
function q(t, o) {
    return () => l(null, null, function* () {
        for (; ;) {
            let r = encodeURIComponent(o).replace(/%3A/g, ":")
                , c = `#/track-result/new?${encodeURIComponent(t).replace(/%3A/g, ":")}=${r}`;
            if (window.location.hash === c)
                break;
            yield p(100)
        }
    })
}
var V, S, ye, h = d(() => {
    V = we(be()),
        ye = {
            faster: .5,
            fast: .75,
            normal: 1,
            slow: 1.25,
            slower: 1.5
        }
}
);
var Y, N = d(() => {
    h();
    Y = {
        name: "Login Admin",
        hints: [{
            text: "To start this challenge, you'll have to log out first.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: x()
        }, {
            text: "Let's try if we find a way to log in with the administrator's user account. To begin, go to the _Login_ page via the _Account_ menu.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("login")
        }, {
            text: "To find a way around the normal login process we will try to use a **SQL Injection** (SQLi) attack.",
            fixture: "#email",
            resolved: e(8e3)
        }, {
            text: "A good starting point for simple SQL Injections is to insert quotation marks (like `\"` or `'`). These mess with the syntax of an insecurely concatenated query and might give you feedback if an endpoint is vulnerable or not.",
            fixture: "#email",
            resolved: e(15e3)
        }, {
            text: "Start with entering `'` in the **email field**.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "'")
        }, {
            text: "Now put anything in the **password field**. It doesn't matter what.",
            fixture: "#password",
            unskippable: !0,
            resolved: B("#password")
        }, {
            text: "Press the _Log in_ button.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "Nice! Do you see the red `[object Object]` error at the top? Unfortunately it isn't really telling us much about what went wrong...",
            fixture: "#rememberMe",
            resolved: e(1e4)
        }, {
            text: "Maybe you will be able to find out more information about the error in the JavaScript console or the network tab of your browser!",
            fixture: "#rememberMe",
            resolved: e(1e4)
        }, {
            text: "Did you spot the error message with the `SQLITE_ERROR` and the entire SQL query in the 500 response to `/login`? If not, keep the network tab open and click _Log in_ again. Then inspect the occurring response closely.",
            fixture: "#rememberMe",
            resolved: e(3e4)
        }, {
            text: "Let's try to manipulate the query a bit to make it useful. Try out typing `' OR true` into the **email field**.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "' OR true")
        }, {
            text: "Now click the _Log in_ button again.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "Mhh... The query is still invalid? Can you see why from the new error in the HTTP response?",
            fixture: "#rememberMe",
            resolved: e(8e3)
        }, {
            text: "We need to make sure that the rest of the query after our injection doesn't get executed. Any Ideas?",
            fixture: "#rememberMe",
            resolved: e(8e3)
        }, {
            text: "You can comment out anything after your injection payload from query using comments in SQL. In SQLite databases you can use `--` for that.",
            fixture: "#rememberMe",
            resolved: e(1e4)
        }, {
            text: "So, type in `' OR true--` into the email field.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "' OR true--")
        }, {
            text: "Press the _Log in_ button again and sit back...",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "That worked, right?! To see with whose account you just logged in, open the _Account_ menu.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: s("#navbarAccount")
        }, {
            text: "\u{1F389} Congratulations! You have been logged in as the **administrator** of the shop! (If you want to understand why, try to reproduce what your `' OR true--` did _exactly_ to the query.)",
            fixture: "app-navbar",
            resolved: e(2e4)
        }]
    }
}
);
var D, W = d(() => {
    h();
    D = {
        name: "DOM XSS",
        hints: [{
            text: "For this challenge, we'll take a close look at the _Search_ field at the top of the screen.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: e(8e3)
        }, {
            text: "Let's start by searching for all products containing `owasp` in their name or description.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: u("#searchQuery input", "owasp")
        }, {
            text: "Now hit enter.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: k("#searchValue", "owasp")
        }, {
            text: "Nice! You should now see many cool OWASP-related products.",
            fixture: "#product-search-fixture",
            resolved: e(8e3)
        }, {
            text: "You might have noticed, that your search term is displayed above the results?",
            fixture: "app-search-result",
            resolved: e(8e3)
        }, {
            text: "What we will try now is a **Cross-Site Scripting (XSS)** attack, where we try to inject HTML or JavaScript code into the application.",
            fixture: "app-search-result",
            resolved: e(15e3)
        }, {
            text: "Change your search value into `<h1>owasp` to see if we can inject HTML.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: u("#searchQuery input", "<h1>owasp")
        }, {
            text: "Hit enter again.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: k("#searchValue", "<h1>owasp</h1>")
        }, {
            text: "Hmm, this doesn't look normal, does it?",
            fixture: ".noResult",
            resolved: e(8e3)
        }, {
            text: "If you right-click on the search term and inspect that part of the page with your browser, you will see that our `h1`-tag was _actually_ embedded into the page and is not just shown as plain text!",
            fixture: ".noResult",
            resolved: e(16e3)
        }, {
            text: "Let's now try to inject JavaScript. Type `<script>alert(xss)<\/script>` into the search box now.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: u("#searchQuery input", "<script>alert(xss)<\/script>")
        }, {
            text: "Hit enter again.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: k("#searchValue", "<script>alert(xss)<\/script>")
        }, {
            text: "\u{1F614} This didn't work as we hoped. If you inspect the page, you should see the `script`-tag but it is not executed for some reason.",
            fixture: ".noResult",
            resolved: e(1e4)
        }, {
            text: `Luckily there are _many_ different XSS payloads we can try. Let's try this one next: <code>&lt;iframe src="javascript:alert(&#96;xss&#96;)"&gt;</code>.`,
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: u("#searchQuery input", '<iframe src="javascript:alert(`xss`)">')
        }, {
            text: "Hit enter one more time. If an alert box appears, you must confirm it in order to close it.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: k("#searchValue", '<iframe src="javascript:alert(`xss`)"></iframe>')
        }, {
            text: "\u{1F389} Congratulations! You just successfully performed an XSS attack!",
            fixture: ".noResult",
            resolved: e(8e3)
        }, {
            text: "More precisely, this was a **DOM XSS** attack, because your payload was handled and improperly embedded into the page by the application frontend code without even sending it to the server.",
            fixture: ".noResult",
            resolved: e(16e3)
        }]
    }
}
);
var G, J = d(() => {
    h();
    G = {
        name: "Score Board",
        hints: [{
            text: "This application is riddled with security vulnerabilities. Your progress exploiting these is tracked on a _Score Board_.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: e(1e4)
        }, {
            text: "You won't find a link to it in the navigation or side bar, though. Finding the _Score Board_ is in itself actually one of the hacking challenges.",
            fixture: "app-navbar",
            resolved: e(12e3)
        }, {
            text: "You could just start guessing the URL of the _Score Board_ or comb through the client-side JavaScript code for useful information.",
            fixture: "app-navbar",
            resolved: e(12e3)
        }, {
            text: "You find the JavaScript code in the DevTools of your browser that will open with `F12`.",
            fixture: "app-navbar",
            resolved: v()
        }, {
            text: "Look through the client-side JavaScript in the _Sources_ tab for clues. Or just start URL guessing. It's up to you!",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("score-board")
        }, {
            text: "\u{1F389} Congratulations! You found the _Score Board_! Good luck and happy hacking!",
            fixture: "app-score-board",
            resolved: e(6e4)
        }]
    }
}
);
var Q, U = d(() => {
    h();
    Q = {
        name: "Privacy Policy",
        hints: [{
            text: "Log in with any user to begin this challenge. You can use an existing or freshly registered account.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: _()
        }, {
            text: "Great, you are logged in! Now open the _Account_ menu.",
            fixture: "#navbarAccount",
            resolved: s("#navbarAccount")
        }, {
            text: "Open the _Privacy & Security_ sub-menu and click _Privacy Policy_.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("privacy-security/privacy-policy")
        }, {
            text: "\u{1F389} That was super easy, right? This challenge is a bit of a joke actually, because nobody reads any fine print online... \u{1F648}",
            fixture: "app-navbar",
            resolved: e(6e4)
        }]
    }
}
);
var X, $ = d(() => {
    h();
    X = {
        name: "Login Jim",
        hints: [{
            text: "To start this challenge, you'll have to log out first.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: x()
        }, {
            text: "Let's try if we find a way to log in with Jim's user account. To begin, go to the _Login_ page via the _Account_ menu.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("login")
        }, {
            text: "As you would expect you need to supply Jim's email address and password to log in regularly. But you might have neither at the moment.",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "If we had at least the email address, we could then try a **SQL Injection** (SQLi) attack to avoid having to supply a password.",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "So, let's go find out Jim's email! Luckily the shop is very bad with privacy and leaks emails in different places, for instance in the product reviews.",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "Go back to the product list and click on some to open their details dialog which also hold the user reviews.",
            fixture: ".fill-remaining-space",
            resolved: a("search")
        }, {
            text: "Once you found a user review by Jim and learned his email, go to the _Login_ screen.",
            fixture: ".fill-remaining-space",
            unskippable: !0,
            resolved: a("login")
        }, {
            text: "Supply Jim's email address in the **email field**.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "jim@juice-sh.op", {
                replacement: ["juice-sh.op", "application.domain"]
            })
        }, {
            text: "Now put anything in the **password field**. Let's assume we don't know it yet, even if you happen to already do.",
            fixture: "#password",
            unskippable: !0,
            resolved: C("#password", "ncc-1701")
        }, {
            text: "Press the _Log in_ button.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "This didn't work, but did you honestly expect it to? We need to craft an SQLi attack first!",
            fixture: "#rememberMe",
            resolved: e(1e4)
        }, {
            text: "You can comment out the entire password check clause of the DB query by adding `'--` to Jim's email address!",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "jim@juice-sh.op'--", {
                replacement: ["juice-sh.op", "application.domain"]
            })
        }, {
            text: "Now click the _Log in_ button again.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "\u{1F389} Congratulations! You have been logged in as Jim!",
            fixture: "app-navbar",
            resolved: e(5e3)
        }]
    }
}
);
var z, K = d(() => {
    h();
    z = {
        name: "View Basket",
        hints: [{
            text: "This challenge is about **Horizontal Privilege Escalation**, meaning you are supposed to access data that does not belong to your own account but to another user's.",
            fixture: "app-navbar",
            resolved: e(18e3)
        }, {
            text: "To start this challenge, you'll have to log in first.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: _()
        }, {
            text: "First, go to the _Your Basket_ page to view your own shopping basket. It's likely to be empty, if you didn't add anything yet.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("basket")
        }, {
            text: "To pass this challenge, you will need to peek into another user's basket while remaining logged in with your own account.",
            fixture: "app-navbar",
            resolved: e(8e3)
        }, {
            text: "If the application stores a reference to the basket somewhere in the browser, that might be a possible attack vector.",
            fixture: "app-navbar",
            resolved: e(12e3)
        }, {
            text: "Open the browser's _Development Tools_ and locate the _Session Storage_ tab. Similar to \u{1F36A}s, it can be used to store data in key/value pairs for each website.",
            fixture: "app-navbar",
            resolved: v()
        }, {
            text: "Look over the names of the used session keys. Do you see something that might be related to the shopping basket? Try setting it to a different value! \u270D\uFE0F",
            fixture: "app-navbar",
            unskippable: !0,
            resolved() {
                return l(this, null, function* () {
                    let t = sessionStorage.getItem("bid");
                    for (; sessionStorage.getItem("bid") === t;)
                        yield p(100)
                })
            }
        }, {
            text: "Great, you have changed the `bid` value which might be some ID for the shopping basket!",
            fixture: "app-navbar",
            resolved: e(8e3)
        }, {
            text: "Now, go to any other screen and then back to _Your Basket_. If nothing happens you might have set an invalid or non-existing `bid`. Try another in that case.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved() {
                return l(this, null, function* () {
                    let t = sessionStorage.getItem("itemTotal");
                    for (; sessionStorage.getItem("itemTotal") === t;)
                        yield p(100)
                })
            }
        }, {
            text: "\u{1F389} Congratulations! You are now viewing another user's shopping basket!",
            fixture: "app-basket",
            resolved: e(15e3)
        }]
    }
}
);
var Z, ee = d(() => {
    h();
    Z = {
        name: "Forged Feedback",
        hints: [{
            text: "To start this challenge, first go to the _Customer Feedback_ page.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("contact")
        }, {
            text: "This challenge is about broken access controls. To pass it, you need to impersonate another user while providing feedback.",
            fixture: "app-navbar",
            resolved: e(1e4)
        }, {
            text: "If you would now submit feedback, it would be posted by yourself while logged in or anonymously while logged out.",
            fixture: "app-navbar",
            resolved: e(1e4)
        }, {
            text: "We will now search for any mistake the application developers might have made in setting the author of any new feedback.",
            fixture: "app-navbar",
            resolved: e(1e4)
        }, {
            text: "Open the browser's _Development Tools_ and try finding anything interesting while inspecting the feedback form.",
            fixture: "app-navbar",
            resolved: v()
        }, {
            text: "There is more than meets the eye among the fields of the form... \u{1F609}",
            fixture: "app-navbar",
            resolved: e(8e3)
        }, {
            text: "Once you found the field that shouldn't even be there, try manipulating its value to one that might represent another user!",
            fixture: "app-navbar",
            unskippable: !0,
            resolved() {
                return l(this, null, function* () {
                    let t = document.getElementById("userId").value;
                    for (; document.getElementById("userId").value === t;)
                        yield p(100)
                })
            }
        }, {
            text: "You found and changed the invisible `userId`! Now submit the form to complete the challenge.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: s("#submitButton")
        }, {
            text: "\u{1F389} Congratulations, you successfully submitted a feedback as another user!",
            fixture: "app-navbar",
            resolved: e(15e3)
        }]
    }
}
);
var te, oe = d(() => {
    h();
    te = {
        name: "Password Strength",
        hints: [{
            text: "To start this challenge, you'll have to log out first.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: x()
        }, {
            text: "In this challenge we'll try to log into the administrator's user account using his original credentials.",
            fixture: "app-navbar",
            resolved: e(7e3)
        }, {
            text: "If you don't know it already, you must first find out the admin's email address. The user feedback and product reviews are good places to look into. When you have it, go to the _Login_ page.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("login")
        }, {
            text: "Enter the admin's email address into the **email field**.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "admin@juice-sh.op", {
                replacement: ["juice-sh.op", "application.domain"]
            })
        }, {
            text: "Now for the password. Lucky for us, the admin chose a really, really, **really** stupid one. Just try any that comes to your mind!",
            fixture: "#password",
            unskippable: !0,
            resolved: B("#password")
        }, {
            text: "\u{1F926}\u200D\u2642\uFE0F Nah, that was wrong! Keep trying! I'll tell you when you're one the right track.",
            fixture: "#password",
            unskippable: !0,
            resolved: u("#password", "admin")
        }, {
            text: "Okay, you are one the right track, but this would have been the worst password in the world for an admin. He spiced it up a little bit with some extra non-letter characters. Keep trying!",
            fixture: "#password",
            unskippable: !0,
            resolved: u("#password", "admin1")
        }, {
            text: "\u{1F525} Yes, it's getting warmer! Try adding some more numbers maybe?",
            fixture: "#password",
            unskippable: !0,
            resolved: u("#password", "admin12")
        }, {
            text: "\u{1F9EF} It's getting hot! Just one more digit...",
            fixture: "#password",
            unskippable: !0,
            resolved: u("#password", "admin123")
        }, {
            text: "Okay, now press the _Log in_ button.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "\u{1F389} Congratulations! You have been logged in as the **administrator** of the shop thanks to his very ill chosen password!",
            fixture: "app-navbar",
            resolved: e(2e4)
        }]
    }
}
);
var re, ae = d(() => {
    h();
    re = {
        name: "Bonus Payload",
        hints: [{
            text: "Assuming you did the **DOM XSS** tutorial already, this one just uses a funnier payload on the _Search_ field.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: e(1e4)
        }, {
            text: "Enter or paste this payload into the _Search_ field: <code>&lt;iframe width=&quot;100%&quot; height=&quot;166&quot; scrolling=&quot;no&quot; frameborder=&quot;no&quot; allow=&quot;autoplay&quot; src=&quot;https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&amp;color=%23ff5500&amp;auto&lowbar;play=true&amp;hide&lowbar;related=false&amp;show&lowbar;comments=true&amp;show&lowbar;user=true&amp;show&lowbar;reposts=false&amp;show&lowbar;teaser=true&quot;&gt;&lt;/iframe&gt;</code>.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: u("#searchQuery input", '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>')
        }, {
            text: "Make sure your speaker volume is cranked up. Then hit enter.",
            fixture: "#product-search-fixture",
            unskippable: !0,
            resolved: k("#searchValue", '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>')
        }, {
            text: "\u{1F389} Congratulations and enjoy the music!",
            fixture: ".noResult",
            resolved: e(5e3)
        }]
    }
}
);
var ie, ne = d(() => {
    h();
    ie = {
        name: "Login Bender",
        hints: [{
            text: "\u{1F4A1} **Prerequisite:** This challenge builds on SQL Injection techniques. We recommend solving the **Login Admin** challenge first to learn the basics. Double-click to continue anyway.",
            fixture: "app-navbar",
            resolved: e(15e3),
            skipIf: () => P("Login Admin")
        }, {
            text: "To start this challenge, you'll have to log out first.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: x()
        }, {
            text: "Let's try if we find a way to log in with Bender's user account. To begin, go to the _Login_ page via the _Account_ menu.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("login")
        }, {
            text: "As you would expect you need to supply Bender's email address and password to log in regularly. But you might have neither at the moment.",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "If we had at least the email address, we could then try a **SQL Injection** (SQLi) attack to avoid having to supply a password.",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "So, let's go find out Bender's email! Luckily the shop is very bad with privacy and leaks emails in different places, for instance in the user feedback.",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "Go to the _About Us_ page where user feedback is displayed among other things.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            resolved: a("about")
        }, {
            text: "Once you found an entry by Bender in the feedback carousel leaking enough of his email to deduce the rest, go to the _Login_ screen.",
            fixture: "app-about",
            unskippable: !0,
            resolved: a("login")
        }, {
            text: "Supply Bender's email address in the **email field**.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "bender@juice-sh.op", {
                replacement: ["juice-sh.op", "application.domain"]
            })
        }, {
            text: "Now put anything in the **password field**. Let's assume we don't know it yet, even if you happen to already do.",
            fixture: "#password",
            unskippable: !0,
            resolved: C("#password", "OhG0dPlease1nsertLiquor!")
        }, {
            text: "Press the _Log in_ button.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "This didn't work, but did you honestly expect it to? We need to craft an SQLi attack first!",
            fixture: "#rememberMe",
            resolved: e(1e4)
        }, {
            text: "You can comment out the entire password check clause of the DB query by adding `'--` to Bender's email address!",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "bender@juice-sh.op'--", {
                replacement: ["juice-sh.op", "application.domain"]
            })
        }, {
            text: "Now click the _Log in_ button again.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "\u{1F389} Congratulations! You have been logged in as Bender!",
            fixture: "app-navbar",
            resolved: e(5e3)
        }]
    }
}
);
var se, ue = d(() => {
    h();
    se = {
        name: null,
        hints: [{
            text: "\u{1F613} Sorry, this hacking challenge does not have a step-by-step tutorial (yet) ... \u{1F9ED} Can you find your own way to solve it?",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "\u270D\uFE0F Do you want to contribute a tutorial for this challenge? [Check out our documentation](https://pwning.owasp-juice.shop/companion-guide/latest/part5/tutorials.html) to learn how! \u{1F3EB}",
            fixture: "app-navbar",
            resolved: e(15e3)
        }, {
            text: "And now: \u{1F47E} **GLHF** with this challenge!",
            fixture: "app-navbar",
            resolved: e(1e4)
        }]
    }
}
);
var le, ce = d(() => {
    h();
    le = {
        name: "Coding Challenges",
        hints: [{
            text: "To do the tutorial on _Coding Challenges_, you have to find and visit the _Score Board_ first. Once there, you have to click the tutorial button for the _Score Board_ challenge to proceed.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("score-board")
        }, {
            text: "Many Juice Shop hacking challenges come with an associated _Coding Challenge_ which will teach you more about the underlying vulnerability on source code level.",
            fixture: "#Score\\ Board\\.solved",
            resolved: e(15e3)
        }, {
            text: "You can launch a Coding Challenge via the `<>`-button. Click the one for the _Score Board_ challenge now.",
            fixture: "#codingChallengeTutorialButton",
            unskippable: !0,
            resolved: s("#Score\\ Board\\.codingChallengeButton")
        }, {
            text: "All Coding Challenges take place in a modal dialog like this. They consist of two parts, one for finding and one for fixing the vulnerability in the code.",
            fixture: "#code-snippet",
            resolved: e(15e3)
        }, {
            text: "The code snippet below shows a part of the actual application source code retrieved in real-time.",
            fixture: "#code-snippet",
            resolved: e(1e4)
        }, {
            text: 'You will always get a snippet that is involved in the security vulnerability or flaw behind the corresponding hacking challenge. In this case, you see the routing code that exposes all dialogs, including the supposedly "well-hidden" Score Board.',
            fixture: "#code-snippet",
            resolved: e(2e4)
        }, {
            text: 'For the "Find It" part of this coding challenge, tick the \u{1F532} on all lines of code that you think are responsible for exposing the Score Board. When done, click the _Submit_ button.',
            fixture: "#code-snippet",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: s("#line114")
        }, {
            text: "That's the one! Click the _Submit_ button proceed.",
            fixture: "#code-snippet",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: s("#findItSubmitButton")
        }, {
            text: "\u{1F38A}! You made it half-way through! In phase two you are now presented with several fix options. You must select the one which you think is the **best possible** fix for the security vulnerability.",
            fixture: "#code-snippet",
            resolved: e(1e4)
        }, {
            text: 'This coding challenge is a bit "special", because the Score Board is crucial for progress tracking and acts as a hub for the other challenges. Keep that in mind when picking the _Correct Fix_ from the options _Fix 1_, _2_ and _3_.',
            fixture: "#code-snippet",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: s("#fixItSubmitButton")
        }, {
            text: "If you did'nt get the answer right, just try again until the \u{1F38A}-cannon fires. Then click _Close_ to end the coding challenge and return to the Score Board.",
            fixture: "#code-snippet",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: s("#fixItCloseButton")
        }]
    }
}
);
var de, pe = d(() => {
    h();
    de = {
        name: "Admin Section",
        hints: [{
            text: "For this challenge, you need to be logged in as an admin. If you have not done so yet, solve the admin login challenge first. Otherwise, log in as an admin.",
            fixture: ".fill-remaining-space",
            unskippable: !1,
            resolved: O()
        }, {
            text: "A good way to start looking for an admin section is by understanding what technologies a website is built on. One way to do this is by clicking through the website and being attentive to hints. Start by opening the side menu (the hamburger icon in the top left corner).",
            fixture: ".fill-remaining-space",
            unskippable: !0,
            resolved: s('button[aria-label="Open Sidenav"]')
        }, {
            text: "Inspect those icons. Can you guess what they are?",
            fixture: ".appVersion",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: e(8e3)
        }, {
            text: "This is the tech stack of the website. You see HTML, JavaScript, and more.",
            fixture: ".appVersion",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: e(8e3)
        }, {
            text: "You could search for common web technologies and see if you recognize any logos.",
            fixture: ".appVersion",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: e(8e3)
        }, {
            text: "And you will find that the first logo is Angular.",
            fixture: ".appVersion",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: e(8e3)
        }, {
            text: "Close the side menu again.",
            fixture: ".appVersion",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: e(4e3)
        }, {
            text: "These kinds of hints can tell you a lot. For example, if we found a WordPress site, a common admin path to look for would be /wp-admin.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: e(1e4)
        }, {
            text: "In Angular, each route maps a URL path to a component. To find the admin section, try navigating to the /admin path and see what happens.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("admin")
        }, {
            text: "Mmmmh, this did not work as expected. Let us try another one. Maybe /administration will work?",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: a("administration")
        }, {
            text: "\u{1F389} Congratulations! You successfully accessed the admin section!",
            fixture: "app-navbar",
            resolved: e(6e3)
        }, {
            text: 'Most often, it is harder to find the tech stack. Instead of guessing common admin paths, another approach would be to use the developer tools. In this case, you would notice many "ng" references, which hint towards Angular. By understanding routes and paths in Angular, you could open the debugger, inspect the JavaScript files for paths, and find /administration.',
            fixture: "app-navbar",
            resolved: e(16e3)
        }, {
            text: "Always keep your eyes open when inspecting a website. Once you have identified the technologies used, leverage them to your advantage, and do not forget to read the docs!",
            fixture: "app-navbar",
            resolved: e(1e4)
        }, {
            text: "If you like, try to access the admin section without admin credentials. What do you think would happen? Happy hacking :)",
            fixture: "app-navbar",
            resolved: e(8e3)
        }]
    }
}
);
var he, fe = d(() => {
    h();
    he = {
        name: "Reflected XSS",
        hints: [{
            text: "To proceed with this challenge, you need to be logged in. We have detected that you are not currently logged in. Please log in to continue.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: _()
        }, {
            text: 'Start by going to your saved addresses. You can find them by clicking on "Account" in the navigation bar, then on Orders & Payment, and then on My saved addresses.',
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("address/saved")
        }, {
            text: "Add a new address.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("address/create")
        }, {
            text: "You see a few fields to submit input. This is always a good starting point for checking potential XSS vulnerabilities. Pay attention to the pop-up once you submitted the new address.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("address/saved")
        }, {
            text: "Observe how the name of the city was used in the pop-up once you submit the address. Let us try to check whether this page is vulnerable to reflected XSS. Submit a new address.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("address/create")
        }, {
            text: 'Use: <code>&lt;iframe src="javascript:alert(&#96;xss&#96;)"&gt;</code> as a city name.',
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("address/saved")
        }, {
            text: "Hmmm, that did not seem to work :/. We might want to try another part of the website. Let us explore the order and payment pages. First, place an order. You can add any item to your basket and complete the purchase.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("order-completion")
        }, {
            text: "Have a look at the Track Orders page.",
            fixture: "app-navbar",
            unskippable: !0,
            resolved: a("track-result")
        }, {
            text: 'In a reflected XSS attack, a payload is often included in URI or HTTP parameters. Pay attention to the id parameter in the url. Could it be vulnerable to reflected XSS? Give it a try by replacing the value of the id parameter with the payload: <code>&lt;iframe src="javascript:alert(&#96;xss&#96;)"&gt;</code>. Do not enter immediately. We will let you know once you have the correct URL in place.',
            fixture: "app-navbar",
            resolved: q("id", '<iframe src="javascript:alert(`xss`)">')
        }, {
            text: "That looks right! Now you can hit enter to solve this challenge. If an alert box appears, confirm it to close it. Happy hacking :)",
            fixture: "app-navbar",
            resolved: e(1e4)
        }]
    }
}
);
var me, ge = d(() => {
    h();
    me = {
        name: "Exposed credentials",
        hints: [{
            text: "To start this challenge, you will have to log out first.",
            fixture: "#navbarAccount",
            unskippable: !0,
            resolved: x()
        }, {
            text: "As the challenge suggests, let us have a look at the client-side code. Open the dev tools.",
            fixture: "app-navbar",
            fixtureAfter: !0,
            unskippable: !0,
            resolved: v()
        }, {
            text: "Go to Sources, and then inspect the main.js file. This is where all the client-side code is.",
            fixture: "app-navbar",
            resolved: e(1e4)
        }, {
            text: "Now, why not search for some common words related to credentials? Maybe try password, pw, or username.",
            fixture: "app-navbar",
            resolved: e(35e3)
        }, {
            text: "Once you found the hardcoded credentials, go to the login page.",
            fixture: "app-navbar",
            resolved: a("login")
        }, {
            text: "Write the email address in the **email field**.",
            fixture: "#email",
            unskippable: !0,
            resolved: u("#email", "testing@juice-sh.op", {
                replacement: ["juice-sh.op", "application.domain"]
            })
        }, {
            text: "Now write the password in the **password field**.",
            fixture: "#password",
            unskippable: !0,
            resolved: u("#password", "IamUsedForTesting")
        }, {
            text: "Press the _Log in_ button.",
            fixture: "#rememberMe",
            unskippable: !0,
            resolved: s("#loginButton")
        }, {
            text: "\u{1F389} Congratulations! You have been logged in with exposed credentials!",
            fixture: "app-navbar",
            resolved: e(5e3)
        }]
    }
}
);
function T(t, o, r = {}) {
    let n = document.createElement(t);
    Object.assign(n.style, o);
    for (let [c, g] of Object.entries(r))
        n.setAttribute(c, g);
    return n
}
function ke(t) {
    let o = document.querySelector(t.fixture);
    if (!o)
        return null;
    let r = T("div", {
        position: "absolute"
    })
        , n = {
            position: "absolute",
            zIndex: "20000",
            backgroundColor: "rgba(50, 115, 220, 0.9)",
            maxWidth: "400px",
            minWidth: t.text.length > 100 ? "350px" : "250px",
            padding: "16px",
            borderRadius: "8px",
            whiteSpace: "initial",
            lineHeight: "1.3",
            top: "24px",
            fontFamily: "Roboto,Helvetica Neue,sans-serif",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            cursor: t.unskippable ? "default" : "pointer",
            animation: "flash 0.2s"
        }
        , c = T("div", n, {
            id: "hacking-instructor",
            title: t.unskippable ? "" : "Double-click to skip"
        })
        , f = T("img", {
            minWidth: "64px",
            minHeight: "64px",
            width: "64px",
            height: "64px",
            marginRight: "8px"
        }, {
            src: "/assets/public/images/hackingInstructor.png"
        })
        , w = T("span", {
            flexGrow: "2"
        });
    w.innerHTML = H(t.text);
    let y = T("button", {
        textDecoration: "none",
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        fontSize: "large",
        position: "relative",
        zIndex: "20001",
        top: "32px",
        left: "5px",
        cursor: "pointer"
    }, {
        id: "cancelButton",
        title: "Cancel the tutorial"
    });
    y.innerHTML = "<div>&times;</div>",
        c.appendChild(f),
        c.appendChild(w);
    let m = T("div", {
        position: "relative",
        display: "inline"
    });
    return m.appendChild(c),
        m.appendChild(y),
        r.appendChild(m),
        t.fixtureAfter ? o.parentElement.insertBefore(r, o.nextSibling) : o.parentElement.insertBefore(r, o),
        r
}
function Ie(t) {
    return l(this, null, function* () {
        return yield new Promise(o => {
            t.addEventListener("dblclick", o)
        }
        )
    })
}
function Se(t) {
    return l(this, null, function* () {
        return yield new Promise(o => {
            t.addEventListener("click", () => {
                o("break")
            }
            )
        }
        )
    })
}
function St(t) {
    return xe.find(({ name: o }) => o === t) !== void 0
}
function _e(t) {
    let o = t.getBoundingClientRect();
    return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth)
}
function _t(t) {
    return l(this, null, function* () {
        let o = xe.find(({ name: r }) => r === t) ?? se;
        for (let r of o.hints) {
            if (r.skipIf && (yield r.skipIf()))
                continue;
            let n = ke(r);
            if (!n) {
                console.warn(`Could not find Element with fixture "${r.fixture}"`);
                continue
            }
            _e(n) || n.scrollIntoView();
            let c = [r.resolved()];
            if (r.unskippable || c.push(Ie(n)),
                c.push(Se(document.getElementById("cancelButton"))),
                (yield Promise.race(c)) === "break") {
                n.remove();
                break
            }
            n.remove()
        }
    })
}
var xe, Te = d(() => {
    R();
    N();
    W();
    J();
    U();
    $();
    K();
    ee();
    oe();
    ae();
    ne();
    ue();
    ce();
    pe();
    fe();
    ge();
    xe = [G, Y, X, D, Q, z, Z, te, re, ie, le, de, he, me]
}
);
Te();
export { St as hasInstructions, _t as startHackingInstructorFor };
