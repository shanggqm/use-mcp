# Use MCP

探索 Model Context Protocol (MCP) 的主题网站 - 文章、资源、案例与视频。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
use-mcp/
├── src/                  # 源代码
│   ├── components/       # React 组件
│   ├── pages/           # 页面组件
│   ├── hooks/           # 自定义 Hooks
│   └── styles/          # 样式文件
├── content/             # 内容目录
│   ├── articles/        # 文章 (MDX)
│   ├── resources/       # 资源列表
│   ├── cases/           # 案例 (MDX)
│   └── videos/          # 视频列表
├── public/              # 静态资源
└── docs/                # 项目文档
```

## 📝 添加内容

### 新增文章

1. 在 `content/articles/` 下创建文件夹
2. 创建 `index.mdx` 文件，包含 frontmatter 和内容
3. 图片放在同目录的 `images/` 文件夹

### 新增资源

编辑 `content/resources/_data.json`

### 新增案例

在 `content/cases/` 下创建文件夹，结构同文章

### 新增视频

编辑 `content/videos/_data.json`

## 🛠 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite
- **样式**: TailwindCSS
- **内容**: MDX
- **部署**: GitHub Pages

## 📄 License

MIT
