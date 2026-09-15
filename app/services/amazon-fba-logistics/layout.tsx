import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Amazon FBA First-Leg Logistics & Prep Solutions",
  description:
    "JCD Forwarder's Amazon FBA first-leg logistics: carton labeling, CARP/ISA appointment booking, GMA/EPAL palletizing, and direct fulfillment center delivery.",
  path: "/services/amazon-fba-logistics",
});

export default function AmazonFbaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
