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
  assert.match(html, /<title>如何读懂并讲清一篇计算机论文<\/title>/i);
  assert.match(html, /网页演示版/);
  assert.match(html, /顶会 Best Paper 阅读方法与 50 分钟报告设计/);
  assert.doesNotMatch(html, /codex-preview|openai\/hosting|react-loading-skeleton/i);

  await access(new URL("out/og-paper-reading.png", root));
  await access(new URL("out/.nojekyll", root));

  const scripts = await collectJavaScript(new URL("out/_next/", root));
  const source = (await Promise.all(scripts.map((file) => readFile(file, "utf8")))).join("\n");
  assert.match(source, /ArrowRight/);
  assert.match(source, /requestFullscreen/);
  assert.match(source, /slide-/);
});
