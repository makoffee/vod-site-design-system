"use client";

import { cn } from "@/lib/cn";
import { PlanCard } from "../PlanCard/PlanCard";
import { UniOffer } from "../UniOffer/UniOffer";
import type { Locale } from "../_shared/locale";
import type { PlanId } from "../_shared/plans";

/** landing = home page slice (Playfair heading); subscribe = onboarding / plan picker page (sooner.de/subscribe). */
export type SubscriptionPlansLayout = "landing" | "subscribe";

// landing: production slice subscription_plans (sooner.de home). subscribe: sooner.de/subscribe, 2026-10-22; legal =
// Copy/production-strings.json "Subscribe legal".
const copy: Record<SubscriptionPlansLayout, Record<Locale, { title: string; description: string; legal?: string }>> = {
  landing: {
    en: {
      title: "Choose your Sooner Plan",
      description: "Stream subscription films without limits – flexible monthly, with 3 rentals included, or save with an annual plan.",
    },
    de: {
      title: "Wähle dein Sooner-Abo",
      description: "Unbegrenzt Filme im Abo streamen – flexibel monatlich, mit 3 Leihfilmen inklusive oder günstiger im Jahresabo.",
    },
  },
  subscribe: {
    en: {
      title: "Choose your Sooner subscription",
      description: "Stream unlimited films with a flexible monthly plan, 3 rentals included, or save with an annual subscription.",
      legal:
        "By clicking 'Select Plan', you agree to our Terms and Conditions and acknowledge our Privacy Policy. A 7-day free trial applies exclusively to the Monthly and Student plans. You can cancel at any time during this trial to avoid charges. If you do not cancel, your paid subscription will begin automatically on day 15, billing at €7.99/month or €5.99/month respectively. Both plans can be cancelled monthly. The Yearly plan has no free trial; a one-time payment of €59.95 is due upon sign-up for 12 months. It automatically renews for another 12 months unless cancelled at least one day before the term ends. Streaming quality (Full HD, Ultra HD, 5.1) depends on your internet connection, device compatibility, and content availability.",
    },
    de: {
      title: "Wähle dein Sooner-Abo",
      description: "Unbegrenzt Filme im Abo streamen – flexibel monatlich, mit 3 Leihfilmen inklusive oder günstiger im Jahresabo.",
      legal:
        "Durch Klicken auf „Tarif auswählen“ stimmst du unseren Allgemeinen Geschäftsbedingungen zu und bestätigst unsere Datenschutzerklärung. Eine 7-tägige kostenlose Testphase gilt ausschließlich für den Monatstarif und den Studierendentarif. Du kannst während dieser Testphase jederzeit kündigen, um keine Gebühren zu zahlen. Wenn du nicht kündigst, beginnt dein kostenpflichtiges Abonnement automatisch am Tag 15 und wird mit 7,99 €/Monat bzw. 5,99 €/Monat berechnet. Beide Tarife sind monatlich kündbar. Der Jahrestarif hat keine kostenlose Testphase; eine einmalige Zahlung von 59,95 € fällt bei Vertragsabschluss für 12 Monate an. Er verlängert sich automatisch um weitere 12 Monate, sofern nicht mindestens einen Tag vor Vertragsende gekündigt wird. Die Streaming-Qualität (Full HD, Ultra HD, 5.1) hängt von deiner Internetverbindung, der Gerätekompatibilität und der Inhaltsverfügbarkeit ab.",
    },
  },
};

const allPlans: PlanId[] = ["monthly", "yearly", "plus"];

export interface SubscriptionPlansProps {
  /** landing = home page slice (default); subscribe = plan picker page with h1 and legal paragraph. */
  layout?: SubscriptionPlansLayout;
  /** Copy language for built-in heading, legal text, PlanCards and UniOffer: en (default) or de. */
  locale?: Locale;
  /** Overrides the production heading. */
  title?: string;
  /** Overrides the production intro sentence under the heading. */
  description?: string;
  /** Overrides the legal paragraph (subscribe layout only). */
  legal?: string;
  /** Plans to show, in order: monthly, yearly, plus; default all three. */
  plans?: PlanId[];
  /** PlanCard header artwork per plan. */
  images?: Partial<Record<PlanId, string>>;
  /** Shows the UNI banner under the cards (both designs do; production /subscribe currently does not). Default true. */
  showUni?: boolean;
  /** Called with the plan id when a PlanCard's button is pressed. */
  onSelect?: (plan: PlanId) => void;
  /** Called when the UNI offer's button is pressed. */
  onSelectUni?: () => void;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Plan picker (master axis layout[landing,subscribe]). landing = home page slice subscription_plans: Playfair heading,
 * cards 1 → 2 (third spanning) → 3 columns. subscribe = onboarding page sooner.de/subscribe: page-level DM Sans h1,
 * cards with the price after the features (2 → 3 columns) and the legal paragraph below. Both end with the UNI offer.
 * Use for: showing all subscription plans on the home page or the subscribe step.
 * Not for: a single plan (use PlanCard), the chosen product in checkout (use ProductCard) or a period switch (use SegmentedControl).
 */
export function SubscriptionPlans({
  layout = "landing",
  locale = "en",
  title,
  description,
  legal,
  plans = allPlans,
  images,
  showUni = true,
  onSelect,
  onSelectUni,
  className,
}: SubscriptionPlansProps) {
  const t = copy[layout][locale];
  const subscribe = layout === "subscribe";
  const Heading = subscribe ? "h1" : "h2";

  return (
    <section className={cn("@container w-full bg-black text-white", subscribe ? "px-6 pt-10 pb-10 @2xl:pt-16" : "py-12 @2xl:py-20", className)}>
      <div className={cn("mx-auto flex flex-col items-center gap-6", subscribe ? "max-w-[1200px]" : "max-w-[1230px] px-6 @3xl:px-0")}>
        <Heading
          className={cn(
            "m-0 text-center",
            subscribe
              ? "text-[28px] leading-9 font-bold tracking-[0.6px] @xl:text-4xl"
              : "font-display text-[36px] leading-tight font-bold tracking-[-1.2px] @2xl:text-5xl @2xl:leading-14",
          )}
        >
          {title ?? t.title}
        </Heading>
        <p className="m-0 max-w-[672px] text-center text-base leading-[30px]">{description ?? t.description}</p>
        <div
          className={cn(
            "grid w-full grid-cols-1 gap-6",
            subscribe
              ? "items-stretch @3xl:grid-cols-2 @6xl:grid-cols-3"
              : "justify-items-center @3xl:grid-cols-2 @3xl:[&>*:nth-child(3):nth-last-child(1)]:col-span-2 @5xl:grid-cols-3 @5xl:[&>*:nth-child(3):nth-last-child(1)]:col-span-1",
          )}
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan}
              plan={plan}
              locale={locale}
              imageSrc={images?.[plan]}
              onSelect={onSelect}
              pricePosition={subscribe ? "bottom" : "top"}
              className={cn("h-full", !subscribe && "max-w-[433px]")}
            />
          ))}
        </div>
        {showUni && <UniOffer locale={locale} onSelect={onSelectUni} className="mt-2" />}
        {subscribe && (legal ?? t.legal) && (
          <p className="m-0 w-full py-6 text-left text-base leading-[30px] whitespace-pre-line text-gray-500">{legal ?? t.legal}</p>
        )}
      </div>
    </section>
  );
}
