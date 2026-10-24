import { FileQuestion } from "lucide-react";
import { ActionLink } from "@/components/_shared/ActionLink";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { statesDe } from "@/i18n/de";
import { AppShell } from "./AppShell";

/** 404 (production strings "The page could not be found" / "We can't find the page you're looking for", link Home). */
export function NotFoundScreen() {
  return (
    <AppShell>
      <div className="@container flex flex-1 flex-col items-center justify-center px-6 pt-8 pb-24">
        <EmptyState
          surface="plain"
          icon={<FileQuestion strokeWidth={1.5} aria-hidden />}
          message={statesDe.notFound}
          description={statesDe.notFoundHint}
          action={<ActionLink label={statesDe.home} href="/" />}
          className="max-w-md"
        />
      </div>
    </AppShell>
  );
}

/** A route that failed to render (production "Something went wrong"). There is no production retry label, so it links Home. */
export function ErrorScreen() {
  return (
    <AppShell>
      <div className="@container flex flex-1 flex-col items-center justify-center px-6 pt-8 pb-24">
        <EmptyState surface="plain" tone="error" message={statesDe.error} action={<ActionLink label={statesDe.home} href="/" />} className="max-w-md" />
      </div>
    </AppShell>
  );
}
