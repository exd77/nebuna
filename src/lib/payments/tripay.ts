import { createHmac } from "crypto";

import type { CreatePaymentInput, CreatePaymentResult, PaymentWebhookResult } from "./types";

const TRIPAY_BASE_URL = process.env.TRIPAY_BASE_URL || "https://tripay.co.id/api-sandbox";
const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY;
const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY;
const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE;

function isConfigured() {
  return !!(TRIPAY_API_KEY && TRIPAY_PRIVATE_KEY && TRIPAY_MERCHANT_CODE);
}

function toEpoch(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

function makeMockQr(orderNumber: string, amount: number) {
  return `00020101021226670016COM.NEBUNASTORE0114${orderNumber}520454995303360540${amount}5802ID5912NEBUNASTORE6007JAKARTA6304MOCK`;
}

export async function createTripayQrisPayment(
  input: CreatePaymentInput,
): Promise<CreatePaymentResult> {
  const expiresAt = input.expiredAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000);

  if (!isConfigured()) {
    return {
      gateway: "mock",
      reference: `MOCK-${input.orderNumber}`,
      channel: "QRIS",
      qrString: makeMockQr(input.orderNumber, input.amount),
      qrImageUrl: null,
      paymentUrl: input.returnUrl,
      expiresAt,
      raw: { mode: "mock" },
    };
  }

  const merchantRef = input.orderNumber;
  const signature = createHmac("sha256", TRIPAY_PRIVATE_KEY!)
    .update(`${TRIPAY_MERCHANT_CODE}${merchantRef}${input.amount}`)
    .digest("hex");

  const response = await fetch(`${TRIPAY_BASE_URL}/transaction/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TRIPAY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method: "QRIS",
      merchant_ref: merchantRef,
      amount: input.amount,
      customer_name: input.customerName || input.customerEmail,
      customer_email: input.customerEmail,
      order_items: [
        {
          name: input.productName,
          price: input.amount,
          quantity: 1,
        },
      ],
      callback_url: input.callbackUrl,
      return_url: input.returnUrl,
      expired_time: toEpoch(expiresAt),
      signature,
    }),
  });

  const payload = await response.json();
  if (!response.ok || !payload?.success || !payload?.data) {
    throw new Error(payload?.message || "Failed to create Tripay QRIS transaction");
  }

  const data = payload.data;
  const qrString = data?.qr_string || data?.qrString || data?.pay_code || null;
  const qrImageUrl = data?.qr_url || data?.qr_url_website || data?.qrImageUrl || null;
  const paymentUrl = data?.checkout_url || data?.payment_url || input.returnUrl;
  const reference = data?.reference || data?.merchant_ref || merchantRef;

  return {
    gateway: "tripay",
    reference,
    channel: data?.payment_name || "QRIS",
    paymentUrl,
    qrString,
    qrImageUrl,
    expiresAt: data?.expired_time ? new Date(Number(data.expired_time) * 1000) : expiresAt,
    raw: payload,
  };
}

export function verifyTripayWebhookSignature(rawBody: string, signatureHeader: string | null) {
  if (!isConfigured()) return true;
  if (!signatureHeader) return false;

  const expected = createHmac("sha256", TRIPAY_PRIVATE_KEY!).update(rawBody).digest("hex");
  return expected === signatureHeader;
}

export function parseTripayWebhook(payload: unknown): PaymentWebhookResult {
  const root = typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};
  const data =
    typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;
  const status = String(data.status || data.payment_status || "").toUpperCase();

  let paymentStatus: PaymentWebhookResult["paymentStatus"] = "pending";
  if (["PAID", "SUCCESS", "SETTLEMENT"].includes(status)) paymentStatus = "paid";
  else if (["EXPIRED"].includes(status)) paymentStatus = "expired";
  else if (["FAILED", "CANCELLED"].includes(status)) paymentStatus = "failed";
  else if (["UNPAID"].includes(status)) paymentStatus = "unpaid";

  return {
    reference: String(data?.merchant_ref || data?.reference || ""),
    amount: typeof data?.amount === "number" ? data.amount : Number(data?.amount || 0),
    paymentStatus,
    paidAt: paymentStatus === "paid" ? new Date() : null,
    raw: payload,
  };
}

export function tripayConfigured() {
  return isConfigured();
}
