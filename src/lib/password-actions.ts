"use server";

import bcrypt from "bcryptjs";
import { and, eq, gt, isNull } from "drizzle-orm";
import { createHash, randomBytes } from "crypto";

import { db, passwordResetTokens, users } from "@/db";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/auth-schema";

export type PasswordActionResult =
  | { ok: true; message: string; devResetUrl?: string }
  | {
      ok: false;
      formError?: string;
      fieldErrors?: Record<string, string[]>;
    };

function flatten(formData: FormData) {
  const out: Record<string, FormDataEntryValue> = {};
  formData.forEach((value, key) => {
    out[key] = value;
  });
  return out;
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function appUrl() {
  return (
    process.env.AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!process.env.RESEND_API_KEY) {
    console.info(`[Nebuna Store] Password reset link for ${email}: ${resetUrl}`);
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.PASSWORD_RESET_FROM || "Nebuna Store <noreply@nebunastore.com>",
      to: email,
      subject: "Reset password Nebuna Store",
      html: `<p>Click the link below to reset your Nebuna Store password.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 30 minutes.</p>`,
    }),
  });

  if (!response.ok) {
    console.error("Failed to send reset email", await response.text());
    return false;
  }

  return true;
}

export async function requestPasswordReset(
  formData: FormData,
): Promise<PasswordActionResult> {
  const parsed = forgotPasswordSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const genericMessage =
    "Kalau email terdaftar, link reset password akan dikirim atau muncul di mode development.";

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  if (!user?.email) {
    return { ok: true, message: genericMessage };
  }

  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const resetUrl = `${appUrl()}/reset-password?token=${encodeURIComponent(token)}`;

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  const sent = await sendPasswordResetEmail(user.email, resetUrl);

  return {
    ok: true,
    message: sent ? "Link reset password sudah dikirim ke email kamu." : genericMessage,
    devResetUrl: sent || process.env.NODE_ENV === "production" ? undefined : resetUrl,
  };
}

export async function resetPassword(
  formData: FormData,
): Promise<PasswordActionResult> {
  const parsed = resetPasswordSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const tokenHash = hashToken(parsed.data.token);
  const [record] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.tokenHash, tokenHash),
        gt(passwordResetTokens.expiresAt, new Date()),
        isNull(passwordResetTokens.usedAt),
      ),
    )
    .limit(1);

  if (!record) {
    return { ok: false, formError: "Link reset password tidak valid atau sudah kedaluwarsa." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await db.update(users).set({ passwordHash }).where(eq(users.id, record.userId));
  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, record.id));

  return { ok: true, message: "Password berhasil diubah. Silakan login ulang." };
}
