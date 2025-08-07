import type { Metadata } from "next";
import { Geist, Geist_Mono, Dela_Gothic_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const delaGothicOne = Dela_Gothic_One({
  variable: "--font-dela-gothic-one",
  subsets: ["latin"],
  weight: "400", // Dela Gothic One sadece 400 ağırlığında gelir
});

export const metadata: Metadata = {
  title: "Stashtoken - Modern Token Management",
  description: "Stashtoken ile token yönetimini kolaylaştırın. Modern ve güvenli çözümler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${delaGothicOne.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
