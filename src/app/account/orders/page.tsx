import Link from "next/link";
import { ArrowLeft, Clock3, PackageSearch, ShoppingBag } from "lucide-react";

import { getCurrentUserOrders } from "@/lib/order-actions";
import { formatPrice } from "@/lib/utils";

const statusLabel: Record<string, { label: string; className: string }> = {
  pending_payment: {
    label: "Menunggu pembayaran",
    className: "border-amber-400/20 bg-amber-500/10 text-amber-200",
  },
  processing: {
    label: "Diproses",
    className: "border-cyan-400/20 bg-cyan-500/10 text-cyan-200",
  },
  completed: {
    label: "Selesai",
    className: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "border-red-400/20 bg-red-500/10 text-red-200",
  },
};

const paymentStatusLabel: Record<string, { label: string; className: string }> = {
  unpaid: {
    label: "Belum dibayar",
    className: "border-amber-400/20 bg-amber-500/10 text-amber-200",
  },
  pending: {
    label: "Menunggu konfirmasi",
    className: "border-cyan-400/20 bg-cyan-500/10 text-cyan-200",
  },
  paid: {
    label: "Sudah dibayar",
    className: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
  },
  expired: {
    label: "Kedaluwarsa",
    className: "border-red-400/20 bg-red-500/10 text-red-200",
  },
  failed: {
    label: "Gagal",
    className: "border-red-400/20 bg-red-500/10 text-red-200",
  },
};

const paymentLabel: Record<string, string> = {
  qris: "QRIS",
  bca_va: "BCA VA",
  gopay: "GoPay",
  ovo: "OVO",
  dana: "DANA",
  shopeepay: "ShopeePay",
};

export default async function AccountOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const orders = await getCurrentUserOrders();
  const { created } = await searchParams;

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
                Pantau status pembayaran, aktivasi, dan pengiriman produk digital Nebuna Store.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
              Support 24/7 aktif
            </div>
          </div>

          {created && (
            <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              Order <span className="font-bold">{created}</span> berhasil dibuat. Silakan lanjutkan pembayaran sesuai instruksi support/payment gateway.
            </div>
          )}

          {orders.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-black/20 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-cyan-200">
                <PackageSearch className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-white">Belum ada pesanan</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/55">
                Checkout produk pertamamu, lalu order akan muncul di sini lengkap dengan status dan detail aktivasi.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
              >
                Cari Produk
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-3">
              {orders.map((order) => {
                const status = statusLabel[order.status] ?? statusLabel.pending_payment;
                const payStatus = paymentStatusLabel[order.paymentStatus] ?? paymentStatusLabel.unpaid;
                return (
                  <div key={order.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                          {order.orderNumber}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-white">{order.productName}</h3>
                        <p className="mt-2 text-sm text-white/50">
                          Tujuan: {order.customerEmail}
                          {order.accountIdentifier ? ` · ${order.accountIdentifier}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}>
                          <Clock3 className="h-3.5 w-3.5" />
                          {status.label}
                        </span>
                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${payStatus.className}`}>
                          {payStatus.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 border-t border-white/5 pt-4 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/35">Total</p>
                        <p className="mt-1 font-bold text-white">{formatPrice(order.amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/35">Pembayaran</p>
                        <p className="mt-1 font-bold text-white">{paymentLabel[order.paymentMethod] ?? order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/35">Gateway</p>
                        <p className="mt-1 font-bold text-white uppercase">{order.paymentGateway}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/35">Tanggal</p>
                        <p className="mt-1 font-bold text-white">
                          {order.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-white/40">
                        Ref: {order.paymentReference || "-"}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/orders/${order.orderNumber}`}
                          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/80 hover:border-white/20 hover:text-white"
                        >
                          Lihat Detail
                        </Link>
                        {order.paymentUrl && ["pending_payment", "processing"].includes(order.status) && (
                          <Link
                            href={order.paymentUrl}
                            target="_blank"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Bayar Sekarang
                          </Link>
                        )}
                      </div>
                    </div>

                    {order.notes && <p className="mt-4 text-sm leading-6 text-white/45">Catatan: {order.notes}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
