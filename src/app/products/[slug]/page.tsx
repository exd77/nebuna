import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";

import ProductIcon from "@/components/ui/ProductIcon";
import { products } from "@/lib/data";
import { calculateDiscount, formatPrice } from "@/lib/utils";

const categoryLabel: Record<string, string> = {
  hiburan: "Hiburan",
  "ai-tools": "AI Tools",
  developer: "Developer",
  "social-premium": "Social Premium",
  produktivitas: "Produktivitas",
  security: "Security",
};

const productFaq = [
  {
    question: "Kapan produk dikirim?",
    answer: "Mayoritas produk diproses dalam 5-15 menit setelah pembayaran terverifikasi.",
  },
  {
    question: "Ada garansi?",
    answer: "Ada garansi replacement selama produk bermasalah dan sesuai syarat paket.",
  },
  {
    question: "Pembayaran aman?",
    answer: "Checkout memakai order tracking dan QRIS/payment gateway yang bisa dipantau dari halaman pesanan.",
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151819] pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(255,106,61,0.18),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(255,242,71,0.07),transparent_22%),linear-gradient(180deg,#151819,#0d0f10_86%)]" />
      <div className="pointer-events-none absolute inset-0 nebuna-grid opacity-40" />
      <div className="nebuna-float-sparks" />

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-[#ff6a3d]">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog
        </Link>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="nebuna-shell nebuna-ring p-6 sm:p-8">
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <span className="nebuna-kicker">{categoryLabel[product.category] ?? product.category}</span>
                {product.badge ? (
                  <span className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-yellow-200">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-8 flex aspect-square items-center justify-center rounded-[2rem] border border-[#ff6a3d]/20 bg-[radial-gradient(circle_at_center,rgba(255,106,61,0.18),transparent_58%)]">
                <div className="relative grid h-52 w-52 place-items-center rounded-[2.25rem] border border-white/10 bg-black/25 shadow-[0_0_70px_rgba(255,106,61,0.12)]">
                  <ProductIcon slug={product.slug} size="xl" className="h-32 w-32" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Rating", value: product.rating },
                  { label: "Ulasan", value: product.reviews.toLocaleString("id-ID") },
                  { label: "Terjual", value: product.sales.toLocaleString("id-ID") },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-lg font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nebuna-shell nebuna-ring p-6 sm:p-8">
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-2 text-yellow-300">
                <Star className="h-4 w-4 fill-yellow-300" />
                <span className="text-sm font-bold text-zinc-300">
                  {product.rating} · {product.reviews.toLocaleString("id-ID")} ulasan · {product.sales.toLocaleString("id-ID")} terjual
                </span>
              </div>

              <h1 className="nebuna-title mt-5 text-5xl leading-[0.95] sm:text-6xl">{product.name}</h1>
              <p className="mt-5 text-base leading-8 text-zinc-300">{product.description}</p>

              <div className="mt-7 rounded-[1.5rem] border border-[#ff6a3d]/25 bg-[#ff6a3d]/8 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb39a]">Mulai dari</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
                  {product.originalPrice ? (
                    <>
                      <span className="text-base text-zinc-500 line-through">{formatPrice(product.originalPrice)}</span>
                      <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-black text-red-200">
                        Hemat {discount}%
                      </span>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Zap, label: product.delivery },
                  { icon: ShieldCheck, label: "Garansi replacement" },
                  { icon: Headphones, label: "Support 24/7" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
                    <Icon className="mb-3 h-5 w-5 text-[#ff6a3d]" />
                    {label}
                  </div>
                ))}
              </div>

              {product.tags.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#ff6a3d]" />
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/checkout?product=${product.slug}`} className="nebuna-primary-btn flex-1">
                  <ShoppingCart className="h-4 w-4" />
                  Beli Sekarang
                </Link>
                <Link href="/#bantuan" className="nebuna-secondary-btn flex-1">
                  Tanya Admin <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
          <div className="nebuna-shell nebuna-ring p-6">
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">Yang kamu dapat</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Order tracking real-time di akun Nebuna",
                  "Pembayaran QRIS/payment gateway siap pakai",
                  "Produk diproses admin setelah pembayaran sukses",
                  "Bantuan replacement kalau paket bermasalah",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6a3d]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nebuna-shell nebuna-ring p-6">
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">FAQ Singkat</p>
              <div className="mt-5 space-y-3">
                {productFaq.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-black text-white">{item.question}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">Produk Terkait</p>
                <h2 className="nebuna-title mt-2 text-4xl">Masih satu kategori</h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="nebuna-secondary-btn hidden sm:inline-flex">
                Lihat Kategori
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="nebuna-shell nebuna-ring group p-4 transition hover:-translate-y-1 hover:border-[#ff6a3d]/40">
                  <div className="relative flex items-center gap-4">
                    <ProductIcon slug={item.slug} size="md" />
                    <div>
                      <p className="font-black text-white group-hover:text-[#ffb39a]">{item.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">{formatPrice(item.price)}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-[#ff6a3d]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
