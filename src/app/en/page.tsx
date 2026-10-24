import type { Metadata } from "next";
import { getLanding } from "@/content/landing";
import { LandingScreen } from "@/screens/LandingScreen";

export const metadata: Metadata = { title: "Sooner · Curated Cinema" };

export default function HomeEn() {
  return <LandingScreen locale="en" content={getLanding("en")} />;
}
