"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import ProductIcon from "@/components/ui/ProductIcon";
import { loginAction, registerAction } from "@/lib/auth-actions";

type Mode = "login" | "register";

const FLOATING_PRODUCTS: Array<{
  slug: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}> = [
  { slug: "chatgpt-plus", top: "8%", left: "10%", delay: 0, duration: 7 },
  { slug: "netflix", top: "18%", left: "78%", delay: 1.2, duration: 8 },
  { slug: "spotify", top: "62%", left: "6%", delay: 0.6, duration: 9 },
  { slug: "github-copilot-pro", top: "70%", left: "82%", delay: 1.8, duration: 7.5 },
  { slug: "canva", top: "38%", left: "88%", delay: 2.2, duration: 8.5 },
  { slug: "discord-nitro", top: "82%", left: "44%", delay: 0.9, duration: 9.5 },
];

const ACTIVITY_FEED: Array<{ slug: string; name: string; ago: string }> = [
  { slug: "chatgpt-plus", name: "ChatGPT Plus", ago: "baru saja" },
  { slug: "netflix", name: "Netflix Premium", ago: "2 menit lalu" },
  { slug: "github-copilot-pro", name: "GitHub Copilot Pro", ago: "5 menit lalu" },
  { slug: "spotify", name: "Spotify Premium", ago: "8 menit lalu" },
  { slug: "canva", name: "Canva Pro", ago: "12 menit lalu" },
];

const STATS = [
  { value: "10K+", label: "Pelanggan Aktif" },
  { value: "<5", label: "Menit Aktivasi" },
  { value: "99.8%", label: "Rating Kepuasan" },
];

const PAYMENT_METHODS = ["QRIS", "GoPay", "OVO", "DANA", "BCA VA", "ShopeePay"];

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated mesh background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />

      {/* Dot grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      {/* Floating product orbs */}
      <FloatingOrbs />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.025] to-white/[0.01] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        >
          {/* Card inner glow */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.05fr_1fr]">
            <BrandShowcase />
            <Suspense fallback={<FormSkeleton />}>
              <FormPanel mode={mode} setMode={setMode} />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
      <div className="h-7 w-2/3 animate-pulse rounded bg-white/5" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/5" />
      <div className="h-12 animate-pulse rounded-xl bg-white/5" />
      <div className="h-12 animate-pulse rounded-xl bg-white/5" />
      <div className="h-12 animate-pulse rounded-xl bg-cyan-500/20" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating product orbs                                                     */
/* -------------------------------------------------------------------------- */

