import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Clock3, PackageSearch, ShoppingBag } from "lucide-react";

import { auth } from "@/auth";

const placeholderOrders = [
  {
    id: "NB-READY-001",
    product: "ChatGPT Plus",
    status: "Contoh status",
    detail: "Order history real akan tampil setelah checkout aktif.",
  },
  {
    id: "NB-READY-002",
    product: "Netflix Premium",
    status: "Contoh status",
    detail: "Gunakan halaman ini sebagai pusat tracking pesanan user.",
  },
];

export default async function AccountOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                <ShoppingBag className="h-3.5 w-3.5" />
                Order Center
              </span>
              <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                Pesanan Saya
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                Area ini disiapkan untuk tracking aktivasi, pengiriman akun,
                replacement, dan riwayat transaksi Nebuna Store.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
              Support 24/7 aktif
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-black/20 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-cyan-200">
              <PackageSearch className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-white">Belum ada pesanan real</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/55">
              Setelah checkout flow tersambung ke backend/payment provider,
              pesanan user akan muncul di sini lengkap dengan status dan detail aktivasi.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
            >
              Cari Produk
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {placeholderOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                      {order.id}
                    </p>
                    <h3 className="mt-1 font-bold text-white">{order.product}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                    <Clock3 className="h-3.5 w-3.5" />
                    {order.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">{order.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
