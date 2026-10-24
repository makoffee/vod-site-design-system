import type { Metadata } from "next";
import { SearchScreen } from "@/screens/SearchScreen";

export const metadata: Metadata = { title: "Suche · Sooner" };

export default function SearchPage() {
  return <SearchScreen locale="de" />;
}
