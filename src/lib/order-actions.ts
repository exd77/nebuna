"use server";

import { redirect } from "next/navigation";
import { and, desc, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, orders } from "@/db";
import { checkoutSchema } from "@/lib/auth-schema";
import { products } from "@/lib/data";
import { createTripayQrisPayment } from "@/lib/payments";

export type CheckoutResult =
  | { ok: true; orderNumber: string }
  | {
      ok: false;
      formError?: string;
      fieldErrors?: Record<string, string[]>;
    };

function flatten(formData: FormData) {
  const out: Record<string, FormDataEntryValue> = {};
  formData.forEach((value, key) => {
    out[key] = value;
  });
  return out;
}

function makeOrderNumber() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `NB-${stamp}-${rand}`;
}

function publicAppUrl() {
  return (
    process.env.TRIPAY_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.AUTH_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function tripayCallbackUrl() {
  return (
    process.env.TRIPAY_CALLBACK_URL || `${publicAppUrl()}/api/payments/tripay/webhook`
  ).replace(/\/$/, "");
}

export async function createCheckoutOrder(formData: FormData): Promise<CheckoutResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, formError: "Silakan login dulu untuk checkout." };
  }

  const parsed = checkoutSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const product = products.find((p) => p.slug === parsed.data.productSlug);
  if (!product) {
    return { ok: false, formError: "Produk tidak ditemukan." };
  }

  const orderNumber = makeOrderNumber();
  const publicBaseUrl = publicAppUrl();

  const payment = await createTripayQrisPayment({
    orderNumber,
    productName: product.name,
    amount: product.price,
    customerName: session.user.name || null,
    customerEmail: parsed.data.customerEmail,
    callbackUrl: tripayCallbackUrl(),
    returnUrl: `${publicBaseUrl}/orders/${orderNumber}`,
    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await db.insert(orders).values({
    orderNumber,
    userId: session.user.id,
    productSlug: product.slug,
    productName: product.name,
    amount: product.price,
    customerEmail: parsed.data.customerEmail,
    accountIdentifier: parsed.data.accountIdentifier || null,
    notes: parsed.data.notes || null,
    paymentMethod: parsed.data.paymentMethod,
    paymentGateway: payment.gateway,
    paymentReference: payment.reference,
    paymentChannel: payment.channel,
    paymentStatus: "pending",
    paymentUrl: payment.paymentUrl || null,
    qrString: payment.qrString || null,
    qrImageUrl: payment.qrImageUrl || null,
    expiredAt: payment.expiresAt || null,
    gatewayPayload: JSON.stringify(payment.raw),
    status: "pending_payment",
    updatedAt: new Date(),
  });

  return { ok: true, orderNumber };
}

export async function getCurrentUserOrders(limit = 20) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/account/orders");

  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .orderBy(desc(orders.createdAt))
    .limit(limit);
}

export async function getCurrentUserOrderByNumber(orderNumber: string) {
  const session = await auth();
  if (!session?.user?.id) redirect(`/login?callbackUrl=/orders/${orderNumber}`);

  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.userId, session.user.id), eq(orders.orderNumber, orderNumber)))
    .limit(1);

  return order || null;
}
