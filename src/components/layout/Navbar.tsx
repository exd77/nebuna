"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { Menu, ShoppingCart, X, Search, Package, User } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Produk", href: "/products" },
  { label: "Kategori", href: "/#categories" },
  { label: "Promo", href: "/#promo" },
  { label: "Cara Kerja", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const bg = useMotionTemplate`rgba(8, 10, 18, ${bgOpacity})`;

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 backdrop-blur-xl transition-all duration-300"
    >
      <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="gradient-text">Nebuna Store</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 items-center md:flex max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Netflix, ChatGPT, Canva..."
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/#trust"
              className="hidden items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white xl:flex"
            >
              <Package className="h-4 w-4" />
              Lacak Pesanan
            </Link>

            <button className="relative p-2 text-white/60 transition-colors hover:text-white" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
                0
              </span>
            </button>

            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/70 transition-all hover:border-white/20 hover:text-white sm:flex"
            >
              <User className="h-4 w-4" />
              Masuk
            </Link>

            <Link
              href="/products"
              className="hidden items-center gap-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 md:flex"
            >
              Lihat Produk
            </Link>

            <button
              className="p-2 text-white/60 hover:text-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-t border-white/5 lg:hidden"
      >
        <div className="space-y-2 px-4 py-4">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Cari Netflix, ChatGPT, Canva..."
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none"
            />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg py-2 px-3 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#trust"
            className="flex items-center gap-2 rounded-lg py-2 px-3 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Package className="h-4 w-4" />
            Lacak Pesanan
          </Link>

          <div className="flex gap-2 pt-2">
            <Link
              href="/login"
              className="flex-1 rounded-xl border border-white/15 py-2.5 text-center text-sm font-medium text-white/80 transition-colors hover:border-white/25"
              onClick={() => setIsOpen(false)}
            >
              Masuk
            </Link>
            <Link
              href="/products"
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
