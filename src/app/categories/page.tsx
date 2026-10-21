import type { Metadata } from "next";
import { CategoriesScreen } from "@/screens/CategoriesScreen";

export const metadata: Metadata = { title: "Kategorien · Sooner" };

export default function CategoriesPage() {
  return <CategoriesScreen />;
}
