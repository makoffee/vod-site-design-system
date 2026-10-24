import type { Metadata } from "next";
import { getCatalog } from "@/content/catalog";
import { getEditorial } from "@/content/editorial";
import { DiscoverScreen } from "@/screens/DiscoverScreen";

export const metadata: Metadata = { title: "Entdecken · Sooner" };

export default function DiscoverPage() {
  return <DiscoverScreen locale="de" catalog={getCatalog("de")} editorial={getEditorial("de")} />;
}
