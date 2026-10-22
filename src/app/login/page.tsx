import type { Metadata } from "next";
import { AuthScreen } from "@/screens/AuthScreen";

export const metadata: Metadata = { title: "Anmelden · Sooner" };

export default function LoginPage() {
  return <AuthScreen />;
}
