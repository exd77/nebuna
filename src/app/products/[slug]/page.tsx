import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Zap,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import { products } from "@/lib/data";
import { calculateDiscount, formatPrice } from "@/lib/utils";
import ProductIcon from "@/components/ui/ProductIcon";

const categoryLabel: Record<string, string> = {
  hiburan: "Hiburan",
  "ai-tools": "AI Tools",
  developer: "Developer",
  "social-premium": "Social Premium",
  produktivitas: "Produktivitas",
  security: "Security",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <section className="mx-auto min-h-screen max-w-5xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-cyan-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Kembali ke Katalog
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Visual */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15)_0%,_transparent_70%)]" />
          <ProductIcon slug={product.slug} size="xl" className="h-32 w-32" />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="mb-2 inline-flex w-fit items-center rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
            {categoryLabel[product.category] ?? product.category}
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm text-white/55">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-white/80">
                {product.rating}
              </span>
              <span>({product.reviews.toLocaleString("id-ID")} ulasan)</span>
            </div>
            <span>·</span>
            <span>{product.sales.toLocaleString("id-ID")} terjual</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Mulai dari
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-white/30 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="rounded-md bg-red-500/15 border border-red-500/30 px-1.5 py-0.5 text-[10px] font-bold text-red-300">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.01]">
              <ShoppingCart className="h-4 w-4" />
              Beli Sekarang
            </button>
          </div>

          {/* Trust line */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-[11px] text-white/65">
            {[
              { icon: Zap, label: product.delivery, color: "text-cyan-300" },
              {
                icon: ShieldCheck,
                label: "Garansi replacement",
                color: "text-emerald-300",
              },
              {
                icon: Headphones,
                label: "Support 24/7",
                color: "text-blue-300",
              },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-white/5 p-3 text-center"
              >
                <Icon className={`h-4 w-4 ${color}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Termasuk
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
