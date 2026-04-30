"use server";

import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, orders } from "@/db";
import { products } from "@/lib/data";
import { checkoutSchema } from "@/lib/auth-schema";

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
    status: "pending_payment",
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
