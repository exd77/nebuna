"use client";

import { motion } from "framer-motion";
import { Star, Zap, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { Product, BadgeType } from "@/types";
import { calculateDiscount, formatPrice } from "@/lib/utils";
import ProductIcon from "./ProductIcon";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<BadgeType, string> = {
  Populer: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Terlaris: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Promo: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Instan: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Limited: "bg-red-500/15 text-red-300 border-red-500/30",
  Baru: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Ready: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  Premium: "bg-pink-500/15 text-pink-300 border-pink-500/30",
};

const categoryLabel: Record<string, string> = {
  hiburan: "Hiburan",
  "ai-tools": "AI Tools",
  developer: "Developer",
  "social-premium": "Social Premium",
  produktivitas: "Produktivitas",
  security: "Security",
};

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      {/* Header with icon block */}
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <ProductIcon slug={product.slug} size="lg" />

          <div className="flex flex-col items-end gap-1.5">
            {product.badge && (
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}
              >
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-red-500/15 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold text-red-300">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
            {categoryLabel[product.category] ?? product.category}
          </p>
          <h3 className="line-clamp-1 font-semibold text-white group-hover:text-cyan-200 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/55">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Body: delivery + rating */}
      <div className="px-5 pb-3 flex-1 space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
          <Zap className="h-3 w-3" />
          {product.delivery}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-white/50">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-white/80">{product.rating}</span>
            <span>({product.reviews.toLocaleString("id-ID")})</span>
          </div>
          <span>·</span>
          <span>{product.sales.toLocaleString("id-ID")} terjual</span>
        </div>
      </div>

      {/* Footer: price + CTA */}
      <div className="border-t border-white/5 bg-black/20 px-5 py-3">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-white/40">
              Mulai dari
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-white/30 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:border-white/20 hover:text-white"
              aria-label="Detail"
            >
              <Eye className="h-4 w-4" />
            </Link>
            <button
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              aria-label="Beli"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Beli
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
