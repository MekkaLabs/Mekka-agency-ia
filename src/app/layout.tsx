import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mekka Labs | Growth, Creative & AI Systems",
  description:
    "Agencia de growth, criacao e sistemas de IA para posicionamento, vendas e operacao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
