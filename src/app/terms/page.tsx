import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <article className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
            <FileText className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-black text-white">Syarat & Ketentuan</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Halaman ini adalah placeholder awal untuk Terms of Service Nebuna Store. Konten legal final perlu disesuaikan dengan model bisnis, metode pembayaran, kebijakan refund, garansi replacement, dan ketentuan produk digital.
          </p>
          <div className="mt-6 space-y-4 text-sm leading-7 text-white/60">
            <p>Dengan memakai Nebuna Store, user memahami bahwa produk digital dapat memiliki aturan aktivasi, durasi, dan garansi yang berbeda per produk.</p>
            <p>Setiap pembelian wajib menggunakan data yang benar agar proses aktivasi dan bantuan support berjalan lancar.</p>
            <p>Dokumen final akan diperbarui sebelum production launch.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
