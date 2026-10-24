import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { AccountSection } from "@/components/AccountNav/AccountNav";
import { AccountScreen } from "@/screens/AccountScreen";

// Production routes: /account, /account/settings, /account/subscriptions, /account/purchases, /account/parental_pin, /account/devices.
const routes: Record<string, AccountSection> = {
  "": "profile",
  settings: "settings",
  subscriptions: "subscriptions",
  purchases: "rentals",
  parental_pin: "parental-pin",
  devices: "devices",
};

export const metadata: Metadata = { title: "Account · Sooner" };

export function generateStaticParams() {
  return Object.keys(routes).map((r) => ({ section: r ? [r] : [] }));
}

export default async function AccountPage({ params }: PageProps<"/account/[[...section]]">) {
  const { section = [] } = await params;
  const id = routes[section.join("/")];
  if (!id) notFound();
  return <AccountScreen section={id} />;
}
