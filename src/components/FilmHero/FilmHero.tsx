"use client";

import { Play, Plus, Share2, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { SoonerBasket } from "../_shared/icons";

export interface FilmHeroProps {
  title: string;
  director?: string;
  /** Backdrop still or trailer poster frame. */
  backdropSrc?: string;
  /** Title treatment artwork; the plain title is shown (in Playfair) when omitted. */
  logo?: { src: string; width: number; height: number };
  /** Production "Directed by" (de "Regie:"). */
  directorLabel?: string;
  /** Production "Subscribe" (de "Abonnieren"); design "FREE TRIAL". Omit with null. */
  subscribeLabel?: string | null;
  /** Production "Rent" (de "Leihen"); design "Rent - 4,99€". Omit with null. */
  rentLabel?: string | null;
  /** Production "Trailer". Omit with null. */
  trailerLabel?: string | null;
  /** Production "Add to Watchlist". */
  watchlistLabel?: string;
  /** Production "Share". */
  shareLabel?: string;
  /** Production "Mute" / "Unmute". */
  muteLabel?: string;
  unmuteLabel?: string;
  /** Trailer sound state; the mute toggle shows only when onMutedChange is set. */
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  onSubscribe?: () => void;
  onRent?: () => void;
  onTrailer?: () => void;
  onAddToWatchlist?: () => void;
  onShare?: () => void;
  className?: string;
}

/**
 * Film page overview (production film `overview`, design "single film view" hero): full-bleed backdrop fading
 * to black, title treatment, director, then the .sooner-cta-* actions: subscribe, rent, trailer, watchlist, share.
 * 560px-min stack on small containers; from 768px of container width a 2:1 anamorphic frame (design 1440×720) that
 * grows only when the content needs more room.
 */
export function FilmHero({
  title,
  director,
  backdropSrc,
  logo,
  directorLabel = "Directed by",
  subscribeLabel = "Subscribe",
  rentLabel = "Rent",
  trailerLabel = "Trailer",
  watchlistLabel = "Add to Watchlist",
  shareLabel = "Share",
  muteLabel = "Mute",
  unmuteLabel = "Unmute",
  muted = true,
  onMutedChange,
  onSubscribe,
  onRent,
  onTrailer,
  onAddToWatchlist,
  onShare,
  className,
}: FilmHeroProps) {
  return (
    <div className={cn("@container w-full", className)}>
      <section className="relative isolate flex min-h-[560px] w-full flex-col justify-end overflow-clip bg-linear-135 from-gray-700 to-gray-800 @3xl:aspect-[2/1] @3xl:min-h-auto">
        {backdropSrc && <Image src={backdropSrc} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />}
        <div className="absolute inset-x-0 top-0 -bottom-px -z-10 bg-linear-to-b from-transparent to-black" />

        <div className="flex items-end justify-between gap-6 px-6 pb-10">
          <div className="flex max-w-3xl min-w-0 flex-col gap-6.5">
            <h1 className="m-0 font-display text-4xl leading-tight font-bold text-white @3xl:text-display-section">
              {logo ? (
                <Image
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  alt={title}
                  className="h-auto w-full max-w-[min(522px,80cqw)]"
                />
              ) : (
                title
              )}
            </h1>
            {director && (
              <p className="m-0 text-sm text-white/70">
                {directorLabel} <span className="font-medium text-white">{director}</span>
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 @md:gap-4">
              {subscribeLabel && (
                <Button size="lg" width="hug" onClick={onSubscribe} className="w-full gap-3 @md:w-auto">
                  <Play className="size-6" fill="currentColor" aria-hidden />
                  {subscribeLabel}
                </Button>
              )}
              {rentLabel && (
                <Button variant="cta-white" size="lg" width="hug" onClick={onRent} className="w-full gap-3 @md:w-auto">
                  <SoonerBasket className="h-[22px] w-5" />
                  {rentLabel}
                </Button>
              )}
              {trailerLabel && (
                <Button variant="cta-ghost" size="lg" width="hug" onClick={onTrailer} className="flex-1 @md:flex-none">
                  {trailerLabel}
                </Button>
              )}
              <Button variant="cta-round" onClick={onAddToWatchlist} aria-label={watchlistLabel}>
                <Plus className="size-6" strokeWidth={2} aria-hidden />
              </Button>
              <Button variant="cta-round" onClick={onShare} aria-label={shareLabel}>
                <Share2 className="size-6" strokeWidth={2} aria-hidden />
              </Button>
            </div>
          </div>
          {onMutedChange && (
            <Button
              variant="cta-round"
              onClick={() => onMutedChange(!muted)}
              aria-label={muted ? unmuteLabel : muteLabel}
              aria-pressed={muted}
              className="hidden @3xl:inline-flex"
            >
              {muted ? <VolumeX className="size-5" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
