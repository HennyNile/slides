import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { PaperReadingPresentation } from "../../decks/how-to-read-paper/presentation";
import { deckCatalog, getDeckMetadata } from "../../lib/decks";

type DeckPageProps = {
  params: Promise<{ slug: string }>;
};

const deckComponents: Record<string, ComponentType> = {
  "how-to-read-paper": PaperReadingPresentation,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return deckCatalog.map((deck) => ({ slug: deck.slug }));
}

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const { slug } = await params;
  const deck = getDeckMetadata(slug);
  if (!deck) return {};

  return {
    title: deck.title,
    description: deck.description,
    openGraph: {
      title: deck.title,
      description: deck.description,
      type: "website",
      locale: "zh_CN",
      images: [
        {
          url: deck.thumbnail,
          width: 1731,
          height: 909,
          alt: `${deck.title}缩略图`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: deck.title,
      description: deck.description,
      images: [deck.thumbnail],
    },
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { slug } = await params;
  const DeckComponent = deckComponents[slug];
  if (!DeckComponent || !getDeckMetadata(slug)) notFound();

  return <DeckComponent />;
}
