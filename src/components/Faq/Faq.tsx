"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { BinocularMask } from "../_shared/BinocularMask";

export interface FaqItem {
  /** Question text (the toggle button). */
  question: string;
  /** Paragraphs are separated by a blank line. */
  answer: string;
}

export type FaqSide = "left" | "right";

export interface FaqProps {
  /** Playfair section heading. */
  title: string;
  /** Questions and answers ({ question, answer }); answers split into paragraphs at blank lines. */
  items: FaqItem[];
  /** Indexes of the questions that start open; default none. */
  defaultOpen?: number[];
  /** Which side the binocular image sits on from 1024px of container width (it stacks on top below); default left. */
  side?: FaqSide;
  /** Image URL shown in the binocular mask; empty mask when omitted. */
  imageSrc?: string;
  /** Image alt text; default "" (decorative). */
  imageAlt?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Questions and answers beside a binocular-masked image (production slice faq / withImage, side[left,right]). Each question is a button controlling its answer region.
 * Use for: an expandable question/answer list on landing pages.
 * Not for: a text + image feature without questions (use TwoColumnMedia or EditorialSlice).
 */
export function Faq({ title, items, defaultOpen = [], side = "left", imageSrc, imageAlt = "", className }: FaqProps) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const baseId = useId();
  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <div className={cn("@container w-full", className)}>
      <section className="w-full bg-black text-white">
        <div className="mx-auto max-w-7xl px-3 pt-10 pb-20 @3xl:px-6 @5xl:px-8">
          <div className={cn("flex flex-col items-start gap-8 @5xl:gap-10", side === "right" ? "@5xl:flex-row-reverse" : "@5xl:flex-row")}>
            <BinocularMask className="shrink-0 @5xl:mt-19 @5xl:w-[544px]">
              {imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 544px, 100vw" className="object-cover" />}
            </BinocularMask>
            <div className="flex w-full min-w-0 flex-1 flex-col">
              <h2 className="m-0 font-display text-3xl leading-tight font-bold tracking-[-1.2px] @xl:text-4xl @5xl:text-5xl">{title}</h2>
              <dl className="mt-10 mb-0 space-y-6 divide-y divide-white/10">
                {items.map((item, index) => {
                  const expanded = open.has(index);
                  const buttonId = `${baseId}-q${index}`;
                  const panelId = `${baseId}-a${index}`;
                  const Icon = expanded ? Minus : Plus;
                  return (
                    <div key={`${index}-${item.question}`}>
                      <dt>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() => toggle(index)}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl bg-black py-5 text-left text-lg leading-7 font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white @xl:text-xl"
                        >
                          <span>{item.question}</span>
                          <Icon className="size-6 shrink-0" strokeWidth={2} aria-hidden />
                        </button>
                      </dt>
                      <dd
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        hidden={!expanded}
                        className="m-0 mt-2 space-y-7 pb-5 text-base leading-7 text-white/70"
                      >
                        {item.answer.split(/\n\s*\n/).map((paragraph, p) => (
                          <p key={p}>{paragraph}</p>
                        ))}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
