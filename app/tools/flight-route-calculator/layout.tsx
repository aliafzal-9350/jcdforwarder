import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Air Freight Distance & Flight Route Calculator",
  description:
    "Calculate great-circle flight distances, airborne cruising hours, and airport-to-airport transit schedules for air freight routes out of China.",
  path: "/tools/flight-route-calculator",
});

export default function FlightRouteCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
