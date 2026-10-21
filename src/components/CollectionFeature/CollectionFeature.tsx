import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BinocularMask } from "../_shared/BinocularMask";
import { EditorialContent, type EditorialContentProps } from "../EditorialSlice/EditorialSlice";

export interface CollectionFeatureProps extends EditorialContentProps {
  imageSrc?: string;
  imageAlt?: string;
  /** The collection's films (FilmCards); laid out 2-up, then 4-up from 768px of container width. */
  children?: ReactNode;
  className?: string;
}

/**
 * Collection intro with its films (design "FeaturedCollectionStack"): binocular image + editorial text on a
 * white panel, followed by a grid of tall film cards.
 */
export function CollectionFeature({ imageSrc, imageAlt = "", children, className, ...content }: CollectionFeatureProps) {
  return (
    <section className={cn("@container w-full overflow-hidden rounded-2xl bg-white", className)}>
      <div className="flex flex-col gap-5 px-6 pt-10 pb-6 @3xl:pt-16">
        <div className="grid items-center gap-8 @3xl:grid-cols-2 @3xl:gap-16">
          <BinocularMask>
            {imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
          </BinocularMask>
          <EditorialContent {...content} />
        </div>
        {children && <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4">{children}</div>}
      </div>
    </section>
  );
}
