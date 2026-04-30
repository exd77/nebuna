"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

import ProductIcon from "./ProductIcon";
import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const badgeStyles: Record<string, string> = {
  Populer: "border-[#ff6a3d]/35 bg-[#ff6a3d]/12 text-[#ff9a76]",
  Terlaris: "border-yellow-300/30 bg-yellow-300/10 text-yellow-200",
  Promo: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Instan: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  Limited: "border-red-400/30 bg-red-400/10 text-red-200",
  Baru: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  Ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Premium: "border-orange-300/30 bg-orange-300/10 text-orange-100",
};

const categoryLabel: Record<string, string> = {
  hiburan: "Hiburan",
  "ai-tools": "AI Tools",
  developer: "Developer",
  "social-premium": "Social Premium",
  produktivitas: "Produktivitas",
  security: "Security",
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="h-full"
    >
      <div className="nebuna-shell nebuna-ring group h-full p-4 transition duration-300 hover:border-[#ff6a3d]/45 hover:shadow-[0_0_42px_rgba(255,106,61,0.12)]">
        <div className="relative flex h-full min-h-[210px] flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <Link href={`/products/${product.slug}`} aria-label={`Lihat detail ${product.name}`}>
                <ProductIcon slug={product.slug} size="lg" />
              </Link>
              <div className="flex flex-col items-end gap-1.5">
                {product.badge ? (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em]",
                      badgeStyles[product.badge] ?? "border-white/10 bg-white/5 text-zinc-300",
                    )}
                  >
                    {product.badge}
                  </span>
                ) : null}
                <span className="rounded-full border border-[#ff6a3d]/25 bg-[#ff6a3d]/8 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#ffb39a]">
                  {categoryLabel[product.category] ?? product.category}
                </span>
              </div>
            </div>

            <Link href={`/products/${product.slug}`} className="mt-4 block">
              <h3 className="line-clamp-2 text-lg font-black leading-tight text-white transition group-hover:text-[#ffb39a]">
                {product.name}
              </h3>
              {!compact ? (
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">{product.shortDesc}</p>
              ) : null}
            </Link>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-zinc-500">Mulai dari</p>
                <p className="text-lg font-black text-white">{formatPrice(product.price)}</p>
              </div>
              <Link
                href={`/checkout?product=${product.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a3d] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(255,106,61,0.18)] transition hover:bg-[#ff7c54]"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Beli
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
