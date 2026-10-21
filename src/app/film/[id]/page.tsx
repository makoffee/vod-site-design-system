import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marieAntoinette } from "@/mocks/catalog";
import { FilmScreen } from "@/screens/FilmScreen";

// Demo catalog: only the design's film page has details until the catalog API is connected.
const films = { [marieAntoinette.id]: marieAntoinette };

export function generateStaticParams() {
  return Object.keys(films).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/film/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: `${films[id]?.title ?? "Film"} · Sooner` };
}

export default async function FilmPage({ params }: PageProps<"/film/[id]">) {
  const { id } = await params;
  const film = films[id];
  if (!film) notFound();
  return <FilmScreen film={film} />;
}
