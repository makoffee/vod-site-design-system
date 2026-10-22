import { SubscriptionPlans } from "@/components/SubscriptionPlans/SubscriptionPlans";
import type { Locale } from "@/components/_shared/locale";
import { AppShell } from "./AppShell";

export interface OnboardingScreenProps {
  locale?: Locale;
}

/**
 * Onboarding / plan picker (design "onboarding EN | 1440" / "onboarding DE | 1440" on 4 Sooner DE Marketing Pages,
 * production sooner.de/subscribe): the subscribe layout of SubscriptionPlans between Header and Footer.
 */
export function OnboardingScreen({ locale = "de" }: OnboardingScreenProps) {
  return (
    <AppShell locale={locale}>
      <SubscriptionPlans layout="subscribe" locale={locale} />
    </AppShell>
  );
}
