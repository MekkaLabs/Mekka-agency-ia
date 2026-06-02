import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_TITLE = "Mekka Labs — IA aplicada à operação de empresas reais";
const SITE_DESC =
  "Instalamos uma camada de IA que atende, qualifica, vende e organiza a operação de escritórios B2B. Pare de perder cliente porque ninguém responde a tempo.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s — Mekka Labs",
  },
  description: SITE_DESC,
  metadataBase: new URL("https://agenciamekka.com.br"),
  applicationName: "Mekka Labs",
  keywords: [
    "agência de IA",
    "IA para empresas",
    "atendimento com IA",
    "automação de atendimento",
    "IA no WhatsApp",
    "qualificação de leads",
    "CRM com IA",
    "operação comercial",
    "escritório B2B",
  ],
  authors: [{ name: "Mekka Labs" }],
  creator: "Mekka Labs",
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "https://agenciamekka.com.br",
    siteName: "Mekka Labs",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative antialiased">{children}</body>
    </html>
  );
}
