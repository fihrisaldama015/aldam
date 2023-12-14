import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { sfprodisplay } from "@/fonts/font";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aldam | Personal Website",
  description: "Aldam's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sfprodisplay.className}>{children}</body>
    </html>
  );
}
