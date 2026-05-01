# chunk-4MIYPPGW.js

## Overview

The **Juice Shop application chunk** — the compiled output of Juice Shop's own Angular source code. It contains every component, service, pipe, and guard that makes up the application, built on top of the Angular framework exported from `chunk-LHKS7QUN.js`.

## Dependencies

| Import | Purpose |
|--------|---------|
| `chunk-LHKS7QUN.js` | Angular framework (components, DI, router, etc.) |
| `chunk-TWZW5B45.js` | Low-level object utilities |

## Environment Configuration

```js
Jn = {
  production: true,
  hostServer: "."
}
```

The app is built in **production mode** with the API host resolved relative to the serving origin (`.`).

## Key Contents

### Deep Equality (`Ki`)

A recursive equality checker used for Angular's `OnPush` change detection strategy. Handles:
- Primitive values (including `NaN === NaN`)
- Arrays (element-by-element comparison)
- Plain objects (key-by-key comparison)
- Returns `false` if types differ

### Application Components

All Juice Shop Angular components are compiled here, including (but not limited to):
- Product listing and search
- Shopping basket
- User login / registration
- Challenge score board
- Administration panel
- Order history and tracking

### Services

HTTP services that communicate with the Juice Shop REST API:
- `UserService` — login, registration, profile management
- `ProductService` — product search and details
- `BasketService` — cart management
- `ChallengeService` — fetching and polling challenge status
- `ConfigurationService` — loading `/rest/admin/application-configuration`

### Guards & Interceptors

- Route guards that restrict navigation to authenticated or admin users
- An HTTP interceptor that attaches the JWT Bearer token to outgoing API requests

## Notes

- This file is minified; all class and function names are mangled.
- Source maps (if present) would map mangled names back to the original TypeScript source.
