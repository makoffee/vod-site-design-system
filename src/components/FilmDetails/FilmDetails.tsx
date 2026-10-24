import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface FilmFact {
  /** Fact name, e.g. "Director" (rendered as <dt>). */
  label: string;
  /** One entry per line (cast lists); a single entry for everything else. */
  value: string[];
}

export interface FilmDetailsProps {
  /** Film title; used as the poster's alt text (not rendered as text). */
  title: string;
  /** 3:4 poster; gray gradient placeholder when omitted. */
  posterSrc?: string;
  /** Bold lead paragraph. */
  tagline?: string;
  /** Synopsis text; the synopsis heading shows only when set. */
  synopsis?: string;
  /** Design "Synopsis". Label text; English default, pass German on DE screens. */
  synopsisLabel?: string;
  /** Festivals/awards, comma-separated; entries with href are links. Section hidden when empty. */
  festivals?: { name: string; href?: string }[];
  /** Design "Festivals & Awards". Label text; English default, pass German on DE screens. */
  festivalsLabel?: string;
  /** Metadata pairs (Director, Genres, Cast, Duration, Year, Country, …), split over two columns. */
  facts?: FilmFact[];
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Film info grid under the hero (production `film-info-grid`, design "single film view"): 3:4 poster, tagline,
 * synopsis and festivals, then the metadata as a two-column definition list. Stacks below 1024px of container width.
 * Use for: the film page body below FilmHero.
 * Not for: the film page header with actions (use FilmHero) or list rows (use FilmListItem).
 */
export function FilmDetails({
  title,
  posterSrc,
  tagline,
  synopsis,
  synopsisLabel = "Synopsis",
  festivals,
  festivalsLabel = "Festivals & Awards",
  facts = [],
  className,
}: FilmDetailsProps) {
  const half = Math.floor(facts.length / 2);
  const columns = facts.length > 3 ? [facts.slice(0, half), facts.slice(half)] : [facts];

  return (
    <div className={cn("@container w-full", className)}>
      <div className="grid gap-8 @2xl:grid-cols-[minmax(0,200px)_minmax(0,1fr)] @5xl:grid-cols-[265px_minmax(0,1fr)_auto] @5xl:gap-13">
        <div className="relative aspect-[3/4] w-full max-w-[265px] overflow-hidden rounded-sooner bg-linear-135 from-gray-700 to-gray-800">
          {posterSrc && <Image src={posterSrc} alt={title} fill sizes="265px" className="object-cover" />}
        </div>

        <div className="flex min-w-0 flex-col gap-4 text-white/90">
          {tagline && <p className="m-0 text-lg leading-[1.64] font-bold">{tagline}</p>}
          {synopsis && (
            <>
              <h2 className="m-0 text-xl leading-7 font-black text-white">{synopsisLabel}</h2>
              <p className="m-0 text-lg leading-[1.65]">{synopsis}</p>
            </>
          )}
          {festivals && festivals.length > 0 && (
            <>
              <h2 className="m-0 text-xl leading-7 font-black text-white">{festivalsLabel}</h2>
              <p className="m-0 text-base">
                {festivals.map((festival, i) => (
                  <span key={`${i}-${festival.name}`}>
                    {i > 0 && ", "}
                    {festival.href ? (
                      <Link href={festival.href} className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-white">
                        {festival.name}
                      </Link>
                    ) : (
                      festival.name
                    )}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>

        {facts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-13 gap-y-4 @2xl:col-start-2 @5xl:col-start-auto">
            {columns.map((column, i) => (
              <dl key={i} className="m-0 flex flex-col gap-4">
                {column.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="text-sm font-semibold text-white/60">{fact.label}</dt>
                    {fact.value.map((line, j) => (
                      <dd key={`${j}-${line}`} className="m-0 text-base text-white/90">
                        {line}
                      </dd>
                    ))}
                  </div>
                ))}
              </dl>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
