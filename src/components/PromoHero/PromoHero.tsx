"use client";

import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { FilmBadge } from "../FilmBadge/FilmBadge";

export interface PromoSlide {
  id: string;
  title: string;
  description?: string;
  href: string;
  imageSrc?: string;
  badge?: string;
}

export interface PromoHeroProps {
  slides: PromoSlide[];
  /** Design "Watch Now" (production de "Hier anschauen"). */
  watchLabel?: string;
  /** Production "Add to list". */
  addToListLabel?: string;
  previousLabel?: string;
  /** Production "Next promo". */
  nextLabel?: string;
  /** Production "Featured titles" (tablist name). */
  slidesLabel?: string;
  /** Screen-reader name for each dot; production "Promo 1 von 12: Cold War". */
  slideLabel?: (index: number, total: number, title: string) => string;
  defaultIndex?: number;
  onAddToList?: (slide: PromoSlide) => void;
  className?: string;
}

/**
 * Discover hero carousel (production CinePromoHeader, design "HeroSection"). 2:1 anamorphic card (1392×696 in the
 * design; fits 16:9 stills and letterboxed scope films with little crop) with a
 * bottom fade, Playfair title, three-line description, watch / add-to-list actions, side arrows and dots.
 * Below 672px of container width it becomes a 3:4 card with icon-only actions, as on mobile sooner.de.
 */
export function PromoHero({
  slides,
  watchLabel = "Watch Now",
  addToListLabel = "Add to list",
  previousLabel = "Vorherige Promo",
  nextLabel = "Next promo",
  slidesLabel = "Featured titles",
  slideLabel = (i, n, title) => `Promo ${i} von ${n}: ${title}`,
  defaultIndex = 0,
  onAddToList,
  className,
}: PromoHeroProps) {
  const [index, setIndex] = useState(defaultIndex);
  const slide = slides[index];
  if (!slide) return null;
  const go = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length);

  const glassButton =
    "flex shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-cta transition-colors hover:bg-white/20 " +
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={slidesLabel}
      className={cn("@container w-full", className)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black @2xl:aspect-[2/1] @2xl:min-h-[400px]">
        <div key={slide.id} className="absolute inset-0 bg-linear-135 from-gray-700 to-gray-800 motion-safe:animate-fade-in">
          {slide.imageSrc && <Image src={slide.imageSrc} alt="" fill priority sizes="100vw" className="object-cover" />}
        </div>
        {/* Production fadeBottom: transparent → black/45 at 60% → black/85 */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/45 via-60% to-black/85" />

        {slides.length > 1 && (
          <>
            <button type="button" aria-label={previousLabel} onClick={() => go(-1)} className={cn(glassButton, "absolute top-1/2 left-4 z-10 hidden size-12 -translate-y-1/2 @2xl:flex")}>
              <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
            </button>
            <button type="button" aria-label={nextLabel} onClick={() => go(1)} className={cn(glassButton, "absolute top-1/2 right-4 z-10 hidden size-12 -translate-y-1/2 @2xl:flex")}>
              <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
            </button>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col px-8 pt-8 pb-16 @2xl:px-20 @2xl:pt-[clamp(24px,4vh,48px)] @2xl:pb-[clamp(40px,10vh,80px)]">
          <div className="mb-6 flex max-w-2xl flex-col items-start gap-4">
            {slide.badge && <FilmBadge>{slide.badge}</FilmBadge>}
            <h2 className="m-0 max-w-full font-display text-[36px] leading-10 font-extrabold tracking-[-0.9px] text-balance text-white @2xl:max-w-[20ch] @2xl:text-[clamp(32px,4.8cqw,60px)] @2xl:leading-none @2xl:tracking-[-1.5px]">
              {slide.title}
            </h2>
            {slide.description && (
              <p className="m-0 line-clamp-3 max-w-[60ch] text-lg leading-[1.625] tracking-[0.45px] text-gray-200/95 @2xl:text-[clamp(14px,1.4cqw,18px)]">
                {slide.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={slide.href}
              aria-label={`${slide.title}. ${watchLabel}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-sooner-primary text-base font-medium tracking-[0.4px] text-white transition hover:bg-sooner-primary-dark motion-safe:hover:scale-105 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white @2xl:w-auto @2xl:rounded-sooner @2xl:px-8"
            >
              <Play className="size-5" fill="currentColor" aria-hidden />
              <span className="sr-only @2xl:not-sr-only">{watchLabel}</span>
            </Link>
            <button
              type="button"
              onClick={() => onAddToList?.(slide)}
              className="flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white/10 text-base font-medium tracking-[0.4px] text-white backdrop-blur-cta transition-colors hover:bg-white/20 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white @2xl:w-auto @2xl:rounded-sooner @2xl:px-8"
            >
              <Plus className="size-5" strokeWidth={2} aria-hidden />
              <span className="sr-only @2xl:not-sr-only">{addToListLabel}</span>
            </button>
          </div>
        </div>

        {slides.length > 1 && (
          <div role="tablist" aria-label={slidesLabel} className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 px-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="group/dot flex size-4 shrink-0 items-center justify-center outline-none focus-visible:outline-2 focus-visible:outline-white"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-white" : "w-2 bg-white/40 group-hover/dot:bg-white/60",
                  )}
                />
                <span className="sr-only">{slideLabel(i + 1, slides.length, s.title)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
