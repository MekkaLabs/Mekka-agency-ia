import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mekka Labs",
  description: "Mekka Labs — work in progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
