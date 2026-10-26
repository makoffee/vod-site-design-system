"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { ViewToggle, type CollectionView } from "../ViewToggle/ViewToggle";
import { AvailabilityFilter, type Availability, type AvailabilityFilterProps } from "../AvailabilityFilter/AvailabilityFilter";

export type { CollectionView } from "../ViewToggle/ViewToggle";

export interface CollectionHeaderProps {
  /** Collection name (h1). */
  title: string;
  /** Collection text, clamped to three lines with a show more / less toggle; omitted with its toggle when empty. */
  description?: string;
  /** Banner artwork (decorative); a grey gradient shows without it. */
  imageSrc?: string;
  /** Current view passed to ViewToggle (default "grid"); the header does not store it. */
  view?: CollectionView;
  /** Called with the other view when the ViewToggle is pressed. */
  onViewChange?: (view: CollectionView) => void;
  /** Controlled availability filter value. */
  availability?: Availability;
  /** Initial availability when uncontrolled (default "all"). */
  defaultAvailability?: Availability;
  /** Called when the availability filter changes. */
  onAvailabilityChange?: (value: Availability) => void;
  /** Passed to both AvailabilityFilter layouts (labels, group label). */
  filterLabels?: Pick<AvailabilityFilterProps, "labels" | "label">;
  /** Description starts expanded. */
  defaultExpanded?: boolean;
  /** No production source; screen-reader names for the toggles. Label text; English default, pass German on DE screens. */
  showMoreLabel?: string;
  /** Screen-reader name of the collapse toggle (default "Show less"). Label text; English default, pass German on DE screens. */
  showLessLabel?: string;
  /** Screen-reader name of the ViewToggle when it switches to grid (default "Grid view"). Label text; English default, pass German on DE screens. */
  gridViewLabel?: string;
  /** Screen-reader name of the ViewToggle when it switches to list (default "List view"). Label text; English default, pass German on DE screens. */
  listViewLabel?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Collection page banner: artwork at a fixed ratio that scales with the container (3:1 from 1024px, 2:1 from 672px,
 * 6:7 below; it only grows when the expanded text needs room) with a bottom fade, title, a
 * three-line description that expands in place, the availability filter and the grid / list switch.
 * The filter becomes a dropdown below 672px of container width.
 * Use for: the top of a collection page above its film grid or list.
 * Not for: a title above a feed row (use SectionHeader).
 */
export function CollectionHeader({
  title,
  description,
  imageSrc,
  view = "grid",
  onViewChange,
  availability,
  defaultAvailability = "all",
  onAvailabilityChange,
  filterLabels,
  defaultExpanded = false,
  showMoreLabel = "Show more",
  showLessLabel = "Show less",
  gridViewLabel = "Grid view",
  listViewLabel = "List view",
  className,
}: CollectionHeaderProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [uncontrolledAvailability, setAvailability] = useState(defaultAvailability);
  const currentAvailability = availability ?? uncontrolledAvailability;
  const descriptionId = useId();
  const changeAvailability = (value: Availability) => {
    setAvailability(value);
    onAvailabilityChange?.(value);
  };

  const focus = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div className={cn("@container w-full", className)}>
      {/* Ratio by container width: 6:7 mobile, 2:1 tablet (3:1 is too short for the copy and filters there), 3:1 desktop. */}
      <section className="relative isolate flex aspect-[6/7] w-full flex-col overflow-clip rounded-[20px] bg-linear-135 from-gray-700 to-gray-800 @2xl:aspect-[2/1] @5xl:aspect-[3/1]">
        {imageSrc && <Image src={imageSrc} alt="" fill priority sizes="(min-width: 1968px) 1872px, 100vw" className="-z-10 object-cover" />}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/10 from-25% to-black/70 @2xl:from-45%" />

        <div className="flex flex-1 flex-col justify-end gap-4 p-4 @2xl:p-8">
          <div className="flex max-w-[480px] flex-col gap-2 @2xl:gap-0">
            <h1 className="m-0 text-[32px] leading-[1.19] font-bold tracking-[0.6px] text-white @2xl:leading-12">{title}</h1>
            {description && (
              <p
                id={descriptionId}
                className={cn(
                  "m-0 text-sm leading-[1.57] text-white @2xl:text-lg @2xl:leading-[1.44]",
                  expanded ? "scrollbar-sooner max-h-[220px] overflow-y-auto pr-2 @2xl:[--scrollbar-thumb:rgb(209_213_220/0.5)]" : "line-clamp-3",
                )}
              >
                {description}
              </p>
            )}
          </div>
          {description && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={descriptionId}
              aria-label={expanded ? showLessLabel : showMoreLabel}
              onClick={() => setExpanded((e) => !e)}
              className={cn("-mt-2 flex size-6 items-center justify-center self-center rounded-full text-white @2xl:self-start", focus)}
            >
              <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} strokeWidth={2} aria-hidden />
            </button>
          )}

          <div className="flex items-center justify-between gap-4">
            <AvailabilityFilter
              variant="menu"
              value={currentAvailability}
              onValueChange={changeAvailability}
              {...filterLabels}
              className="@2xl:hidden"
            />
            <AvailabilityFilter
              value={currentAvailability}
              onValueChange={changeAvailability}
              {...filterLabels}
              className="hidden @2xl:inline-flex"
            />
            <ViewToggle view={view} onViewChange={onViewChange} gridViewLabel={gridViewLabel} listViewLabel={listViewLabel} />
          </div>
        </div>
      </section>
    </div>
  );
}
