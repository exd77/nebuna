"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, LockKeyhole } from "lucide-react";

import { resetPassword } from "@/lib/password-actions";

type Errors = { formError?: string; fieldErrors?: Record<string, string[]> };

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setMessage("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await resetPassword(formData);
      if (result.ok) {
        setMessage(result.message);
      } else {
        setErrors({ formError: result.formError, fieldErrors: result.fieldErrors });
      }
    });
  }

  return (
    <section className="relative min-h-[70vh] overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 mesh-bg" />
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl sm:p-8">
          <input type="hidden" name="token" value={token} />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
            <LockKeyhole className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-black text-white">Buat password baru</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Password minimal 8 karakter dan wajib berisi huruf serta angka.
          </p>

          <div className="mt-6 space-y-4 text-left">
            <PasswordInput name="password" label="Password baru" error={errors.fieldErrors?.password?.[0]} />
            <PasswordInput name="confirmPassword" label="Konfirmasi password" error={errors.fieldErrors?.confirmPassword?.[0]} />
          </div>

          {errors.formError && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{errors.formError}</p>}
          {message && (
            <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {message}
              </div>
              <Link href="/login" className="mt-3 inline-flex text-cyan-200 underline underline-offset-4">
                Login sekarang
              </Link>
            </div>
          )}

          <button disabled={pending || !token} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70">
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Simpan Password Baru
          </button>
          {!token && <p className="mt-3 text-xs text-red-300">Token reset tidak ditemukan.</p>}
        </form>
      </div>
    </section>
  );
}

function PasswordInput({ name, label, error }: { name: string; label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/75">{label}</span>
      <input
        name={name}
        type="password"
        required
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/10"
      />
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