function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      {FLOATING_PRODUCTS.map((p) => (
        <motion.div
          key={p.slug}
          className="absolute opacity-40"
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [0, -16, 0],
            rotate: [0, 4, -3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="scale-90 blur-[1px]">
            <ProductIcon slug={p.slug} size="md" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Left panel: brand showcase                                                */
/* -------------------------------------------------------------------------- */

function BrandShowcase() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/5 p-10 lg:flex">
      {/* Top: brand */}
      <div>
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-base font-bold"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
            <Package className="h-4 w-4 text-white" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/40 to-blue-500/40 blur-md transition-opacity group-hover:opacity-80" />
          </div>
          <span className="gradient-text">Nebuna Store</span>
        </Link>

        <div className="mt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="h-3 w-3" />
            Premium Marketplace
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white text-balance">
            Gerbang masuk ke{" "}
            <span className="gradient-text">tools premium</span> favoritmu.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/55 text-pretty">
            Akses Netflix, ChatGPT, Canva, GitHub Copilot dan 16+ produk
            digital lainnya — aktivasi cepat, harga terbaik di Indonesia.
          </p>
        </div>
      </div>

      {/* Middle: stats counter */}
      <StatsCounter />

      {/* Bottom: live activity feed + payment strip */}
      <div className="space-y-5">
        <LiveActivityFeed />
        <PaymentStrip />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats counter (animates in once)                                          */
/* -------------------------------------------------------------------------- */

function StatsCounter() {
  return (
    <div className="my-10 grid grid-cols-3 gap-3">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md"
        >
          <div className="text-2xl font-black tracking-tight text-white">
            {stat.value}
          </div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/45">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Live activity feed                                                        */
/* -------------------------------------------------------------------------- */

function LiveActivityFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ACTIVITY_FEED.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const current = ACTIVITY_FEED[index];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            Aktivitas live
          </span>
        </div>
        <span className="text-[10px] text-white/40">Real-time</span>
      </div>

      <div className="relative h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 flex items-center gap-3"
          >
            <ProductIcon slug={current.slug} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-white">
                  {current.name}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                  <CheckCircle2 className="h-2 w-2" />
                  AKTIF
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-white/45">
                Diaktifkan {current.ago}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Payment strip                                                             */
/* -------------------------------------------------------------------------- */

function PaymentStrip() {
  return (
    <div>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
        Pembayaran aman via
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PAYMENT_METHODS.map((m) => (
          <span
            key={m}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/60"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile-only product strip                                                 */
/* -------------------------------------------------------------------------- */

function MobileProductStrip() {
  const products = ["chatgpt-plus", "netflix", "canva", "spotify", "github-copilot-pro", "discord-nitro"];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3 backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
          Akses produk premium
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Online
        </span>
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((slug) => (
          <div key={slug} className="shrink-0">
            <ProductIcon slug={slug} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Right panel: form                                                         */
/* -------------------------------------------------------------------------- */

function FormPanel({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="relative flex flex-col p-6 sm:p-8 lg:p-10">
      {/* Mobile-only brand + product strip */}
      <div className="mb-5 lg:hidden">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 self-start text-base font-bold"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="gradient-text">Nebuna Store</span>
        </Link>

        <MobileProductStrip />
      </div>

      <ModeSwitcher mode={mode} setMode={setMode} />

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === "login" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 16 : -16 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>
      </div>

      <SocialDivider />
      <SocialLogin />

      {/* Bottom helper text */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm">
        <div className="text-white/55">
          {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            {mode === "login" ? "Daftar Akun" : "Masuk di sini"}
          </button>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70"
        >
          <ArrowLeft className="h-3 w-3" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mode switcher (Masuk / Daftar tabs)                                       */
/* -------------------------------------------------------------------------- */

function ModeSwitcher({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const tabs: Array<{ key: Mode; label: string; subtitle: string }> = [
    { key: "login", label: "Masuk", subtitle: "Akses akunmu" },
    { key: "register", label: "Daftar", subtitle: "Buat akun baru" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
        {mode === "login" ? (
          <>
            Selamat datang <span className="gradient-text">kembali</span>
          </>
        ) : (
          <>
            Mulai dengan <span className="gradient-text">Nebuna</span>
          </>
        )}
      </h1>
      <p className="mt-1.5 text-sm text-white/55">
        {mode === "login"
          ? "Lanjutkan akses ke dashboard pesananmu."
          : "Daftar gratis dan dapatkan akses ke 16+ produk premium."}
      </p>

      <div className="mt-6 flex gap-1 rounded-2xl border border-white/10 bg-white/[0.025] p-1">
        {tabs.map((tab) => {
          const active = tab.key === mode;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setMode(tab.key)}
              aria-selected={active}
              role="tab"
              className="relative flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="mode-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 shadow-lg shadow-cyan-500/25"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  active ? "text-white" : "text-white/55 hover:text-white/80"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form state & helpers                                                      */
/* -------------------------------------------------------------------------- */

type FormErrors = {
  formError?: string;
  fieldErrors?: Record<string, string[]>;
};

function useAuthCallbackUrl() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  // Allow only same-origin paths
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return "/dashboard";
}

/* -------------------------------------------------------------------------- */
/*  Login form                                                                */
/* -------------------------------------------------------------------------- */

function LoginForm() {
  const router = useRouter();
  const callbackUrl = useAuthCallbackUrl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setErrors({
          formError: result.formError,
          fieldErrors: result.fieldErrors,
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      <FloatField
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={<Mail className="h-4 w-4" />}
        value={email}
        onChange={setEmail}
        error={errors.fieldErrors?.email?.[0]}
        autoComplete="email"
        autoFocus
        required
      />

      <PasswordField
        id="password"
        name="password"
        label="Password"
        value={password}
        onChange={setPassword}
        show={showPassword}
        toggleShow={() => setShowPassword((s) => !s)}
        error={errors.fieldErrors?.password?.[0]}
        autoComplete="current-password"
        required
      />

      <FormErrorBanner message={errors.formError} />

      <div className="flex items-center justify-between pt-1 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-white/65 select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-white/15 bg-white/5 accent-cyan-500"
          />
          Ingat saya
        </label>
        <Link
          href="/forgot-password"
          className="text-cyan-400 transition-colors hover:text-cyan-300"
        >
          Lupa password?
        </Link>
      </div>

      <SubmitButton label="Masuk" pending={pending} pendingLabel="Memverifikasi..." />
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Register form                                                             */
/* -------------------------------------------------------------------------- */

function RegisterForm() {
  const router = useRouter();
  const callbackUrl = useAuthCallbackUrl();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await registerAction(formData);
      if (result.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setErrors({
          formError: result.formError,
          fieldErrors: result.fieldErrors,
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      <FloatField
        id="name"
        name="name"
        type="text"
        label="Nama Lengkap"
        icon={<User className="h-4 w-4" />}
        value={name}
        onChange={setName}
        error={errors.fieldErrors?.name?.[0]}
        autoComplete="name"
        autoFocus
        required
      />

      <FloatField
        id="reg-email"
        name="email"
        type="email"
        label="Email"
        icon={<Mail className="h-4 w-4" />}
        value={email}
        onChange={setEmail}
        error={errors.fieldErrors?.email?.[0]}
        autoComplete="email"
        required
      />

      <PasswordField
        id="reg-password"
        name="password"
        label="Password"
        value={password}
        onChange={setPassword}
        show={showPassword}
        toggleShow={() => setShowPassword((s) => !s)}
        error={errors.fieldErrors?.password?.[0]}
        autoComplete="new-password"
        required
      />

      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        label="Konfirmasi Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        show={showPassword}
        toggleShow={() => setShowPassword((s) => !s)}
        error={errors.fieldErrors?.confirmPassword?.[0]}
        autoComplete="new-password"
        required
      />

      <PasswordStrengthBar password={password} />

      <FormErrorBanner message={errors.formError} />

      <p className="text-[11px] leading-relaxed text-white/45">
        Dengan mendaftar, kamu menyetujui{" "}
        <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
          Syarat &amp; Ketentuan
        </Link>{" "}
        dan{" "}
        <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
          Kebijakan Privasi
        </Link>
        .
      </p>

      <SubmitButton label="Buat Akun" pending={pending} pendingLabel="Mendaftarkan..." />
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form error banner                                                         */
/* -------------------------------------------------------------------------- */

function FormErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-200"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
      <span>{message}</span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating-label text field                                                 */
/* -------------------------------------------------------------------------- */

function FloatField({
  id,
  name,
  type,
  label,
  icon,
  value,
  onChange,
  error,
  autoComplete,
  autoFocus,
  required,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <div
        className={`float-input ${
          error ? "[&>input]:border-red-500/50 [&>input]:bg-red-500/[0.04]" : ""
        }`}
      >
        <input
          id={id}
          name={name}
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="field-icon">{icon}</span>
        <label htmlFor={id}>{label}</label>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 ml-1 text-[11px] font-medium text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Password field (with show/hide toggle)                                    */
/* -------------------------------------------------------------------------- */

function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  show,
  toggleShow,
  error,
  autoComplete,
  required,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  toggleShow: () => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <div
        className={`float-input ${
          error ? "[&>input]:border-red-500/50 [&>input]:bg-red-500/[0.04]" : ""
        }`}
      >
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{ paddingRight: "2.75rem" }}
        />
        <span className="field-icon">
          <Lock className="h-4 w-4" />
        </span>
        <label htmlFor={id}>{label}</label>
        <button
          type="button"
          onClick={toggleShow}
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-md p-1 text-white/45 transition-colors hover:bg-white/5 hover:text-white"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 ml-1 text-[11px] font-medium text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Password strength bar                                                     */
/* -------------------------------------------------------------------------- */

function PasswordStrengthBar({ password }: { password: string }) {
  const { score, label, color } = useMemo(() => calculateStrength(password), [
    password,
  ]);

  if (!password) {
    return (
      <div className="flex items-center gap-2 text-[11px] text-white/35">
        <ShieldCheck className="h-3 w-3" />
        Minimal 8 karakter, kombinasi huruf &amp; angka.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-white/55">Kekuatan password</span>
        <span className={`font-semibold ${color.text}`}>{label}</span>
      </div>
      <div className="mt-1.5 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i < score ? color.bar : "bg-white/8"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function calculateStrength(pw: string): {
  score: number;
  label: string;
  color: { text: string; bar: string };
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) {
    return {
      score: 1,
      label: "Lemah",
      color: { text: "text-red-300", bar: "bg-red-400" },
    };
  }
  if (score === 2) {
    return {
      score: 2,
      label: "Cukup",
      color: { text: "text-amber-300", bar: "bg-amber-400" },
    };
  }
  if (score === 3) {
    return {
      score: 3,
      label: "Kuat",
      color: { text: "text-cyan-300", bar: "bg-cyan-400" },
    };
  }
  return {
    score: 4,
    label: "Sangat Kuat",
    color: { text: "text-emerald-300", bar: "bg-emerald-400" },
  };
}

/* -------------------------------------------------------------------------- */
/*  Submit button (animated gradient)                                         */
/* -------------------------------------------------------------------------- */

function SubmitButton({
  label,
  pending,
  pendingLabel,
}: {
  label: string;
  pending?: boolean;
  pendingLabel?: string;
}) {
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={pending ? undefined : { scale: 1.01 }}
      whileTap={pending ? undefined : { scale: 0.985 }}
      className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 gradient-shimmer transition-shadow hover:shadow-xl hover:shadow-cyan-500/45 disabled:cursor-not-allowed disabled:opacity-75"
    >
      {pending ? (
        <>
          <Loader2 className="relative z-10 h-4 w-4 animate-spin" />
          <span className="relative z-10">{pendingLabel ?? "Memproses..."}</span>
        </>
      ) : (
        <>
          <span className="relative z-10">{label}</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Social divider                                                            */
/* -------------------------------------------------------------------------- */

function SocialDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-[11px] text-white/35">
      <div className="h-px flex-1 bg-white/10" />
      <span className="font-medium uppercase tracking-wider">atau lanjutkan dengan</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Social login grid (2x2 with brand icons)                                  */
/* -------------------------------------------------------------------------- */

function SocialLogin() {
  const providers = [
    {
      key: "google",
      label: "Google",
      hover: "hover:border-white/30 hover:bg-white/[0.06]",
      icon: <GoogleIcon className="h-4 w-4" />,
    },
    {
      key: "discord",
      label: "Discord",
      hover: "hover:border-indigo-400/40 hover:bg-indigo-500/10",
      icon: <DiscordIcon className="h-4 w-4 text-indigo-300" />,
    },
    {
      key: "github",
      label: "GitHub",
      hover: "hover:border-white/30 hover:bg-white/[0.06]",
      icon: <GithubIcon className="h-4 w-4 text-white" />,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {providers.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => signIn(p.key, { callbackUrl: "/dashboard" })}
            title="OAuth aktif jika environment provider sudah dikonfigurasi"
            className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold text-white/80 transition-all ${p.hover}`}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-center text-[11px] text-white/35">
        OAuth Google/Discord/GitHub aktif setelah env provider di-set.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Brand icons (inline SVG — lucide v1 doesn't ship these)                   */
/* -------------------------------------------------------------------------- */

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.74-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.49l2.63-2.54C16.84 3.36 14.65 2.4 12 2.4 6.78 2.4 2.6 6.58 2.6 11.8s4.18 9.4 9.4 9.4c5.43 0 9.02-3.81 9.02-9.18 0-.62-.07-1.09-.16-1.56H12z"
      />
      <path
        fill="#34A853"
        d="M3.86 7.55l3.21 2.36C7.94 7.91 9.81 6.5 12 6.5c1.88 0 3.14.8 3.86 1.49l2.63-2.54C16.84 3.36 14.65 2.4 12 2.4c-3.6 0-6.7 2.06-8.14 5.15z"
        opacity="0.9"
      />
      <path
        fill="#FBBC04"
        d="M12 21.2c2.61 0 4.79-.86 6.39-2.34l-3.05-2.49c-.84.59-1.96 1-3.34 1-2.57 0-4.74-1.73-5.51-4.06l-3.18 2.45C4.74 19.16 8.07 21.2 12 21.2z"
      />
      <path
        fill="#4285F4"
        d="M21.02 12.02c0-.62-.07-1.09-.16-1.56H12v3.9h5.5c-.21 1.21-1.36 3.04-3.5 3.78l3.05 2.49c1.83-1.7 2.97-4.21 2.97-8.61z"
      />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.07.07 0 00-.07.035c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.7 12.7 0 00-.617-1.25.077.077 0 00-.07-.035 19.74 19.74 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.954-2.419 2.156-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.18 1.18A11.1 11.1 0 0112 6.02c.98 0 1.96.13 2.88.38 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.07.79 2.16v3.15c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
