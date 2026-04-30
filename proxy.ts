/**
 * Next.js 16 Proxy (formerly `middleware.ts`).
 *
 * Imports the EDGE-COMPATIBLE auth config only — no DB or bcrypt.
 * Database-bound auth logic lives in `src/auth.ts` and runs on Node.js.
 */
import NextAuth from "next-auth";
import authConfig from "./src/auth.config";

export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  // Run proxy on every route except static assets & Next internals
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
