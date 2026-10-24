import type { Metadata } from "next";
import { getLanding } from "@/content/landing";
import { LandingScreen } from "@/screens/LandingScreen";

export const metadata: Metadata = { title: "Sooner · Curated Cinema" };

export default function Home() {
  return <LandingScreen locale="de" content={getLanding("de")} />;
}
