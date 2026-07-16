"use client";

import { useEffect } from "react";
import { deckCatalog } from "../lib/decks";

export default function Home() {
  useEffect(() => {
    if (/^#slide-\d+$/.test(window.location.hash)) {
      window.location.replace(`./how-to-read-paper/${window.location.hash}`);
    }
  }, []);

  return (
    <main className="catalog-page">
      <div className="catalog-inner">
        <header className="catalog-header">
          <div>
            <h1>Slides</h1>
            <p>李奇隆的网页演示文稿</p>
          </div>
          <span>{deckCatalog.length} 份演示</span>
        </header>

        <section className="catalog-introduction" aria-labelledby="catalog-title">
          <h2 id="catalog-title">演示目录</h2>
          <p>每份演示拥有独立地址、内容介绍和缩略图，可以直接在浏览器中翻页与全屏展示。</p>
        </section>

        <section className="deck-catalog" aria-label="演示文稿列表">
          {deckCatalog.map((deck) => (
            <a className="deck-card" href={`./${deck.slug}/`} key={deck.slug}>
              <div className="deck-thumbnail">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={deck.thumbnail} alt={`${deck.title}缩略图`} />
              </div>
              <div className="deck-card-copy">
                <div className="deck-card-meta">
                  <span>{deck.slideCount} 页</span>
                  <span>{deck.year}</span>
                </div>
                <h3>{deck.title}</h3>
                <p>{deck.description}</p>
                <div className="deck-topics">
                  {deck.topics.map((topic) => <span key={topic}>{topic}</span>)}
                </div>
                <div className="deck-card-footer">
                  <span>{deck.author}</span>
                  <b>打开演示 →</b>
                </div>
              </div>
            </a>
          ))}
        </section>

        <footer className="catalog-footer">李奇隆 · Slides Collection</footer>
      </div>
    </main>
  );
}
