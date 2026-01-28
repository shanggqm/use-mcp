# CLAUDE.md - 项目记忆

## 项目

**use-mcp** - MCP 主题内容网站（文章、资源、案例、视频）

- 技术栈: React + TypeScript + Vite + TailwindCSS + MDX
- 部署: GitHub Pages
- 网址: https://shanggqm.github.io/use-mcp/

## 目录结构

```
use-mcp/
├── src/                # 源代码
├── content/            # 📚 发布内容（提交到 Git）
│   ├── articles/       # 文章
│   ├── resources/      # 资源
│   ├── cases/          # 案例
│   └── videos/         # 视频
├── workspace/          # 🔒 本地工作区（不提交）
│   └── {topic}/        # 按主题自由组织研究资料
└── public/             # 静态资源
```

## 内容工作流

### 简化的 3 步流程：

```
1. 研究     在 workspace/{topic}/ 自由整理资料
2. 生成     /publish-content {topic}  → 生成 _ready/ 待发布内容
3. 发布     npm run publish -- --topic={topic}
```

### 详细说明：

**Step 1: 研究**
- 在 `workspace/` 下创建主题目录，如 `workspace/mcp-app/`
- 自由整理：笔记、抓取的网页、图片、代码等
- 与 AI 对话优化内容

**Step 2: 生成待发布内容**
```
/publish-content mcp-app
```
- 读取 `workspace/mcp-app/` 下所有资料
- 生成 MDX 文章到 `workspace/mcp-app/_ready/index.mdx`
- 手动审查和修改

**Step 3: 发布**
```bash
npm run publish -- --topic=mcp-app
# 或发布为案例
npm run publish -- --topic=mcp-app --type=case
```
- 自动复制到 `content/articles/` 或 `content/cases/`
- 然后 `git commit && git push` 触发部署

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建 |
| `npm run publish -- --topic=xxx` | 发布文章 |
| `npm run publish -- --topic=xxx --type=case` | 发布案例 |

## 当前研究主题

| 主题 | 位置 | 状态 |
|------|------|------|
| mcp-app | `workspace/mcp-app/` | 研究中 |
| mcp-intro | `workspace/mcp-intro/` | 有资料待整理 |
