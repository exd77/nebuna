import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  Headphones,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getCurrentUserOrderByNumber } from "@/lib/order-actions";
import { formatPrice } from "@/lib/utils";

const statusMap: Record<string, { label: string; className: string; accent: string }> = {
  pending_payment: {
    label: "Menunggu pembayaran",
    className: "border-amber-400/25 bg-amber-500/10 text-amber-200",
    accent: "text-amber-300",
  },
  processing: {
    label: "Pembayaran diterima · diproses",
    className: "border-[#ff6a3d]/30 bg-[#ff6a3d]/10 text-[#ffb39a]",
    accent: "text-[#ff6a3d]",
  },
  completed: {
    label: "Selesai",
    className: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
    accent: "text-emerald-300",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "border-red-400/25 bg-red-500/10 text-red-200",
    accent: "text-red-300",
  },
  expired: {
    label: "Kedaluwarsa",
    className: "border-red-400/25 bg-red-500/10 text-red-200",
    accent: "text-red-300",
  },
  failed: {
    label: "Gagal",
    className: "border-red-400/25 bg-red-500/10 text-red-200",
    accent: "text-red-300",
  },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = await getCurrentUserOrderByNumber(orderNumber);
  if (!order) notFound();

  const status = statusMap[order.status] ?? statusMap.pending_payment;
  const canPay = ["pending_payment", "processing"].includes(order.status);
  const expiry = order.expiredAt ? order.expiredAt.toLocaleString("id-ID") : "-";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151819] pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,106,61,0.18),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(255,242,71,0.06),transparent_22%),linear-gradient(180deg,#151819,#0d0f10_86%)]" />
      <div className="pointer-events-none absolute inset-0 nebuna-grid opacity-40" />
      <div className="nebuna-float-sparks" />

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/account/orders" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-[#ff6a3d]">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke pesanan
        </Link>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <span className="nebuna-kicker">
              <Sparkles className="h-3.5 w-3.5" /> Detail Pembayaran
            </span>
            <h1 className="nebuna-title mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Order QRIS
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
              Scan QRIS, buka payment link, dan pantau status pembayaran otomatis dari halaman ini.
            </p>
          </div>

          <div className={`rounded-3xl border px-5 py-4 ${status.className}`}>
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] opacity-80">Status Order</p>
                <p className="mt-1 font-black">{status.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-5">
            <div className="nebuna-shell nebuna-ring p-6 sm:p-8">
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">{order.orderNumber}</p>
                <h2 className="mt-2 text-3xl font-black text-white">{order.productName}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Simpan nomor order ini untuk tracking dan komunikasi dengan admin support.
                </p>

                <div className="mt-6 rounded-2xl border border-[#ff6a3d]/25 bg-[#ff6a3d]/8 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb39a]">Total Bayar</p>
                  <p className="mt-2 text-4xl font-black text-white">{formatPrice(order.amount)}</p>
                  <p className="mt-2 text-sm text-zinc-400">Channel: {order.paymentChannel || "QRIS"}</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <InfoCard label="Email Tujuan" value={order.customerEmail} />
                  <InfoCard label="Status Pembayaran" value={order.paymentStatus} />
                  <InfoCard label="Reference" value={order.paymentReference || "-"} />
                  <InfoCard label="Expired" value={expiry} />
                </div>

                {order.accountIdentifier ? <LongInfo label="Akun Tujuan" value={order.accountIdentifier} /> : null}
                {order.notes ? <LongInfo label="Catatan" value={order.notes} /> : null}
              </div>
            </div>

            <div className="nebuna-shell nebuna-ring p-5">
              <div className="relative flex gap-3 text-sm leading-6 text-zinc-300">
                <Headphones className="mt-1 h-5 w-5 shrink-0 text-[#ff6a3d]" />
                <div>
                  <p className="font-black text-white">Butuh bantuan?</p>
                  <p className="text-zinc-400">Hubungi admin dan sertakan nomor order: {order.orderNumber}</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="nebuna-shell nebuna-ring p-6 sm:p-8">
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#ff6a3d]/35 bg-[#ff6a3d]/10 text-[#ff6a3d]">
                  <QrCode className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase text-white">Bayar dengan QRIS</h2>
                  <p className="text-sm text-zinc-400">Scan QR atau buka payment link jika gateway menyediakan checkout page.</p>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/25 p-5 text-center">
                {order.qrImageUrl ? (
                  <Image
                    src={order.qrImageUrl}
                    alt={`QRIS ${order.orderNumber}`}
                    width={360}
                    height={360}
                    unoptimized
                    className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-white p-3"
                  />
                ) : order.qrString ? (
                  <div className="space-y-4">
                    <div className="mx-auto flex min-h-72 w-full max-w-sm items-center justify-center rounded-2xl border border-dashed border-[#ff6a3d]/35 bg-[#ff6a3d]/8 p-5 text-xs leading-6 text-[#ffd0c1] break-all">
                      {order.qrString}
                    </div>
                    <p className="text-xs leading-5 text-zinc-500">QR string tersedia. Pada mode mock/dev, ini bisa dipakai untuk validasi UI sebelum QR image gateway aktif.</p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-sm text-zinc-500">
                    QR belum tersedia. Buka payment link atau refresh status pesanan.
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {order.paymentUrl && canPay ? (
                  <Link href={order.paymentUrl} target="_blank" className="nebuna-primary-btn">
                    Buka Payment Link <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}
                <Link href={`/orders/${order.orderNumber}`} className="nebuna-secondary-btn">
                  Refresh Status <RefreshCw className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                <div className="flex items-center gap-2 font-black">
                  <ShieldCheck className="h-4 w-4" />
                  Setelah pembayaran sukses
                </div>
                {[
                  "Webhook payment akan update status otomatis.",
                  "Order berubah ke processing dan siap diproses admin/fulfillment.",
                  "Kalau status belum berubah, refresh halaman atau hubungi support.",
                ].map((item) => (
                  <div key={item} className="flex gap-2 text-emerald-50/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
                <div className="flex items-start gap-3">
                  <Copy className="mt-0.5 h-4 w-4 text-[#ff6a3d]" />
                  <p>
                    Reference: <span className="font-bold text-white">{order.paymentReference || order.orderNumber}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-2 break-all text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function LongInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-2 break-all text-sm leading-6 text-white">{value}</p>
    </div>
  );
}
