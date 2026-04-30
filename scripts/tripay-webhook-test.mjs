import { createHmac } from "node:crypto";

const webhookUrl = process.env.WEBHOOK_URL || "http://127.0.0.1:3000/api/payments/tripay/webhook";
const privateKey = process.env.TRIPAY_PRIVATE_KEY;

if (!privateKey) {
  console.error("Missing TRIPAY_PRIVATE_KEY env");
  process.exit(1);
}

const payload = {
  merchant_ref: process.env.TRIPAY_TEST_MERCHANT_REF || "NB-TEST-ORDER",
  reference: process.env.TRIPAY_TEST_REFERENCE || "T-TEST-REFERENCE",
  amount: Number(process.env.TRIPAY_TEST_AMOUNT || 10000),
  status: process.env.TRIPAY_TEST_STATUS || "PAID",
  payment_method: process.env.TRIPAY_TEST_METHOD || "QRIS",
};

const rawBody = JSON.stringify(payload);
const signature = createHmac("sha256", privateKey).update(rawBody).digest("hex");

const response = await fetch(webhookUrl, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-callback-event": "payment_status",
    "x-callback-signature": signature,
  },
  body: rawBody,
});

const text = await response.text();
console.log(JSON.stringify({
  webhookUrl,
  status: response.status,
  body: text,
  payload,
}, null, 2));
