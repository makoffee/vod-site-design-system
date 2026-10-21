import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BinocularMask } from "../_shared/BinocularMask";

export interface MaskTileProps {
  title: string;
  href: string;
  imageSrc?: string;
  /** Violet duotone wash (the first tile in the design row). */
  tinted?: boolean;
  className?: string;
}

/** Collection tile clipped to the binocular shape with a centred Playfair title (design "Collection row with icon-mask"). */
export function MaskTile({ title, href, imageSrc, tinted = false, className }: MaskTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/mask block w-full rounded-sooner outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        className,
      )}
    >
      <BinocularMask className="transition-transform duration-200 ease-out motion-safe:group-hover/mask:scale-[1.03]">
        {imageSrc && <Image src={imageSrc} alt="" fill sizes="(max-width: 640px) 80vw, 33vw" className="object-cover grayscale" />}
        {tinted && <div className="absolute inset-0 bg-sooner-primary mix-blend-multiply" />}
        <span className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-[28px] leading-8 text-white [text-shadow:var(--text-shadow-on-image)]">
          {title}
        </span>
      </BinocularMask>
    </Link>
  );
}
