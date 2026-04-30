"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Zap, ArrowRight, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function useCountdown(targetHours = 24) {
  const [seconds, setSeconds] = useState(targetHours * 3600 - 30 * 60 - 17);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : targetHours * 3600));
    }, 1000);
    return () => clearInterval(id);
  }, [targetHours]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s };
}

const chips = [
  { label: "ChatGPT Plus", color: "from-emerald-500 to-emerald-700" },
  { label: "Canva", color: "from-cyan-500 to-purple-500" },
  { label: "GitHub Copilot", color: "from-gray-600 to-black" },
  { label: "Spotify", color: "from-green-500 to-green-700" },
];

export default function PromoBanner() {
  const { h, m, s } = useCountdown();

  return (
    <section
      id="promo"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <AnimatedSection>
        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/20"
        >
          {/* Background base */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-900 to-[rgb(8,10,18)]" />

          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative grid gap-8 p-8 md:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            {/* Left: copy */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                <Flame className="h-3 w-3" />
                Promo Terbatas
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl text-balance">
                Bundling Tools Premium{" "}
                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                  Lebih Hemat
                </span>
              </h2>

              <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base text-pretty">
                Dapatkan paket AI tools, developer tools, dan hiburan premium
                dengan aktivasi cepat. Promo terbatas, jangan sampai kehabisan!
              </p>

              {/* Mini chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
                  >
                    <span
                      className={`h-2 w-2 rounded-full bg-gradient-to-br ${c.color}`}
                    />
                    {c.label}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/50 hover:scale-[1.02]"
                >
                  Klaim Promo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Zap className="h-3.5 w-3.5 text-amber-300" />
                  Stok terbatas, klaim sekarang
                </div>
              </div>
            </div>

            {/* Right: countdown */}
            <div className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/70">
                <Clock className="h-4 w-4 text-amber-300" />
                Berakhir dalam
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Jam", value: pad(h) },
                  { label: "Menit", value: pad(m) },
                  { label: "Detik", value: pad(s) },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-3 text-center"
                  >
                    <div className="text-2xl font-black tabular-nums text-white sm:text-3xl">
                      {unit.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-300">
                    Hemat hingga
                  </span>
                  <span className="text-lg font-black text-emerald-300">
                    25%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
