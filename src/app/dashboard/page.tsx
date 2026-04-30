import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  Headphones,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserCircle,
  type LucideIcon,
} from "lucide-react";

import { auth } from "@/auth";
import { getCurrentUserOrders } from "@/lib/order-actions";

const nextSteps = [
  "Pilih produk digital premium yang kamu butuhkan.",
  "Checkout aman dan simpan nomor/order ID kamu.",
  "Pantau status aktivasi dari halaman pesanan.",
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const displayName = session.user.name || session.user.email || "Nebuna user";
  const orders = await getCurrentUserOrders(50);
  const quickStats = [
    { label: "Pesanan aktif", value: String(orders.length), icon: ShoppingBag },
    {
      label: "Menunggu aktivasi",
      value: String(orders.filter((order) => order.status !== "completed" && order.status !== "cancelled").length),
      icon: Clock3,
    },
    {
      label: "Produk selesai",
      value: String(orders.filter((order) => order.status === "completed").length),
      icon: PackageCheck,
    },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Account Center
                </span>
                <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">
                  Halo, <span className="gradient-text">{displayName}</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
                  Dashboard Nebuna Store siap dipakai untuk mengelola pesanan,
                  cek status aktivasi, dan akses bantuan lebih cepat. Order data
                  real akan muncul setelah checkout flow aktif.
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-100">
                <UserCircle className="h-8 w-8" />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-cyan-300" />
                      <span className="text-3xl font-black text-white">{stat.value}</span>
                    </div>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-white/45">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/30"
              >
                Belanja Produk
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/account/orders"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/80 transition hover:border-white/20 hover:text-white"
              >
                Lihat Pesanan
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white">Langkah berikutnya</h2>
              <div className="mt-5 space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-sm font-black text-cyan-200">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-white/65">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard
                icon={ShieldCheck}
                title="Garansi replacement"
                desc="Kalau produk bermasalah sesuai ketentuan, tim support akan bantu cek dan replace."
              />
              <InfoCard
                icon={Headphones}
                title="Support 24/7"
                desc="Butuh bantuan aktivasi? Hubungi support Nebuna Store kapan pun dibutuhkan."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/55">{desc}</p>
    </div>
  );
}
