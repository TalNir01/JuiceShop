# Weird Crypto
**Description**
Inform the shop (via `http://IP:3000/#/contact`) about an algorithm or library it should definitely not use the way it does.

Topic: Cryptographic Issues


## Solutions
I logged in as admin, then I took my JWT bearer and put it at `https://jwtauditor.com/`, There I found the `HASH` of the password.

We got `"password": "0192023a7bbd73250516f069df18b500"`
Went to `https://www.tunnelsup.com/hash-analyzer/` and put the HASH there.

It's an `MD5 or MD4` type of hash. Just submit the words `md5` to the customer feedback portal and we won!!