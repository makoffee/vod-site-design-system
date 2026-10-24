import type { Metadata } from "next";
import { WatchlistScreen } from "@/screens/WatchlistScreen";

export const metadata: Metadata = { title: "Meine Liste · Sooner" };

export default function WatchlistPage() {
  return <WatchlistScreen locale="de" />;
}
