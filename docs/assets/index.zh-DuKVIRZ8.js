import{j as n}from"./index-DBorfdJG.js";const t={title:"一文彻底搞懂 MCP App：从协议规范到实战开发",description:"深入解析 MCP App 架构设计、协议规范、SDK API 和最佳实践，帮助开发者全面理解如何为 AI Agent 构建交互式 UI",date:"2026-01-28",tags:["MCP","AI Agent","UI","SDK","Protocol"],lang:"zh",author:"use-mcp.dev"};function r(s){const e={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"太长不看"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"MCP App 是什么"}),"：运行在 MCP 宿主 iframe 中的交互式 UI 组件，让 AI Agent 能够返回可视化界面而非纯文本"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"核心公式"}),"：MCP App = Tool + UI Resource，通过 ",n.jsx(e.code,{children:"_meta.ui.resourceUri"})," 将工具与 UI 资源关联"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"多层安全"}),"：iframe 沙箱隔离 + CSP 内容安全策略 + 权限声明 + 用户同意机制"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"广泛支持"}),"：Claude、ChatGPT、VS Code、Goose 等主流客户端已支持，首次实现跨平台 UI 体验"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"生态意义"}),'：打破"纯文本响应"范式，推动 AI Agent 生态从工具调用升级为完整应用平台']}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"引言"}),`
`,n.jsxs(e.p,{children:["2026 年 1 月 26 日，MCP 官方正式发布了 MCP Apps 1.0 稳定版。这是 MCP 协议的",n.jsx(e.strong,{children:"第一个官方扩展"}),'，标志着 AI Agent 生态从"工具调用"正式迈入"应用平台"时代。']}),`
`,n.jsxs(e.p,{children:["想象这样一个场景：你让 AI 帮你分析销售数据，传统的 MCP 工具会返回一堆 JSON 数据或文本表格，你需要复制到 Excel 或其他工具中才能可视化。而有了 MCP App，AI 可以直接在对话中渲染一个",n.jsx(e.strong,{children:"交互式仪表盘"}),"——你可以悬停查看详情、点击筛选数据、拖拽调整图表，所有操作都在对话窗口内完成。"]}),`
`,n.jsx(e.p,{children:"这不是科幻，这是 MCP App 正在做的事情。"}),`
`,n.jsx(e.p,{children:"本文将带你深入理解 MCP App 的方方面面：从诞生背景到架构设计，从协议规范到 SDK API，从安全模型到实战开发，一篇文章帮你彻底搞懂 MCP App。"}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第一部分：背景与动机"}),`
`,n.jsx(e.h3,{children:"1.1 MCP 协议的局限性"}),`
`,n.jsx(e.p,{children:"Model Context Protocol (MCP) 在设计之初，主要解决的是 AI 模型与外部数据/工具的连接问题。MCP 定义了三种核心原语："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Tools（工具）"}),"：让模型能够执行操作"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Resources（资源）"}),"：让模型能够读取数据"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Prompts（提示词）"}),"：让模型能够使用预设的提示模板"]}),`
`]}),`
`,n.jsxs(e.p,{children:["然而，MCP 原本只支持",n.jsx(e.strong,{children:"文本和结构化数据"}),"的交换。当工具需要可视化展示或复杂用户输入时，宿主必须自行构建渲染逻辑。这导致了一个尴尬的局面："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`用户: "帮我生成一个销售数据饼图"
Agent: "好的，这是数据：{sales: [{region: '华东', value: 3500}, ...]}，
        您可以复制到 Excel 或 ECharts 中生成图表"
`})}),`
`,n.jsx(e.p,{children:"开发者被迫创建各种 ad-hoc 解决方案，导致生态碎片化——每个宿主有自己的 UI 扩展方式，互不兼容。"}),`
`,n.jsx(e.h3,{children:"1.2 社区需求的演进"}),`
`,n.jsx(e.p,{children:'社区对"UI over MCP"的需求早已显现：'}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Working Group Issue #35"}),'：2025 年中，社区在 MCP 工作组提出了 "UI Component Integration in MCP Responses" RFC，讨论如何在 MCP 响应中集成 UI 组件。']}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"MCP-UI 社区项目"}),"：由 Ido Salomon 和 Liad Yosef 创建的 ",n.jsx(e.a,{href:"https://mcpui.dev/",children:"MCP-UI"})," 项目，在官方规范出台前就已积累了 4.2k+ stars，成为事实上的先行探索者。"]}),`
`,n.jsx(e.p,{children:"社区的主要诉求包括："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"交互式表单、按钮、多步工作流"}),`
`,n.jsx(e.li,{children:"实时数据可视化（图表、仪表盘）"}),`
`,n.jsx(e.li,{children:"配置向导（多选项、条件依赖）"}),`
`,n.jsx(e.li,{children:"富媒体查看器（PDF、3D 模型、视频）"}),`
`]}),`
`,n.jsx(e.h3,{children:"1.3 Anthropic 与 OpenAI 的合作"}),`
`,n.jsx(e.p,{children:"2025 年 11 月，MCP 团队发布了 MCP Apps 的首次公开预览，整合了两个重要的外部贡献："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"MCP-UI 社区项目"}),"：提供了 UI 资源的基础模式"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"OpenAI Apps SDK"}),"：ChatGPT 的 Widget 机制为协议设计提供了参考"]}),`
`]}),`
`,n.jsxs(e.p,{children:["经过数月的迭代，2026 年 1 月 26 日，MCP Apps 1.0 正式发布。这是一个罕见的",n.jsx(e.strong,{children:"跨公司协作"}),"案例——Anthropic、OpenAI、Block、Microsoft 等公司共同参与了规范的制定和实现。"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第二部分：核心概念与架构"}),`
`,n.jsx(e.h3,{children:"2.1 什么是 MCP App"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"官方定义"}),"：MCP App 是运行在 MCP 宿主 iframe 中的交互式 UI 组件。"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"核心公式"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`MCP App = Tool + UI Resource
`})}),`
`,n.jsx(e.p,{children:"一个 MCP App 由两部分组成："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Tool（工具）"}),"：声明了 ",n.jsx(e.code,{children:"_meta.ui.resourceUri"})," 字段，指向 UI 资源"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"UI Resource（UI 资源）"}),"：包含 HTML/CSS/JS 的可交互界面"]}),`
`]}),`
`,n.jsx(e.p,{children:"与传统 Web 应用的关键区别："}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"特性"}),n.jsx(e.th,{children:"传统 Web 应用"}),n.jsx(e.th,{children:"MCP App"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"上下文"})}),n.jsx(e.td,{children:"独立页面，跳出对话"}),n.jsx(e.td,{children:"嵌入对话流，保持上下文"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"数据流"})}),n.jsx(e.td,{children:"需自建 API、认证"}),n.jsx(e.td,{children:"可直接调用 MCP 服务器工具"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"集成能力"})}),n.jsx(e.td,{children:"需单独实现各种集成"}),n.jsx(e.td,{children:"可委托宿主调用已连接的能力"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"安全隔离"})}),n.jsx(e.td,{children:"完全信任或完全隔离"}),n.jsx(e.td,{children:"iframe 沙箱 + CSP 精细控制"})]})]})]}),`
`,n.jsx(e.h3,{children:"2.2 三层架构"}),`
`,n.jsx(e.p,{children:"MCP App 的架构分为三层："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`┌─────────────────────────────────────────────────────┐
│                    MCP Server                        │
│  - registerAppTool(): 注册带 UI 的工具                │
│  - registerAppResource(): 注册 UI 资源               │
│  - 处理工具调用，返回结构化数据                        │
└───────────────────────┬─────────────────────────────┘
                        │ MCP Protocol (JSON-RPC)
                        ▼
┌─────────────────────────────────────────────────────┐
│                    Host (AppBridge)                  │
│  - 连接真实 MCP 服务器                               │
│  - 管理 iframe 沙箱                                  │
│  - 转发请求/响应                                     │
│  - 发送工具输入/结果给 View                          │
└───────────────────────┬─────────────────────────────┘
                        │ postMessage (JSON-RPC)
                        ▼
┌─────────────────────────────────────────────────────┐
│                    View (App 类)                     │
│  - 运行在 iframe 中                                  │
│  - 接收工具输入和结果                                │
│  - 可调用服务器工具                                  │
│  - 可发送消息到对话                                  │
└─────────────────────────────────────────────────────┘
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"三层职责"}),"："]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Server 层"}),"：MCP 服务器，负责注册工具、处理业务逻辑、返回数据"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Host 层"}),"：宿主应用（如 Claude Desktop），负责连接服务器、管理沙箱、转发消息"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"View 层"}),"：UI 组件，运行在 iframe 中，负责渲染界面、处理用户交互"]}),`
`]}),`
`,n.jsx(e.h3,{children:"2.3 生命周期"}),`
`,n.jsx(e.p,{children:"一个 MCP App 的完整生命周期如下："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`1. Discovery（发现）
   └── Host 获取工具列表，识别带 _meta.ui.resourceUri 的工具

2. Initialize（初始化）
   └── Host 渲染 iframe
   └── View 发送 ui/initialize 握手请求
   └── Host 返回上下文和能力信息

3. Data Delivery（数据交付）
   └── Host 发送 tool-input 通知（工具输入参数）
   └── Host 发送 tool-result 通知（工具执行结果）

4. Interactive（交互阶段）
   └── 用户与 View 交互
   └── View 可调用服务器工具
   └── View 可更新模型上下文

5. Teardown（清理）
   └── Host 发送 ui/resource-teardown
   └── View 清理资源、断开连接
`})}),`
`,n.jsx(e.h3,{children:"2.4 URI 方案与 MIME 类型"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"UI Resource URI"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`ui://server-name/resource-path.html
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"ui://"})," 是 MCP App 专用的 URI 方案，告诉宿主这是一个需要在 iframe 中渲染的 UI 资源。"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"MIME Type"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`text/html;profile=mcp-app
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"profile=mcp-app"})," 参数传达了额外的语义约束——这不是普通的 HTML 页面，而是一个符合 MCP App 协议的交互式组件。"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第三部分：协议规范详解"}),`
`,n.jsx(e.h3,{children:"3.1 协议版本"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"版本"}),n.jsx(e.th,{children:"状态"}),n.jsx(e.th,{children:"链接"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"2026-01-26"})}),n.jsx(e.td,{children:"Stable（稳定）"}),n.jsx(e.td,{children:n.jsx(e.a,{href:"https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx",children:"specification/2026-01-26/apps.mdx"})})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"draft"}),n.jsx(e.td,{children:"Development"}),n.jsx(e.td,{children:n.jsx(e.a,{href:"https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/draft/apps.mdx",children:"specification/draft/apps.mdx"})})]})]})]}),`
`,n.jsx(e.h3,{children:"3.2 工具元数据 (Tool Metadata)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`interface McpUiToolMeta {
  ui?: {
    resourceUri: string; // 指向 UI 资源的 URI
    visibility?: ('model' | 'app')[]; // 可见性范围
  };
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"visibility 字段详解"}),"："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'visibility: ["model"]'})," — 仅 LLM 可调用（默认）"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'visibility: ["app"]'})," — 仅 View 可调用，LLM 不可见"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'visibility: ["model", "app"]'})," — 两者均可调用"]}),`
`]}),`
`,n.jsx(e.p,{children:'这个设计允许你创建"内部工具"——只有 UI 可以调用的辅助工具，对 LLM 隐藏。'}),`
`,n.jsx(e.h3,{children:"3.3 资源元数据 (Resource Metadata)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`interface McpUiResourceMeta {
  ui?: {
    csp?: McpUiResourceCsp; // 内容安全策略
    permissions?: McpUiResourcePermissions; // 设备权限
    domain?: string; // 专用沙箱来源
    prefersBorder?: boolean; // 是否显示边框
  };
}
`})}),`
`,n.jsx(e.h3,{children:"3.4 内容安全策略 (CSP)"}),`
`,n.jsx(e.p,{children:"CSP 是 MCP App 安全模型的核心组件："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`interface McpUiResourceCsp {
  connectDomains?: string[]; // 允许 fetch/XHR/WebSocket 连接的域
  resourceDomains?: string[]; // 允许加载静态资源的域（脚本、样式、图片）
  frameDomains?: string[]; // 允许嵌套 iframe 的域
  baseUriDomains?: string[]; // base-uri 指令
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"默认行为"}),"：Restrictive by Default（默认拒绝）"]}),`
`,n.jsx(e.p,{children:"如果不声明任何 CSP 域，App 将无法："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"发起任何外部网络请求"}),`
`,n.jsx(e.li,{children:"加载任何外部脚本或样式"}),`
`,n.jsx(e.li,{children:"嵌入任何外部 iframe"}),`
`]}),`
`,n.jsxs(e.p,{children:["必须",n.jsx(e.strong,{children:"显式声明"}),"需要访问的外部域。"]}),`
`,n.jsx(e.h3,{children:"3.5 设备权限"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`interface McpUiResourcePermissions {
  camera?: {}; // 摄像头
  microphone?: {}; // 麦克风
  geolocation?: {}; // 地理位置
  clipboardWrite?: {}; // 剪贴板写入
}
`})}),`
`,n.jsxs(e.p,{children:["这些权限映射到 iframe 的 ",n.jsx(e.code,{children:"allow"})," 属性，宿主会据此构建沙箱。"]}),`
`,n.jsx(e.h3,{children:"3.6 宿主上下文 (Host Context)"}),`
`,n.jsx(e.p,{children:"宿主在初始化时会向 View 发送上下文信息："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`interface McpUiHostContext {
  theme?: 'light' | 'dark';
  locale?: string;
  timezone?: string;
  displayMode?: 'inline' | 'fullscreen' | 'pip';
  safeAreaInsets?: { top?: number; right?: number; bottom?: number; left?: number };
  containerSize?: { width: number; height: number };
  platform?: 'web' | 'desktop' | 'mobile';
  capabilities?: McpUiHostCapabilities;
  styles?: McpUiHostStyles; // 30+ CSS 变量
}
`})}),`
`,n.jsx(e.h3,{children:"3.7 样式变量系统"}),`
`,n.jsx(e.p,{children:"MCP App 定义了一套完整的 CSS 变量系统，让 App 能够适配宿主主题："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* 背景色 */
--color-background-primary
--color-background-secondary
--color-background-tertiary

/* 文本色 */
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-text-quaternary

/* 强调色 */
--color-accent-primary
--color-accent-secondary

/* 边框色 */
--color-border-primary
--color-border-secondary
--color-border-tertiary

/* 字体 */
--font-sans
--font-mono

/* 字重 */
--font-weight-normal
--font-weight-medium
--font-weight-semibold
--font-weight-bold
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第四部分：SDK 与 API"}),`
`,n.jsx(e.h3,{children:"4.1 NPM 包结构"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 主 SDK - View 端
import { App, PostMessageTransport } from '@modelcontextprotocol/ext-apps';

// React 集成
import { useApp, useHostStyleVariables, useAutoResize } from '@modelcontextprotocol/ext-apps/react';

// Host 端
import {
  AppBridge,
  getToolUiResourceUri,
  buildAllowAttribute,
} from '@modelcontextprotocol/ext-apps/app-bridge';

// Server 助手
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from '@modelcontextprotocol/ext-apps/server';
`})}),`
`,n.jsx(e.h3,{children:"4.2 App 类 API (View 端)"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"App"})," 类是 View 端的核心，提供与宿主通信的完整能力："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`class App extends Protocol {
  // 连接和生命周期
  connect(transport: Transport): Promise<void>;
  getHostContext(): McpUiHostContext | undefined;
  close(): Promise<void>;

  // 与服务器交互
  callServerTool(request: CallToolRequest): Promise<CallToolResult>;
  readServerResource(request: ReadResourceRequest): Promise<ReadResourceResult>;

  // 与宿主交互
  sendMessage(message: Message): Promise<{ isError: boolean }>;
  updateModelContext(context: McpUiUpdateModelContextRequest): Promise<void>;
  openLink(request: McpUiOpenLinkRequest): Promise<{ isError: boolean }>;
  requestDisplayMode(request: McpUiRequestDisplayModeRequest): Promise<void>;
  sendLog(log: { level: string; data: any }): Promise<void>;

  // 生命周期处理器
  ontoolinput?: (input: McpUiToolInputNotification) => void;
  ontoolresult?: (result: McpUiToolResultNotification) => void;
  ontoolcancelled?: (params: { reason?: string }) => void;
  onhostcontextchanged?: (context: McpUiHostContext) => void;
  onteardown?: () => Promise<any>;
}
`})}),`
`,n.jsx(e.h3,{children:"4.3 AppBridge 类 API (Host 端)"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"AppBridge"})," 是宿主端的桥接类，管理与 iframe 中 App 的通信："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`class AppBridge extends Protocol {
  connect(transport: Transport): Promise<void>;

  // 发送工具数据给 View
  sendToolInput(toolInput: McpUiToolInputNotification): Promise<void>;
  sendToolInputPartial(toolInputPartial: McpUiToolInputPartialNotification): Promise<void>;
  sendToolResult(toolResult: McpUiToolResultNotification): Promise<void>;
  sendToolCancelled(toolCancelled: McpUiToolCancelledNotification): Promise<void>;

  // 宿主上下文管理
  setHostContext(context: McpUiHostContext): Promise<void>;
  updateHostContext(context: Partial<McpUiHostContext>): Promise<void>;

  teardownResource(): Promise<void>;
}

// 辅助函数
function getToolUiResourceUri(tool: Partial<Tool>): string | undefined;
function buildAllowAttribute(permissions: McpUiResourcePermissions | undefined): string;
`})}),`
`,n.jsx(e.h3,{children:"4.4 Server 助手函数"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`function registerAppTool(
  server: McpServer,
  name: string,
  config: McpUiAppToolConfig,
  callback: ToolCallback
): RegisteredTool;

function registerAppResource(
  server: McpServer,
  name: string,
  uri: string,
  meta: ResourceMetadata,
  callback: ReadResourceCallback
): RegisteredResource;
`})}),`
`,n.jsx(e.h3,{children:"4.5 React Hooks"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 核心 Hook - 管理 App 连接和状态
function useApp(options: UseAppOptions): {
  app: App | null;
  toolInput: McpUiToolInputNotification | null;
  toolResult: McpUiToolResultNotification | null;
  hostContext: McpUiHostContext | undefined;
};

// 样式同步 - 将宿主 CSS 变量注入到文档
function useHostStyleVariables(app: App | null, initialContext?: McpUiHostContext): void;

// 主题同步 - 设置 data-theme 属性
function useDocumentTheme(app: App | null, initialContext?: McpUiHostContext): void;

// 自动调整大小 - 通知宿主 View 尺寸变化
function useAutoResize(app: App | null, autoResize?: boolean): void;
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第五部分：通信协议详解"}),`
`,n.jsx(e.h3,{children:"5.1 传输层"}),`
`,n.jsxs(e.p,{children:["MCP App 使用 ",n.jsx(e.code,{children:"PostMessageTransport"}),"，基于 ",n.jsx(e.code,{children:"window.postMessage"})," 实现 JSON-RPC 2.0 协议。"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`const transport = new PostMessageTransport({
  targetOrigin: '*', // 或指定具体的宿主 origin
});
await app.connect(transport);
`})}),`
`,n.jsx(e.h3,{children:"5.2 请求类型"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"方法"}),n.jsx(e.th,{children:"方向"}),n.jsx(e.th,{children:"用途"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/initialize"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"初始化握手"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/message"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"发送消息到对话"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/update-model-context"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"更新模型上下文"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/open-link"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"打开外部链接"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/request-display-mode"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"请求显示模式"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/resource-teardown"})}),n.jsx(e.td,{children:"Host → View"}),n.jsx(e.td,{children:"资源清理"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"tools/call"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"调用服务器工具"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"tools/list"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"列出可用工具"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"resources/read"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"读取资源"})]})]})]}),`
`,n.jsx(e.h3,{children:"5.3 通知类型"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"方法"}),n.jsx(e.th,{children:"方向"}),n.jsx(e.th,{children:"用途"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/initialized"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"初始化完成"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/size-changed"})}),n.jsx(e.td,{children:"View → Host"}),n.jsx(e.td,{children:"尺寸变化"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/tool-input"})}),n.jsx(e.td,{children:"Host → View"}),n.jsx(e.td,{children:"工具输入数据"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/tool-input/partial"})}),n.jsx(e.td,{children:"Host → View"}),n.jsx(e.td,{children:"流式输入（部分数据）"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/tool-result"})}),n.jsx(e.td,{children:"Host → View"}),n.jsx(e.td,{children:"工具结果"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/tool-cancelled"})}),n.jsx(e.td,{children:"Host → View"}),n.jsx(e.td,{children:"工具已取消"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"ui/notifications/host-context-changed"})}),n.jsx(e.td,{children:"Host → View"}),n.jsx(e.td,{children:"宿主上下文变化"})]})]})]}),`
`,n.jsx(e.h3,{children:"5.4 完整通信序列图"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`View                          Host                          Server
  │                             │                              │
  │◄────── render iframe ───────│                              │
  │                             │                              │
  │── ui/initialize ──────────►│                              │
  │◄─ {context, capabilities} ──│                              │
  │── ui/notifications/init ──►│                              │
  │                             │                              │
  │◄─ tool-input notification ──│◄───── tool call ────────────│
  │◄─ tool-result notification ─│◄───── tool result ──────────│
  │                             │                              │
  │── tools/call ─────────────►│── tools/call ───────────────►│
  │◄─ result ───────────────────│◄─ result ───────────────────│
  │                             │                              │
  │◄─ ui/resource-teardown ─────│                              │
  │── acknowledgment ──────────►│                              │
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第六部分：安全模型"}),`
`,n.jsx(e.h3,{children:"6.1 多层防护"}),`
`,n.jsxs(e.p,{children:["MCP App 采用",n.jsx(e.strong,{children:"纵深防御"}),"策略，包含多层安全机制："]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"iframe 沙箱"}),"：所有 UI 内容运行在沙箱 iframe 中"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"预声明模板"}),"：宿主可在执行前审查 HTML 内容"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"可审计消息"}),"：所有 UI-Host 通信基于 JSON-RPC，可记录和审计"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"用户同意"}),"：View 发起的工具调用可要求用户确认"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"CSP 控制"}),"：细粒度的外部域访问控制"]}),`
`]}),`
`,n.jsx(e.h3,{children:"6.2 iframe 沙箱属性"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`function buildAllowAttribute(permissions?: McpUiResourcePermissions): string {
  const allows = [
    'allow-scripts', // 允许执行脚本
    'allow-forms', // 允许提交表单
    'allow-same-origin', // 允许同源访问（postMessage 必需）
  ];

  // 根据声明的权限动态添加
  if (permissions?.camera) allows.push('camera');
  if (permissions?.microphone) allows.push('microphone');
  if (permissions?.geolocation) allows.push('geolocation');
  if (permissions?.clipboardWrite) allows.push('clipboard-write');

  return allows.join('; ');
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"注意"}),"：",n.jsx(e.code,{children:"allow-same-origin"})," 是 postMessage 通信的必要条件，但不会授予 App 访问父窗口 DOM 的能力。"]}),`
`,n.jsx(e.h3,{children:"6.3 双层 iframe 架构（推荐）"}),`
`,n.jsxs(e.p,{children:["为了进一步增强安全性，规范建议使用",n.jsx(e.strong,{children:"双层 iframe 架构"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Host Window
  └── Sandbox iframe (验证来源)
        └── Resource iframe (运行 App)
`})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"外层 iframe"}),"：作为安全代理，验证内层消息的来源"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"内层 iframe"}),"：实际运行 App"]}),`
`]}),`
`,n.jsx(e.p,{children:"这种架构可以防止恶意 App 伪造消息来源。"}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第七部分：显示模式"}),`
`,n.jsx(e.h3,{children:"7.1 三种模式"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"模式"}),n.jsx(e.th,{children:"说明"}),n.jsx(e.th,{children:"适用场景"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"inline"})}),n.jsx(e.td,{children:"嵌入对话流"}),n.jsx(e.td,{children:"默认模式，小型组件"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"fullscreen"})}),n.jsx(e.td,{children:"全屏覆盖"}),n.jsx(e.td,{children:"复杂交互、沉浸式体验"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"pip"})}),n.jsx(e.td,{children:"画中画"}),n.jsx(e.td,{children:"持续监控、视频播放"})]})]})]}),`
`,n.jsx(e.h3,{children:"7.2 模式切换"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// View 请求切换到全屏模式
await app.requestDisplayMode({ mode: 'fullscreen' });

// 监听模式变化
app.onhostcontextchanged = context => {
  if (context.displayMode) {
    console.log('Display mode changed to:', context.displayMode);
    // 根据模式调整布局
  }
};
`})}),`
`,n.jsx(e.h3,{children:"7.3 响应式设计要点"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 使用 containerSize 适应容器
const { width, height } = hostContext.containerSize ?? {};

// 处理刘海屏等安全区域
const { top, right, bottom, left } = hostContext.safeAreaInsets ?? {};

// 根据平台调整触控交互
if (hostContext.platform === 'mobile') {
  // 增大点击目标、优化手势
}
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第八部分：实战开发指南"}),`
`,n.jsx(e.h3,{children:"8.1 项目结构（推荐）"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`my-mcp-app/
├── src/
│   ├── server/
│   │   └── index.ts        # MCP 服务器
│   └── view/
│       ├── index.html      # View 入口
│       ├── app.tsx         # React 组件
│       └── styles.css      # 样式
├── dist/                   # 构建输出
├── package.json
├── tsconfig.json
└── vite.config.ts
`})}),`
`,n.jsx(e.h3,{children:"8.2 最小示例 - 服务器端"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from '@modelcontextprotocol/ext-apps/server';
import { readFileSync } from 'fs';

const server = new McpServer({
  name: 'my-app',
  version: '1.0.0',
});

const resourceUri = 'ui://my-app/dashboard.html';

// 注册带 UI 的工具
registerAppTool(
  server,
  'show-dashboard',
  {
    title: 'Show Dashboard',
    description: '显示交互式仪表盘',
    inputSchema: {
      type: 'object',
      properties: {
        data: { type: 'array', description: '要展示的数据' },
      },
    },
    _meta: {
      ui: { resourceUri },
    },
  },
  async args => {
    // 工具逻辑 - 返回的数据会通过 tool-result 发送给 View
    return {
      content: [{ type: 'text', text: 'Dashboard ready' }],
      structuredContent: { chartData: args.data },
    };
  }
);

// 注册 UI 资源
registerAppResource(
  server,
  'dashboard',
  resourceUri,
  { mimeType: RESOURCE_MIME_TYPE },
  async () => {
    const html = readFileSync('./dist/dashboard.html', 'utf-8');
    return {
      contents: [{ uri: resourceUri, text: html }],
    };
  }
);
`})}),`
`,n.jsx(e.h3,{children:"8.3 最小示例 - View 端 (Vanilla JS)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { App, PostMessageTransport } from '@modelcontextprotocol/ext-apps';

      const app = new App({ name: 'my-view', version: '1.0.0' });
      const transport = new PostMessageTransport();

      // 处理工具输入（工具被调用时的参数）
      app.ontoolinput = input => {
        console.log('Tool input:', input);
      };

      // 处理工具结果（工具执行完成后的数据）
      app.ontoolresult = result => {
        const data = result.structuredContent?.chartData;
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
      };

      await app.connect(transport);
    <\/script>
  </head>
  <body>
    <div id="result">Loading...</div>
  </body>
</html>
`})}),`
`,n.jsx(e.h3,{children:"8.4 最小示例 - View 端 (React)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useApp, useHostStyleVariables } from '@modelcontextprotocol/ext-apps/react';

export default function Dashboard() {
  const { app, toolInput, toolResult, hostContext } = useApp({
    name: 'my-view',
    version: '1.0.0',
  });

  // 自动应用宿主主题的 CSS 变量
  useHostStyleVariables(app, hostContext);

  // 主动调用服务器工具
  const handleRefresh = async () => {
    const result = await app?.callServerTool({
      name: 'get-data',
      arguments: { filter: 'recent' },
    });
    console.log('Fresh data:', result);
  };

  return (
    <div
      style={{
        background: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <h1>Dashboard</h1>
      <button onClick={handleRefresh}>Refresh Data</button>
      <pre>{JSON.stringify(toolResult?.structuredContent, null, 2)}</pre>
    </div>
  );
}
`})}),`
`,n.jsx(e.h3,{children:"8.5 构建配置 (Vite)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: process.env.INPUT || 'src/view/index.html',
    },
  },
});
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"viteSingleFile"})," 插件会将所有资源内联到单个 HTML 文件中，这是 MCP App 的推荐做法——简化分发，避免外部依赖。"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第九部分：高级模式"}),`
`,n.jsx(e.h3,{children:"9.1 App-Only 工具"}),`
`,n.jsx(e.p,{children:'创建仅 UI 可调用的"内部工具"：'}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`registerAppTool(
  server,
  'internal-fetch',
  {
    description: 'Internal data fetching (UI only)',
    inputSchema: {
      type: 'object',
      properties: {
        endpoint: { type: 'string' },
      },
    },
    _meta: {
      ui: {
        resourceUri: 'ui://app/view.html',
        visibility: ['app'], // 关键：仅 app 可见，LLM 不可调用
      },
    },
  },
  async args => {
    const data = await fetchInternal(args.endpoint);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);
`})}),`
`,n.jsx(e.h3,{children:"9.2 大数据分块加载"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 服务器端 - 支持分页
registerAppTool(
  server,
  'load-data',
  {
    inputSchema: {
      type: 'object',
      properties: {
        offset: { type: 'number', default: 0 },
        limit: { type: 'number', default: 100 },
      },
    },
    _meta: { ui: { resourceUri, visibility: ['app'] } },
  },
  async args => {
    const { offset = 0, limit = 100 } = args;
    const data = await fetchData(offset, limit);
    return {
      content: [{ type: 'text', text: \`Loaded \${data.length} items\` }],
      structuredContent: {
        items: data,
        hasMore: data.length === limit,
        nextOffset: offset + data.length,
      },
    };
  }
);

// View 端 - 增量加载
const loadMore = async () => {
  const result = await app.callServerTool({
    name: 'load-data',
    arguments: { offset: items.length, limit: 100 },
  });
  const { items: newItems, hasMore } = result.structuredContent;
  setItems(prev => [...prev, ...newItems]);
  setHasMore(hasMore);
};
`})}),`
`,n.jsx(e.h3,{children:"9.3 更新模型上下文"}),`
`,n.jsx(e.p,{children:"让 LLM 知道用户在 UI 中做了什么："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 用户在 UI 中选择了某个选项
const handleSelection = async selectedItem => {
  // 更新模型上下文，让 LLM 知道用户的选择
  await app.updateModelContext({
    content: [
      {
        type: 'text',
        text: \`用户在仪表盘中选择了: \${selectedItem.name} (ID: \${selectedItem.id})\`,
      },
    ],
  });
};
`})}),`
`,n.jsx(e.p,{children:'这样，当用户接下来问"帮我分析刚才选的那个"时，LLM 就知道是什么。'}),`
`,n.jsx(e.h3,{children:"9.4 流式工具输入"}),`
`,n.jsx(e.p,{children:"当工具输入数据较大时，宿主可以分块发送："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// View 端 - 处理部分输入
app.ontoolinputpartial = partial => {
  // 显示加载进度
  setLoadingText(partial.input?.partialText || 'Loading...');
};

app.ontoolinput = input => {
  // 完整输入到达
  setLoadingText(null);
  processInput(input);
};
`})}),`
`,n.jsx(e.h3,{children:"9.5 主题同步"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 自动应用宿主主题
app.onhostcontextchanged = context => {
  // 设置 data-theme 属性
  document.documentElement.dataset.theme = context.theme;

  // 应用 CSS 变量
  if (context.styles) {
    for (const [key, value] of Object.entries(context.styles)) {
      document.documentElement.style.setProperty(key, value);
    }
  }
};
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十部分：与 OpenAI Apps SDK 对比"}),`
`,n.jsx(e.h3,{children:"10.1 关系说明"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"ext-apps（MCP Apps）"}),"：MCP 官方规范 + SDK，跨平台标准"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"OpenAI Apps SDK"}),"：ChatGPT 特定实现，基于 MCP Apps 规范"]}),`
`]}),`
`,n.jsxs(e.p,{children:["两者",n.jsx(e.strong,{children:"不是竞争关系"}),"，而是",n.jsx(e.strong,{children:"规范与实现"}),"的关系。OpenAI Apps SDK 是 MCP Apps 规范在 ChatGPT 平台上的官方实现。"]}),`
`,n.jsx(e.h3,{children:"10.2 主要差异"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"方面"}),n.jsx(e.th,{children:"ext-apps (MCP Apps)"}),n.jsx(e.th,{children:"OpenAI Apps SDK"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"定位"})}),n.jsx(e.td,{children:"协议规范 + 通用 SDK"}),n.jsx(e.td,{children:"ChatGPT 特定框架"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"元数据前缀"})}),n.jsx(e.td,{children:"无特定前缀"}),n.jsx(e.td,{children:n.jsx(e.code,{children:"openai/*"})})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"状态管理"})}),n.jsx(e.td,{children:"由 App 自行实现"}),n.jsxs(e.td,{children:[n.jsx(e.code,{children:"widgetSessionId"})," + ",n.jsx(e.code,{children:"widgetState"})]})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"传输方式"})}),n.jsx(e.td,{children:"stdio, SSE, HTTP"}),n.jsx(e.td,{children:"主要 SSE"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"UI 库"})}),n.jsx(e.td,{children:"任意"}),n.jsx(e.td,{children:n.jsx(e.code,{children:"@openai/apps-sdk-ui"})})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"认证"})}),n.jsx(e.td,{children:"通过 MCP 标准"}),n.jsx(e.td,{children:"OAuth RFC 9728"})]})]})]}),`
`,n.jsx(e.h3,{children:"10.3 迁移指南"}),`
`,n.jsx(e.p,{children:"从 OpenAI Apps SDK 迁移到 MCP Apps："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// OpenAI Apps SDK
const meta = {
  'openai/outputTemplate': 'ui://widget/view.html',
  'openai/widgetSessionId': sessionId,
  'openai/widgetState': { count: 0 },
};

// MCP Apps (ext-apps)
const meta = {
  ui: { resourceUri: 'ui://widget/view.html' },
};
// 状态管理通过 updateModelContext 或自定义工具实现
`})}),`
`,n.jsx(e.h3,{children:"10.4 OpenAI 特有功能"}),`
`,n.jsx(e.p,{children:"OpenAI Apps SDK 提供了一些 ChatGPT 特定的 API："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 从 Widget 调用工具
window.openai.callTool({ name: "search", arguments: {...} })

// 发送后续消息（触发新的 LLM 响应）
window.openai.sendFollowUpMessage("继续分析...")

// 打开模态框
window.openai.requestModal({ ... })

// widgetState 自动持久化到会话
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十一部分：客户端支持"}),`
`,n.jsx(e.h3,{children:"11.1 已支持的客户端"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"客户端"}),n.jsx(e.th,{children:"状态"}),n.jsx(e.th,{children:"备注"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Claude (Web & Desktop)"})}),n.jsx(e.td,{children:"✅ 已支持"}),n.jsx(e.td,{children:"首批支持，完整实现"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"ChatGPT"})}),n.jsx(e.td,{children:"✅ 已支持"}),n.jsx(e.td,{children:"2026-01-26 发布周上线"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Goose"})}),n.jsx(e.td,{children:"✅ 已支持"}),n.jsx(e.td,{children:"Block 开源项目"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"VS Code Insiders"})}),n.jsx(e.td,{children:"✅ 已支持"}),n.jsx(e.td,{children:"GitHub Copilot 集成"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Postman"})}),n.jsx(e.td,{children:"✅ 已支持"}),n.jsx(e.td,{children:"API 测试工具"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"MCPJam"})}),n.jsx(e.td,{children:"✅ 已支持"}),n.jsx(e.td,{children:"社区客户端"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"JetBrains IDEs"})}),n.jsx(e.td,{children:"🚧 开发中"}),n.jsx(e.td,{children:"已表达支持意向"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"AWS (Bedrock)"})}),n.jsx(e.td,{children:"🚧 开发中"}),n.jsx(e.td,{children:"已表达支持意向"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Google DeepMind"})}),n.jsx(e.td,{children:"🚧 开发中"}),n.jsx(e.td,{children:"Antigravity 团队探索中"})]})]})]}),`
`,n.jsx(e.h3,{children:"11.2 配置示例 (Claude Desktop)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "my-app": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
`})}),`
`,n.jsx(e.h3,{children:"11.3 配置示例 (VS Code)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "my-app": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-my-app", "--stdio"]
    }
  }
}
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十二部分：示例项目速览"}),`
`,n.jsx(e.h3,{children:"12.1 ext-apps 官方示例"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"类别"}),n.jsx(e.th,{children:"示例"}),n.jsx(e.th,{children:"技术栈"}),n.jsx(e.th,{children:"演示功能"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"基础模板"})}),n.jsx(e.td,{children:"basic-server-react"}),n.jsx(e.td,{children:"React"}),n.jsx(e.td,{children:"基础 Hooks 使用"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"basic-server-vue"}),n.jsx(e.td,{children:"Vue 3"}),n.jsx(e.td,{children:"组合式 API"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"basic-server-svelte"}),n.jsx(e.td,{children:"Svelte"}),n.jsx(e.td,{children:"响应式编程"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"basic-server-vanillajs"}),n.jsx(e.td,{children:"Vanilla JS"}),n.jsx(e.td,{children:"无框架实现"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"3D/可视化"})}),n.jsx(e.td,{children:"map-server"}),n.jsx(e.td,{children:"CesiumJS"}),n.jsx(e.td,{children:"3D 地球"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"threejs-server"}),n.jsx(e.td,{children:"Three.js"}),n.jsx(e.td,{children:"3D 场景"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"shadertoy-server"}),n.jsx(e.td,{children:"GLSL"}),n.jsx(e.td,{children:"实时着色器"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"文档媒体"})}),n.jsx(e.td,{children:"pdf-server"}),n.jsx(e.td,{children:"PDF.js"}),n.jsx(e.td,{children:"PDF 分块加载"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"video-resource-server"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"二进制视频"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"sheet-music-server"}),n.jsx(e.td,{children:"abc2svg"}),n.jsx(e.td,{children:"乐谱渲染"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"数据分析"})}),n.jsx(e.td,{children:"cohort-heatmap-server"}),n.jsx(e.td,{children:"ECharts"}),n.jsx(e.td,{children:"留存热力图"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"customer-segmentation-server"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"聚类散点图"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"wiki-explorer-server"}),n.jsx(e.td,{children:"Cytoscape"}),n.jsx(e.td,{children:"知识图谱"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"商业应用"})}),n.jsx(e.td,{children:"scenario-modeler-server"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"SaaS 财务预测"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"budget-allocator-server"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"预算分配"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"工具"})}),n.jsx(e.td,{children:"system-monitor-server"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"实时系统监控"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"transcript-server"}),n.jsx(e.td,{children:"WebAPI"}),n.jsx(e.td,{children:"语音转录"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{}),n.jsx(e.td,{children:"qr-server (Python)"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"二维码生成"})]})]})]}),`
`,n.jsx(e.h3,{children:"12.2 运行示例"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# 克隆仓库
git clone https://github.com/modelcontextprotocol/ext-apps.git
cd ext-apps

# 安装依赖
npm install

# 启动所有示例（使用 basic-host）
npm start

# 访问 http://localhost:8080/
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十三部分：测试与调试"}),`
`,n.jsx(e.h3,{children:"13.1 本地测试"}),`
`,n.jsxs(e.p,{children:["使用 ",n.jsx(e.code,{children:"basic-host"})," 测试你的 MCP App："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# 启动 basic-host
cd ext-apps/examples/basic-host
npm install && npm start

# 在另一个终端启动你的服务器
cd your-app && npm run serve

# 配置 basic-host 连接你的服务器
SERVERS='["http://localhost:3001"]' npm start
`})}),`
`,n.jsx(e.h3,{children:"13.2 使用 Claude 测试"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# 使用 cloudflared 暴露本地服务器
npx cloudflared tunnel --url http://localhost:3001

# 复制生成的 URL（如 https://xxx.trycloudflare.com）
# 在 Claude 设置中添加为 Custom Connector
`})}),`
`,n.jsx(e.h3,{children:"13.3 常见问题排查"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"问题"}),n.jsx(e.th,{children:"可能原因"}),n.jsx(e.th,{children:"解决方案"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"外部请求被阻止"}),n.jsx(e.td,{children:"CSP 未声明域"}),n.jsxs(e.td,{children:["在 ",n.jsx(e.code,{children:"_meta.ui.csp.connectDomains"})," 添加域"]})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"postMessage 失败"}),n.jsx(e.td,{children:"沙箱配置错误"}),n.jsxs(e.td,{children:["确保 ",n.jsx(e.code,{children:"allow-same-origin"})," 存在"]})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"主题不同步"}),n.jsx(e.td,{children:"未监听上下文变化"}),n.jsxs(e.td,{children:["实现 ",n.jsx(e.code,{children:"onhostcontextchanged"})," 处理器"]})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"工具调用超时"}),n.jsx(e.td,{children:"服务器响应慢"}),n.jsx(e.td,{children:"检查服务器日志，优化处理逻辑"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"UI 不显示"}),n.jsx(e.td,{children:"资源加载失败"}),n.jsx(e.td,{children:"检查 resourceUri 是否正确"})]})]})]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十四部分：最佳实践"}),`
`,n.jsx(e.h3,{children:"14.1 应该做的 ✅"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"使用 CSS 变量实现主题适配"}),"：让你的 App 在明暗主题下都有良好表现"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"响应 displayMode 变化"}),"：根据 inline/fullscreen/pip 调整布局"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"提供文本 fallback"}),"：支持不支持 MCP App 的客户端"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"使用 TypeScript"}),"：确保类型安全，减少运行时错误"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"分块加载大数据集"}),"：避免一次性传输过多数据"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"显式声明所需的 CSP 域"}),"：最小权限原则"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"实现 teardown 清理"}),"：释放资源、取消订阅"]}),`
`]}),`
`,n.jsx(e.h3,{children:"14.2 不应该做的 ❌"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"在 View 中存储敏感数据"}),"：iframe 可能被其他脚本访问"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"假设固定的容器尺寸"}),"：使用响应式设计"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"忽略 teardown 事件"}),"：可能导致内存泄漏"]}),`
`,n.jsxs(e.li,{children:[n.jsxs(e.strong,{children:["使用 ",n.jsx(e.code,{children:"*"})," 通配符 CSP 域"]}),"：安全风险"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"阻塞主线程"}),"：使用 Web Worker 处理耗时操作"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"依赖外部 CDN 不声明"}),"：会被 CSP 阻止"]}),`
`]}),`
`,n.jsx(e.h3,{children:"14.3 性能优化"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 1. 使用 viteSingleFile 内联所有资源
import { viteSingleFile } from 'vite-plugin-singlefile';

// 2. 启用 gzip 压缩
// 服务器返回时设置 Content-Encoding: gzip

// 3. 懒加载重型库
const loadThreeJs = () => import('three');

// 4. 使用 requestIdleCallback 处理非关键任务
requestIdleCallback(() => {
  // 预加载、分析等非关键操作
});

// 5. 使用虚拟滚动处理长列表
// 推荐：react-window, vue-virtual-scroller
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十五部分：MCP App 的影响与变革"}),`
`,n.jsx(e.h3,{children:"15.1 对 AI 生态的影响"}),`
`,n.jsx(e.h4,{children:'打破"纯文本响应"的范式'}),`
`,n.jsx(e.p,{children:'传统的 AI Agent 只能返回文本。即使有"代码执行"能力，最终呈现给用户的仍然是文本或静态图片。'}),`
`,n.jsx(e.p,{children:"MCP App 改变了这一点："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Before MCP App:
User: "帮我生成一个饼图展示销售数据"
Agent: "好的，这是数据：{...}，您可以复制到 Excel 中生成图表"

After MCP App:
User: "帮我生成一个饼图展示销售数据"
Agent: [直接渲染交互式 ECharts 饼图，支持悬停查看详情、导出图片]
`})}),`
`,n.jsx(e.h4,{children:"推动 Agent 生态标准化"}),`
`,n.jsxs(e.p,{children:["MCP App 是",n.jsx(e.strong,{children:"第一个跨公司、跨平台"}),"的 AI Agent UI 标准："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Anthropic、OpenAI、Block、Microsoft 共同参与"}),`
`,n.jsx(e.li,{children:"同一个 MCP App 可以在 Claude、ChatGPT、VS Code 中运行"}),`
`,n.jsx(e.li,{children:"开发者只需写一次代码"}),`
`]}),`
`,n.jsx(e.p,{children:'这避免了生态碎片化——不会出现"Claude 专用插件"、"ChatGPT 专用 Widget"的局面。'}),`
`,n.jsx(e.h4,{children:"企业级 AI 应用加速"}),`
`,n.jsxs(e.p,{children:["根据 Forrester 2026 预测，",n.jsx(e.strong,{children:"30% 的企业应用厂商"}),"将推出自己的 MCP 服务器。"]}),`
`,n.jsx(e.p,{children:"MCP App 让企业能够："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"将内部系统封装为 MCP App，向 AI Agent 暴露能力"}),`
`,n.jsx(e.li,{children:"避免供应商锁定，灵活选择 AI 平台"}),`
`,n.jsx(e.li,{children:"统一内部工具的 AI 集成标准"}),`
`]}),`
`,n.jsx(e.h3,{children:"15.2 对开发者的影响"}),`
`,n.jsx(e.h4,{children:"新的技能要求"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"传统 MCP 开发"}),n.jsx(e.th,{children:"MCP App 开发"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"后端为主"}),n.jsx(e.td,{children:"前后端结合"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"JSON 数据处理"}),n.jsx(e.td,{children:"UI/UX 设计"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"无需考虑安全沙箱"}),n.jsx(e.td,{children:"需理解 CSP、iframe 安全"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"单平台适配"}),n.jsx(e.td,{children:"跨平台主题/响应式"})]})]})]}),`
`,n.jsx(e.h4,{children:"降低分发门槛"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"无需独立部署"}),"：UI 作为资源嵌入 MCP Server"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"无需应用商店审核"}),"：配置 MCP 服务器即可使用"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"即时更新"}),"：修改代码即生效，无需用户升级"]}),`
`]}),`
`,n.jsx(e.h3,{children:"15.3 对产品交互的变革"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"场景"}),n.jsx(e.th,{children:"传统体验"}),n.jsx(e.th,{children:"MCP App 体验"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"数据可视化"}),n.jsx(e.td,{children:"返回数据让用户自己画图"}),n.jsx(e.td,{children:"直接渲染交互式图表"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"表单填写"}),n.jsx(e.td,{children:"多轮对话逐个询问字段"}),n.jsx(e.td,{children:"一次性表单输入"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"文件预览"}),n.jsx(e.td,{children:"返回下载链接"}),n.jsx(e.td,{children:"内嵌 PDF/3D 查看器"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"配置向导"}),n.jsx(e.td,{children:"逐步文字引导"}),n.jsx(e.td,{children:"可视化步骤指示器"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"地图导航"}),n.jsx(e.td,{children:"返回地址文本"}),n.jsx(e.td,{children:"嵌入交互式地图"})]})]})]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十六部分：与 Google A2UI 的对比"}),`
`,n.jsx(e.h3,{children:"16.1 A2UI 简介"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A2UI（Agent-to-User Interface）"})," 是 Google 于 2025 年 12 月发布的另一个 Agent UI 协议。"]}),`
`,n.jsxs(e.p,{children:["核心理念：",n.jsx(e.strong,{children:"声明式组件描述"}),"，而非可执行代码。"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Agent 输出 A2UI JSON 描述
        ↓
Client 读取组件描述
        ↓
映射到本地原生组件
        ↓
用户看到原生风格的 UI
`})}),`
`,n.jsx(e.h3,{children:"16.2 核心差异"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"维度"}),n.jsx(e.th,{children:"MCP Apps"}),n.jsx(e.th,{children:"Google A2UI"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"核心理念"})}),n.jsx(e.td,{children:"嵌入式 Web 应用"}),n.jsx(e.td,{children:"声明式组件描述"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"UI 实现"})}),n.jsx(e.td,{children:"完整 HTML/CSS/JS（iframe）"}),n.jsx(e.td,{children:"JSON 组件声明（原生渲染）"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"灵活性"})}),n.jsx(e.td,{children:"高（可用任意前端技术）"}),n.jsx(e.td,{children:"受限（只能用预定义组件）"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"安全模型"})}),n.jsx(e.td,{children:"iframe 沙箱 + CSP"}),n.jsx(e.td,{children:"组件白名单目录"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"开发门槛"})}),n.jsx(e.td,{children:"需前端开发经验"}),n.jsx(e.td,{children:"LLM 可直接生成"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"渲染一致性"})}),n.jsx(e.td,{children:"跨平台保持一致"}),n.jsx(e.td,{children:"依赖各平台原生实现"})]})]})]}),`
`,n.jsx(e.h3,{children:"16.3 技术路线对比"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:'MCP Apps："Mini Web App"路线'})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 返回完整 HTML
registerAppResource(
  server,
  'chart',
  'ui://app/chart.html',
  {
    mimeType: RESOURCE_MIME_TYPE,
  },
  async () => ({
    contents: [
      {
        uri: 'ui://app/chart.html',
        text: \`
      <html>
        <script src="echarts.min.js"><\/script>
        <script>echarts.init(...)<\/script>
        <div id="chart"></div>
      </html>
    \`,
      },
    ],
  })
);
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:'A2UI："Native-First 声明式"路线'})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "components": [
    {
      "id": "chart1",
      "type": "PieChart",
      "props": {
        "data": [{ "label": "A", "value": 30 }],
        "title": "Sales"
      }
    }
  ]
}
`})}),`
`,n.jsx(e.h3,{children:"16.4 如何选择"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"场景"}),n.jsx(e.th,{children:"推荐方案"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"简单表单、列表、卡片"}),n.jsx(e.td,{children:"A2UI（更轻量）"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"复杂数据可视化（ECharts、D3）"}),n.jsx(e.td,{children:"MCP Apps（更灵活）"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"3D/地图/富媒体"}),n.jsx(e.td,{children:"MCP Apps（必需）"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"希望原生系统体验"}),n.jsx(e.td,{children:"A2UI"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"需要复杂交互逻辑"}),n.jsx(e.td,{children:"MCP Apps"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"LLM 直接生成 UI"}),n.jsx(e.td,{children:"A2UI"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"复用现有 Web 组件"}),n.jsx(e.td,{children:"MCP Apps"})]})]})]}),`
`,n.jsx(e.h3,{children:"16.5 可能的融合方向"}),`
`,n.jsx(e.p,{children:"两者并非完全互斥，未来可能："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"MCP App 内部使用 A2UI 描述动态生成的 UI 片段"}),`
`,n.jsx(e.li,{children:"A2UI 组件目录扩展支持嵌入 MCP App"}),`
`,n.jsx(e.li,{children:'统一的 "Agent UI 协议" 整合两种模式'}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"第十七部分：未来发展方向"}),`
`,n.jsx(e.h3,{children:"17.1 协议层面"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"更多显示模式"}),"：除 inline/fullscreen/pip 外，可能增加 modal、sidebar 等"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"增强权限控制"}),"：更细粒度的设备访问、网络请求控制"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"与 A2UI 的融合"}),"：混合使用声明式组件和嵌入式 App"]}),`
`]}),`
`,n.jsx(e.h3,{children:"17.2 生态扩展"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"更多客户端支持"}),"：JetBrains、AWS Bedrock、Google 等"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"组件模板库"}),"：常用 UI 模式的开箱即用模板"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"可视化构建工具"}),"：低代码/无代码 MCP App 构建器"]}),`
`]}),`
`,n.jsx(e.h3,{children:"17.3 技术能力增强"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"多 App 协同"}),"：App 间状态共享和消息传递"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"离线与持久化"}),"：Service Worker 缓存、跨会话状态保留"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"更多设备权限"}),"：蓝牙、NFC、传感器等"]}),`
`]}),`
`,n.jsx(e.h3,{children:"17.4 垂直领域深化"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"医疗健康"}),"：DICOM 医学影像查看器"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"金融服务"}),"：实时行情图表、风险仪表盘"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"工程设计"}),"：CAD 预览器、BIM 模型查看"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"教育培训"}),"：交互式课件、编程练习环境"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"结论"}),`
`,n.jsxs(e.p,{children:["MCP App 是 MCP 协议的",n.jsx(e.strong,{children:"历史性扩展"}),'，标志着 AI Agent 生态从"工具调用"升级为"应用平台"。']}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"关键要点回顾"}),"："]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"MCP App = Tool + UI Resource"}),"，通过 ",n.jsx(e.code,{children:"_meta.ui.resourceUri"})," 关联"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"三层架构"}),"：Server → Host → View，通过 JSON-RPC 通信"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"多层安全"}),"：iframe 沙箱 + CSP + 权限声明 + 用户同意"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"跨平台支持"}),"：Claude、ChatGPT、VS Code、Goose 等"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"生态意义"}),"：打破纯文本范式，推动 Agent UI 标准化"]}),`
`]}),`
`,n.jsxs(e.p,{children:["如果你正在开发 MCP 服务器，是时候考虑为你的工具添加交互式 UI 了。MCP App 让 AI Agent 真正成为一个",n.jsx(e.strong,{children:"可视化的应用平台"}),"，而不仅仅是一个对话框。"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"参考资料"}),`
`,n.jsx(e.h3,{children:"官方资源"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/modelcontextprotocol/ext-apps",children:"ext-apps 官方仓库"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://modelcontextprotocol.io/docs/extensions/apps",children:"MCP Apps 官方文档"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://modelcontextprotocol.github.io/ext-apps/api/",children:"API 文档"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx",children:"规范文档 (2026-01-26)"})}),`
`]}),`
`,n.jsx(e.h3,{children:"博客文章"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/",children:"MCP Apps 1.0 发布公告 (2026-01-26)"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/",children:"MCP Apps 预览版公告 (2025-11-21)"})}),`
`]}),`
`,n.jsx(e.h3,{children:"相关项目"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/MCP-UI-Org/mcp-ui",children:"MCP-UI 社区项目"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://developers.openai.com/apps-sdk/",children:"OpenAI Apps SDK"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://a2ui.org/",children:"Google A2UI"})}),`
`]}),`
`,n.jsx(e.h3,{children:"社区讨论"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865",children:"SEP-1865 PR"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/modelcontextprotocol-community/working-groups/issues/35",children:"Working Group Issue #35"})}),`
`]})]})}function l(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}export{l as default,t as frontmatter};
