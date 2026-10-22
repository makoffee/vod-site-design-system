import { EditorialSlice } from "@/components/EditorialSlice/EditorialSlice";
import { Faq } from "@/components/Faq/Faq";
import { FeaturedCollectionBlock } from "@/components/FeaturedCollectionBlock/FeaturedCollectionBlock";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { ImageCtaBanner } from "@/components/ImageCtaBanner/ImageCtaBanner";
import { SubscriptionPlans } from "@/components/SubscriptionPlans/SubscriptionPlans";
import { TwoColumnMedia } from "@/components/TwoColumnMedia/TwoColumnMedia";
import type { Locale } from "@/components/_shared/locale";
import { SoonerBasket } from "@/components/_shared/icons";
import { feedRowDe, filmCardDe } from "@/i18n/de";
import { landing, landingFilms, type LandingCollection } from "@/mocks/landing";
import { AppShell } from "./AppShell";

function Collection({ collection, locale }: { collection: LandingCollection; locale: Locale }) {
  const { row, ...content } = collection;
  const de = locale === "de";
  return (
    <FeaturedCollectionBlock {...content} {...(de ? feedRowDe : {})}>
      {landingFilms(row, locale).map((f) => (
        <FilmCard {...(de ? filmCardDe : {})} key={f.id} {...f} />
      ))}
    </FeaturedCollectionBlock>
  );
}

export interface LandingScreenProps {
  locale?: Locale;
}

/**
 * Landing page (design "Landing Page EN | 1440w" / "Landing Page DE | 1440w", production sooner.de home):
 * hero, four collection blocks with the plans after the third, the Berlin split, devices, the closing banner
 * and the FAQ. Production order and copy.
 */
export function LandingScreen({ locale = "en" }: LandingScreenProps) {
  const t = landing[locale];
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
        actions={[
          { label: t.hero.rentLabel, href: "/film/nouvelle-vague", tone: "primary", icon: <SoonerBasket className="h-[18px] w-4" /> },
          { label: t.hero.trailerLabel, href: "/film/nouvelle-vague", tone: "white" },
        ]}
      />
      <Collection collection={highlights} locale={locale} />
      <Collection collection={newToRent} locale={locale} />
      <Collection collection={newInSubscription} locale={locale} />
      <SubscriptionPlans locale={locale} />
      <Collection collection={comingSoon} locale={locale} />
      {/* Production split_image_block: px-6 py-12 · sm:px-12 sm:py-20 · lg:px-20 around the white slice. */}
      <div className="px-6 py-12 sm:px-12 sm:py-20 lg:px-20">
        <EditorialSlice media="image" side="left" title={t.split.title} description={t.split.description} as="h2" />
      </div>
      <TwoColumnMedia title={t.devices.title} description={t.devices.description} />
      <div className="px-6 pb-20 sm:px-12 lg:px-20">
        <ImageCtaBanner layout="contained" align="center" {...t.banner} className="mx-auto max-w-[1440px]" />
      </div>
      <Faq title={t.faq.title} items={t.faq.items} />
    </AppShell>
  );
}
