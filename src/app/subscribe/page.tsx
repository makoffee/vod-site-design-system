import type { Metadata } from "next";
import { OnboardingScreen } from "@/screens/OnboardingScreen";

export const metadata: Metadata = { title: "Abo wählen · Sooner" };

export default function SubscribePage() {
  return <OnboardingScreen locale="de" />;
}
