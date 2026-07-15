import type { Metadata, Viewport } from "next";
import "./globals.css";

const [repositoryOwner = "", repositoryName = ""] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName
  ? `/${repositoryName}`
  : "";
const previewImage = `${basePath}/og-paper-reading.png`;
const metadataBase = process.env.GITHUB_ACTIONS === "true" && repositoryOwner && repositoryName
  ? new URL(`https://${repositoryOwner}.github.io/${repositoryName}/`)
  : new URL("http://localhost:3000/");

export const metadata: Metadata = {
  metadataBase,
  title: "如何读懂并讲清一篇计算机论文",
  description: "面向计算机专业学生的顶会 Best Paper 阅读方法与 50 分钟报告设计。",
  openGraph: {
    title: "如何读懂并讲清一篇计算机论文",
    description: "顶会 Best Paper 阅读方法与 50 分钟报告设计",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: previewImage,
        width: 1731,
        height: 909,
        alt: "计算机论文阅读与报告的技术工作台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "如何读懂并讲清一篇计算机论文",
    description: "顶会 Best Paper 阅读方法与 50 分钟报告设计",
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
