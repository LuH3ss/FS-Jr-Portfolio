import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio 2026",
  description: "Next.js 14 + Express Fullstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* El Navbar es un Server Component que se renderiza arriba */}
        <Navbar />
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}