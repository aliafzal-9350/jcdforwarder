import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/siteConfig";
import { QuoteModalProvider } from "@/components/quote/QuoteModalContext";
import { QuoteWizardModal } from "@/components/quote/QuoteWizardModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.shortName} | China DDP Freight Forwarding & NVOCC Carrier`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.shortName} | Verified China Freight Forwarder & NVOCC Carrier`,
    description: SITE_CONFIG.description,
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
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <QuoteModalProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <QuoteWizardModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
