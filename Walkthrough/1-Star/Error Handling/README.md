# Error Handling
Read: https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html

**Description**
Provoke an error that is neither very gracefully nor consistently handled.


## Solution
Basically just be really aggressive with the websites, try downloading something that isn't `.md` from the `/ftp` and you will receive a nice `node-js` error message. Very simple solution...

What can we learn from the error message?

Here is it content:
```raw
403 Error: Only .md and .pdf files are allowed!
   at verify (/juice-shop/build/routes/fileServer.js:59:18)
   at /juice-shop/build/routes/fileServer.js:43:13
   at Layer.handle [as handle_request] (/juice-shop/node_modules/express/lib/router/layer.js:95:5)
   at trim_prefix (/juice-shop/node_modules/express/lib/router/index.js:328:13)
   at /juice-shop/node_modules/express/lib/router/index.js:286:9
   at param (/juice-shop/node_modules/express/lib/router/index.js:365:14)
   at param (/juice-shop/node_modules/express/lib/router/index.js:376:14)
   at router.process_params (/juice-shop/node_modules/express/lib/router/index.js:421:3)
   at next (/juice-shop/node_modules/express/lib/router/index.js:280:10)
   at /juice-shop/node_modules/serve-index/index.js:149:39
   at FSReqCallback.oncomplete (node:fs:196:5)
```

Insights
1. node-express framework
2. Root path (absolute, filesystem) is `/juice-shop`


