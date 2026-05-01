# hacking-instructor-OYUKCDGG.js

## Overview

The **Hacking Instructor** module drives the interactive, step-by-step tutorial system in OWASP Juice Shop. It guides users through solving security challenges by monitoring the page state and prompting them with contextual hints.

## Dependencies

| Import | Purpose |
|--------|---------|
| `chunk-24EZLZ4I.js` | Base64 / JWT decode (used for reading challenge tokens) |
| `chunk-TWZW5B45.js` | Module system and object utilities |

## Key Functions

### `P(challengeName)` — Check Challenge Solved

```js
async function P(challengeName): Promise<boolean>
```

Calls `GET /api/Challenges/` and returns `true` if the challenge with the given name has `solved === true`. Used to advance the tutorial once the user completes a step.

### `p(ms)` — Sleep

```js
async function p(ms): Promise<void>
```

Simple async delay helper. Pauses tutorial step execution for the given number of milliseconds between polling checks.

### `u(selector, expectedValue, options)` — Wait for Input Value

Polls a DOM input element (identified by CSS `selector`) every 100 ms until its value matches `expectedValue`. Supports:
- `ignoreCase` — case-insensitive comparison (default: `true`)
- `replacement` — fetches a dynamic value from `/rest/admin/application-configuration` and substitutes it into `expectedValue`

### `C(selector, excludedValue, options)` — Wait for Input to Change Away

Polls until the input's value is **not** equal to `excludedValue`. Useful for detecting when a user clears a pre-filled field.

### `B(selector)` — Wait for Input to Be Non-Empty

Polls until the element has any non-empty value.

### `s(selector)` — Wait for Click

Returns a promise that resolves the next time the element matching `selector` is clicked.

### `k(selector, ...)` — Wait for Element Text

Polls until the inner text of the selected element matches an expected string, used to verify UI feedback (e.g., success toasts).

## How the Tutorial System Works

1. A challenge tutorial is defined as an **ordered array of step functions**.
2. Each step function returns a promise that resolves only when the user performs the expected action (filling a field, clicking a button, etc.).
3. The instructor runs steps sequentially, displaying hint bubbles via Angular overlay components between steps.
4. Completion is verified by polling the Juice Shop challenges API.

## Security Note

This module intentionally interacts with the live DOM and the Juice Shop API. It is part of the gamified learning experience and is not a security vulnerability.
