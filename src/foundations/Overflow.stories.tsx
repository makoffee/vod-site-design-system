import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountNav } from "@/components/AccountNav/AccountNav";
import { AccountPanel } from "@/components/AccountPanel/AccountPanel";
import { Button } from "@/components/Button/Button";
import { Chip } from "@/components/Chip/Chip";
import { DetailRow } from "@/components/DetailRow/DetailRow";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { FilmBadge } from "@/components/FilmBadge/FilmBadge";
import { FilmListItem } from "@/components/FilmListItem/FilmListItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { SettingRow } from "@/components/SettingRow/SettingRow";
import { Switch } from "@/components/Switch/Switch";
import { TextAction } from "@/components/TextAction/TextAction";
import { accountNavDe, filmListItemDe } from "@/i18n/de";

// Stress content, not product copy: real long film titles, German labels (German runs ~30% longer than English)
// and values with no break opportunities. Every component must wrap or truncate here without overflowing.
const longTitle = "Die bitteren Tränen der Petra von Kant";
const longEmail = "katharina.mustermann-schmidt@beispiel-universitaet-hamburg.de";
const longId = "338408f2-1011-702e-8f8d-acc226671ba2-338408f2-1011-702e";

function Stress() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader title="Neu im Programm: Filme aus dem Wettbewerb der Berlinale 2026" href="/channel/x" moreLabel="mehr" />
      <div className="flex flex-wrap gap-2">
        <Chip>Rainer Werner Fassbinder</Chip>
        <Chip>Dokumentarfilme über Architektur und Stadtentwicklung</Chip>
        <FilmBadge>Exklusiv bei Sooner</FilmBadge>
      </div>
      <AccountNav active="parental-pin" items={accountNavDe} layout="auto" />
      <AccountPanel variant="rows">
        <DetailRow label="E-Mail" value={longEmail} />
        <DetailRow label="Vor- und Nachname" value="Katharina Mustermann-Schmidt von Hohenstein" action={<TextAction>bearbeiten</TextAction>} />
        <DetailRow label="Benutzer ID" value={longId} compact />
      </AccountPanel>
      <AccountPanel>
        <SettingRow
          title="Newsletter und personalisierte Empfehlungen"
          description="Erhalte Informationen über exklusive Inhalte, Festivalpremieren und Angebote."
          control={<Switch width="hug" label={<span className="sr-only">Newsletter</span>} />}
        />
      </AccountPanel>
      <div className="flex flex-wrap justify-end gap-3">
        <Button size="sm">Passwort ändern</Button>
        <Button size="sm" variant="cta-danger">Account löschen</Button>
      </div>
      <FilmListItem
        {...filmListItemDe}
        title={longTitle}
        href="/film/x"
        director="Rainer Werner Fassbinder"
        meta={["1972", "124 Min.", "Drama", "Melodram", "Deutschland"]}
        synopsis="Die erfolgreiche Modedesignerin Petra von Kant verliebt sich in die junge Karin, die sie zu einem Model aufbauen will. Doch die Beziehung wird zu einem Machtspiel, in dem Petra immer mehr die Kontrolle verliert, während ihre stumme Assistentin Marlene alles beobachtet."
      />
      <EmptyState message={`Keine Ergebnisse für „${longEmail}“`} description="Versuchen Sie einen anderen Titel, Regisseur oder Schauspieler" />
    </div>
  );
}

const meta = {
  title: "Foundations/Overflow",
  // Stress page for people and visual checks; no component of its own.
  tags: ["!manifest"],
  parameters: { layout: "padded" },
  render: () => <Stress />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** 393: the narrowest designed width. */
export const Mobile: Story = { decorators: [(Story) => <div className="w-[361px]"><Story /></div>] };
/** 1024 content column (account pages cap here). */
export const Desktop: Story = { decorators: [(Story) => <div className="w-[1024px]"><Story /></div>] };
