"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, products } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CategoryIcon } from "@/components/ui/ProductIcon";

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <AnimatedSection className="mb-10">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              Kategori Populer
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Pilih <span className="gradient-text">Kategori</span> Favoritmu
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/55">
              Mulai dari hiburan, AI tools, sampai cloud credit untuk
              developer — semua tersedia di Nebuna Store.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const sample = cat.products
            .map((slug) => products.find((p) => p.slug === slug))
            .filter(Boolean)
            .slice(0, 4);

          return (
            <AnimatedSection key={cat.id} delay={i * 0.06}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Decorative gradient blob */}
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${cat.accentColor} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <CategoryIcon slug={cat.slug} size="lg" />
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="relative mt-4 flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    {cat.description}
                  </p>
                </div>

                <div className="relative mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex flex-wrap gap-1">
                    {sample.slice(0, 3).map((p) =>
                      p ? (
                        <span
                          key={p.slug}
                          className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/65"
                        >
                          {p.name.split(" ")[0]}
                        </span>
                      ) : null
                    )}
                    {cat.count > 3 && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/45">
                        +{cat.count - 3}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-white/40">
                    {cat.count} produk
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
