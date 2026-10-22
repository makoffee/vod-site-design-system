import type { Metadata } from "next";
import { OnboardingScreen } from "@/screens/OnboardingScreen";

export const metadata: Metadata = { title: "Choose a plan · Sooner" };

export default function SubscribePageEn() {
  return <OnboardingScreen locale="en" />;
}
