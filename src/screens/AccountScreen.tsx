"use client";

import { AccountNav, accountNavItems, type AccountNavItem, type AccountSection } from "@/components/AccountNav/AccountNav";
import { AccountPageTitle, AccountPanel } from "@/components/AccountPanel/AccountPanel";
import { Button } from "@/components/Button/Button";
import { DetailRow } from "@/components/DetailRow/DetailRow";
import { DeviceCodeForm } from "@/components/DeviceCodeForm/DeviceCodeForm";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { LanguageSelect } from "@/components/LanguageSelect/LanguageSelect";
import { SettingRow } from "@/components/SettingRow/SettingRow";
import { Switch } from "@/components/Switch/Switch";
import { TextAction } from "@/components/TextAction/TextAction";
import { ActionLink } from "@/components/_shared/ActionLink";
import type { Locale } from "@/components/_shared/locale";
import { accountDe, accountNavDe } from "@/i18n/de";
import { AppShell } from "./AppShell";

// English copy from production sooner.de/en/account/*.
export const accountLabels = {
  navLabel: "Account navigation",
  email: "Email",
  name: "Name",
  birthdate: "Date of birth",
  memberId: "Member ID",
  loginMethod: "Login Method",
  location: "Location",
  edit: "Edit",
  add: "Add",
  changePassword: "Change password",
  deleteAccount: "Delete Account",
  language: "Language",
  languageHint: "Interface language",
  newsletter: "Newsletter",
  newsletterHint: "Get information on exclusive content and offers.",
  save: "Save",
  noSubscription: "You do not have an active subscription",
  subscribe: "Subscribe",
  noRentals: "You do not have active purchases",
  parentalControls: "Parental Controls",
  inactive: "Inactive",
  noPin: "No PIN set",
  setPin: "Set my PIN",
  devicesTitle: "Login in other devices",
  devicesHint: "Enter the code shown on your TV or device.",
  devicesPlaceholder: "Enter your code",
  devicesSubmit: "Continue",
};
export type AccountLabels = typeof accountLabels;

export interface AccountProfile {
  email: string;
  name?: string;
  birthdate?: string;
  memberId: string;
  loginMethod: string;
  location: string;
}

// Placeholder account (the production test account shows its member id as the name).
const demoProfile: AccountProfile = {
  email: "name@example.com",
  name: "Jane Doe",
  memberId: "338408f2-1011-702e-8f8d-acc226671ba2",
  loginMethod: "Email",
  location: "DE",
};

export interface AccountScreenProps {
  section?: AccountSection;
  locale?: Locale;
  profile?: AccountProfile;
}

/** Account area (production sooner.de/account/*): logged-in header, section nav beside the content, footer. */
export function AccountScreen({ section = "profile", locale = "de", profile = demoProfile }: AccountScreenProps) {
  const de = locale === "de";
  const l: AccountLabels = de ? { ...accountLabels, ...accountDe } : accountLabels;
  const items: AccountNavItem[] = de ? accountNavDe : accountNavItems;
  const title = items.find((i) => i.id === section)?.label;
  const p = de ? { ...profile, loginMethod: profile.loginMethod === "Email" ? "E-Mail" : profile.loginMethod } : profile;

  return (
    <AppShell auth="logged-in" locale={locale}>
      <div className="@container mx-auto w-full max-w-5xl px-4 pt-8 pb-24">
        <div className="flex flex-col gap-6 @3xl:flex-row @3xl:gap-8">
          <AccountNav active={section} items={items} label={l.navLabel} className="@3xl:sticky @3xl:top-24 @3xl:w-48 @3xl:shrink-0 @3xl:self-start" />
          <section className="flex min-w-0 flex-1 flex-col gap-6">
            <AccountPageTitle>{title}</AccountPageTitle>
            {section === "profile" && (
              <>
                <AccountPanel variant="rows">
                  <DetailRow label={l.email} value={p.email} />
                  <DetailRow label={l.name} value={p.name} action={<TextAction label={`${l.edit} ${l.name}`}>{l.edit}</TextAction>} />
                  <DetailRow label={l.birthdate} value={p.birthdate} placeholder={l.birthdate} action={<TextAction label={`${l.add} ${l.birthdate}`}>{l.add}</TextAction>} />
                  <DetailRow label={l.memberId} value={p.memberId} compact />
                  <DetailRow label={l.loginMethod} value={p.loginMethod} />
                  <DetailRow label={l.location} value={p.location} />
                </AccountPanel>
                <div className="flex flex-wrap justify-end gap-3">
                  <Button size="sm">{l.changePassword}</Button>
                  <Button size="sm" variant="cta-danger">{l.deleteAccount}</Button>
                </div>
              </>
            )}
            {section === "settings" && (
              <>
                <AccountPanel>
                  <SettingRow title={l.language} description={l.languageHint} control={<LanguageSelect defaultValue={locale} label={l.language} />} />
                  <SettingRow title={l.newsletter} description={l.newsletterHint} control={<Switch width="hug" label={<span className="sr-only">{l.newsletter}</span>} />} />
                </AccountPanel>
                <div>
                  <Button size="sm" disabled>{l.save}</Button>
                </div>
              </>
            )}
            {section === "subscriptions" && (
              <EmptyState message={l.noSubscription} action={<ActionLink label={l.subscribe} href="/subscribe" />} />
            )}
            {section === "rentals" && <EmptyState message={l.noRentals} />}
            {section === "parental-pin" && (
              <AccountPanel className="gap-4">
                <SettingRow title={l.parentalControls} description={l.inactive} />
                <SettingRow divided title={l.noPin} control={<TextAction size="sm">{l.setPin}</TextAction>} />
              </AccountPanel>
            )}
            {section === "devices" && (
              <DeviceCodeForm title={l.devicesTitle} description={l.devicesHint} placeholder={l.devicesPlaceholder} submitLabel={l.devicesSubmit} />
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
