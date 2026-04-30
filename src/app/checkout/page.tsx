import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, BadgeCheck, CheckCircle2, Clock3, ShieldCheck, Zap } from "lucide-react";

import { auth } from "@/auth";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import ProductIcon from "@/components/ui/ProductIcon";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const session = await auth();
  const { product: productSlug } = await searchParams;

  if (!session?.user) {
    redirect(`/login?callbackUrl=/checkout${productSlug ? `?product=${productSlug}` : ""}`);
  }

  if (!productSlug) notFound();
  const product = products.find((p) => p.slug === productSlug);
  if (!product) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151819] pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,106,61,0.18),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(255,242,71,0.06),transparent_22%),linear-gradient(180deg,#151819,#0d0f10_86%)]" />
      <div className="pointer-events-none absolute inset-0 nebuna-grid opacity-40" />
      <div className="nebuna-float-sparks" />

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href={`/products/${product.slug}`} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-[#ff6a3d]">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke detail produk
        </Link>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <span className="nebuna-kicker">Checkout Aman</span>
            <h1 className="nebuna-title mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Selesaikan Order
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
              Isi data tujuan aktivasi, pilih metode pembayaran, lalu sistem akan membuat order dan QRIS/payment reference otomatis.
            </p>
          </div>
          <div className="nebuna-shell nebuna-ring p-5">
            <div className="relative flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#ff6a3d]" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-white">Secure Checkout</p>
                <p className="text-sm text-zinc-400">Order terlacak dari akun kamu.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-5">
            <div className="nebuna-shell nebuna-ring p-6 sm:p-8">
              <div className="relative">
                <span className="rounded-full border border-[#ff6a3d]/25 bg-[#ff6a3d]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#ffb39a]">
                  Ringkasan Produk
                </span>
                <div className="mt-6 flex items-start gap-4">
                  <ProductIcon slug={product.slug} size="lg" />
                  <div>
                    <h2 className="text-3xl font-black text-white">{product.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{product.shortDesc}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#ff6a3d]/25 bg-[#ff6a3d]/8 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb39a]">Total Pembayaran</p>
                  <p className="mt-2 text-4xl font-black text-white">{formatPrice(product.price)}</p>
                  <p className="mt-2 text-sm font-semibold text-[#ffb39a]">{product.delivery}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                { icon: Zap, text: "QRIS/payment request dibuat setelah order disubmit" },
                { icon: Clock3, text: "Status pembayaran bisa dipantau di detail order" },
                { icon: BadgeCheck, text: "Produk diproses setelah webhook/payment sukses" },
                { icon: CheckCircle2, text: "Support siap bantu jika aktivasi butuh verifikasi" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="nebuna-shell nebuna-ring p-4">
                  <div className="relative flex items-center gap-3 text-sm text-zinc-300">
                    <Icon className="h-5 w-5 shrink-0 text-[#ff6a3d]" />
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <CheckoutForm product={product} defaultEmail={session.user.email} />
        </div>
      </section>
    </main>
  );
}
