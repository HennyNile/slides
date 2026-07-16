# 如何读懂一篇计算机论文：网页演示

这是一个 29 页、16:9 的网页演示，面向计算机系新入学的硕士研究生，主题是如何阅读计算机论文。

内容按三部分组织：

1. 为什么读论文；
2. 不同阅读需求以及对应的阅读方式；
3. 如何完整精读一篇论文。

顶会 Best Paper 与 50 分钟分享仅作为最后的后续实践安排，不是本演示的主体。

“第一遍阅读”部分以 AlayaDB 论文为例，用标题、摘要、引言、结论和关键图表演示如何建立全局理解。

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000/`。

## 演示操作

- `←` / `→`、`PageUp` / `PageDown`：前后翻页
- `Space`：下一页
- `Home` / `End`：跳到首页 / 末页
- `O`：打开页码总览
- `F`：进入或退出全屏
- 手机或触控板：左右滑动翻页
- 每一页都有独立地址，例如 `#slide-15`

## 内容与样式

- 演示正文：`app/presentation.tsx`
- 全部视觉样式：`app/globals.css`
- 页面元数据：`app/layout.tsx`
- 分享预览图：`public/og-paper-reading.png`

视觉语言参考了 `../个人风格ppt/` 下的两份个人 PPT：白底、左对齐大标题、少量强调色、淡色技术框图，以及深青 / 橙色标识线。投影页采用大字号和低信息密度，避免装饰性口号与小字。

## 本地检查

```bash
npm run lint
npm test
```

`npm run build` 会在 `out/` 生成完全静态的网页，可直接放到任意静态托管服务。

## GitHub Pages

项目已经包含 `.github/workflows/deploy-pages.yml`。把本目录推送到 GitHub 仓库的 `main` 分支后：

1. 在仓库 `Settings → Pages` 中，把 Source 设为 `GitHub Actions`。
2. 推送或手动运行 `Deploy GitHub Pages` 工作流。
3. 工作流会构建 `out/` 并发布 Pages 地址。

工作流采用 GitHub 官方 Pages actions，且会自动适配仓库子路径。
