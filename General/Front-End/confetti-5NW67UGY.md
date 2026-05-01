# confetti-5NW67UGY.js

## Overview

A **lightweight Markdown-to-HTML renderer** used by Juice Shop to format challenge descriptions, hints, and tutorial text displayed in the UI. The content hash (`5NW67UGY`) in the filename is appended by the bundler for cache-busting.

## Dependencies

| Import | Purpose |
|--------|---------|
| `chunk-24EZLZ4I.js` | Base64 / JWT utilities (used for encoded content) |
| `chunk-TWZW5B45.js` | Module system and object utilities |

## Key Functions

### `E(text)` — Dedent

Strips the common leading whitespace (tabs or spaces) from every line of a multi-line string. Used to normalize indented code blocks before rendering.

### `L(text)` — HTML Escape

Escapes `"`, `<`, and `>` characters so raw user-supplied or challenge text cannot inject HTML.

### `F(text)` — Markdown Parser

The core rendering function. Parses a Markdown string using a single large regular expression and converts it to an HTML string. Supported syntax:

| Markdown | Output |
|----------|--------|
| `# Heading` / `## Heading` | `<h1>` / `<h2>` |
| `` `inline code` `` | `<code>` |
| ` ```lang\nblock\n``` ` | `<pre class="code lang">` |
| `*italic*` / `_italic_` | `<em>` |
| `**bold**` / `__bold__` | `<strong>` |
| `[text](url)` | `<a href="url">` |
| `![alt](src)` | `<img>` |
| `> blockquote` | `<blockquote>` |
| `- item` / `1. item` | `<ul>` / `<ol>` |
| `---` | `<hr>` |

### Inline Token Map (`ve`)

```js
{
  "":  ["<em>",     "</em>"],
  "_": ["<strong>", "</strong>"],
  "\n": ["<br />"],
  " ":  ["<br />"],
  "-":  ["<hr />"]
}
```

## Usage

The exported `H` function is the public API consumed by Angular components to render Markdown strings into safe HTML for `[innerHTML]` bindings.
