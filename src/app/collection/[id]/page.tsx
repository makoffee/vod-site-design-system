import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalog } from "@/mocks/catalog";
import { CollectionScreen } from "@/screens/CollectionScreen";

export const metadata: Metadata = { title: `${getCatalog("de").collection.title} · Sooner` };

const ids = ["example"];

export function generateStaticParams() {
  return ids.map((id) => ({ id }));
}

export default async function CollectionPage({ params }: PageProps<"/collection/[id]">) {
  const { id } = await params;
  if (!ids.includes(id)) notFound();
  return <CollectionScreen locale="de" />;
}
