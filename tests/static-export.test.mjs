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

test("exports a complete static presentation for GitHub Pages", async () => {
  const indexUrl = new URL("out/index.html", root);
  const html = await readFile(indexUrl, "utf8");

  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>如何读懂一篇计算机论文<\/title>/i);
  assert.match(html, /网页演示版/);
  assert.match(html, /为什么读、按需求选择读法，以及如何精读/);
  assert.doesNotMatch(html, /codex-preview|openai\/hosting|react-loading-skeleton/i);

  await access(new URL("out/og-paper-reading.png", root));
  await access(new URL("out/field-map-ai4db.png", root));
  await access(new URL("out/field-map-ai4db.pdf", root));
  await access(new URL("out/alayadb-system-overview.png", root));
  await access(new URL("out/alayadb-quality-memory.png", root));
  await access(new URL("out/.nojekyll", root));

  const scripts = await collectJavaScript(new URL("out/_next/", root));
  const source = (await Promise.all(scripts.map((file) => readFile(file, "utf8")))).join("\n");
  assert.match(source, /写作引用 \/ Baseline/);
  assert.match(source, /审稿与评价/);
  assert.match(source, /先定义阅读任务，再打开 PDF/);
  assert.match(source, /了解研究方向、寻找科研问题、复现论文 Baseline/);
  assert.match(source, /领域地图示例：人工智能赋能数据库/);
  assert.match(source, /field-map-ai4db\.png/);
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
  assert.match(source, /摘要：填出“问题—方法—证据”/);
  assert.match(source, /引言：定位“背景—路线—缺口—方案”/);
  assert.match(source, /结论：核对作者最终声称了什么/);
  assert.match(source, /图表：检查“系统结构—核心结果”/);
  assert.match(source, /alayadb-system-overview\.png/);
  assert.match(source, /alayadb-quality-memory\.png/);
  assert.match(source, /精读的核心：重建完整论证/);
  assert.match(source, /一页精读总结与独立判断/);
  assert.doesNotMatch(source, /论文卡/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /requestFullscreen/);
  assert.match(source, /slide-/);
});
