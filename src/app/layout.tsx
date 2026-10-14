import type { Metadata, Viewport } from "next";
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
import { ThemeProvider, themeInitScript } from "@/lib/theme";

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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.VERCEL
  ? "https://curriarch.com/"
  : "https://artkelmendi.github.io/curri-architect/";
const shareImage = `${siteUrl}images/share-preview-architects.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Curri Architects — Independent Architecture Practice",
    template: "%s — Curri Architects",
  },
  description:
    "Curri Architects is an independent architecture practice in Prishtina designing residential, commercial and cultural spaces with honesty, proportion and light.",
  openGraph: {
    type: "website",
    siteName: "Curri Architects",
    title: "Curri Architects — Space, Light & Form",
    description: "Independent architecture. Considered spaces, material and light.",
    images: [{ url: shareImage, width: 1200, height: 630, alt: "Curri Architects — original studio logo and AS residential interior" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curri Architects — Space, Light & Form",
    description: "Independent architecture. Considered spaces, material and light.",
    images: [shareImage],
  },
};

// Requested mobile zoom restriction; Safari can retain accessibility zoom.
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false,
  viewportFit: "cover", interactiveWidget: "resizes-content",
  themeColor: [{media:"(prefers-color-scheme: dark)",color:"#0a0a0a"},{media:"(prefers-color-scheme: light)",color:"#f4f1ea"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${grotesk.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="flex min-h-full flex-col"
        style={{ ["--logo-grid-bg" as string]: `url("${basePath}/images/curr-background.svg")` }}
      >
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
