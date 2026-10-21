import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BINOCULAR_PATH, BINOCULAR_VIEWBOX } from "./icons";

const { width, height } = BINOCULAR_VIEWBOX;
const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path d="${BINOCULAR_PATH}"/></svg>`,
)}")`;

export interface BinocularMaskProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Clips its content to the Sooner "binocular" shape (editorial slices, collection tiles), keeping the
 * 600 × 325 proportions of the design's LogoMask. Without children it shows the placeholder gradient.
 */
export function BinocularMask({ children, className }: BinocularMaskProps) {
  return (
    <div
      className={cn("relative aspect-[600/325] w-full overflow-hidden bg-linear-135 from-gray-700 to-gray-800", className)}
      style={{ maskImage: maskUrl, WebkitMaskImage: maskUrl, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
    >
      {children}
    </div>
  );
}

/** The binocular glyph as a small inline icon (FeaturedFilmCard eyebrow). */
export function BinocularIcon({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} fill="currentColor" aria-hidden>
      <path d={BINOCULAR_PATH} />
    </svg>
  );
}
