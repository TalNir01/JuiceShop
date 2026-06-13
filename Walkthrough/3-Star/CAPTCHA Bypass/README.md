# CAPTCHA Bypass
**Description**
Submit 10 or more customer feedbacks within 20 seconds.

Style: Brute-Force
Topic: Broken Anti Automation

## Solution
I have submitted a customer feedback via the frontend, no I continue to look for data in burp.

Basically the captcha is submitted along a captcha ID (answer + id), Therefore we can just submit the same REQUEST again and again.

```json
{
  "captchaId":0,
  "captcha":"12",
  "comment":"asdf (anonymous)",
  "rating":3
}
```

So I will write this simple python script that does this alot of times