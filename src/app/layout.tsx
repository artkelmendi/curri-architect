import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollFrame from "@/components/ScrollFrame";
import LogoGrid from "@/components/LogoGrid";
import { LanguageProvider } from "@/lib/i18n";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Curri Architect — Independent Architecture Practice",
    template: "%s — Curri Architect",
  },
  description:
    "Curri Architect is an independent architecture practice in Prishtina designing residential, commercial and cultural spaces with honesty, proportion and light.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <LogoGrid />
          <ScrollFrame />
          <Preloader />
          <SmoothScroll />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
