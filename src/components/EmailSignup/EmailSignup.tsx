"use client";

import { useId, type FormEvent } from "react";
import { cn } from "@/lib/cn";

export interface EmailSignupProps {
  title: string;
  description?: string;
  /** Input placeholder; design "E-Mail". */
  placeholder?: string;
  /** Submit label; design "Jetzt testen" / "COMMENCER". */
  submitLabel: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

/**
 * Free-trial email capture (design "Email CTA" on the original landing pages): violet card with a soft glow,
 * 32px black title and bold copy on the left, a white email field joined to a black uppercase button on the right.
 */
export function EmailSignup({ title, description, placeholder = "E-Mail", submitLabel, onSubmit, className }: EmailSignupProps) {
  const inputId = useId();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    onSubmit?.(typeof email === "string" ? email : "");
  };

  return (
    <section className={cn("@container w-full", className)}>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-3xl bg-sooner-primary p-6 shadow-[0_0_24px_rgb(174_0_255/0.5)] @3xl:flex-row @3xl:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-2 text-white">
          <h2 className="m-0 text-[32px] leading-11 font-black tracking-[-0.75px]">{title}</h2>
          {description && <p className="m-0 text-base leading-6 font-bold whitespace-pre-line">{description}</p>}
        </div>
        <form onSubmit={submit} className="flex min-w-0 flex-1 shadow-[0_2px_8px_rgb(0_0_0/0.25)]">
          <label htmlFor={inputId} className="sr-only">
            {placeholder}
          </label>
          <input
            id={inputId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={placeholder}
            className="h-14 min-w-0 flex-1 rounded-l-lg border border-white bg-white px-4 text-base text-gray-800 placeholder:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />
          <button
            type="submit"
            className="h-14 shrink-0 rounded-r-sooner bg-black px-4 text-base font-medium text-white uppercase outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
