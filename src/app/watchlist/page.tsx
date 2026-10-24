import type { Metadata } from "next";
import { WatchlistScreen } from "@/screens/WatchlistScreen";

export const metadata: Metadata = { title: "Watchlist · Sooner" };

export default function WatchlistPage() {
  return <WatchlistScreen />;
}
