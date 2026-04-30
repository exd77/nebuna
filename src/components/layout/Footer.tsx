import Link from "next/link";
import {
  Globe,
  Mail,
  MessageCircle,
  Package,
  Camera,
} from "lucide-react";

const productLinks = [
  { label: "Netflix", href: "/products/netflix" },
  { label: "YouTube Premium", href: "/products/youtube-premium" },
  { label: "ChatGPT Plus", href: "/products/chatgpt-plus" },
  { label: "Spotify", href: "/products/spotify" },
  { label: "Canva", href: "/products/canva" },
  { label: "GitHub Copilot", href: "/products/github-copilot-pro" },
];

const helpLinks = [
  { label: "FAQ", href: "/#faq" },
  { label: "Cara Kerja", href: "/#how-it-works" },
  { label: "Lacak Pesanan", href: "/#trust" },
  { label: "Hubungi Kami", href: "/login" },
];

const legalLinks = [
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Syarat & Ketentuan", href: "#" },
  { label: "Kebijakan Refund", href: "#" },
  { label: "Tentang Kami", href: "#" },
];

const paymentBadges = [
  "QRIS",
  "BCA VA",
  "Mandiri",
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
];

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Camera, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[rgb(6,8,16)] px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-xl font-bold"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Package className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">Nebuna Store</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Marketplace langganan digital premium terpercaya di Indonesia.
              Produk terverifikasi, aktivasi cepat, dan support 24/7.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Produk */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Produk
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Bantuan
            </h4>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment badges */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Metode Pembayaran
              </div>
              <div className="flex flex-wrap gap-2">
                {paymentBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Sistem online · 24/7
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Nebuna Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
