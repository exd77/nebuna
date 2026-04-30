"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, MailCheck } from "lucide-react";

import { requestPasswordReset } from "@/lib/password-actions";

type Errors = { formError?: string; fieldErrors?: Record<string, string[]> };

export default function ForgotPasswordPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [devResetUrl, setDevResetUrl] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setDevResetUrl(undefined);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await requestPasswordReset(formData);
      if (result.ok) {
        setMessage(result.message);
        setDevResetUrl(result.devResetUrl);
      } else {
        setErrors({ formError: result.formError, fieldErrors: result.fieldErrors });
      }
    });
  }

  return (
    <section className="relative min-h-[70vh] overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Login
        </Link>
        <form onSubmit={onSubmit} className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
            <MailCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-black text-white">Reset password</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Masukkan email akun Nebuna Store. Kalau terdaftar, kami akan buat link reset password yang berlaku 30 menit.
          </p>

          <div className="mt-6 text-left">
            <label className="mb-2 block text-sm font-semibold text-white/75">Email akun</label>
            <input
              name="email"
              type="email"
              required
              placeholder="email@contoh.com"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/10"
            />
            {errors.fieldErrors?.email?.[0] && <p className="mt-1 text-xs text-red-300">{errors.fieldErrors.email[0]}</p>}
          </div>

          {errors.formError && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{errors.formError}</p>}
          {message && (
            <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {message}
              </div>
              {devResetUrl && (
                <Link href={devResetUrl} className="mt-3 block break-all text-cyan-200 underline underline-offset-4">
                  Dev reset link: {devResetUrl}
                </Link>
              )}
            </div>
          )}

          <button disabled={pending} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-70">
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Kirim Link Reset
          </button>
        </form>
      </div>
    </section>
  );
}
