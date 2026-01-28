# MCP App 术语对照表 / MCP App Glossary

> 本文档提供中英文术语对照，确保双语版本的一致性

## 核心概念 / Core Concepts

| 中文               | English     | 说明                                                |
| ------------------ | ----------- | --------------------------------------------------- |
| MCP 应用 / MCP App | MCP App     | 运行在 MCP 宿主 iframe 中的交互式 UI 组件           |
| 宿主               | Host        | 运行 MCP 客户端的应用（如 Claude Desktop、ChatGPT） |
| 视图               | View        | 在 iframe 中运行的 UI 组件                          |
| 服务器             | Server      | MCP 服务器，提供工具和资源                          |
| 工具               | Tool        | MCP 原语，让模型执行操作                            |
| 资源               | Resource    | MCP 原语，让模型读取数据                            |
| UI 资源            | UI Resource | 包含 HTML/CSS/JS 的可交互界面                       |

## 协议术语 / Protocol Terms

| 中文         | English                       | 说明                               |
| ------------ | ----------------------------- | ---------------------------------- |
| 协议         | Protocol                      | 通信规范                           |
| 规范         | Specification                 | 技术标准文档                       |
| 元数据       | Metadata                      | 描述数据的数据                     |
| 可见性       | Visibility                    | 工具对 LLM 或 App 的可见范围       |
| 内容安全策略 | Content Security Policy (CSP) | 控制资源加载的安全机制             |
| 设备权限     | Device Permissions            | 摄像头、麦克风等设备访问权限       |
| 宿主上下文   | Host Context                  | 宿主提供的环境信息（主题、尺寸等） |

## 架构术语 / Architecture Terms

| 中文        | English                  | 说明                          |
| ----------- | ------------------------ | ----------------------------- |
| 三层架构    | Three-Layer Architecture | Server → Host → View 架构     |
| 沙箱        | Sandbox                  | iframe 安全隔离机制           |
| 桥接        | Bridge                   | 连接不同层的通信组件          |
| 传输层      | Transport Layer          | 底层通信机制                  |
| JSON-RPC    | JSON-RPC                 | 基于 JSON 的远程过程调用协议  |
| postMessage | postMessage              | iframe 与父窗口通信的 Web API |

## 生命周期术语 / Lifecycle Terms

| 中文     | English           | 说明                   |
| -------- | ----------------- | ---------------------- |
| 发现     | Discovery         | 宿主获取工具列表的阶段 |
| 初始化   | Initialize        | App 启动和握手阶段     |
| 数据交付 | Data Delivery     | 工具输入和结果传递阶段 |
| 交互阶段 | Interactive Phase | 用户与 UI 交互的阶段   |
| 清理     | Teardown          | 资源释放和断开连接阶段 |

## 显示模式 / Display Modes

| 中文   | English                  | 说明                 |
| ------ | ------------------------ | -------------------- |
| 内嵌   | Inline                   | 嵌入对话流的默认模式 |
| 全屏   | Fullscreen               | 全屏覆盖模式         |
| 画中画 | Picture-in-Picture (PiP) | 浮动小窗模式         |

## SDK/API 术语 / SDK/API Terms

| 中文         | English         | 说明                       |
| ------------ | --------------- | -------------------------- |
| App 类       | App Class       | View 端核心类              |
| AppBridge 类 | AppBridge Class | Host 端桥接类              |
| 钩子         | Hooks           | React 函数式组件的状态管理 |
| 回调         | Callback        | 事件处理函数               |
| 通知         | Notification    | 单向消息（无需响应）       |
| 请求         | Request         | 需要响应的消息             |

## 安全术语 / Security Terms

| 中文        | English                | 说明               |
| ----------- | ---------------------- | ------------------ |
| 沙箱隔离    | Sandbox Isolation      | iframe 安全边界    |
| 预声明模板  | Pre-declared Templates | 宿主预审 HTML 内容 |
| 可审计消息  | Auditable Messages     | 可记录的通信日志   |
| 用户同意    | User Consent           | 敏感操作需用户确认 |
| 双层 iframe | Double iframe          | 增强安全的嵌套架构 |

## 开发术语 / Development Terms

| 中文       | English               | 说明                      |
| ---------- | --------------------- | ------------------------- |
| 构建配置   | Build Configuration   | 项目构建设置              |
| 单文件打包 | Single-file Bundling  | 将所有资源内联到一个 HTML |
| 分块加载   | Chunked Loading       | 分批加载大数据集          |
| 流式输入   | Streaming Input       | 渐进式数据传递            |
| 主题同步   | Theme Synchronization | App 与宿主主题保持一致    |
| 响应式设计 | Responsive Design     | 适应不同屏幕尺寸的设计    |

## 生态术语 / Ecosystem Terms

| 中文         | English                                  | 说明                   |
| ------------ | ---------------------------------------- | ---------------------- |
| 客户端       | Client                                   | MCP 客户端（宿主应用） |
| 扩展         | Extension                                | MCP 协议的官方扩展     |
| 工作组       | Working Group                            | MCP 社区工作组         |
| 规范增强提案 | Specification Enhancement Proposal (SEP) | MCP 规范变更提案       |

## 对比术语 / Comparison Terms

| 中文       | English              | 说明                     |
| ---------- | -------------------- | ------------------------ |
| 声明式     | Declarative          | 描述"是什么"而非"怎么做" |
| 命令式     | Imperative           | 描述"怎么做"的具体步骤   |
| 原生组件   | Native Components    | 平台原生 UI 组件         |
| 嵌入式应用 | Embedded Application | 嵌入宿主的完整应用       |
| 组件目录   | Component Catalog    | 预定义的可用组件列表     |

## 缩写词 / Abbreviations

| 缩写  | 全称                               | 中文                            |
| ----- | ---------------------------------- | ------------------------------- |
| MCP   | Model Context Protocol             | 模型上下文协议                  |
| SEP   | Specification Enhancement Proposal | 规范增强提案                    |
| CSP   | Content Security Policy            | 内容安全策略                    |
| PiP   | Picture-in-Picture                 | 画中画                          |
| LLM   | Large Language Model               | 大语言模型                      |
| SDK   | Software Development Kit           | 软件开发工具包                  |
| API   | Application Programming Interface  | 应用程序接口                    |
| URI   | Uniform Resource Identifier        | 统一资源标识符                  |
| DOM   | Document Object Model              | 文档对象模型                    |
| A2UI  | Agent-to-User Interface            | 代理到用户界面（Google 协议）   |
| AG-UI | Agent-User Interface               | 代理用户界面（CopilotKit 协议） |

---

## 翻译注意事项 / Translation Notes

1. **技术术语保留英文**：如 `iframe`、`postMessage`、`JSON-RPC` 等不翻译
2. **API 名称保留原样**：如 `ontoolresult`、`callServerTool` 等
3. **代码注释双语**：代码示例中的注释需要在两个版本中分别使用对应语言
4. **专有名词大小写**：如 MCP、CSS、HTML 等保持原样
5. **版本号和日期格式**：保持一致，如 `2026-01-26`
