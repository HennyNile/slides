# 李奇隆的 Slides

这个仓库用于集中管理和发布李奇隆制作的网页演示文稿。所有演示共用翻页、全屏、总览和触控操作，但拥有各自独立的 URL、内容、介绍与静态资源。

## 在线目录

[打开 Slides 目录](https://hennynile.github.io/slides/)

## 演示文稿

### 如何读懂一篇计算机论文

<a href="https://hennynile.github.io/slides/how-to-read-paper/">
  <img src="https://hennynile.github.io/slides/decks/how-to-read-paper/thumbnail.png" alt="如何读懂一篇计算机论文缩略图" width="720">
</a>

- 作者：李奇隆
- 页数：29 页，16:9
- URL：[https://hennynile.github.io/slides/how-to-read-paper/](https://hennynile.github.io/slides/how-to-read-paper/)
- 适用对象：计算机系新入学的硕士研究生
- 介绍：从为什么读论文出发，区分了解方向、寻找问题、复现 Baseline 和审稿等阅读需求，并进一步说明如何完整精读一篇计算机论文。“第一遍阅读”部分以 AlayaDB 为例，用论文标题、摘要、引言、结论和关键图表演示如何建立全局理解。

## 仓库结构

```text
app/
├── page.tsx                 # Slides 目录页
└── [slug]/page.tsx          # 每份演示的独立地址
components/
└── deck-player.tsx          # 共用的翻页、全屏和总览播放器
decks/
└── how-to-read-paper/       # 当前演示的正文
lib/
└── decks.ts                 # 演示标题、介绍、缩略图等元数据
public/decks/
└── how-to-read-paper/       # 当前演示使用的图片与 PDF
```

新增演示时，需要：

1. 在 `decks/<slug>/` 中放置演示内容；
2. 在 `public/decks/<slug>/` 中放置缩略图与其他资源；
3. 在 `lib/decks.ts` 中登记标题、作者、介绍和页数；
4. 在 `app/[slug]/page.tsx` 中注册对应演示组件；
5. 在本 README 的“演示文稿”部分补充 URL、缩略图和介绍。

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

- Slides 目录：`http://localhost:3000/`
- 当前演示：`http://localhost:3000/how-to-read-paper/`

## 演示操作

- `←` / `→`、`PageUp` / `PageDown`：前后翻页
- `Space`：下一页
- `Home` / `End`：跳到首页 / 末页
- `O`：打开页码总览
- `F`：进入或退出全屏
- 手机或触控板：左右滑动翻页
- 每一页都有独立地址，例如 `how-to-read-paper/#slide-15`

## 视觉风格

当前演示的视觉语言参考了两份个人 PPT：白底、左对齐大标题、少量强调色、淡色技术框图，以及深青 / 橙色标识线。投影页采用大字号和低信息密度，避免装饰性口号与小字。

## 检查与发布

```bash
npm run lint
npm test
```

`npm run build` 会在 `out/` 生成包含目录页和全部演示的静态站点。推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并更新 GitHub Pages。
