import type { Metadata } from "next";
import { getCatalog } from "@/content/catalog";
import { ChannelsScreen } from "@/screens/ChannelsScreen";

export const metadata: Metadata = { title: "Kanäle · Sooner" };

export default function ChannelsPage() {
  return <ChannelsScreen locale="de" catalog={getCatalog("de")} />;
}
