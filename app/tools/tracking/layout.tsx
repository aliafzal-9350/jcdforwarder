import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Track Your Cargo & Express Shipments",
  description:
    "Enter your tracking code or waybill number to see live updates from factory pickup in China all the way to final delivery at your door.",
  path: "/tools/tracking",
});

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
