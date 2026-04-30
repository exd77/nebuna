import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db, orders } from "@/db";
import { parseTripayWebhook, verifyTripayWebhookSignature } from "@/lib/payments";

function mapOrderStatus(paymentStatus: string) {
  switch (paymentStatus) {
    case "paid":
      return { paymentStatus: "paid", status: "processing" };
    case "expired":
      return { paymentStatus: "expired", status: "expired" };
    case "failed":
      return { paymentStatus: "failed", status: "failed" };
    case "pending":
      return { paymentStatus: "pending", status: "pending_payment" };
    default:
      return { paymentStatus: "unpaid", status: "pending_payment" };
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-callback-signature");

  if (!verifyTripayWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody || "{}");
  const event = request.headers.get("x-callback-event");
  if (event && event !== "payment_status") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const parsed = parseTripayWebhook(payload);
  if (!parsed.reference) {
    return NextResponse.json({ ok: false, message: "Missing reference" }, { status: 400 });
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, parsed.reference))
    .limit(1);

  if (!order) {
    return NextResponse.json({ ok: false, message: "Order not found" }, { status: 404 });
  }

  if (parsed.amount && Number(order.amount) !== Number(parsed.amount)) {
    return NextResponse.json({ ok: false, message: "Amount mismatch" }, { status: 400 });
  }

  const next = mapOrderStatus(parsed.paymentStatus);

  await db
    .update(orders)
    .set({
      paymentStatus: next.paymentStatus,
      status: next.status,
      paidAt: parsed.paidAt || order.paidAt,
      gatewayPayload: JSON.stringify(parsed.raw),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, order.id));

  return NextResponse.json({ ok: true });
}
