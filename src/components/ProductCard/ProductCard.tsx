"use client";

import { cn } from "@/lib/cn";
import { Pill } from "../_shared/Pill";
import type { Locale } from "../_shared/locale";
import { plansByLocale, type PlanId } from "../_shared/plans";

export interface ProductCardProps {
  /** Master axis product[monthly,yearly,plus]. */
  product: PlanId;
  /** Renders the "< Change plan" link when provided. */
  onChangeProduct?: () => void;
  changeLabel?: string;
  /** Copy language; English by default. */
  locale?: Locale;
  className?: string;
}

/** Master ab49ce9c06103e53: selected product summary during signup and checkout. */
export function ProductCard({ product, onChangeProduct, changeLabel, locale = "en", className }: ProductCardProps) {
  const plan = plansByLocale[locale][product];
  const change = changeLabel ?? (locale === "de" ? "< Produkt ändern" : "< Change plan");
  return (
    <div
      className={cn(
        // Design gap: the card shadow (0 4 8 / 25%) is not bound to a token.
        "flex w-full flex-col gap-4 rounded-2xl border-2 border-sooner-primary bg-black p-6 shadow-[0_4px_8px_rgb(0_0_0/0.25)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-base leading-[30px] font-bold text-white">
          <span className="uppercase">{plan.name}</span> – {plan.price}/{plan.period}
        </p>
        <Pill>{plan.checkoutBadge}</Pill>
      </div>
      {onChangeProduct && (
        <button
          type="button"
          onClick={onChangeProduct}
          className="w-fit rounded-sm text-xs font-bold uppercase tracking-[0.3px] text-white/60 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white"
        >
          {change}
        </button>
      )}
    </div>
  );
}
