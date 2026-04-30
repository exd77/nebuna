import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible NextAuth config — no DB driver, no bcrypt.
 *
 * This is the minimal config consumed by `proxy.ts` (Next.js 16 middleware).
 * The full config in `src/auth.ts` extends this and adds the Drizzle adapter
 * and the Credentials provider with password verification.
 */
export default {
  pages: {
    signIn: "/login",
  },
  providers: [],
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/dashboard", "/account", "/checkout", "/orders"];
      const isProtected = protectedPaths.some((p) =>
        nextUrl.pathname.startsWith(p),
      );

      if (isProtected && !isLoggedIn) {
        const url = new URL("/login", nextUrl);
        url.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(url);
      }

      // If already logged in and on /login, redirect to /dashboard
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
