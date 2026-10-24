import type { Metadata } from "next";
import { NotFoundScreen } from "@/screens/StatusScreens";

export const metadata: Metadata = { title: "Seite nicht gefunden · Sooner" };

export default function NotFound() {
  return <NotFoundScreen />;
}
