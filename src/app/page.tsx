import type { Metadata } from "next";
import { LandingScreen } from "@/screens/LandingScreen";

export const metadata: Metadata = { title: "Sooner · Curated Cinema" };

export default function Home() {
  return <LandingScreen locale="de" />;
}
