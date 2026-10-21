import type { Locale } from "./locale";

// Plan copy per locale. en = "Landing Page EN | 1440w" (4 Sooner DE Marketing Pages); de = the PlanCard/ProductCard
// masters as they shipped. Business rules (DESIGN-SYSTEM.md): monthly 7.99, yearly 59.95 (the highlighted card),
// Plus 14.95 (the only plan with 3 rentals), UNI 5.99. The EN landing page shows €59.99 / €14.99; prices here follow
// the business rules until that is confirmed.

export type PlanId = "monthly" | "yearly" | "plus";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  /** Pill on PlanCard. */
  badge: string;
  /** Pill on the checkout ProductCard. */
  checkoutBadge: string;
  features: string[];
  /** CTA label exactly as written in the design (uppercase in the copy itself). */
  cta: string;
  highlighted: boolean;
}

export const plansByLocale: Record<Locale, Record<PlanId, Plan>> = {
  en: {
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
  },
  de: {
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
  },
};

/** English plans (the default locale). */
export const plans = plansByLocale.en;

export const uniOfferByLocale: Record<Locale, { title: string; lead: string; detail: string; cta: string }> = {
  en: {
    title: "UNI",
    lead: "Are you a student? Get Sooner UNI for €5.99 / month.",
    detail: "7-day free trial · Flatshare-friendly: stream on up to 4 screens at the same time.",
    // The EN landing page still shows the German "UNI WÄHLEN"; this follows the other EN plan CTAs.
    cta: "CHOOSE UNI",
  },
  de: {
    title: "UNI",
    lead: "Du studierst? Sooner UNI für 5,99 € / Monat.",
    detail: "7 Tage kostenlos testen · WG-freundlich: auf bis zu 4 Screens gleichzeitig streamen.",
    cta: "UNI WÄHLEN",
  },
};
