"use client";

import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import type { Locale } from "../_shared/locale";
import { uniOfferByLocale } from "../_shared/plans";

export interface UniOfferProps {
  /** Click handler of the CTA button. */
  onSelect?: () => void;
  /** Copy language; English by default. Pass "de" on DE screens (all copy comes from uniOfferByLocale). */
  locale?: Locale;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Master 9ac0f0f75ddb30fd: UNI banner on surface.uni with a decorative border.
 * Fills its container; below 672px of container width (@2xl) it stacks, above it is the 1200px master's row.
 * Use for: the student (UNI) offer below the plan cards (SubscriptionPlans includes it).
 * Not for: regular subscription plans (use PlanCard).
 */
export function UniOffer({ onSelect, locale = "en", className }: UniOfferProps) {
  const t = uniOfferByLocale[locale];
  return (
    <section className={cn("@container w-full rounded-2xl border border-border-decorative bg-surface-uni", className)}>
      <div className="flex flex-col items-start gap-4 p-6 @2xl:flex-row @2xl:items-center @2xl:gap-6">
        <div className="flex flex-1 flex-col items-start gap-4 @2xl:flex-row @2xl:items-center @2xl:gap-6">
          <h3 className="text-heading-plan text-white">{t.title}</h3>
          <p className="max-w-[896px] flex-1 text-base font-bold text-white">
            {t.lead}
            <br />
            <span className="font-medium">{t.detail}</span>
          </p>
        </div>
        <Button variant="cta-light" size="sm" onClick={onSelect}>
          {t.cta}
        </Button>
      </div>
    </section>
  );
}
