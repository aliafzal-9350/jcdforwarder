import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China DDP Shipping: Frictionless Door-to-Door Delivery",
  description:
    "JCD Forwarder's Delivered Duty Paid (DDP) shipping from China: all-inclusive door-to-door freight with duties, taxes, and customs clearance prepaid.",
  path: "/services/ddp-shipping",
});

export default function DdpShippingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
