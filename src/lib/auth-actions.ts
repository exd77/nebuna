"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { db, users } from "@/db";
import { loginSchema, registerSchema } from "@/lib/auth-schema";

/* -------------------------------------------------------------------------- */
/*  Result types                                                              */
/* -------------------------------------------------------------------------- */

export type ActionResult =
  | { ok: true }
  | {
      ok: false;
      formError?: string;
      fieldErrors?: Record<string, string[]>;
    };

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function flatten(formData: FormData) {
  const out: Record<string, FormDataEntryValue> = {};
  formData.forEach((value, key) => {
    out[key] = value;
  });
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Login action — calls NextAuth Credentials provider                        */
/* -------------------------------------------------------------------------- */

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { ok: false, formError: "Email atau password salah." };
      }
      return { ok: false, formError: "Terjadi kesalahan saat login." };
    }
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*  Register action — creates user, then signs them in                        */
/* -------------------------------------------------------------------------- */

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return {
      ok: false,
      formError: "Email sudah terdaftar. Silakan masuk.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  });

  // Auto-login after successful registration
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        ok: false,
        formError: "Akun berhasil dibuat — silakan login secara manual.",
      };
    }
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*  Logout action                                                             */
/* -------------------------------------------------------------------------- */

export async function logoutAction(): Promise<void> {
  const { signOut } = await import("@/auth");
  await signOut({ redirectTo: "/" });
}
