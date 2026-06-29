// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Archivo, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/common/JsonLd";
import {
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo/seo";
import { SITE, getSiteUrl } from "@/lib/site.config";

// Distinctive display + refined body pairing (not Inter/Roboto/Geist-sans)
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE.name} — ${SITE.shortTagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "Construcción",
  keywords: [
    "Sika Ecuador",
    "distribuidor Sika Guayaquil",
    "impermeabilizantes Ecuador",
    "Sikaflex",
    "morteros Sika",
    "aditivos para concreto",
    "materiales de construcción Guayaquil",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: getSiteUrl(),
    title: `${SITE.name} — ${SITE.shortTagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.shortTagline}`,
    description: SITE.description,
  },
  // Local SEO geotags (Guayaquil, Ecuador)
  other: {
    "geo.region": "EC-G",
    "geo.placename": "Guayaquil",
    "geo.position": `${SITE.address.latitude};${SITE.address.longitude}`,
    ICBM: `${SITE.address.latitude}, ${SITE.address.longitude}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-EC">
      <body
        className={`${archivo.variable} ${manrope.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
