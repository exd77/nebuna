## Tripay sandbox setup

Use this when you want real QRIS sandbox payment instead of mock mode.

### 1. Required env

Add these to `.env.local`:

```env
TRIPAY_BASE_URL=https://tripay.co.id/api-sandbox
TRIPAY_MERCHANT_CODE=YOUR_SANDBOX_MERCHANT_CODE
TRIPAY_API_KEY=YOUR_SANDBOX_API_KEY
TRIPAY_PRIVATE_KEY=YOUR_SANDBOX_PRIVATE_KEY

# public URL that Tripay can reach from the internet
TRIPAY_PUBLIC_BASE_URL=https://your-public-app-url

# optional if you want explicit webhook URL
TRIPAY_CALLBACK_URL=https://your-public-app-url/api/payments/tripay/webhook
```

Notes:
- `AUTH_URL` can stay local for Auth.js dev.
- `TRIPAY_PUBLIC_BASE_URL` is used for Tripay return URL and webhook-facing URLs.
- If `TRIPAY_CALLBACK_URL` is empty, the app auto-uses `${TRIPAY_PUBLIC_BASE_URL}/api/payments/tripay/webhook`.

### 2. Run app locally

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

### 3. Expose local app to internet

This repo was tested with Cloudflare quick tunnel:

```bash
cloudflared tunnel --no-autoupdate --url http://127.0.0.1:3000
```

Example output:

```text
https://your-random-subdomain.trycloudflare.com
```

Set that URL into:

```env
TRIPAY_PUBLIC_BASE_URL=https://your-random-subdomain.trycloudflare.com
TRIPAY_CALLBACK_URL=https://your-random-subdomain.trycloudflare.com/api/payments/tripay/webhook
NEXT_PUBLIC_APP_URL=https://your-random-subdomain.trycloudflare.com
```

Then restart the Next.js dev server.

### 4. Set callback URL in Tripay dashboard

Use this webhook URL:

```text
https://your-random-subdomain.trycloudflare.com/api/payments/tripay/webhook
```

### 5. Create sandbox payment

- login into the app
- checkout any product
- app will create a Tripay QRIS transaction
- order detail page will show QRIS payment info

### 6. Verify webhook endpoint is reachable

Basic reachability test:

```bash
curl -X POST https://your-random-subdomain.trycloudflare.com/api/payments/tripay/webhook \
  -H 'content-type: application/json' \
  -d '{}'
```

Expected response:

```json
{"ok":false,"message":"Missing reference"}
```

That means the public webhook route is live.

### 7. Simulate signed webhook locally

You can also simulate a Tripay-style signed callback:

```bash
WEBHOOK_URL=https://your-random-subdomain.trycloudflare.com/api/payments/tripay/webhook \
TRIPAY_PRIVATE_KEY=YOUR_SANDBOX_PRIVATE_KEY \
npm run tripay:webhook:test
```

Default payload sent by the test script:
- `merchant_ref=NB-TEST-ORDER`
- `amount=10000`
- `status=PAID`

Update the script env vars if you want to target a real order.
