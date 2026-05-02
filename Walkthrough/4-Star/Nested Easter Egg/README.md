# Nested Easter Egg

Guideline:
    Apply some advanced cryptanalysis to find the real easter egg.

## Basic Ideas

Under the `/ftp` there are few files "*.pyc" and an encrypted announcement.
Did some basic file gather and download these file
1. `wget http://127.0.0.1:3000/ftp/encrypt.pyc%2500.md`
2. `wget http://127.0.0.1:3000/ftp/announcement_encrypted.md`
3. `wget http://127.0.0.1:3000/ftp/eastere.gg%2500.md`

The ester egg has a `base64` code `L2d1ci9xcmlmL25lci9mYi9zaGFhbC9ndXJsL3V2cS9uYS9ybmZncmUvcnR0L2p2Z3V2YS9ndXIvcm5mZ3JlL3J0dA==` we should use cyberchef

-> Unbase64 -> 

echo "L2d1ci9xcmlmL25lci9mYi9zaGFhbC9ndXJsL3V2cS9uYS9ybmZncmUvcnR0L2p2Z3V2YS9ndXIvcm5mZ3JlL3J0dA==
"  | base64 -d
/gur/qrif/ner/fb/shaal/gurl/uvq/na/rnfgre/rtt/jvguva/gur/rnfgre/rtt

Now we will try a `ceaser-code` (substitution) Can user `rot13` in cyberchef

Found `/the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg`
so we can visit `http://127.0.0.1:3000/the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg`


The ester egg is a weird "egg"