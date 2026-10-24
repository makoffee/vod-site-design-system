"use client";

import { cn } from "@/lib/cn";
import { Pill } from "../_shared/Pill";
import type { Plan } from "../_shared/plans";

export interface ProductCardProps {
  /**
   * The chosen plan (name, price, period, checkoutBadge are shown). Content: pass plansEn.* on English screens,
   * plansDe.* on DE screens (src/content/plans.ts). Its id is monthly, yearly or plus.
   */
  product: Plan;
  /** Renders the change link when provided. */
  onChangeProduct?: () => void;
  /** Text of the change link. Label text; English default "< Change plan", pass German on DE screens (productCardDe). */
  changeLabel?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Selected product summary during signup and checkout.
 * Use for: showing the chosen plan above the signup/checkout form (AuthForm, LoginModal use it).
 * Not for: offering plans to choose from (use PlanCard or SubscriptionPlans).
 */
export function ProductCard({ product: plan, onChangeProduct, changeLabel = "< Change plan", className }: ProductCardProps) {
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
          {changeLabel}
        </button>
      )}
    </div>
  );
}
