import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Tips — NebunaStore",
  description:
    "Tips top up game, panduan voucher, review software, dan promo terbaru dari NebunaStore.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          Segera Hadir
        </span>
        <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
          Blog &amp; Tips
        </h1>
        <p className="mt-4 text-white/60">
          Kami sedang menyiapkan panduan top up game, tips memilih voucher,
          review software, dan kabar promo terbaru. Mampir lagi sebentar lagi.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Lihat Produk
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
