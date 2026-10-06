import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import Script from "next/script";

import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="pt-BR" className={`${nunito.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-20 md:pb-0">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T2RWDDHK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T2RWDDHK');`}
        </Script>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
