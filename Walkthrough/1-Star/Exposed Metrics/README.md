# Exposed Metrics

**Description**
Find the endpoint that serves usage data to be scraped by a popular monitoring system. [https://github.com/prometheus/prometheus]

## Solution

### Web Part
We must find an `endpoint` that will allows to retrieve health and data on application.

I will basically just ask claude for the solution.

Claude answer is yes, it's `/metrics` endpoint, prometheus is 'pull-based' system.

Just access it and solve the challenge, `http://127.0.0.1:3000/metrics`

### Coding Challenge

Fix the firstline which just does `app.get('/metrics', metrics.serveMetrics())`
The solution is to allow this endpoint only to `ADMIN`,

meaning the line would be `app.get('/metrics', security.isAdmin(), metrics.serveMetrics())`
