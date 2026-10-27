import type { Plan, PlanId, UniOfferContent } from "@/components/_shared/plans";

// Plan copy, one object per language: en = the English landing page, de = the German plan cards. Prices follow
// sooner.de: monthly 7.99, yearly 59.95 (the highlighted card), Plus 14.95 (the only plan with 3 rentals), UNI 5.99.

export const plansEn: Record<PlanId, Plan> = {
  monthly: {
    id: "monthly",
    name: "Monthly",
    price: "€7.99",
    period: "month",
    badge: "Flexible",
    checkoutBadge: "7 Days Free Trial",
    features: ["7-day free trial", "Cancel anytime"],
    cta: "CHOOSE MONTHLY",
    highlighted: false,
  },
  yearly: {
    id: "yearly",
    name: "Yearly",
    price: "€59.95",
    period: "year",
    badge: "Save 38%",
    checkoutBadge: "Save 38%",
    features: ["Pay once, enjoy Sooner for 12 months", "38% less than the monthly subscription"],
    cta: "CHOOSE YEARLY",
    highlighted: true,
  },
  plus: {
    id: "plus",
    name: "Sooner Plus",
    price: "€14.95",
    period: "month",
    badge: "+3 Rentals",
    checkoutBadge: "+3 Rentals",
    features: ["Unlimited subscription streaming", "3 rental films included every month"],
    cta: "CHOOSE SOONER PLUS",
    highlighted: false,
  },
};

export const plansDe: Record<PlanId, Plan> = {
  monthly: {
    id: "monthly",
    name: "Monatsabo",
    price: "7,99 €",
    period: "Monat",
    badge: "Flexibel",
    checkoutBadge: "7 Tage gratis",
    features: ["7 Tage kostenlos testen", "Monatlich kündbar"],
    cta: "MONATSABO WÄHLEN",
    highlighted: false,
  },
  yearly: {
    id: "yearly",
    name: "Jahresabo",
    price: "59,95 €",
    period: "Jahr",
    badge: "38 % sparen",
    checkoutBadge: "38 % sparen",
    features: ["Einmal zahlen, 12 Monate Sooner", "38 % günstiger als das Monatsabo"],
    cta: "JAHRESABO WÄHLEN",
    highlighted: true,
  },
  plus: {
    id: "plus",
    name: "Plus-Abo",
    price: "14,95 €",
    period: "Monat",
    badge: "+3 Leihen",
    checkoutBadge: "+3 Leihen",
    features: ["Unbegrenzt Filme im Abo streamen", "3 Leihfilme pro Monat inklusive"],
    cta: "PLUS-ABO WÄHLEN",
    highlighted: false,
  },
};

/** The plans in display order (monthly, yearly, plus), as SubscriptionPlans takes them. */
export const planList = (plans: Record<PlanId, Plan>): Plan[] => [plans.monthly, plans.yearly, plans.plus];

export const uniOfferEn: UniOfferContent = {
  title: "UNI",
  lead: "Are you a student? Get Sooner UNI for €5.99 / month.",
  detail: "7-day free trial · Flatshare-friendly: stream on up to 4 screens at the same time.",
  // The EN landing page still shows the German "UNI WÄHLEN"; this follows the other EN plan CTAs.
  cta: "CHOOSE UNI",
};

export const uniOfferDe: UniOfferContent = {
  title: "UNI",
  lead: "Du studierst? Sooner UNI für 5,99 € / Monat.",
  detail: "7 Tage kostenlos testen · WG-freundlich: auf bis zu 4 Screens gleichzeitig streamen.",
  cta: "UNI WÄHLEN",
};
