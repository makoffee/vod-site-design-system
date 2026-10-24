import type { Metadata } from "next";
import { getCatalog } from "@/content/catalog";
import { CategoriesScreen } from "@/screens/CategoriesScreen";

export const metadata: Metadata = { title: "Genre · Sooner" };

export default function CategoriesPage() {
  return <CategoriesScreen locale="de" catalog={getCatalog("de")} />;
}
