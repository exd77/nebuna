"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { Suspense, useMemo, useState, useTransition, type ReactNode } from "react";

import ProductIcon from "@/components/ui/ProductIcon";
import { loginAction, registerAction } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";

type FormErrors = {
  formError?: string;
  fieldErrors?: Record<string, string[]>;
};

const socialProviders = [
  {
    id: "google",
    label: "Google",
    enabled: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true",
  },
  {
    id: "discord",
    label: "Discord",
    enabled: process.env.NEXT_PUBLIC_AUTH_DISCORD_ENABLED === "true",
  },
  {
    id: "github",
    label: "GitHub",
    enabled: process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true",
  },
] as const;

function useAuthCallbackUrl() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return "/dashboard";
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#151819]" />}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#151819] pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,106,61,0.18),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(255,242,71,0.06),transparent_20%),linear-gradient(180deg,#151819,#0d0f10_85%)]" />
      <div className="pointer-events-none absolute inset-0 nebuna-grid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0f10]/88 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <AuthShowcase />
          <AuthPanel mode={mode} setMode={setMode} />
        </div>
      </div>
    </section>
  );
}

function AuthShowcase() {
  return (
    <div className="relative hidden border-r border-white/10 p-10 lg:flex lg:flex-col lg:justify-between">
      <div>
        <Link href="/" className="inline-flex items-baseline gap-2">
          <span className="text-2xl font-black uppercase tracking-tight text-[#ff6a3d]">Nebuna</span>
          <span className="text-2xl font-black uppercase tracking-[0.12em] text-white">Store</span>
        </Link>

        <div className="mt-12 max-w-lg">
          <span className="nebuna-kicker">
            <Sparkles className="h-3.5 w-3.5" /> Account Access
          </span>
          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white">
            Login Cepat
            <br />
            Buat Checkout
            <br />
            Tanpa Ribet
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-zinc-300">
            Masuk untuk lanjut belanja Netflix, ChatGPT Plus, Canva, Copilot, dan digital tools premium lainnya dengan vibe marketplace yang cepat dan aman.
          </p>
        </div>
      </div>

      <div className="my-10 grid grid-cols-3 gap-3">
        {[
          { value: "10K+", label: "Order Aktif" },
          { value: "<5", label: "Menit Aktivasi" },
          { value: "24/7", label: "Support" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-300">Aktivitas live</span>
          </div>
          <div className="space-y-3">
            {[
              { slug: "chatgpt-plus", label: "ChatGPT Plus aktif" },
              { slug: "netflix", label: "Netflix order diproses" },
              { slug: "github-copilot-pro", label: "Copilot Pro dikirim" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 p-2.5">
                <ProductIcon slug={item.slug} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-[11px] text-zinc-500">Baru saja · realtime</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Pembayaran Aman</p>
          <div className="flex flex-wrap gap-2">
            {[
              "QRIS",
              "GoPay",
              "OVO",
              "DANA",
              "BCA",
              "Mandiri",
            ].map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-bold text-zinc-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthPanel({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff6a3d]">Nebuna Account</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-white">
            {mode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {mode === "login"
              ? "Masuk dulu biar bisa checkout, lihat order, dan lanjut ke payment QRIS."
              : "Daftar cepat untuk mulai belanja produk digital premium di Nebuna Store."}
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={cn(
            "rounded-xl px-4 py-3 text-sm font-black uppercase tracking-[0.12em] transition",
            mode === "login" ? "nebuna-tab-active" : "nebuna-tab-idle",
          )}
        >
          Masuk
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={cn(
            "rounded-xl px-4 py-3 text-sm font-black uppercase tracking-[0.12em] transition",
            mode === "register" ? "nebuna-tab-active" : "nebuna-tab-idle",
          )}
        >
          Daftar
        </button>
      </div>

      {mode === "login" ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-zinc-500">Provider login</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {socialProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              disabled={!provider.enabled}
              onClick={() => provider.enabled && signIn(provider.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm font-bold transition",
                provider.enabled
                  ? "border-white/10 bg-white/[0.03] text-white hover:border-[#ff6a3d]/40 hover:bg-[#ff6a3d]/10"
                  : "cursor-not-allowed border-white/8 bg-white/[0.02] text-zinc-500",
              )}
            >
              {provider.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const callbackUrl = useAuthCallbackUrl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.ok) {
        router.push(callbackUrl);
        router.refresh();
        return;
      }

      setErrors({
        formError: result.formError,
        fieldErrors: result.fieldErrors,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        label="Email"
        icon={<Mail className="h-4 w-4" />}
        error={errors.fieldErrors?.email?.[0]}
        autoComplete="email"
      />
      <PasswordField
        id="password"
        name="password"
        value={password}
        onChange={setPassword}
        label="Password"
        show={showPassword}
        toggle={() => setShowPassword((value) => !value)}
        error={errors.fieldErrors?.password?.[0]}
        autoComplete="current-password"
      />

      <ErrorBanner message={errors.formError} />

      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="inline-flex items-center gap-2 text-zinc-400">
          <ShieldCheck className="h-4 w-4 text-[#ff6a3d]" /> Aman & terenkripsi
        </span>
        <Link href="/forgot-password" className="text-[#ff8f67] transition hover:text-[#ff6a3d]">
          Lupa password?
        </Link>
      </div>

      <button type="submit" disabled={pending} className="nebuna-primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70">
        {pending ? "Memverifikasi..." : "Masuk Sekarang"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

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

  const passwordHint = useMemo(() => {
    if (!password) return "Minimal 8 karakter, kombinasi huruf dan angka.";
    const checks = [password.length >= 8, /[A-Za-z]/.test(password), /\d/.test(password)];
    const passed = checks.filter(Boolean).length;
    if (passed <= 1) return "Password masih lemah.";
    if (passed === 2) return "Password sudah lumayan oke.";
    return "Password terlihat kuat.";
  }, [password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result.ok) {
        router.push(callbackUrl);
        router.refresh();
        return;
      }

      setErrors({
        formError: result.formError,
        fieldErrors: result.fieldErrors,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={setName}
        label="Nama Lengkap"
        icon={<User className="h-4 w-4" />}
        error={errors.fieldErrors?.name?.[0]}
        autoComplete="name"
      />
      <Field
        id="register-email"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        label="Email"
        icon={<Mail className="h-4 w-4" />}
        error={errors.fieldErrors?.email?.[0]}
        autoComplete="email"
      />
      <PasswordField
        id="register-password"
        name="password"
        value={password}
        onChange={setPassword}
        label="Password"
        show={showPassword}
        toggle={() => setShowPassword((value) => !value)}
        error={errors.fieldErrors?.password?.[0]}
        autoComplete="new-password"
      />
      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={setConfirmPassword}
        label="Konfirmasi Password"
        show={showPassword}
        toggle={() => setShowPassword((value) => !value)}
        error={errors.fieldErrors?.confirmPassword?.[0]}
        autoComplete="new-password"
      />

      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
        <div className="flex items-center gap-2 text-[#ff9a76]">
          <Zap className="h-4 w-4" />
          <span className="font-semibold">{passwordHint}</span>
        </div>
      </div>

      <ErrorBanner message={errors.formError} />

      <p className="text-xs leading-6 text-zinc-500">
        Dengan mendaftar, kamu menyetujui <Link href="/terms" className="text-[#ff8f67] hover:text-[#ff6a3d]">Syarat &amp; Ketentuan</Link> dan <Link href="/privacy" className="text-[#ff8f67] hover:text-[#ff6a3d]">Kebijakan Privasi</Link> Nebuna Store.
      </p>

      <button type="submit" disabled={pending} className="nebuna-primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70">
        {pending ? "Mendaftarkan..." : "Buat Akun"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  type,
  value,
  onChange,
  label,
  icon,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  icon: ReactNode;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("nebuna-input", error && "border-red-400/40 bg-red-400/5")}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[11px] font-medium text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function PasswordField({
  id,
  name,
  value,
  onChange,
  label,
  show,
  toggle,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  show: boolean;
  toggle: () => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          <Lock className="h-4 w-4" />
        </span>
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("nebuna-input pr-12", error && "border-red-400/40 bg-red-400/5")}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[11px] font-medium text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm text-red-200">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
      <span>{message}</span>
    </div>
  );
}
