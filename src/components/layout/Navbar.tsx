"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, User, X, LogOut } from "lucide-react";
import { useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Beranda", href: "/#home" },
  { label: "Kategori", href: "/#categories" },
  { label: "Promo", href: "/#promo" },
  { label: "Bantuan", href: "/#bantuan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isLoggedIn = status === "authenticated" && !!session?.user;
  const isHome = pathname === "/";

  const activeLabel = useMemo(() => (isHome ? "Beranda" : ""), [isHome]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = query.trim();
    router.push(search ? `/products?search=${encodeURIComponent(search)}` : "/products");
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d0f10]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-2 flex items-baseline gap-2">
          <span className="text-2xl font-black uppercase tracking-tight text-[#ff6a3d]">Nebuna</span>
          <span className="text-2xl font-black uppercase tracking-[0.12em] text-white">Store</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = link.label === activeLabel;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-xs font-black uppercase tracking-[0.15em] transition hover:text-[#ff6a3d] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-[#ff6a3d] after:transition-transform",
                  active
                    ? "text-[#ff6a3d] after:scale-x-100"
                    : "text-zinc-300 after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form onSubmit={handleSearch} className="relative ml-auto hidden min-w-[280px] max-w-md flex-1 lg:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari Netflix, ChatGPT, Canva..."
            className="nebuna-input py-3 pl-11 pr-4 text-sm"
          />
        </form>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="hidden rounded-xl border border-[#ff6a3d]/35 bg-[#ff6a3d]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#ff6a3d]/60 sm:inline-flex"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-xl border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-200 transition hover:border-[#ff6a3d]/40 hover:text-white sm:inline-flex"
            >
              Masuk
            </Link>
          )}

          <button
            type="button"
            className="hidden rounded-xl border border-white/10 p-3 text-zinc-300 transition hover:text-white md:inline-flex"
            aria-label="Akun"
          >
            <User className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="relative rounded-xl border border-white/10 p-3 text-zinc-300 transition hover:text-white"
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#ff6a3d] px-1 text-[10px] font-black text-white">
              1
            </span>
          </button>

          {isLoggedIn && (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hidden rounded-xl border border-white/10 p-3 text-zinc-300 transition hover:border-red-400/30 hover:text-red-200 md:inline-flex"
              aria-label="Keluar"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-xl border border-white/10 p-3 text-zinc-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-4 pb-4 lg:hidden">
          <form onSubmit={handleSearch} className="relative mt-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari Netflix, ChatGPT, Canva..."
              className="nebuna-input py-3 pl-11 pr-4 text-sm"
            />
          </form>

          <nav className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-zinc-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-[#ff6a3d]/40 bg-[#ff6a3d]/10 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-white"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-zinc-200"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="col-span-2 rounded-xl border border-white/10 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-zinc-200"
              >
                Masuk ke Akun
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
