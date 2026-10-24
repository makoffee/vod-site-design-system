import { SubscriptionPlans } from "@/components/SubscriptionPlans/SubscriptionPlans";
import { planList, plansDe, uniOfferDe } from "@/content/plans";
import { subscriptionPlansSubscribeDe } from "@/i18n/de";
import type { Locale } from "@/i18n/locale";
import { AppShell } from "./AppShell";

export interface OnboardingScreenProps {
  locale?: Locale;
}

/**
 * Onboarding / plan picker (production sooner.de/subscribe): the subscribe layout of SubscriptionPlans between Header and Footer.
 */
export function OnboardingScreen({ locale = "en" }: OnboardingScreenProps) {
  return (
    <AppShell locale={locale}>
      <SubscriptionPlans
        layout="subscribe"
        {...(locale === "de" ? { ...subscriptionPlansSubscribeDe, plans: planList(plansDe), uni: uniOfferDe } : {})}
      />
    </AppShell>
  );
}
