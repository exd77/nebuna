import { ShoppingBag, CreditCard, PackageCheck } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    icon: ShoppingBag,
    title: "Pilih Produk",
    desc: "Pilih layanan digital yang kamu butuhkan dari katalog Nebuna Store.",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    icon: CreditCard,
    title: "Checkout Aman",
    desc: "Bayar dengan metode pembayaran favoritmu — QRIS, e-wallet, transfer bank, atau gerai retail.",
    accent: "from-blue-500 to-indigo-600",
  },
  {
    icon: PackageCheck,
    title: "Aktivasi / Terima Produk",
    desc: "Detail produk dikirim atau diproses langsung oleh tim Nebuna Store dalam hitungan menit.",
    accent: "from-emerald-500 to-cyan-500",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.05)_0%,_transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <p className="mb-2 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
            Cara Kerja
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Tanpa Ribet. <span className="gradient-text">Tiga Langkah Saja.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/55">
            Belanja produk digital di Nebuna Store cepat, aman, dan transparan.
            Cukup ikuti tiga langkah berikut.
          </p>
        </AnimatedSection>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connected line - desktop */}
          <div
            className="absolute top-10 left-0 right-0 hidden md:block"
            aria-hidden
          >
            <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          </div>

          {steps.map((step, i) => (
            <AnimatedSection
              key={step.title}
              delay={i * 0.15}
              className="relative"
            >
              <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md transition-all hover:border-cyan-500/20">
                <div className="relative mb-4 inline-flex">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-white shadow-lg`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[rgb(8,10,18)] text-[11px] font-bold text-cyan-300">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {step.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
