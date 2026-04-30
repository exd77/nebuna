"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle2, CreditCard, Loader2, LockKeyhole, QrCode, ShoppingBag } from "lucide-react";

import { createCheckoutOrder } from "@/lib/order-actions";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const paymentMethods = [
  { value: "qris", label: "QRIS", description: "Scan dari semua e-wallet / mobile banking" },
  { value: "bca_va", label: "BCA VA", description: "Virtual account BCA" },
  { value: "gopay", label: "GoPay", description: "Pembayaran via GoPay" },
  { value: "ovo", label: "OVO", description: "Pembayaran via OVO" },
  { value: "dana", label: "DANA", description: "Pembayaran via DANA" },
  { value: "shopeepay", label: "ShopeePay", description: "Pembayaran via ShopeePay" },
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
  const [paymentMethod, setPaymentMethod] = useState("qris");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCheckoutOrder(formData);
      if (result.ok) {
        router.push(`/orders/${encodeURIComponent(result.orderNumber)}`);
        router.refresh();
      } else {
        setErrors({ formError: result.formError, fieldErrors: result.fieldErrors });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="nebuna-shell nebuna-ring p-6 sm:p-8">
      <input type="hidden" name="productSlug" value={product.slug} />
      <input type="hidden" name="paymentMethod" value={paymentMethod} />

      <div className="relative space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">Data Checkout</p>
          <h2 className="mt-2 text-3xl font-black uppercase text-white">Detail Aktivasi</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">Pastikan data tujuan benar supaya produk bisa diproses tanpa delay.</p>
        </div>

        {errors.formError ? (
          <div className="flex gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {errors.formError}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
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
            label="ID akun / username"
            error={errors.fieldErrors?.accountIdentifier?.[0]}
            placeholder="Email akun, username, atau ID"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[#ff6a3d]" />
            <p className="text-sm font-black uppercase tracking-[0.12em] text-white">Metode Pembayaran</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {paymentMethods.map((method) => {
              const active = paymentMethod === method.value;
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-[#ff6a3d]/60 bg-[#ff6a3d]/12 shadow-[0_0_28px_rgba(255,106,61,0.12)]"
                      : "border-white/10 bg-white/[0.03] hover:border-[#ff6a3d]/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-white">{method.label}</span>
                    {method.value === "qris" ? <QrCode className="h-4 w-4 text-[#ff6a3d]" /> : null}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">{method.description}</p>
                </button>
              );
            })}
          </div>
          {errors.fieldErrors?.paymentMethod?.[0] ? (
            <span className="mt-2 block text-xs text-red-300">{errors.fieldErrors.paymentMethod[0]}</span>
          ) : null}
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-zinc-300">Catatan tambahan</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Contoh: request durasi, instruksi login, atau catatan khusus"
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#ff6a3d]/50 focus:ring-2 focus:ring-[#ff6a3d]/10"
          />
          {errors.fieldErrors?.notes?.[0] ? <span className="mt-1 block text-xs text-red-300">{errors.fieldErrors.notes[0]}</span> : null}
        </label>

        <div className="rounded-2xl border border-[#ff6a3d]/20 bg-[#ff6a3d]/8 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb39a]">Total Checkout</p>
              <p className="mt-1 text-3xl font-black text-white">{formatPrice(product.price)}</p>
            </div>
            <LockKeyhole className="h-7 w-7 text-[#ff6a3d]" />
          </div>
          <div className="mt-4 flex gap-2 text-xs leading-5 text-zinc-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6a3d]" />
            Setelah submit, kamu akan diarahkan ke halaman detail order untuk scan QRIS atau membuka payment link.
          </div>
        </div>

        <button
          disabled={pending}
          className="nebuna-primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
          {pending ? "Membuat Order..." : "Buat Order & Lanjut Bayar"}
        </button>
      </div>
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
      <span className="mb-2 block text-sm font-bold text-zinc-300">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#ff6a3d]/50 focus:ring-2 focus:ring-[#ff6a3d]/10"
      />
      {error ? <span className="mt-1 block text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
