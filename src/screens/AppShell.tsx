import type { ReactNode } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Header, type HeaderTab } from "@/components/Header/Header";
import { headerDe } from "@/i18n/de";

export interface AppShellProps {
  active?: HeaderTab | "none";
  children: ReactNode;
}

/** Header + page + Footer, as every key screen composes them (Header/Footer instances on the canvas). */
export function AppShell({ active = "none", children }: AppShellProps) {
  return (
    <>
      <Header active={active} language="de" labels={headerDe} />
      <main className="flex w-full flex-1 flex-col bg-black">{children}</main>
      <Footer locale="de" />
    </>
  );
}

/** Page title on the channels and genres screens: 36px bold, 0.6px tracking. */
export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="m-0 text-[28px] leading-8 font-bold tracking-[0.6px] text-white sm:text-4xl">{children}</h1>;
}
