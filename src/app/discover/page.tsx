import type { Metadata } from "next";
import { DiscoverScreen } from "@/screens/DiscoverScreen";

export const metadata: Metadata = { title: "Discover · Sooner" };

export default function DiscoverPage() {
  return <DiscoverScreen />;
}
