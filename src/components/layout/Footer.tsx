import Link from "next/link";
import { Camera, Globe, Headphones, Mail, MessageCircle, Music2 } from "lucide-react";

const infoLinks = [
  { label: "Tentang Kami", href: "/blog" },
  { label: "Cara Pembelian", href: "/#how-it-works" },
  { label: "Syarat & Ketentuan", href: "/terms" },
  { label: "Kebijakan Privasi", href: "/privacy" },
];

const helpLinks = [
  { label: "FAQ", href: "/#bantuan" },
  { label: "Hubungi Kami", href: "/login" },
  { label: "Status Pesanan", href: "/account/orders" },
  { label: "Refund & Garansi", href: "/terms" },
];

const payments = ["QRIS", "OVO", "DANA", "GoPay", "BCA", "Mandiri", "BRI", "BNI"];

const socials = [
  { label: "Website", href: "#", icon: Globe },
  { label: "TikTok", href: "#", icon: Music2 },
  { label: "WhatsApp", href: "#", icon: MessageCircle },
  { label: "Email", href: "#", icon: Mail },
  { label: "Instagram", href: "#", icon: Camera },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0d0f10]/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-xl font-black uppercase text-[#ff6a3d]">Nebuna</span>
            <span className="text-xl font-black uppercase tracking-[0.12em] text-white">Store</span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-400">
            Marketplace langganan digital premium yang cepat, aman, dan terpercaya buat user Indonesia yang mau checkout tanpa ribet.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-[#ff6a3d]/40 hover:text-[#ff6a3d]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white">Informasi</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white">Bantuan</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white">Pembayaran Aman</h3>
          <div className="grid grid-cols-4 gap-2">
            {payments.map((payment) => (
              <span
                key={payment}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2 text-center text-xs font-bold text-zinc-300"
              >
                {payment}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-zinc-400">
            <Headphones className="h-4 w-4 text-[#ff6a3d]" />
            Support 24/7 untuk bantu order & after-sales.
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Nebuna Store. All rights reserved.
      </div>
    </footer>
  );
}
