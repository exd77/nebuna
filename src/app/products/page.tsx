import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal, Sparkles } from "lucide-react";

import ProductCard from "@/components/ui/ProductCard";
import { CategoryIcon } from "@/components/ui/ProductIcon";
import { categories, products } from "@/lib/data";

const categoryLabels = Object.fromEntries(categories.map((category) => [category.slug, category.name]));

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; search?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const search = params.search?.trim().toLowerCase() || "";

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchSearch = search
      ? [product.name, product.shortDesc, product.description, product.category, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(search)
      : true;
    return matchCategory && matchSearch;
  });

  const activeLabel = selectedCategory ? categoryLabels[selectedCategory] || selectedCategory : "Semua Produk";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151819] pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,106,61,0.18),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(255,242,71,0.06),transparent_22%),linear-gradient(180deg,#151819,#0d0f10_86%)]" />
      <div className="pointer-events-none absolute inset-0 nebuna-grid opacity-40" />
      <div className="nebuna-float-sparks" />

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-[#ff6a3d]">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-stretch">
          <div className="nebuna-shell nebuna-ring p-6 sm:p-8">
            <div className="relative">
              <span className="nebuna-kicker">
                <Sparkles className="h-3.5 w-3.5" /> Katalog Produk
              </span>
              <h1 className="nebuna-title mt-5 max-w-4xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                Semua Produk Digital
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                Jelajahi langganan digital premium, akun siap pakai, AI tools, developer perks, dan produk sosial yang siap checkout cepat.
              </p>

              <form action="/products" className="mt-7 grid gap-3 md:grid-cols-[1fr_auto]">
                {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    name="search"
                    defaultValue={params.search || ""}
                    placeholder="Cari Netflix, ChatGPT, Canva..."
                    className="nebuna-input py-4 pl-11 pr-4 text-sm"
                  />
                </div>
                <button className="nebuna-primary-btn" type="submit">
                  Cari Produk <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="nebuna-shell nebuna-ring p-6">
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 text-[#ff6a3d]">
                  <SlidersHorizontal className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-[0.18em]">Filter Aktif</p>
                </div>
                <p className="mt-4 text-3xl font-black uppercase text-white">{activeLabel}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {filteredProducts.length} produk ditemukan. Pilih kategori di bawah untuk mempersempit katalog.
                </p>
              </div>
              <Link href="/products" className="nebuna-secondary-btn self-start">
                Reset Filter
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => {
            const active = selectedCategory === category.slug;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className={`nebuna-shell nebuna-ring group px-4 py-4 transition hover:-translate-y-1 hover:border-[#ff6a3d]/40 ${
                  active ? "border-[#ff6a3d]/50 bg-[#ff6a3d]/10" : ""
                }`}
              >
                <div className="relative flex items-center gap-3">
                  <CategoryIcon slug={category.slug} size="md" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-white">{category.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">{category.count} produk</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">Produk Terverifikasi</p>
            <h2 className="nebuna-title mt-2 text-4xl sm:text-5xl">{activeLabel}</h2>
          </div>
          <p className="text-sm text-zinc-400">Harga mulai, stok, dan metode aktivasi bisa berubah sesuai paket.</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        ) : (
          <div className="nebuna-shell nebuna-ring mt-6 p-8 text-center">
            <p className="text-xl font-black text-white">Produk belum ketemu</p>
            <p className="mt-2 text-sm text-zinc-400">Coba keyword lain atau reset filter kategori.</p>
            <Link href="/products" className="nebuna-primary-btn mt-6">
              Reset Katalog
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
