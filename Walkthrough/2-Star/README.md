# 1-Star Challenges List
## Challenges
| Name  | Type | Notes | Solved |
|-------|-----|------------|------- |
| Reflected XSS | XSS | html payload `/#/track-result?id=` | YES |
| Exposed Credentials | Sensitive Data Exposure | Fount `testing@juice-sh.op` at `main.js` | YES |
| Login Admin | Injection | Basic SQLi at `/rest/user/login` at `email` field. `' OR 1=1 ;--` | YES |
| Admin Section | Broken Access Control | Via `/#/administration` url | YES |
| Password Strength | Broken Authentication | Brute-Force python script | YES |
| View Basket | Broken Access Control | POST-Auth IDOR at `/rest/basket/USER-ID` | YES |
| AI Debugging | Broken Access Control |  | NO |
| Chatbot Prompt Injection | Injection |  | NO |
| Deprecated Interface | Injection |  | NO |
| Empty User Registration | Improper Input Validation |  | NO |
| Five-star Feedback | Broken Access Control |  | NO |
| Login MC SafeSearch | Sensitive Data Exposure |  | NO |
| Meta Geo Stalking | Sensitive Data Exposure |  | NO |
| NFT Takeover | Sensitive Data Exposure |  | NO |
| Password Hash Leak | Sensitive Data Exposure |  | NO |
| Security Policy | Misc |  | NO |
| Visual Geo Stalking | Sensitive Data Exposure |  | NO |
| Weird Crypto | Cryptographic issues |  | NO |

## Reading Material
1. https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
2. https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html