"use client";

import { cn } from "@/lib/cn";
import { PlanCard } from "../PlanCard/PlanCard";
import { UniOffer } from "../UniOffer/UniOffer";
import type { Locale } from "../_shared/locale";
import type { PlanId } from "../_shared/plans";

// Production slice subscription_plans (withImages), sooner.de / sooner.de/en, 2026-10-22.
const copy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Choose your Sooner Plan",
    description: "Stream subscription films without limits – flexible monthly, with 3 rentals included, or save with an annual plan.",
  },
  de: {
    title: "Wähle dein Sooner-Abo",
    description: "Unbegrenzt Filme im Abo streamen – flexibel monatlich, mit 3 Leihfilmen inklusive oder günstiger im Jahresabo.",
  },
};

const allPlans: PlanId[] = ["monthly", "yearly", "plus"];

export interface SubscriptionPlansProps {
  locale?: Locale;
  /** Overrides the production heading. */
  title?: string;
  description?: string;
  plans?: PlanId[];
  /** PlanCard header artwork per plan. */
  images?: Partial<Record<PlanId, string>>;
  /** Shows the UNI banner under the cards. */
  showUni?: boolean;
  onSelect?: (plan: PlanId) => void;
  onSelectUni?: () => void;
  className?: string;
}

/**
 * Plan picker section (design "PlanBlock", production slice subscription_plans): centred Playfair heading, the
 * PlanCards (1 column, 2 with the third spanning from 768px, 3 from 1024px of container width) and the UNI offer.
 */
export function SubscriptionPlans({
  locale = "en",
  title,
  description,
  plans = allPlans,
  images,
  showUni = true,
  onSelect,
  onSelectUni,
  className,
}: SubscriptionPlansProps) {
  const t = copy[locale];
  return (
    <section className={cn("@container w-full bg-black py-12 text-white @2xl:py-20", className)}>
      <div className="mx-auto flex max-w-[1230px] flex-col items-center gap-6 px-6 @3xl:px-0">
        <h2 className="m-0 text-center font-display text-[36px] leading-tight font-bold tracking-[-1.2px] @2xl:text-5xl @2xl:leading-14">
          {title ?? t.title}
        </h2>
        <p className="m-0 max-w-[672px] text-center text-base leading-[30px]">{description ?? t.description}</p>
        <div className="grid w-full grid-cols-1 justify-items-center gap-6 @3xl:grid-cols-2 @3xl:[&>*:nth-child(3):nth-last-child(1)]:col-span-2 @5xl:grid-cols-3 @5xl:[&>*:nth-child(3):nth-last-child(1)]:col-span-1">
          {plans.map((plan) => (
            <PlanCard key={plan} plan={plan} locale={locale} imageSrc={images?.[plan]} onSelect={onSelect} className="h-full max-w-[433px]" />
          ))}
        </div>
        {showUni && <UniOffer locale={locale} onSelect={onSelectUni} className="mt-2" />}
      </div>
    </section>
  );
}
