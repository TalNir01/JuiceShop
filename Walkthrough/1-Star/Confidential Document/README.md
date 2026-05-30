# Confidential Documents

**Description**
Access a confidential document.

## Solution

### Part 1 - Web

we found (via simple brute-force) a `/ftp/` path, in which there where an `acquisition.md` file (`http://127.0.0.1:3000/ftp/acquisitions.md`), Download it and solved the challenge!

### Part 2 - Coding challenge

We went to coding challenge and got some data on other URLS that might be interesting

* `/ftp`
* `/ftp(?!/quarantine)`
* `/ftp/quarantine`
* `/.well-known`
* `/encryptionkeys`
* `/support/logs`
* `/api-docs`

We chose the 2 lines that are serving the `/ftp/` files without the `quarantine` section.

To fix just remove all the `/ftp` route, to ensure no data leak, we can just remove it.