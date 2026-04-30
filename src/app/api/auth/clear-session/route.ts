import { NextResponse } from "next/server";

const authCookieNames = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "authjs.callback-url",
  "__Secure-authjs.callback-url",
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
  "authjs.csrf-token",
  "__Host-authjs.csrf-token",
  "next-auth.csrf-token",
  "__Host-next-auth.csrf-token",
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirect") || "/login?session=cleared";
  const response = NextResponse.redirect(new URL(redirectTo, url.origin));

  for (const name of authCookieNames) {
    response.cookies.set(name, "", {
      expires: new Date(0),
      path: "/",
    });
  }

  return response;
}
