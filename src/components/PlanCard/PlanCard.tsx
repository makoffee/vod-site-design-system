"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { Pill } from "../_shared/Pill";
import type { Locale } from "../_shared/locale";
import { plansByLocale, type PlanId } from "../_shared/plans";

export interface PlanCardProps {
  /** Master axis plan[monthly,yearly,plus]; the master's state axis only has "default". */
  plan: PlanId;
  onSelect?: (plan: PlanId) => void;
  /** Artwork for the 384 × 199 header. The master's film stills are placeholders, so none ships by default. */
  imageSrc?: string;
  imageAlt?: string;
  /** Copy language; English by default. */
  locale?: Locale;
  /** top = price under the name (landing, master price[top]); bottom = after the features (subscribe page, price[bottom]). */
  pricePosition?: "top" | "bottom";
  className?: string;
}

/** Master db8d72090caab1b0 (Prismic slice subscription_plans). The yearly plan is the highlighted card. */
export function PlanCard({ plan: id, onSelect, imageSrc, imageAlt = "", locale = "en", pricePosition = "top", className }: PlanCardProps) {
  const plan = plansByLocale[locale][id];
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
          {/* Production and the yearly master set the highlighted plan's title to 32px; the others use heading.plan (30px). */}
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
          onClick={() => onSelect?.(id)}
          className={cn(plan.highlighted && "bg-black shadow-[0_3px_8px_rgb(0_0_0/0.25)] hover:bg-gray-900")}
        >
          {plan.cta}
        </Button>
      </div>
    </article>
  );
}
