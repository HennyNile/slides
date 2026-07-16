import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function collectJavaScript(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) files.push(...await collectJavaScript(child));
    else if (entry.name.endsWith(".js")) files.push(child);
  }
  return files;
}

test("exports a multi-deck static site for GitHub Pages", async () => {
  const catalogHtml = await readFile(new URL("out/index.html", root), "utf8");
  const deckHtml = await readFile(new URL("out/how-to-read-paper/index.html", root), "utf8");
  const readme = await readFile(new URL("README.md", root), "utf8");

  assert.match(catalogHtml, /<html lang="zh-CN">/i);
  assert.match(catalogHtml, /<title>李奇隆的 Slides<\/title>/i);
  assert.match(catalogHtml, /演示目录/);
  assert.match(catalogHtml, /如何读懂一篇计算机论文/);
  assert.match(catalogHtml, /how-to-read-paper/);
  assert.match(catalogHtml, /decks\/how-to-read-paper\/thumbnail\.png/);
  assert.doesNotMatch(catalogHtml, /\/slides\/slides\//);
  assert.match(deckHtml, /<title>如何读懂一篇计算机论文 \| 李奇隆的 Slides<\/title>/i);
  assert.match(deckHtml, /网页演示版/);
  assert.match(deckHtml, /李奇隆/);
  assert.doesNotMatch(`${catalogHtml}\n${deckHtml}`, /codex-preview|openai\/hosting|react-loading-skeleton/i);
  assert.match(readme, /https:\/\/hennynile\.github\.io\/slides\/how-to-read-paper\//);
  assert.match(readme, /https:\/\/hennynile\.github\.io\/slides\/decks\/how-to-read-paper\/thumbnail\.png/);
  assert.match(readme, /作者：李奇隆/);

  await access(new URL("out/decks/how-to-read-paper/thumbnail.png", root));
  await access(new URL("out/decks/how-to-read-paper/field-map-ai4db.png", root));
  await access(new URL("out/decks/how-to-read-paper/field-map-ai4db.pdf", root));
  await access(new URL("out/decks/how-to-read-paper/alayadb-system-overview.png", root));
  await access(new URL("out/decks/how-to-read-paper/alayadb-quality-memory.png", root));
  await access(new URL("out/.nojekyll", root));

  const scripts = await collectJavaScript(new URL("out/_next/", root));
  const source = (await Promise.all(scripts.map((file) => readFile(file, "utf8")))).join("\n");
  assert.match(source, /全部 Slides/);
  assert.match(source, /Slides Collection/);
  assert.match(source, /location\.replace/);
  assert.match(source, /写作引用 \/ Baseline/);
  assert.match(source, /审稿与评价/);
  assert.match(source, /先定义阅读任务，再打开 PDF/);
  assert.match(source, /了解研究方向、寻找科研问题、复现论文 Baseline/);
  assert.match(source, /领域地图示例：人工智能赋能数据库/);
  assert.match(source, /decks\/how-to-read-paper\/field-map-ai4db\.png/);
  assert.doesNotMatch(source, /href:\"field-map-ai4db\.pdf\"/);
  assert.match(source, /寻找科研问题：从差异和边界中找空白/);
  assert.match(source, /复现论文 Baseline：围绕可复现性阅读/);
  assert.match(source, /审稿：按评审问题系统阅读/);
  assert.match(source, /研究方向进展、takeaways、复现方案/);
  assert.match(source, /这篇论文能否作为我的 Baseline/);
  assert.match(source, /AlayaDB:/);
  assert.match(source, /Data Foundation/);
  assert.match(source, /Efficient and Effective/);
  assert.match(source, /Long-context LLM Inference/);
  assert.match(source, /摘要：在原文中标出问题、方法与证据/);
  assert.match(source, /引言：继续从原文补齐方法链/);
  assert.match(source, /existing systems cannot simultaneously optimize the three aforementioned performance metrics/);
  assert.match(source, /handles sparse attention computation as a vector search query/);
  assert.match(source, /dynamic inner product range query \(DIPR\)/);
  assert.match(source, /co-optimizing attention computation and KV cache management/);
  assert.doesNotMatch(source, /co-attention/i);
  assert.doesNotMatch(source, /“fewer hardware resources” \+ “higher generation quality”/);
  assert.match(source, /结论：核对作者最终声称了什么/);
  assert.match(source, /图表：检查“系统结构—核心结果”/);
  assert.match(source, /decks\/how-to-read-paper\/alayadb-system-overview\.png/);
  assert.match(source, /decks\/how-to-read-paper\/alayadb-quality-memory\.png/);
  assert.match(source, /精读的核心：重建完整论证/);
  assert.match(source, /一页精读总结与独立判断/);
  assert.doesNotMatch(source, /论文卡/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /requestFullscreen/);
  assert.match(source, /slide-/);
});
