# Bjoern's Favorite Pet
**Description**
Reset the password of Bjoern's OWASP account via the Forgot Password mechanism with the original answer to his security question.


Style: OSINT, With Coding Challenge
Topic: Broken Authentication

## Solutions

### Web Solution

From previous challenges we known Bjoern like cats, specially he likes zatschi.

I logged in as admin and searched `/#/administration` for bjoern full username: `bjoern.kimminich@gmail.com`

I went to the reset password page, but for some reason it returned an empty response.


Went again to the administration page in order to find other email address  

we found few more bjoerns
* bjoern@juice-sh.op
* bjoern@owasp.org

Also we found an twitter post from `bjoern` about his favorite cat `Zaya`. Worked with the `owasp.org` email address.

### Coding Challenge
The problem is that favorite pet isn't a "secretive" question.

Fix is to eliminate any kind of security questions and use short-lived links that are sent directly to the user email account.