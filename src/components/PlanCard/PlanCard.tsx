"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { Pill } from "../_shared/Pill";
import type { Plan, PlanId } from "../_shared/plans";

export interface PlanCardProps {
  /**
   * The plan to show (name, price, period, badge, features, CTA label, highlighted). Content, not copy in the
   * component: pass plansEn.monthly / .yearly / .plus on English screens, plansDe.* on DE screens (src/content/plans.ts).
   * Its id is monthly, yearly or plus.
   */
  plan: Plan;
  /** Called with the plan id when the card's CTA button is pressed. */
  onSelect?: (plan: PlanId) => void;
  /** Artwork for the 384 × 199 header. None ships by default. */
  imageSrc?: string;
  /** Alt text of imageSrc (default "", decorative). */
  imageAlt?: string;
  /** top = price under the name (landing); bottom = after the features (subscribe page). */
  pricePosition?: "top" | "bottom";
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * One subscription plan with its CTA (Prismic slice subscription_plans). The yearly plan is the highlighted card.
 * Use for: a single plan offer with its CTA; SubscriptionPlans lays out all three.
 * Not for: the chosen plan summary in signup/checkout (use ProductCard); the full plan picker (use SubscriptionPlans).
 */
export function PlanCard({ plan, onSelect, imageSrc, imageAlt = "", pricePosition = "top", className }: PlanCardProps) {
  const price = (
    <p className="flex items-start gap-1.5 text-white">
      <span className="text-[30px] leading-9 font-bold tracking-[-0.75px]">{plan.price}</span>
      <span className="text-xs leading-[29px] font-bold uppercase tracking-[0.3px]">/ {plan.period}</span>
    </p>
  );

  return (
    <article
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border-2 border-sooner-primary",
        plan.highlighted ? "bg-sooner-primary" : "bg-black",
        className,
      )}
    >
      <div className={cn("relative aspect-[384/199] w-full", !imageSrc && "bg-white/5")}>
        {imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 384px, 100vw" className="object-cover" />}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Production sets the highlighted plan's title to 32px; the others use heading.plan (30px). */}
          <h3
            className={cn(
              "text-white uppercase",
              // tailwind-merge would drop heading.plan's line-height/weight/tracking with a size override, so spell them out.
              plan.id === "yearly" ? "text-[32px] leading-9 font-black tracking-[-0.75px]" : "text-heading-plan",
            )}
          >
            {plan.name}
          </h3>
          <Pill>{plan.badge}</Pill>
        </div>
        {pricePosition === "top" && price}
        <ul className="text-base leading-[30px] text-white">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {pricePosition === "bottom" && price}
      </div>
      <div className="p-6">
        <Button
          onClick={() => onSelect?.(plan.id)}
          className={cn(plan.highlighted && "bg-black shadow-[0_3px_8px_rgb(0_0_0/0.25)] hover:bg-gray-900")}
        >
          {plan.cta}
        </Button>
      </div>
    </article>
  );
}
