"use client";

import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import type { Locale } from "../_shared/locale";
import { uniOfferByLocale } from "../_shared/plans";

export interface UniOfferProps {
  onSelect?: () => void;
  /** Copy language; English by default. */
  locale?: Locale;
  className?: string;
}

/**
 * Master 9ac0f0f75ddb30fd: UNI banner on surface.uni with a decorative border.
 * Fills its container; below 672px of container width (@2xl) it stacks, above it is the 1200px master's row.
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
