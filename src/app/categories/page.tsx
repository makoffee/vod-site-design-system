import type { Metadata } from "next";
import { CategoriesScreen } from "@/screens/CategoriesScreen";

export const metadata: Metadata = { title: "Genre · Sooner" };

export default function CategoriesPage() {
  return <CategoriesScreen locale="de" />;
}
