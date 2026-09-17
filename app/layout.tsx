import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/siteConfig";
import { LanguageProvider } from "@/context/LanguageContext";
import { QuoteModalProvider } from "@/components/quote/QuoteModalContext";
import { QuoteWizardModal } from "@/components/quote/QuoteWizardModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SupportChatWidget } from "@/components/chat/SupportChatWidget";
import { JsonLd, createOrganizationSchema, createWebsiteSchema } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ogImage = { url: `${SITE_CONFIG.url}/images/og-default.jpg`, width: 1200, height: 630, alt: SITE_CONFIG.shortName };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.shortName} | China DDP Freight Forwarding & NVOCC Carrier`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "China freight forwarder",
    "DDP shipping from China",
    "Amazon FBA first leg freight",
    "NVOCC GD20240307220907",
    "Shenzhen freight forwarder",
    "China air freight battery",
    "China sea freight FCL LCL",
    "China Europe railway express",
    "Shenzhen Jiechengda",
  ],
  authors: [{ name: SITE_CONFIG.credentials.legalNameEn }],
  creator: SITE_CONFIG.credentials.legalNameEn,
  publisher: SITE_CONFIG.credentials.legalNameEn,
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.shortName} | Verified China Freight Forwarder & NVOCC Carrier`,
    description: SITE_CONFIG.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.shortName} | Verified China Freight Forwarder & NVOCC Carrier`,
    description: SITE_CONFIG.description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", inter.variable, geistMono.variable)}>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <JsonLd schema={createOrganizationSchema()} />
        <JsonLd schema={createWebsiteSchema()} />
        <LanguageProvider>
          <QuoteModalProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <QuoteWizardModal />
            <SupportChatWidget />
          </QuoteModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
