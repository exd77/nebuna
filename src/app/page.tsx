import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Headphones,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
  Code2,
  Users,
} from "lucide-react";

import ProductCard from "@/components/ui/ProductCard";
import ProductIcon, { CategoryIcon } from "@/components/ui/ProductIcon";
import { categories, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const featuredProducts = ["netflix", "chatgpt-plus", "youtube-premium", "canva"];

const categoryVisuals = {
  hiburan: { label: "Hiburan", icon: Play },
  "ai-tools": { label: "AI Tools", icon: Brain },
  developer: { label: "Developer", icon: Code2 },
  "social-premium": { label: "Social Premium", icon: Users },
  produktivitas: { label: "Produktivitas", icon: TrendingUp },
  security: { label: "Security", icon: ShieldCheck },
} as const;

const trustItems = [
  {
    title: "Pengiriman Instan",
    description: "Produk langsung dikirim setelah pembayaran terverifikasi.",
    icon: Zap,
  },
  {
    title: "Garansi Replacement",
    description: "Kalau akun bermasalah, tim Nebuna bantu replace cepat.",
    icon: ShieldCheck,
  },
  {
    title: "Support 24/7",
    description: "Admin standby untuk bantu order, aktivasi, dan after-sales.",
    icon: Headphones,
  },
  {
    title: "Produk Terverifikasi",
    description: "Semua listing dipilih khusus untuk user digital premium.",
    icon: BadgeCheck,
  },
];

const steps = [
  {
    title: "1. Pilih Produk",
    description: "Cari produk digital yang kamu butuhkan dari katalog Nebuna Store.",
    icon: Sparkles,
  },
  {
    title: "2. Checkout Aman",
    description: "Lanjut ke checkout dengan payment flow yang gampang dan aman.",
    icon: ShieldCheck,
  },
  {
    title: "3. Produk Dikirim Instan",
    description: "Setelah pembayaran masuk, order diproses dan dikirim secepatnya.",
    icon: ArrowRight,
  },
];

function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

function isProduct(value: Product | undefined): value is Product {
  return Boolean(value);
}

export default function HomePage() {
  const featured = featuredProducts.map(getProduct).filter(isProduct);
  const productGrid = products.slice(0, 16);

  return (
    <div className="relative overflow-hidden bg-[#151819]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_10%,rgba(255,106,61,0.16),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(255,242,71,0.08),transparent_18%),linear-gradient(180deg,rgba(13,15,16,0.2),#0d0f10_80%)]" />
      <div className="pointer-events-none absolute inset-0 nebuna-grid opacity-40" />
      <div className="nebuna-float-sparks" />

      <section id="home" className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="grid items-center gap-8 lg:grid-cols-[1.04fr_.96fr]">
          <div>
            <span className="nebuna-kicker">
              <Sparkles className="h-3.5 w-3.5" /> Marketplace Digital Premium
            </span>
            <h1 className="nebuna-title mt-5 max-w-4xl text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.84]">
              Subscription
              <br />
              Digital Premium
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
              Semua kebutuhan digital dalam satu tempat — cepat, aman, trusted, dan siap pakai.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="nebuna-primary-btn">
                <Sparkles className="h-4 w-4" /> Belanja Sekarang
              </Link>
              <Link href="/#katalog" className="nebuna-secondary-btn">
                Lihat Katalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="nebuna-shell nebuna-ring w-full max-w-[580px] justify-self-center p-5 sm:p-6 lg:justify-self-end lg:p-7">
            <div className="relative">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-sm font-black uppercase tracking-[0.18em] text-[#ff6a3d] sm:text-base">
                    Produk Unggulan
                  </p>
                  <p className="mt-1 max-w-[220px] text-sm leading-5 text-zinc-400 sm:max-w-none">
                    Paling sering dicari minggu ini
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-yellow-200 sm:text-[11px]">
                  Ready Stock
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
                {featured.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group flex min-h-[104px] min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition hover:border-[#ff6a3d]/40 hover:bg-[#ff6a3d]/10"
                  >
                    <ProductIcon slug={product.slug} size="md" className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-black leading-tight text-white sm:text-[15px]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">Mulai dari</p>
                      <p className="mt-0.5 whitespace-nowrap text-sm font-black text-white sm:text-base">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center sm:gap-3">
                {[
                  { icon: Zap, label: "Instan" },
                  { icon: ShieldCheck, label: "Aman" },
                  { icon: Star, label: "Terpercaya" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.025] px-2 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-300 sm:text-xs"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-[#ff6a3d]" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map(({ title, description, icon: Icon }) => (
            <div key={title} className="nebuna-shell nebuna-ring p-5">
              <div className="relative flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#ff6a3d]/40 bg-[#ff6a3d]/10 text-[#ff6a3d]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.1em] text-white">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-zinc-400">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-5">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">Kategori Populer</p>
          <h2 className="nebuna-title text-4xl sm:text-5xl">Pilih Kategori Favoritmu</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => {
            const visual = categoryVisuals[category.slug];
            const Icon = visual?.icon ?? Play;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="nebuna-shell nebuna-ring group px-4 py-4 transition hover:-translate-y-1 hover:border-[#ff6a3d]/40"
              >
                <div className="relative flex items-center gap-3">
                  <CategoryIcon slug={category.slug} size="md" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-white">{visual?.label ?? category.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">{category.count} produk</p>
                  </div>
                  <Icon className="ml-auto h-5 w-5 text-[#ff6a3d]" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="promo" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="nebuna-shell nebuna-ring overflow-hidden border-[#ff6a3d]/40 bg-[#160b07] p-6 sm:p-8">
          <div className="nebuna-scanline absolute inset-x-0 top-0 h-px" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_.85fr_.38fr]">
            <div className="flex items-center gap-4">
              <h2 className="text-6xl font-black uppercase italic tracking-[-0.05em] text-[#ff6a3d] sm:text-8xl">Flash Sale</h2>
              <Zap className="hidden h-16 w-16 text-yellow-300 sm:block" />
            </div>
            <p className="text-lg leading-8 text-zinc-200">
              Diskon spesial untuk langganan digital terpopuler minggu ini. Cocok buat user yang mau checkout cepat tanpa ribet.
            </p>
            <div className="rounded-2xl bg-yellow-300 px-4 py-4 text-center text-[#0d0f10] shadow-[0_0_40px_rgba(255,242,71,0.18)]">
              <p className="text-xs font-black uppercase tracking-[0.14em]">Hanya Hari Ini!</p>
              <p className="mt-1 text-3xl font-black">12 : 45 : 30</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em]">Jam &nbsp; Menit &nbsp; Detik</p>
            </div>
          </div>
        </div>
      </section>

      <section id="katalog" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">Produk Digital Terverifikasi</p>
            <h2 className="nebuna-title text-5xl">Katalog Produk</h2>
          </div>
          <Link href="/products" className="nebuna-secondary-btn self-start sm:self-auto">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productGrid.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6a3d] to-transparent" />
          <h2 className="nebuna-title text-center text-4xl">Tanpa Ribet. Tiga Langkah Saja.</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6a3d] to-transparent" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <div key={title} className="nebuna-shell nebuna-ring p-6">
              <div className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[#ff6a3d]/60 text-sm font-black text-[#ff6a3d]">
                    {index + 1}
                  </span>
                  <Icon className="h-8 w-8 text-[#ff6a3d]" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-[0.08em] text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="bantuan" className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="nebuna-shell nebuna-ring overflow-hidden border-[#ff6a3d]/40 p-6 sm:p-8">
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#ff6a3d]/40 bg-[#ff6a3d]/10 text-[#ff6a3d]">
                <MessageCircle className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-[-0.02em] text-white">Butuh bantuan memilih paket?</h2>
                <p className="mt-1 text-xl font-black uppercase tracking-[0.04em] text-[#ff6a3d] sm:text-2xl">
                  Tim kami siap bantu 24/7.
                </p>
              </div>
            </div>
            <Link href="/login" className="nebuna-primary-btn">
              <Headphones className="h-4 w-4" /> Hubungi Admin <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
