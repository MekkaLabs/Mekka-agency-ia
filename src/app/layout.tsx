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

export const metadata: Metadata = {
  title: "Mekka Labs — IA aplicada à operação de empresas reais",
  description:
    "Instalamos uma camada de IA que atende, qualifica, vende e organiza a operação de escritórios B2B. Pare de perder cliente porque ninguém responde a tempo.",
  metadataBase: new URL("https://agenciamekka.com.br"),
  openGraph: {
    title: "Mekka Labs — IA aplicada à operação de empresas reais",
    description:
      "Instalamos uma camada de IA que atende, qualifica, vende e organiza a operação de escritórios B2B.",
    type: "website",
    locale: "pt_BR",
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
