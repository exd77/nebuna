"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  PackageSearch,
  Zap,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Langganan Digital Premium · Terpercaya di Indonesia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance"
            >
              Akses{" "}
              <span className="gradient-text">Netflix, ChatGPT, Canva</span>,
              dan Tools Premium dalam Hitungan Menit.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-xl text-base text-white/60 sm:text-lg text-pretty"
            >
              Nebuna Store menyediakan produk digital terverifikasi dengan
              aktivasi cepat, pembayaran aman, dan support 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02]"
              >
                Beli Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#trust"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
              >
                <PackageSearch className="h-4 w-4" />
                Lacak Pesanan
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { icon: Zap, label: "Pengiriman Instan", color: "text-cyan-400" },
                { icon: ShieldCheck, label: "Garansi Replacement", color: "text-emerald-400" },
                { icon: Headphones, label: "Support 24/7", color: "text-blue-400" },
                { icon: CheckCircle2, label: "Produk Terverifikasi", color: "text-amber-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                  <span className="text-xs font-medium text-white/80">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product preview composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <HeroPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Glow background */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent blur-2xl" />

      {/* Main composition */}
      <div className="relative space-y-3">
        {/* ChatGPT Plus card - main focus */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-md shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold shadow-lg">
              GPT
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-white">ChatGPT Plus</div>
                <span className="shrink-0 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  AKTIF
                </span>
              </div>
              <div className="mt-0.5 text-xs text-white/50">AI Tools · Premium</div>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium text-emerald-300">
                  Aktivasi berhasil · 2 menit lalu
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Netflix + GitHub Copilot row */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white text-lg font-black">
                N
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">Netflix</div>
                <div className="text-[11px] text-white/50">Premium</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] text-white/50">
              <Zap className="h-3 w-3 text-cyan-400" />
              Pengiriman instan
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.79.56 4.57-1.52 7.86-5.83 7.86-10.91C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">Copilot Pro</div>
                <div className="text-[11px] text-white/50">Developer</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] text-white/50">
              <Zap className="h-3 w-3 text-cyan-400" />
              Aktivasi 5-15 menit
            </div>
          </motion.div>
        </div>

        {/* System status badge */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] px-4 py-2.5 backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-white/80">Sistem online</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/50">
            <Headphones className="h-3 w-3" />
            Support 24/7
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 hidden h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 text-cyan-200 backdrop-blur-md sm:flex"
      >
        <Zap className="h-5 w-5" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-3 hidden h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 text-emerald-200 backdrop-blur-md sm:flex"
      >
        <ShieldCheck className="h-5 w-5" />
      </motion.div>
    </div>
  );
}
