# GDPR - Data Theft


General Data Protection Regulation (GPDR)

1. Register a user (New user)
2. Log-in into newly created user
3. "Add To Basket" an item and "Checkout"
4. Order Tracking (`Track Order`) via an `uuid`.
        In `burp` via `/rest/track-order/UUID` there is an `json` response which contains the `email` censored (all `eao..` are replaced with `*`)
5. Request `data-export` and we see our `order` and our email in `plaintext`. 
6. Try to leak `admin@juice-sh.op`
7. Will register `edmin@juice-sh.op` as a new user
8. Via this new user we can go to `data-export` and there we will see the details of the  `admin` user original order, due to the order DB being indexed by "censored" `email-address` which aren't unique!!!

Later you can use the same `TrackOrderId` for viewing the order information even though we use `jwt` of 
```json
{
  "status": "success",
  "data": {
    "id": 23,
    "username": "",
    "email": "edmin@juice-sh.op",
    "password": "827ccb0eea8a706c4c34a16891f84e7b",
    "role": "customer",
    "deluxeToken": "",
    "lastLoginIp": "0.0.0.0",
    "profileImage": "/assets/public/images/uploads/default.svg",
    "totpSecret": "",
    "isActive": true,
    "createdAt": "2026-05-01 12:11:53.983 +00:00",
    "updatedAt": "2026-05-01 12:11:53.983 +00:00",
    "deletedAt": null
  },
  "iat": 1777637521 // Epoch timestamp
}
```