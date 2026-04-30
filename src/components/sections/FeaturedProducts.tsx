"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/data";
import { CategorySlug } from "@/types";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/ui/ProductCard";
import { useMemo, useState } from "react";

type Filter = "all" | CategorySlug;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "hiburan", label: "Hiburan" },
  { id: "ai-tools", label: "AI Tools" },
  { id: "developer", label: "Developer" },
  { id: "social-premium", label: "Social Premium" },
  { id: "produktivitas", label: "Produktivitas" },
];

export default function FeaturedProducts() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <AnimatedSection className="mb-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              Paling Dicari
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Langganan <span className="gradient-text">Populer</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/55">
              Pilihan produk digital dengan aktivasi cepat, garansi
              replacement, dan harga terbaik di Indonesia.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-cyan-300"
          >
            Lihat semua produk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </AnimatedSection>

      {/* Category filter pills */}
      <AnimatedSection delay={0.1} className="mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === f.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "border border-white/8 bg-white/5 text-white/60 hover:border-white/15 hover:text-white"
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-[10px] opacity-70">
                {f.id === "all"
                  ? products.length
                  : categories.find((c) => c.slug === f.id)?.count ?? 0}
              </span>
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Products grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/8 bg-white/2 py-16 text-center text-white/50">
          Belum ada produk di kategori ini.
        </div>
      )}
    </section>
  );
}
