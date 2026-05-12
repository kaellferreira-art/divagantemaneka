import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = getSiteUrl();
const metadataBase = new URL(siteUrl);

const titleDefault = "Kaell Ferreira | Músico ao vivo em Florianópolis";
const description =
  "Kaell Ferreira — músico em Florianópolis (SC). Música ao vivo para restaurantes, bares, eventos corporativos e privados: voz e violão, duo ou banda. Espetáculos Brasilidades, Forró da Cacaiada e Nutrir e Florescer.";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: titleDefault,
    template: "%s | Kaell Ferreira",
  },
  description,
  applicationName: "Kaell Ferreira",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Kaell Ferreira",
    title: titleDefault,
    description,
    images: [
      {
        url: "/images/Kaell Ferreira.png",
        width: 1200,
        height: 1200,
        alt: "Kaell Ferreira — músico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/images/Kaell Ferreira.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${quicksand.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
