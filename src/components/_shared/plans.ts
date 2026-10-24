// Plan data shapes. The plan copy itself is content (src/content/plans.ts: plansEn, plansDe, uniOfferEn, uniOfferDe);
// PlanCard, ProductCard, UniOffer and SubscriptionPlans render whatever object they are given.

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

/** Copy of the UNI (student) banner. */
export interface UniOfferContent {
  title: string;
  lead: string;
  detail: string;
  cta: string;
}
