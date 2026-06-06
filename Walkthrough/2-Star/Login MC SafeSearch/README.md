# Login MC SafeSearch
Log in with MC SafeSearch's original user credentials without applying SQL Injection or any other bypass.

Style: Shananigans, OSINT
Topic: Sensitive Data Exposure

## Solution
I don't really like this kind of challenges but they are important...

So the term "mcsafesearch" in youtube led to "Rapper Who Is Very Concerened With Password Security" - [rapper who is very concerned with password security](https://youtu.be/v59CX2DiX0Y?si=GHL3ixucfFdzhFG5)

Details:
* Dog name: mr. noodles / doodles -> `Mr. N00dles`
* Replaced some vowles wi `Z`
* Username: Bobby Secrets, From `/#/administration` we found `mc.safesearch@juice-sh.op`
* New password `N3wPassword`

Finally what worked is:
* Username: `mc.safesearch@juice-sh.op`
* Password: `Mr. N00dles`