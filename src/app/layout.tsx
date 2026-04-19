import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";

const ibmPlexArabic = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-arabic-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ibm-plex-arabic-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ibm-plex-arabic-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/ibm-plex-arabic-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/jetbrains-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/jetbrains-mono-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/jetbrains-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  title: "gioco ads — لوحة الإعلانات الموحّدة",
  description:
    "منصة موحّدة لإدارة إعلانات Snap وTikTok وInstagram من لوحة واحدة",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="light"
      data-accent="violet"
      className={`${ibmPlexArabic.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
