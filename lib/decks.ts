export type DeckMetadata = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  author: string;
  year: string;
  slideCount: number;
  thumbnail: string;
  topics: readonly string[];
};

export const paperReadingMetadata = {
  slug: "how-to-read-paper",
  title: "如何读懂一篇计算机论文",
  shortTitle: "计算机论文阅读方法",
  description: "面向计算机系硕士新生，从阅读目的、不同需求下的读法到完整精读方法；并以 AlayaDB 为例，演示如何在第一遍阅读中建立全局理解。",
  author: "李奇隆",
  year: "2026",
  slideCount: 29,
  thumbnail: "decks/how-to-read-paper/thumbnail.png",
  topics: ["论文阅读", "硕士新生", "计算机科学"],
} as const satisfies DeckMetadata;

export const deckCatalog = [paperReadingMetadata] as const satisfies readonly DeckMetadata[];

export function getDeckMetadata(slug: string) {
  return deckCatalog.find((deck) => deck.slug === slug);
}
