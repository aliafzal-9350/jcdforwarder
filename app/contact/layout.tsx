import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact JCD Forwarder | Direct Dispatch & RFQ Desk",
  description:
    "Reach JCD Forwarder's 24/7 dispatch desk directly by WhatsApp, phone, or email for freight quotes, booking support, and customs questions.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
