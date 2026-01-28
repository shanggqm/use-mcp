# MCP 主题网站 - 项目设计文档

## 1. 项目概述

一个关于 MCP (Model Context Protocol) 主题的内容网站，包含文章、资源、案例和视频等内容。

### 1.1 核心需求

- 静态网站，部署到 GitHub Pages
- 支持文章（Markdown/MDX）
- 支持资源列表展示
- 支持案例展示
- 支持视频嵌入
- 易于持续新增内容

## 2. 技术栈

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| 构建工具 | Vite | 快速的开发和构建体验 |
| 框架 | React 18 | 组件化开发 |
| 语言 | TypeScript | 类型安全 |
| 路由 | React Router v6 | 客户端路由 |
| 样式 | TailwindCSS | 原子化 CSS |
| 内容 | MDX | Markdown + JSX 组件 |
| 代码高亮 | Shiki | 语法高亮 |
| 图标 | Lucide React | 图标库 |
| 部署 | GitHub Actions | 自动化部署到 GitHub Pages |

## 3. 目录结构

```
use-mcp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署
│
├── public/
│   ├── favicon.ico
│   └── assets/                 # 静态资源（图片、视频封面等）
│
├── src/
│   ├── components/             # 通用组件
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── common/
│   │   │   ├── Card.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── VideoPlayer.tsx
│   │   └── mdx/                # MDX 自定义组件
│   │       ├── CodeBlock.tsx
│   │       ├── Callout.tsx
│   │       └── index.tsx
│   │
│   ├── pages/                  # 页面组件
│   │   ├── Home.tsx
│   │   ├── Articles.tsx
│   │   ├── ArticleDetail.tsx
│   │   ├── Resources.tsx
│   │   ├── Cases.tsx
│   │   ├── CaseDetail.tsx
│   │   ├── Videos.tsx
│   │   └── About.tsx
│   │
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useContent.ts
│   │   └── useSearch.ts
│   │
│   ├── styles/
│   │   └── globals.css         # 全局样式 + Tailwind
│   │
│   ├── utils/
│   │   ├── content.ts          # 内容加载工具
│   │   └── format.ts           # 格式化工具
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx              # 路由配置
│
├── content/                    # 📝 内容目录（重点！）
│   ├── articles/               # 文章
│   │   ├── _meta.json          # 文章元数据索引
│   │   ├── mcp-introduction/
│   │   │   ├── index.mdx
│   │   │   └── images/
│   │   └── mcp-architecture/
│   │       ├── index.mdx
│   │       └── images/
│   │
│   ├── resources/              # 资源
│   │   └── _data.json          # 资源列表数据
│   │
│   ├── cases/                  # 案例
│   │   ├── _meta.json
│   │   └── case-claude-code/
│   │       ├── index.mdx
│   │       └── images/
│   │
│   └── videos/                 # 视频
│       └── _data.json          # 视频列表数据
│
├── scripts/                    # 构建脚本
│   └── generate-content.ts     # 内容索引生成脚本
│
├── docs/                       # 项目文档
│   └── PROJECT_DESIGN.md
│
├── .gitignore
├── .editorconfig
├── .prettierrc
├── .eslintrc.cjs
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── package.json
└── README.md
```

## 4. 内容管理规范

### 4.1 文章 (Articles)

文章使用 MDX 格式，每篇文章一个文件夹：

```
content/articles/mcp-introduction/
├── index.mdx           # 文章内容
└── images/             # 文章相关图片
    └── cover.png
```

**MDX 文件格式：**

```mdx
---
title: "MCP 协议入门指南"
slug: "mcp-introduction"
description: "全面了解 Model Context Protocol 的基础概念和使用方法"
date: "2025-01-28"
author: "作者名"
tags: ["MCP", "入门", "协议"]
cover: "./images/cover.png"
featured: true
---

# 正文内容

这里是 Markdown 内容，可以使用 JSX 组件...

<Callout type="info">
  这是一个提示框组件
</Callout>
```

### 4.2 资源 (Resources)

资源使用 JSON 管理：

```json
// content/resources/_data.json
{
  "categories": [
    {
      "id": "official",
      "name": "官方资源",
      "icon": "book"
    },
    {
      "id": "tools",
      "name": "工具",
      "icon": "wrench"
    }
  ],
  "items": [
    {
      "id": "mcp-spec",
      "title": "MCP 官方规范",
      "description": "Model Context Protocol 官方规范文档",
      "url": "https://spec.modelcontextprotocol.io",
      "category": "official",
      "tags": ["官方", "规范"],
      "featured": true
    }
  ]
}
```

### 4.3 案例 (Cases)

案例结构与文章类似：

```mdx
---
title: "Claude Code 中的 MCP 应用"
slug: "claude-code-mcp"
description: "解析 Claude Code 如何使用 MCP 协议"
date: "2025-01-28"
tags: ["Claude", "IDE", "实践"]
cover: "./images/cover.png"
difficulty: "中级"
---
```

### 4.4 视频 (Videos)

```json
// content/videos/_data.json
{
  "items": [
    {
      "id": "mcp-intro-video",
      "title": "MCP 协议 10 分钟入门",
      "description": "快速了解 MCP 的核心概念",
      "platform": "youtube",
      "videoId": "xxxxx",
      "thumbnail": "/assets/videos/mcp-intro.jpg",
      "duration": "10:30",
      "date": "2025-01-28",
      "tags": ["入门", "教程"]
    }
  ]
}
```

## 5. 开发规范

### 5.1 代码规范

- **命名**: 组件使用 PascalCase，文件使用 kebab-case
- **组件**: 优先使用函数组件 + Hooks
- **类型**: 所有 Props 必须定义 TypeScript 类型
- **样式**: 使用 TailwindCSS，避免内联样式

### 5.2 Git 提交规范

```
feat: 新增功能
fix: 修复 bug
docs: 文档更新
style: 样式调整
refactor: 代码重构
content: 新增/更新内容
chore: 构建/工具变更
```

### 5.3 内容新增流程

1. **新增文章**: 在 `content/articles/` 下创建文件夹
2. **新增资源**: 编辑 `content/resources/_data.json`
3. **新增案例**: 在 `content/cases/` 下创建文件夹
4. **新增视频**: 编辑 `content/videos/_data.json`

## 6. 部署配置

### GitHub Pages 部署

- 使用 GitHub Actions 自动构建部署
- 分支策略: `main` 分支推送自动部署
- 构建产物部署到 `gh-pages` 分支

## 7. 后续扩展

- [ ] 搜索功能（客户端全文搜索）
- [ ] 标签筛选
- [ ] 暗色模式
- [ ] RSS 订阅
- [ ] 评论系统（Giscus）
- [ ] 国际化支持
