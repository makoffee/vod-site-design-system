import type { Metadata } from "next";
import { DiscoverScreen } from "@/screens/DiscoverScreen";

export const metadata: Metadata = { title: "Entdecken · Sooner" };

export default function DiscoverPage() {
  return <DiscoverScreen locale="de" />;
}
