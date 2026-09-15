import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Global Shipping Routes | Direct DDP Delivery from China",
  description:
    "Browse JCD Forwarder's 44 China-to-world trade lane guides, covering transit times, customs thresholds, and DDP delivery options for every destination.",
  path: "/routes",
});

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
