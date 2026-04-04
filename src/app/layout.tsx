import type { Metadata } from "next";
import "./globals.css";
import { sfprodisplay } from "@/fonts/font";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Aldam | Personal Website",
  description: "Aldam's personal website",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sfprodisplay.className}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
