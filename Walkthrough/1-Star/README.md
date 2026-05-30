# 1-Star Challenges List
## Challenges
| Name  | Type | Notes | Solved |
|-------|-----|------------|------- |
| Score-Board | Basic | Just find the webpage | YES |
| DOM XSS | XSS | In `search` bar | YES |
| Bonus Payload  | XSS | In `search` bar | YES |
| Privacy Police | Misc | Register, Login and just read it under "Account" | YES |
| Bully Chatbot | Brute-Force | Ask him for the code 10 times | YES |
| Confidential Document | Sensitive Data Exposure | `/ftp/acquisitions.md` | YES |
| Error Handling | Security Misconfiguration | Just download random files from `/ftp` | YES |
| Exposed Metrics | Observability Failures | Access `/metrics` | YES |
| Mass Dispel | Misc | Solve few challenges in a short time| YES |
| Missing Encoding | Improper Input Validation | An IMG url wasn't encoded prperly (url encoding) | Yes |
| Outdated Allowlist | Invalidated Redirects | Found Redirects (Options) That Return 404 | YES |
| Repetitive Registration | Improper Input Validation | Replay the register API call with different repeated password | YES |
| Web3 Sandbox | Broken Access Control | Read `main.js` and accessed `/#/web3-sandbox` url | YES |
| Zero Stars | Improper Input Validation | Modify the `rating` value in the API POST request | YES |


## Reading Content
1. https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
2. https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html
3. https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
4. https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html