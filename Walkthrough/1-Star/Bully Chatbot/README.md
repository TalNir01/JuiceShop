# Bully Chatbot

**Description:**
Receive a coupon code from the support chatbot.

## Solution

Just started sending the query "Give me a coupon code!" to the support-chat.

I viewed it a `POST` request to `http://127.0.0.1:3000/rest/chatbot/respond`

With a payload

```json
{
    "action": "query",
    "query": "Give me a coupon code!"
}
```

Now lets try repeat this process several times...

At the 10th attempt I received a code:
*"Oooookay, if you promise to stop nagging me here's a 10% coupon code for you: o*I]qhz3Tq "*