import {
  ShieldCheck,
  RefreshCw,
  Headphones,
  Lock,
  Zap,
  PackageSearch,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const cards = [
  {
    icon: ShieldCheck,
    title: "Produk Terverifikasi",
    desc: "Semua produk melalui verifikasi kualitas dan legitimasi sebelum dijual.",
    accent: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-300",
  },
  {
    icon: RefreshCw,
    title: "Garansi Replacement",
    desc: "Penggantian gratis jika produk bermasalah dalam masa garansi.",
    accent: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-300",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    desc: "Tim support siap membantu kapan saja melalui WhatsApp dan live chat.",
    accent: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-300",
  },
  {
    icon: Lock,
    title: "Pembayaran Aman",
    desc: "Transaksi terenkripsi dan terpercaya menggunakan payment gateway resmi.",
    accent: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-300",
  },
  {
    icon: Zap,
    title: "Aktivasi Cepat",
    desc: "Sebagian besar produk aktif dalam 5-15 menit setelah pembayaran dikonfirmasi.",
    accent: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-300",
  },
  {
    icon: PackageSearch,
    title: "Lacak Pesanan",
    desc: "Pantau status pesanan secara real-time dari pembayaran hingga pengiriman.",
    accent: "from-pink-500/20 to-red-500/20",
    iconColor: "text-pink-300",
  },
];

const paymentMethods = [
  "QRIS",
  "BCA VA",
  "Mandiri",
  "BNI",
  "BRI",
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
  "Alfamart",
  "Indomaret",
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <AnimatedSection className="mb-12 text-center">
        <p className="mb-2 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          Kenapa Nebuna Store?
        </p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Keamanan dan{" "}
          <span className="gradient-text">Kenyamanan Belanja</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/55">
          Kami serius soal kepercayaan. Setiap produk diverifikasi, setiap
          transaksi dilindungi.
        </p>
      </AnimatedSection>

      {/* Trust cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.05}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-md transition-all hover:border-cyan-500/20">
              <div
                className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${c.accent} opacity-30 blur-2xl transition-opacity group-hover:opacity-60`}
              />
              <div className="relative">
                <div
                  className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} ${c.iconColor}`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-bold text-white">{c.title}</h3>
                <p className="text-xs leading-relaxed text-white/55">
                  {c.desc}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Payment methods */}
      <AnimatedSection delay={0.2} className="mt-14">
        <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white">
              Metode Pembayaran
            </h3>
            <span className="text-[11px] text-white/40">
              Pembayaran 100% aman & terenkripsi
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
