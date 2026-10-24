import { SubscriptionPlans } from "@/components/SubscriptionPlans/SubscriptionPlans";
import { planList, plansDe, uniOfferDe } from "@/content/plans";
import { subscriptionPlansSubscribeDe } from "@/i18n/de";
import type { Locale } from "@/i18n/locale";
import type { PlanId } from "@/components/_shared/plans";
import { placeholderPlanImages } from "@/mocks/placeholder";
import { AppShell } from "./AppShell";

export interface OnboardingScreenProps {
  locale?: Locale;
  /** Plan card images; the placeholder still by default. The /subscribe routes pass {} (no plan artwork in production yet). */
  planImages?: Partial<Record<PlanId, string>>;
}

/**
 * Onboarding / plan picker (production sooner.de/subscribe): the subscribe layout of SubscriptionPlans between Header and Footer.
 */
export function OnboardingScreen({ locale = "en", planImages = placeholderPlanImages }: OnboardingScreenProps) {
  return (
    <AppShell locale={locale}>
      <SubscriptionPlans
        layout="subscribe"
        images={planImages}
        {...(locale === "de" ? { ...subscriptionPlansSubscribeDe, plans: planList(plansDe), uni: uniOfferDe } : {})}
      />
    </AppShell>
  );
}
