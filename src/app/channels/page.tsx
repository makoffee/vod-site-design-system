import type { Metadata } from "next";
import { ChannelsScreen } from "@/screens/ChannelsScreen";

export const metadata: Metadata = { title: "Kanäle · Sooner" };

export default function ChannelsPage() {
  return <ChannelsScreen locale="de" />;
}
