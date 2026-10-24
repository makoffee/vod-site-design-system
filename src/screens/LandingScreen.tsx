import { EditorialSlice } from "@/components/EditorialSlice/EditorialSlice";
import { Faq } from "@/components/Faq/Faq";
import { FeaturedCollectionBlock } from "@/components/FeaturedCollectionBlock/FeaturedCollectionBlock";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { ImageCtaBanner } from "@/components/ImageCtaBanner/ImageCtaBanner";
import { SubscriptionPlans } from "@/components/SubscriptionPlans/SubscriptionPlans";
import { TwoColumnMedia } from "@/components/TwoColumnMedia/TwoColumnMedia";
import type { Locale } from "@/i18n/locale";
import { SoonerBasket } from "@/components/_shared/icons";
import { planList, plansDe, uniOfferDe } from "@/content/plans";
import { feedRowDe, filmCardDe, subscriptionPlansDe } from "@/i18n/de";
import { placeholderLanding } from "@/mocks/placeholder";
import { AppShell } from "./AppShell";
import type { LandingCollection, LandingContent } from "./content";

function Collection({ collection, locale }: { collection: LandingCollection; locale: Locale }) {
  const { films, ...content } = collection;
  const de = locale === "de";
  return (
    <FeaturedCollectionBlock {...content} {...(de ? feedRowDe : {})}>
      {films.map((f) => (
        <FilmCard {...(de ? filmCardDe : {})} key={f.id} {...f} />
      ))}
    </FeaturedCollectionBlock>
  );
}

export interface LandingScreenProps {
  locale?: Locale;
  /** Page content; placeholder content by default (the / and /en routes pass the production landing page). */
  content?: LandingContent;
}

/**
 * Landing page (production sooner.de home):
 * hero, four collection blocks with the plans after the third, the split, devices, the closing banner
 * and the FAQ, in production order.
 */
export function LandingScreen({ locale = "en", content: t = placeholderLanding }: LandingScreenProps) {
  const [highlights, newToRent, newInSubscription, comingSoon] = t.collections;

  return (
    <AppShell locale={locale}>
      <ImageCtaBanner
        layout="full"
        align="left"
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        description={t.hero.description}
        imageSrc={t.hero.imageSrc}
        actions={[
          { label: t.hero.rentLabel, href: t.hero.href, tone: "primary", icon: <SoonerBasket className="h-[18px] w-4" /> },
          { label: t.hero.trailerLabel, href: t.hero.href, tone: "white" },
        ]}
      />
      <Collection collection={highlights} locale={locale} />
      <Collection collection={newToRent} locale={locale} />
      <Collection collection={newInSubscription} locale={locale} />
      <SubscriptionPlans images={t.planImages} {...(locale === "de" ? { ...subscriptionPlansDe, plans: planList(plansDe), uni: uniOfferDe } : {})} />
      <Collection collection={comingSoon} locale={locale} />
      {/* Production split_image_block: px-6 py-12 · sm:px-12 sm:py-20 · lg:px-20 around the white slice. */}
      <div className="px-6 py-12 sm:px-12 sm:py-20 lg:px-20">
        <EditorialSlice media="image" side="left" title={t.split.title} description={t.split.description} imageSrc={t.split.imageSrc} as="h2" />
      </div>
      <TwoColumnMedia title={t.devices.title} description={t.devices.description} imageSrc={t.devices.imageSrc} />
      <div className="px-6 pb-20 sm:px-12 lg:px-20">
        <ImageCtaBanner layout="contained" align="center" {...t.banner} className="mx-auto max-w-[1440px]" />
      </div>
      <Faq title={t.faq.title} items={t.faq.items} imageSrc={t.faq.imageSrc} />
    </AppShell>
  );
}
