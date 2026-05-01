# scripts.js

## Overview

A self-contained **cookie consent** library (based on [cookieconsent](https://github.com/osano/cookieconsent)) that displays a GDPR-compliant cookie notice banner to first-time visitors.

## What It Contains

### Utility Helpers (`a` object)

Low-level DOM and string helpers used internally by the library:

| Helper | Purpose |
|--------|---------|
| `escapeRegExp` | Escapes special regex characters in a string |
| `hasClass / addClass / removeClass` | CSS class manipulation without jQuery |
| `interpolateString` | Replaces `{{token}}` placeholders in strings |
| `getCookie / setCookie` | Read and write browser cookies |
| `deepExtend` | Deep-merge two plain objects |
| `throttle` | Rate-limits a function call |
| `hash` | Simple DJB2-style string hash |
| `normaliseHex / getContrast / getLuminance` | Colour utilities for accessible banner theming |
| `isMobile` | User-agent sniff for mobile devices |
| `traverseDOMPath` | Walk up the DOM to find an ancestor with a given class |

### `Popup` Class

The main UI component. Responsible for:

- Rendering the cookie consent banner into the page
- Reading the user's previous consent status from a cookie (`cookieconsent_status`)
- Persisting the user's choice (`allow`, `deny`, or `dismiss`)
- Emitting lifecycle callbacks: `onPopupOpen`, `onPopupClose`, `onStatusChange`, `onRevokeChoice`

### Default Configuration

```js
cookie: {
  name: "cookieconsent_status",
  path: "/",
  domain: "",
  expiryDays: 365,
  secure: false
}
```

## Initialization

The library is initialized via an IIFE that checks `c.hasInitialised` to prevent double-loading. It attaches itself to a global (typically `window.cookieconsent`) and auto-runs on `DOMContentLoaded`.
