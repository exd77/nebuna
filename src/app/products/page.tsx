import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-cyan-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Kembali ke Beranda
      </Link>

      <div className="mb-10">
        <p className="mb-2 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          Katalog Produk
        </p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Semua <span className="gradient-text">Produk Digital</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/55">
          Jelajahi semua langganan digital premium yang tersedia di Nebuna
          Store. Aktivasi cepat, harga terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
