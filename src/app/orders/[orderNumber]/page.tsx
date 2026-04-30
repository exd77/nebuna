import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, ExternalLink, QrCode, RefreshCw, ShieldCheck } from "lucide-react";

import { getCurrentUserOrderByNumber } from "@/lib/order-actions";
import { formatPrice } from "@/lib/utils";

const statusMap: Record<string, { label: string; className: string }> = {
  pending_payment: {
    label: "Menunggu pembayaran",
    className: "border-amber-400/20 bg-amber-500/10 text-amber-200",
  },
  processing: {
    label: "Pembayaran diterima · diproses",
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
  expired: {
    label: "Kedaluwarsa",
    className: "border-red-400/20 bg-red-500/10 text-red-200",
  },
  failed: {
    label: "Gagal",
    className: "border-red-400/20 bg-red-500/10 text-red-200",
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

  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke pesanan
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/35">{order.orderNumber}</p>
                <h1 className="mt-2 text-3xl font-black text-white">{order.productName}</h1>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  QRIS detail page untuk menyelesaikan pembayaran dan memantau status transaksi otomatis.
                </p>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}>
                <Clock3 className="h-4 w-4" />
                {status.label}
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoCard label="Total" value={formatPrice(order.amount)} />
              <InfoCard label="Channel" value={order.paymentChannel || "QRIS"} />
              <InfoCard label="Email tujuan" value={order.customerEmail} />
              <InfoCard label="Reference" value={order.paymentReference || "-"} />
              <InfoCard label="Berlaku sampai" value={order.expiredAt ? order.expiredAt.toLocaleString("id-ID") : "-"} />
              <InfoCard label="Status pembayaran" value={order.paymentStatus} />
            </div>

            {order.accountIdentifier && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                <p className="text-xs uppercase tracking-wider text-white/35">Akun Tujuan</p>
                <p className="mt-2 text-white">{order.accountIdentifier}</p>
              </div>
            )}

            {order.notes && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                <p className="text-xs uppercase tracking-wider text-white/35">Catatan</p>
                <p className="mt-2 text-white">{order.notes}</p>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Bayar dengan QRIS</h2>
                <p className="text-sm text-white/55">Scan QR di bawah atau buka payment link jika tersedia.</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-6 text-center">
              {order.qrImageUrl ? (
                <Image
                  src={order.qrImageUrl}
                  alt={`QRIS ${order.orderNumber}`}
                  width={320}
                  height={320}
                  unoptimized
                  className="mx-auto w-full max-w-xs rounded-2xl border border-white/10 bg-white p-2"
                />
              ) : order.qrString ? (
                <div className="space-y-4">
                  <div className="mx-auto flex h-64 w-full max-w-xs items-center justify-center rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-500/5 p-4 text-xs leading-6 text-cyan-100 break-all">
                    {order.qrString}
                  </div>
                  <p className="text-xs text-white/45">QR string tersedia. Gunakan generator QR lokal jika ingin mengubahnya menjadi gambar.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-sm text-white/45">
                  QR belum tersedia. Buka payment link atau refresh status pesanan.
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {order.paymentUrl && canPay && (
                <Link
                  href={order.paymentUrl}
                  target="_blank"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
                >
                  Buka Payment Link
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              <Link
                href={`/orders/${order.orderNumber}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/80 hover:border-white/20 hover:text-white"
              >
                Refresh Status
                <RefreshCw className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Setelah pembayaran sukses
              </div>
              <ul className="space-y-2 text-emerald-50/90">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Webhook akan update status otomatis.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Order pindah ke status processing/completed sesuai alur fulfillment.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Kalau status belum berubah, refresh halaman atau hubungi support.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wider text-white/35">{label}</p>
      <p className="mt-2 break-all text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
