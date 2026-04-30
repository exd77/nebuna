import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { auth } from "@/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nebuna Store — Langganan Digital Premium Indonesia",
  description:
    "Akses Netflix, ChatGPT Plus, Canva, GitHub Copilot, dan tools premium lainnya. Aktivasi cepat, garansi replacement, dan support 24/7.",
  openGraph: {
    title: "Nebuna Store — Langganan Digital Premium Indonesia",
    description:
      "Akses Netflix, ChatGPT Plus, Canva, GitHub Copilot, dan tools premium lainnya. Aktivasi cepat, garansi replacement, dan support 24/7.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} min-h-screen`}>
        <SessionProvider session={session}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
