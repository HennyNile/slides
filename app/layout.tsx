import type { Metadata, Viewport } from "next";
import "./globals.css";

const [repositoryOwner = "", repositoryName = ""] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName
  ? `/${repositoryName}`
  : "";
const previewImage = "decks/how-to-read-paper/thumbnail.png";
const metadataBase = process.env.GITHUB_ACTIONS === "true" && repositoryOwner && repositoryName
  ? new URL(`https://${repositoryOwner}.github.io/${repositoryName}/`)
  : new URL("http://localhost:3000/");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "李奇隆的 Slides",
    template: "%s | 李奇隆的 Slides",
  },
  description: "李奇隆的网页演示文稿集合。每份演示提供独立地址、介绍与浏览器演示模式。",
  openGraph: {
    title: "李奇隆的 Slides",
    description: "网页演示文稿集合",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: previewImage,
        width: 1731,
        height: 909,
        alt: "李奇隆的 Slides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "李奇隆的 Slides",
    description: "网页演示文稿集合",
    images: [previewImage],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10161b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
