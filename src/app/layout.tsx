import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://udayxxkumar.github.io/zerotrace"),
  title: {
    default: "zerotrace",
    template: "%s | zerotrace",
  },
  description: "Anonymous infosec notes and exploits. No footprints left.",
  openGraph: {
    title: "zerotrace",
    description: "Anonymous infosec notes and exploits. No footprints left.",
    url: "/",
    siteName: "zerotrace",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased bg-[#0b0b0c] text-zinc-200`}> 
        <div className="relative min-h-dvh overflow-x-hidden bg-app">
          <Header />
          <main className="relative">
            {children}
          </main>
          <footer className="relative border-t border-zinc-800/60 py-10 text-center text-sm text-zinc-400">
            © 2025 zerotrace — Professional cybersecurity insights. Powered by Next.js + Tailwind CSS
          </footer>
        </div>
      </body>
    </html>
  );
}
