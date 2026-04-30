import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Login
        </Link>
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
            <MailCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-black text-white">Reset password segera hadir</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Flow reset password belum diaktifkan. Untuk sementara, hubungi support Nebuna Store dengan email akunmu agar tim kami bisa bantu verifikasi.
          </p>
          <Link href="/" className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white">
            Ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
