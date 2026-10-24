import type { Metadata } from "next";
import { AuthScreen } from "@/screens/AuthScreen";

export const metadata: Metadata = { title: "Konto erstellen · Sooner" };

export default function SignupPage() {
  return <AuthScreen defaultMode="signup" product="monthly" locale="de" />;
}
