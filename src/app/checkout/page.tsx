import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

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
    <section className="relative overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke detail produk
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Checkout Nebuna
            </span>
            <div className="mt-6 flex items-start gap-4">
              <ProductIcon slug={product.slug} size="lg" />
              <div>
                <h1 className="text-3xl font-black text-white">{product.name}</h1>
                <p className="mt-2 text-sm leading-6 text-white/55">{product.shortDesc}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wider text-white/35">Mulai dari</p>
              <p className="mt-1 text-3xl font-black text-white">{formatPrice(product.price)}</p>
              <p className="mt-2 text-sm text-emerald-300">{product.delivery}</p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { icon: Zap, text: "Order dibuat real ke database" },
                { icon: ShieldCheck, text: "Data hanya dipakai untuk aktivasi/support" },
                { icon: CheckCircle2, text: "Status bisa dilihat di halaman pesanan" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/65">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <CheckoutForm product={product} defaultEmail={session.user.email} />
        </div>
      </div>
    </section>
  );
}
