import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  /** Heading text. */
  title: string;
  /** Turns the title into a link to the full channel/collection. */
  href?: string;
  /** Label revealed on hover next to a linked title (production de: "mehr"). Label text; English default, pass German on DE screens. */
  moreLabel?: string;
  /** Heading level; feeds use h2. */
  as?: "h2" | "h3";
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Row title (production Row-module `rowLabel`): 24/32 bold, 0.6px tracking, 20/26 below 640px of container width.
 * Linked titles reveal "more" ("mehr" on the German site) in sooner-primary-light and carry a chevron, as on sooner.de.
 * Use for: a standalone row or section title on a dark background.
 * Not for: a feed's title (pass title/href to FeedRow, which renders this) or page banners (use CollectionHeader).
 */
export function SectionHeader({ title, href, moreLabel = "more", as: Heading = "h2", className }: SectionHeaderProps) {
  const heading = (
    <Heading className="m-0 text-xl leading-[26px] font-bold tracking-[0.6px] text-white @min-[640px]:text-heading-section">{title}</Heading>
  );

  if (!href) return <div className={cn("@container flex items-center", className)}>{heading}</div>;

  return (
    <div className={cn("@container flex items-center", className)}>
      <Link
        href={href}
        className="group/title inline-flex items-center gap-2 rounded-sm no-underline outline-none transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {heading}
        <span className="max-w-0 overflow-hidden text-base whitespace-nowrap text-sooner-primary-light transition-all duration-300 group-hover/title:max-w-[120px] group-focus-visible/title:max-w-[120px]">
          {moreLabel}
        </span>
        <ChevronRight className="size-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
      </Link>
    </div>
  );
}
