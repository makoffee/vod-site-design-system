import Image from "next/image";
import { cn } from "@/lib/cn";

export interface QuoteCardProps {
  /** Festival, jury or publication the quote comes from. */
  source: string;
  quote: string;
  /** Person quoted, shown after the quote. */
  author?: string;
  logoSrc?: string;
  className?: string;
}

/**
 * Review / award quote (design "Quotes and reviews"): white card, round source logo with a Playfair source line,
 * then the quote in gray-700.
 */
export function QuoteCard({ source, quote, author, logoSrc, className }: QuoteCardProps) {
  return (
    <figure className={cn("m-0 flex w-full flex-col gap-3 rounded-xl bg-white p-6", className)}>
      <figcaption className="flex items-center gap-3">
        <span className="relative size-[46px] shrink-0 overflow-hidden rounded-full bg-gray-200">
          {logoSrc && <Image src={logoSrc} alt="" fill sizes="46px" className="object-cover" />}
        </span>
        <span className="font-display text-[15px] leading-5 font-semibold text-gray-900">{source}</span>
      </figcaption>
      <blockquote className="m-0 text-sm text-gray-700">
        <p className="m-0">{quote}</p>
        {author && <p className="m-0 mt-3">–{author}</p>}
      </blockquote>
    </figure>
  );
}
