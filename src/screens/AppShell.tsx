import type { ReactNode } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Header, type HeaderAuth, type HeaderTab } from "@/components/Header/Header";
import type { Locale } from "@/i18n/locale";
import { footerDe, headerDe } from "@/i18n/de";

export interface AppShellProps {
  active?: HeaderTab | "none";
  /** Account and watchlist pages show the logged-in header. */
  auth?: HeaderAuth;
  /** The key screens are German; the landing page also ships in English. */
  locale?: Locale;
  children: ReactNode;
}

/** Header + page + Footer, as every key screen composes them (Header/Footer instances on the canvas). */
export function AppShell({ active = "none", auth, locale = "de", children }: AppShellProps) {
  const de = locale === "de";
  return (
    <>
      <Header active={active} auth={auth} language={locale} labels={de ? headerDe : undefined} />
      <main className="flex w-full flex-1 flex-col bg-black">{children}</main>
      <Footer {...(de ? footerDe : {})} />
    </>
  );
}

/** Page title on the channels and genres screens: 36px bold, 0.6px tracking. */
export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="m-0 text-[28px] leading-8 font-bold tracking-[0.6px] text-white sm:text-4xl">{children}</h1>;
}
