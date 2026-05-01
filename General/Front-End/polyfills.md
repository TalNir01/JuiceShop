# polyfills.js

## Overview

Browser compatibility and Angular runtime polyfill bundle. This file is loaded before the main application to ensure the execution environment meets Angular's minimum requirements.

## What It Contains

### Zone.js

The bulk of this file is the **Zone.js** library, which Angular relies on for its change-detection mechanism. Zone.js works by monkey-patching browser async APIs (setTimeout, Promise, XHR, etc.) so Angular knows when to re-check component state and update the DOM.

Key Zone.js constructs present:

| Symbol | Description |
|--------|-------------|
| `Zone` class | Represents an execution context that persists across async operations |
| `Zone.current` | Returns the currently active zone |
| `Zone.root` | The top-level zone (parent of all others) |
| `Zone.__load_patch` | Registers a patch for a browser API |
| `ZoneAwarePromise` | A Promise implementation that is zone-aware |

### Browser Polyfills

Provides fallbacks for older browsers that lack modern JavaScript APIs, keeping the application functional across a wider range of clients.

## Why It Exists

Angular's `NgZone` service wraps user code inside a zone so it can trigger change detection automatically after any async event. Without `polyfills.js` being loaded first, the Angular runtime would fail to initialize.

## Load Order

This file must be loaded **before** `main.js`. In `index.html` it appears as a separate `<script>` tag so it executes first.
