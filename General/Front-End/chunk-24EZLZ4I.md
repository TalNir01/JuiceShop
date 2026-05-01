# chunk-24EZLZ4I.js

## Overview

A **Base64 and JWT decoding utility chunk**. It provides the browser with a reliable `atob` implementation and URL-safe Base64 decoding needed for reading JSON Web Tokens used in Juice Shop's authentication flow.

## Dependencies

| Import | Purpose |
|--------|---------|
| `chunk-TWZW5B45.js` | Module wrapper (`f`/`i`) for bundling CommonJS sub-modules |

## Exported Modules

### `p` — `atob` Polyfill

A self-contained Base64 decoder that:
1. Checks whether `window.atob` is natively available and binds to it if so.
2. Falls back to a pure-JS implementation using the standard Base64 alphabet (`A-Z a-z 0-9 + / =`).
3. Throws an `InvalidCharacterError` if the input string is not valid Base64.

### `g` — URL-safe Base64 Decoder

Wraps the `atob` polyfill to handle the **URL-safe Base64** variant used in JWTs:
- Replaces `-` → `+` and `_` → `/` (reverting the JWT alphabet substitution)
- Pads the string to a multiple of 4 characters with `=`
- Percent-decodes the result to support UTF-8 encoded payloads

### Exported `a` (public API)

The top-level export consumed by `main.js` and other chunks. Typically called to decode the payload segment of a JWT so the application can read user claims (e.g., email, role) from the token stored in `localStorage`.

## Usage Example

```js
// Decode the payload of a JWT
const [, payload] = token.split('.');
const claims = JSON.parse(a(payload));
// claims.email, claims.role, etc.
```

## Security Note

Decoding a JWT in the browser only reads the payload — it does **not** verify the signature. Signature verification always happens server-side.
