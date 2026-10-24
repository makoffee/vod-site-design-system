import { FileQuestion } from "lucide-react";
import { ActionLink } from "@/components/_shared/ActionLink";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { statesDe } from "@/i18n/de";
import type { Locale } from "@/i18n/locale";
import { AppShell } from "./AppShell";

/** Production strings (en): page not found, a failed load, link Home. */
const statesEn = {
  error: "Something went wrong",
  notFound: "The page could not be found",
  notFoundHint: "We can't find the page you're looking for",
  home: "Home",
};

export interface StatusScreenProps {
  /** Screen language: English (default, Storybook) or German (the app's not-found and error pages). */
  locale?: Locale;
}

/** 404 (production strings "The page could not be found" / "We can't find the page you're looking for", link Home). */
export function NotFoundScreen({ locale = "en" }: StatusScreenProps) {
  const t = locale === "de" ? statesDe : statesEn;
  return (
    <AppShell locale={locale}>
      <div className="@container flex flex-1 flex-col items-center justify-center px-6 pt-8 pb-24">
        <EmptyState
          surface="plain"
          icon={<FileQuestion strokeWidth={1.5} aria-hidden />}
          message={t.notFound}
          description={t.notFoundHint}
          action={<ActionLink label={t.home} href="/" />}
          className="max-w-md"
        />
      </div>
    </AppShell>
  );
}

/** A route that failed to render (production "Something went wrong"). There is no production retry label, so it links Home. */
export function ErrorScreen({ locale = "en" }: StatusScreenProps) {
  const t = locale === "de" ? statesDe : statesEn;
  return (
    <AppShell locale={locale}>
      <div className="@container flex flex-1 flex-col items-center justify-center px-6 pt-8 pb-24">
        <EmptyState surface="plain" tone="error" message={t.error} action={<ActionLink label={t.home} href="/" />} className="max-w-md" />
      </div>
    </AppShell>
  );
}
