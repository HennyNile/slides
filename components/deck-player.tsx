"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type SlideSpec = {
  section: string;
  title: string;
  body: ReactNode;
  className?: string;
  cover?: boolean;
};

export type DeckSpec = {
  mark: string;
  identityTitle: string;
  identitySubtitle: string;
  slides: readonly SlideSpec[];
};

function Slide({
  spec,
  index,
  total,
}: {
  spec: SlideSpec;
  index: number;
  total: number;
}) {
  if (spec.cover) {
    return (
      <article className="slide cover-slide" aria-label={`第 ${index + 1} 页：${spec.title}`}>
        <div className="cover-rule"><span /><i /></div>
        {spec.body}
        <div className="cover-page">{String(index + 1).padStart(2, "0")}</div>
      </article>
    );
  }

  return (
    <article
      className={`slide content-slide ${spec.className ?? ""}`}
      aria-label={`第 ${index + 1} 页：${spec.title}`}
    >
      <header className="slide-header">
        <p>{spec.section}</p>
        <h1>{spec.title}</h1>
      </header>
      <div className="signature-rule"><span /><i /></div>
      <div className="slide-body">{spec.body}</div>
      <footer className="slide-footer">
        <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </footer>
    </article>
  );
}

export function DeckPlayer({ deck }: { deck: DeckSpec }) {
  const { slides } = deck;
  const slideCount = slides.length;
  const [current, setCurrent] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);

  const goTo = useCallback((target: number) => {
    const bounded = Math.max(0, Math.min(slideCount - 1, target));
    setCurrent(bounded);
    window.history.replaceState(null, "", `#slide-${bounded + 1}`);
  }, [slideCount]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await deckRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      const result = window.location.hash.match(/slide-(\d+)/);
      if (result) {
        setCurrent(Math.max(0, Math.min(slideCount - 1, Number(result[1]) - 1)));
      }
    };
    queueMicrotask(onHash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [slideCount]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, button")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slideCount - 1);
      } else if (event.key.toLowerCase() === "o") {
        setOverviewOpen((open) => !open);
      } else if (event.key.toLowerCase() === "f") {
        void toggleFullscreen();
      } else if (event.key === "Escape") {
        setOverviewOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, next, previous, slideCount, toggleFullscreen]);

  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const onPointerDown = (event: ReactPointerEvent) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) next();
    else previous();
  };

  const progress = ((current + 1) / slideCount) * 100;

  return (
    <main className="presentation-shell" ref={deckRef}>
      <div className="presentation-topbar">
        <div className="deck-identity">
          <span className="deck-mark">{deck.mark}</span>
          <div><b>{deck.identityTitle}</b><small>{deck.identitySubtitle}</small></div>
        </div>
        <div className="presentation-topbar-actions">
          <a className="deck-catalog-link" href="../">全部 Slides</a>
          <div className="keyboard-hint">← → 翻页 · O 总览 · F 全屏</div>
        </div>
      </div>

      <section
        className="slide-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-live="polite"
      >
        <div className="slide-animation" key={current}>
          <Slide spec={slides[current]} index={current} total={slideCount} />
        </div>
        <button className="stage-hit stage-hit-left" onClick={previous} disabled={current === 0} aria-label="上一页" />
        <button className="stage-hit stage-hit-right" onClick={next} disabled={current === slideCount - 1} aria-label="下一页" />
      </section>

      <nav className="presentation-controls" aria-label="演示文稿控制">
        <button onClick={previous} disabled={current === 0} aria-label="上一页"><span aria-hidden="true">←</span><small>上一页</small></button>
        <button className="overview-button" onClick={() => setOverviewOpen(true)}>
          <span>{String(current + 1).padStart(2, "0")}</span>
          <small>/ {String(slideCount).padStart(2, "0")} · 总览</small>
        </button>
        <button onClick={next} disabled={current === slideCount - 1} aria-label="下一页"><small>下一页</small><span aria-hidden="true">→</span></button>
        <button className="fullscreen-button" onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "退出全屏" : "进入全屏"}>
          <span aria-hidden="true">{isFullscreen ? "⊡" : "⛶"}</span>
          <small>{isFullscreen ? "退出" : "全屏"}</small>
        </button>
      </nav>
      <div className="progress-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      {overviewOpen && (
        <div className="overview" role="dialog" aria-modal="true" aria-label="幻灯片总览">
          <div className="overview-head">
            <div><p>幻灯片总览</p><h2>选择要跳转的页面</h2></div>
            <button onClick={() => setOverviewOpen(false)} aria-label="关闭总览">×</button>
          </div>
          <div className="overview-grid">
            {slides.map((slide, index) => (
              <button
                className={index === current ? "active" : ""}
                key={`${slide.title}-${index}`}
                onClick={() => { goTo(index); setOverviewOpen(false); }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{slide.section}</small>
                <b>{slide.title}</b>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
