"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertCircle, Loader2, LockKeyhole, ShoppingBag } from "lucide-react";

import { createCheckoutOrder } from "@/lib/order-actions";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const paymentMethods = [
  { value: "qris", label: "QRIS" },
  { value: "bca_va", label: "BCA VA" },
  { value: "gopay", label: "GoPay" },
  { value: "ovo", label: "OVO" },
  { value: "dana", label: "DANA" },
  { value: "shopeepay", label: "ShopeePay" },
];

type Errors = { formError?: string; fieldErrors?: Record<string, string[]> };

export default function CheckoutForm({
  product,
  defaultEmail,
}: {
  product: Product;
  defaultEmail?: string | null;
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCheckoutOrder(formData);
      if (result.ok) {
        router.push(`/account/orders?created=${encodeURIComponent(result.orderNumber)}`);
        router.refresh();
      } else {
        setErrors({ formError: result.formError, fieldErrors: result.fieldErrors });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
      <input type="hidden" name="productSlug" value={product.slug} />

      <div>
        <h2 className="text-xl font-black text-white">Detail checkout</h2>
        <p className="mt-1 text-sm text-white/50">Isi data tujuan aktivasi produk.</p>
      </div>

      {errors.formError && (
        <div className="flex gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {errors.formError}
        </div>
      )}

      <Field
        name="customerEmail"
        label="Email tujuan"
        type="email"
        defaultValue={defaultEmail ?? ""}
        error={errors.fieldErrors?.customerEmail?.[0]}
        placeholder="email@contoh.com"
      />

      <Field
        name="accountIdentifier"
        label="ID akun / username / catatan akun"
        error={errors.fieldErrors?.accountIdentifier?.[0]}
        placeholder="Contoh: email Netflix, username Discord, atau ID akun"
      />

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-white/75">Metode pembayaran</span>
        <select
          name="paymentMethod"
          defaultValue="qris"
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/10"
        >
          {paymentMethods.map((method) => (
            <option key={method.value} value={method.value} className="bg-slate-950">
              {method.label}
            </option>
          ))}
        </select>
        {errors.fieldErrors?.paymentMethod?.[0] && (
          <span className="mt-1 block text-xs text-red-300">{errors.fieldErrors.paymentMethod[0]}</span>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-white/75">Catatan tambahan</span>
        <textarea
          name="notes"
          rows={4}
          placeholder="Contoh: request durasi, akun tujuan, atau instruksi khusus"
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/10"
        />
        {errors.fieldErrors?.notes?.[0] && (
          <span className="mt-1 block text-xs text-red-300">{errors.fieldErrors.notes[0]}</span>
        )}
      </label>

      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-cyan-200/70">Total sementara</p>
            <p className="mt-1 text-2xl font-black text-white">{formatPrice(product.price)}</p>
          </div>
          <LockKeyhole className="h-6 w-6 text-cyan-200" />
        </div>
        <p className="mt-3 text-xs leading-5 text-white/45">
          Payment gateway belum tersambung. Order akan dibuat dengan status pending payment sebagai foundation checkout real.
        </p>
      </div>

      <button
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
        {pending ? "Membuat order..." : "Buat Order"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/75">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/10"
      />
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
