import{j as e}from"./index-DBorfdJG.js";const r={title:"The Complete Guide to MCP Apps: From Protocol Specification to Practical Development",description:"A comprehensive deep dive into MCP App architecture, protocol specification, SDK APIs, and best practices for building interactive UI for AI Agents",date:"2026-01-28",tags:["MCP","AI Agent","UI","SDK","Protocol"],lang:"en",author:"use-mcp.dev"};function t(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"TL;DR"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"What is MCP App"}),": Interactive UI components running in sandboxed iframes within MCP hosts, enabling AI Agents to return visual interfaces instead of plain text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Core Formula"}),": MCP App = Tool + UI Resource, linked via ",e.jsx(n.code,{children:"_meta.ui.resourceUri"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multi-layer Security"}),": iframe sandbox + CSP content security policy + permission declarations + user consent"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Broad Support"}),": Supported by Claude, ChatGPT, VS Code, Goose and more - first cross-platform UI experience"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ecosystem Impact"}),': Breaking the "text-only response" paradigm, elevating AI Agent ecosystem from tool calling to full application platform']}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Introduction"}),`
`,e.jsxs(n.p,{children:["On January 26, 2026, the MCP team officially released MCP Apps 1.0 stable version. This is the ",e.jsx(n.strong,{children:"first official MCP extension"}),', marking the transition of the AI Agent ecosystem from "tool calling" to "application platform" era.']}),`
`,e.jsxs(n.p,{children:["Imagine this scenario: You ask an AI to analyze sales data. Traditional MCP tools would return a bunch of JSON data or text tables that you'd need to copy to Excel or other tools for visualization. With MCP Apps, the AI can render an ",e.jsx(n.strong,{children:"interactive dashboard"})," directly in the conversation—you can hover for details, click to filter data, drag to adjust charts, all within the conversation window."]}),`
`,e.jsx(n.p,{children:"This isn't science fiction. This is what MCP Apps are doing right now."}),`
`,e.jsx(n.p,{children:"This article will take you through every aspect of MCP Apps: from background and motivation to architecture design, from protocol specification to SDK APIs, from security model to practical development. One article to help you thoroughly understand MCP Apps."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 1: Background and Motivation"}),`
`,e.jsx(n.h3,{children:"1.1 Limitations of MCP Protocol"}),`
`,e.jsx(n.p,{children:"Model Context Protocol (MCP) was originally designed to solve the connection problem between AI models and external data/tools. MCP defines three core primitives:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tools"}),": Enable models to perform actions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Resources"}),": Enable models to read data"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prompts"}),": Enable models to use preset prompt templates"]}),`
`]}),`
`,e.jsxs(n.p,{children:["However, MCP originally only supported ",e.jsx(n.strong,{children:"text and structured data"})," exchange. When tools need visual presentation or complex user input, hosts must build their own rendering logic. This led to an awkward situation:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`User: "Help me generate a pie chart of sales data"
Agent: "Sure, here's the data: {sales: [{region: 'East', value: 3500}, ...]}
        You can copy it to Excel or ECharts to generate the chart"
`})}),`
`,e.jsx(n.p,{children:"Developers were forced to create various ad-hoc solutions, leading to ecosystem fragmentation—each host had its own UI extension method, incompatible with others."}),`
`,e.jsx(n.h3,{children:"1.2 Evolution of Community Needs"}),`
`,e.jsx(n.p,{children:`The community's demand for "UI over MCP" was evident early on:`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Working Group Issue #35"}),': In mid-2025, the community proposed the "UI Component Integration in MCP Responses" RFC in the MCP working group, discussing how to integrate UI components in MCP responses.']}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"MCP-UI Community Project"}),": Created by Ido Salomon and Liad Yosef, the ",e.jsx(n.a,{href:"https://mcpui.dev/",children:"MCP-UI"})," project accumulated 4.2k+ stars before the official specification, becoming the de facto pioneer."]}),`
`,e.jsx(n.p,{children:"Key community demands included:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Interactive forms, buttons, multi-step workflows"}),`
`,e.jsx(n.li,{children:"Real-time data visualization (charts, dashboards)"}),`
`,e.jsx(n.li,{children:"Configuration wizards (multiple options, conditional dependencies)"}),`
`,e.jsx(n.li,{children:"Rich media viewers (PDF, 3D models, video)"}),`
`]}),`
`,e.jsx(n.h3,{children:"1.3 Anthropic and OpenAI Collaboration"}),`
`,e.jsx(n.p,{children:"In November 2025, the MCP team released the first public preview of MCP Apps, integrating two important external contributions:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MCP-UI Community Project"}),": Provided the foundation patterns for UI resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"OpenAI Apps SDK"}),": ChatGPT's Widget mechanism served as reference for protocol design"]}),`
`]}),`
`,e.jsxs(n.p,{children:["After months of iteration, MCP Apps 1.0 was officially released on January 26, 2026. This is a rare case of ",e.jsx(n.strong,{children:"cross-company collaboration"}),"—Anthropic, OpenAI, Block, Microsoft and others jointly participated in specification development and implementation."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 2: Core Concepts and Architecture"}),`
`,e.jsx(n.h3,{children:"2.1 What is MCP App"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Official Definition"}),": MCP App is an interactive UI component running in a sandboxed iframe within an MCP host."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Core Formula"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`MCP App = Tool + UI Resource
`})}),`
`,e.jsx(n.p,{children:"An MCP App consists of two parts:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tool"}),": Declares the ",e.jsx(n.code,{children:"_meta.ui.resourceUri"})," field pointing to a UI resource"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"UI Resource"}),": Contains the interactive interface with HTML/CSS/JS"]}),`
`]}),`
`,e.jsx(n.p,{children:"Key differences from traditional web applications:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Feature"}),e.jsx(n.th,{children:"Traditional Web App"}),e.jsx(n.th,{children:"MCP App"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Context"})}),e.jsx(n.td,{children:"Separate page, leaving conversation"}),e.jsx(n.td,{children:"Embedded in conversation flow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Data Flow"})}),e.jsx(n.td,{children:"Requires own API, authentication"}),e.jsx(n.td,{children:"Can call MCP server tools directly"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Integration"})}),e.jsx(n.td,{children:"Must implement integrations separately"}),e.jsx(n.td,{children:"Can delegate to host's connected capabilities"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Security Isolation"})}),e.jsx(n.td,{children:"Full trust or full isolation"}),e.jsx(n.td,{children:"iframe sandbox + fine-grained CSP"})]})]})]}),`
`,e.jsx(n.h3,{children:"2.2 Three-Layer Architecture"}),`
`,e.jsx(n.p,{children:"MCP App architecture is divided into three layers:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`┌─────────────────────────────────────────────────────┐
│                    MCP Server                        │
│  - registerAppTool(): Register tools with UI         │
│  - registerAppResource(): Register UI resources      │
│  - Handle tool calls, return structured data         │
└───────────────────────┬─────────────────────────────┘
                        │ MCP Protocol (JSON-RPC)
                        ▼
┌─────────────────────────────────────────────────────┐
│                    Host (AppBridge)                  │
│  - Connect to MCP servers                            │
│  - Manage iframe sandbox                             │
│  - Forward requests/responses                        │
│  - Send tool input/results to View                   │
└───────────────────────┬─────────────────────────────┘
                        │ postMessage (JSON-RPC)
                        ▼
┌─────────────────────────────────────────────────────┐
│                    View (App class)                  │
│  - Runs inside iframe                                │
│  - Receives tool inputs and results                  │
│  - Can call server tools                             │
│  - Can send messages to conversation                 │
└─────────────────────────────────────────────────────┘
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Three-layer Responsibilities"}),":"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Server Layer"}),": MCP server, responsible for registering tools, handling business logic, returning data"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Host Layer"}),": Host application (e.g., Claude Desktop), responsible for connecting to server, managing sandbox, forwarding messages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"View Layer"}),": UI component, runs in iframe, responsible for rendering interface, handling user interactions"]}),`
`]}),`
`,e.jsx(n.h3,{children:"2.3 Lifecycle"}),`
`,e.jsx(n.p,{children:"The complete lifecycle of an MCP App:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`1. Discovery
   └── Host fetches tool list, identifies tools with _meta.ui.resourceUri

2. Initialize
   └── Host renders iframe
   └── View sends ui/initialize handshake request
   └── Host returns context and capabilities

3. Data Delivery
   └── Host sends tool-input notification (tool input parameters)
   └── Host sends tool-result notification (tool execution results)

4. Interactive
   └── User interacts with View
   └── View can call server tools
   └── View can update model context

5. Teardown
   └── Host sends ui/resource-teardown
   └── View cleans up resources, disconnects
`})}),`
`,e.jsx(n.h3,{children:"2.4 URI Scheme and MIME Type"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"UI Resource URI"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`ui://server-name/resource-path.html
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"ui://"})," is the dedicated URI scheme for MCP Apps, telling the host this is a UI resource that needs to be rendered in an iframe."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"MIME Type"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`text/html;profile=mcp-app
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"profile=mcp-app"})," parameter conveys additional semantic constraints—this is not an ordinary HTML page, but an interactive component conforming to the MCP App protocol."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 3: Protocol Specification Details"}),`
`,e.jsx(n.h3,{children:"3.1 Protocol Versions"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Version"}),e.jsx(n.th,{children:"Status"}),e.jsx(n.th,{children:"Link"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"2026-01-26"})}),e.jsx(n.td,{children:"Stable"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx",children:"specification/2026-01-26/apps.mdx"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"draft"}),e.jsx(n.td,{children:"Development"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/draft/apps.mdx",children:"specification/draft/apps.mdx"})})]})]})]}),`
`,e.jsx(n.h3,{children:"3.2 Tool Metadata"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface McpUiToolMeta {
  ui?: {
    resourceUri: string; // URI pointing to UI resource
    visibility?: ('model' | 'app')[]; // Visibility scope
  };
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"visibility field explained"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'visibility: ["model"]'})," — Only LLM can call (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'visibility: ["app"]'})," — Only View can call, invisible to LLM"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'visibility: ["model", "app"]'})," — Both can call"]}),`
`]}),`
`,e.jsx(n.p,{children:'This design allows you to create "internal tools"—helper tools that only the UI can call, hidden from the LLM.'}),`
`,e.jsx(n.h3,{children:"3.3 Resource Metadata"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface McpUiResourceMeta {
  ui?: {
    csp?: McpUiResourceCsp; // Content Security Policy
    permissions?: McpUiResourcePermissions; // Device permissions
    domain?: string; // Dedicated sandbox origin
    prefersBorder?: boolean; // Whether to show border
  };
}
`})}),`
`,e.jsx(n.h3,{children:"3.4 Content Security Policy (CSP)"}),`
`,e.jsx(n.p,{children:"CSP is a core component of the MCP App security model:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface McpUiResourceCsp {
  connectDomains?: string[]; // Domains allowed for fetch/XHR/WebSocket
  resourceDomains?: string[]; // Domains allowed for static resources (scripts, styles, images)
  frameDomains?: string[]; // Domains allowed for nested iframes
  baseUriDomains?: string[]; // base-uri directive
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Default Behavior"}),": Restrictive by Default"]}),`
`,e.jsx(n.p,{children:"Without declaring any CSP domains, the App cannot:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make any external network requests"}),`
`,e.jsx(n.li,{children:"Load any external scripts or styles"}),`
`,e.jsx(n.li,{children:"Embed any external iframes"}),`
`]}),`
`,e.jsxs(n.p,{children:["External domains must be ",e.jsx(n.strong,{children:"explicitly declared"}),"."]}),`
`,e.jsx(n.h3,{children:"3.5 Device Permissions"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface McpUiResourcePermissions {
  camera?: {}; // Camera
  microphone?: {}; // Microphone
  geolocation?: {}; // Geolocation
  clipboardWrite?: {}; // Clipboard write
}
`})}),`
`,e.jsxs(n.p,{children:["These permissions map to the iframe's ",e.jsx(n.code,{children:"allow"})," attribute, which the host uses to construct the sandbox."]}),`
`,e.jsx(n.h3,{children:"3.6 Host Context"}),`
`,e.jsx(n.p,{children:"The host sends context information to the View during initialization:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface McpUiHostContext {
  theme?: 'light' | 'dark';
  locale?: string;
  timezone?: string;
  displayMode?: 'inline' | 'fullscreen' | 'pip';
  safeAreaInsets?: { top?: number; right?: number; bottom?: number; left?: number };
  containerSize?: { width: number; height: number };
  platform?: 'web' | 'desktop' | 'mobile';
  capabilities?: McpUiHostCapabilities;
  styles?: McpUiHostStyles; // 30+ CSS variables
}
`})}),`
`,e.jsx(n.h3,{children:"3.7 Style Variable System"}),`
`,e.jsx(n.p,{children:"MCP Apps define a complete CSS variable system for theme adaptation:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Background colors */
--color-background-primary
--color-background-secondary
--color-background-tertiary

/* Text colors */
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-text-quaternary

/* Accent colors */
--color-accent-primary
--color-accent-secondary

/* Border colors */
--color-border-primary
--color-border-secondary
--color-border-tertiary

/* Fonts */
--font-sans
--font-mono

/* Font weights */
--font-weight-normal
--font-weight-medium
--font-weight-semibold
--font-weight-bold
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 4: SDK and API"}),`
`,e.jsx(n.h3,{children:"4.1 NPM Package Structure"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Main SDK - View side
import { App, PostMessageTransport } from '@modelcontextprotocol/ext-apps';

// React integration
import { useApp, useHostStyleVariables, useAutoResize } from '@modelcontextprotocol/ext-apps/react';

// Host side
import {
  AppBridge,
  getToolUiResourceUri,
  buildAllowAttribute,
} from '@modelcontextprotocol/ext-apps/app-bridge';

// Server helpers
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from '@modelcontextprotocol/ext-apps/server';
`})}),`
`,e.jsx(n.h3,{children:"4.2 App Class API (View Side)"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"App"})," class is the core of the View side, providing complete communication capabilities with the host:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`class App extends Protocol {
  // Connection and lifecycle
  connect(transport: Transport): Promise<void>;
  getHostContext(): McpUiHostContext | undefined;
  close(): Promise<void>;

  // Interact with server
  callServerTool(request: CallToolRequest): Promise<CallToolResult>;
  readServerResource(request: ReadResourceRequest): Promise<ReadResourceResult>;

  // Interact with host
  sendMessage(message: Message): Promise<{ isError: boolean }>;
  updateModelContext(context: McpUiUpdateModelContextRequest): Promise<void>;
  openLink(request: McpUiOpenLinkRequest): Promise<{ isError: boolean }>;
  requestDisplayMode(request: McpUiRequestDisplayModeRequest): Promise<void>;
  sendLog(log: { level: string; data: any }): Promise<void>;

  // Lifecycle handlers
  ontoolinput?: (input: McpUiToolInputNotification) => void;
  ontoolresult?: (result: McpUiToolResultNotification) => void;
  ontoolcancelled?: (params: { reason?: string }) => void;
  onhostcontextchanged?: (context: McpUiHostContext) => void;
  onteardown?: () => Promise<any>;
}
`})}),`
`,e.jsx(n.h3,{children:"4.3 AppBridge Class API (Host Side)"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"AppBridge"})," is the host-side bridge class managing communication with the App in the iframe:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`class AppBridge extends Protocol {
  connect(transport: Transport): Promise<void>;

  // Send tool data to View
  sendToolInput(toolInput: McpUiToolInputNotification): Promise<void>;
  sendToolInputPartial(toolInputPartial: McpUiToolInputPartialNotification): Promise<void>;
  sendToolResult(toolResult: McpUiToolResultNotification): Promise<void>;
  sendToolCancelled(toolCancelled: McpUiToolCancelledNotification): Promise<void>;

  // Host context management
  setHostContext(context: McpUiHostContext): Promise<void>;
  updateHostContext(context: Partial<McpUiHostContext>): Promise<void>;

  teardownResource(): Promise<void>;
}

// Helper functions
function getToolUiResourceUri(tool: Partial<Tool>): string | undefined;
function buildAllowAttribute(permissions: McpUiResourcePermissions | undefined): string;
`})}),`
`,e.jsx(n.h3,{children:"4.4 Server Helper Functions"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`function registerAppTool(
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
`,e.jsx(n.h3,{children:"4.5 React Hooks"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Core Hook - manage App connection and state
function useApp(options: UseAppOptions): {
  app: App | null;
  toolInput: McpUiToolInputNotification | null;
  toolResult: McpUiToolResultNotification | null;
  hostContext: McpUiHostContext | undefined;
};

// Style sync - inject host CSS variables into document
function useHostStyleVariables(app: App | null, initialContext?: McpUiHostContext): void;

// Theme sync - set data-theme attribute
function useDocumentTheme(app: App | null, initialContext?: McpUiHostContext): void;

// Auto resize - notify host of View size changes
function useAutoResize(app: App | null, autoResize?: boolean): void;
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 5: Communication Protocol Details"}),`
`,e.jsx(n.h3,{children:"5.1 Transport Layer"}),`
`,e.jsxs(n.p,{children:["MCP Apps use ",e.jsx(n.code,{children:"PostMessageTransport"}),", implementing JSON-RPC 2.0 protocol based on ",e.jsx(n.code,{children:"window.postMessage"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`const transport = new PostMessageTransport({
  targetOrigin: '*', // or specify specific host origin
});
await app.connect(transport);
`})}),`
`,e.jsx(n.h3,{children:"5.2 Request Types"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Method"}),e.jsx(n.th,{children:"Direction"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/initialize"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Initialization handshake"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/message"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Send message to conversation"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/update-model-context"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Update model context"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/open-link"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Open external link"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/request-display-mode"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Request display mode"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/resource-teardown"})}),e.jsx(n.td,{children:"Host → View"}),e.jsx(n.td,{children:"Resource cleanup"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tools/call"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Call server tool"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tools/list"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"List available tools"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"resources/read"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Read resource"})]})]})]}),`
`,e.jsx(n.h3,{children:"5.3 Notification Types"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Method"}),e.jsx(n.th,{children:"Direction"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/initialized"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Initialization complete"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/size-changed"})}),e.jsx(n.td,{children:"View → Host"}),e.jsx(n.td,{children:"Size changed"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/tool-input"})}),e.jsx(n.td,{children:"Host → View"}),e.jsx(n.td,{children:"Tool input data"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/tool-input/partial"})}),e.jsx(n.td,{children:"Host → View"}),e.jsx(n.td,{children:"Streaming input (partial data)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/tool-result"})}),e.jsx(n.td,{children:"Host → View"}),e.jsx(n.td,{children:"Tool result"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/tool-cancelled"})}),e.jsx(n.td,{children:"Host → View"}),e.jsx(n.td,{children:"Tool cancelled"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ui/notifications/host-context-changed"})}),e.jsx(n.td,{children:"Host → View"}),e.jsx(n.td,{children:"Host context changed"})]})]})]}),`
`,e.jsx(n.h3,{children:"5.4 Complete Communication Sequence Diagram"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`View                          Host                          Server
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
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 6: Security Model"}),`
`,e.jsx(n.h3,{children:"6.1 Multi-Layer Protection"}),`
`,e.jsxs(n.p,{children:["MCP Apps employ a ",e.jsx(n.strong,{children:"defense-in-depth"})," strategy with multiple security layers:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"iframe Sandbox"}),": All UI content runs in sandboxed iframes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pre-declared Templates"}),": Hosts can review HTML content before execution"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Auditable Messages"}),": All UI-Host communication is JSON-RPC based, can be logged and audited"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"User Consent"}),": View-initiated tool calls can require user confirmation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CSP Control"}),": Fine-grained external domain access control"]}),`
`]}),`
`,e.jsx(n.h3,{children:"6.2 iframe Sandbox Attributes"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`function buildAllowAttribute(permissions?: McpUiResourcePermissions): string {
  const allows = [
    'allow-scripts', // Allow script execution
    'allow-forms', // Allow form submission
    'allow-same-origin', // Allow same-origin access (required for postMessage)
  ];

  // Dynamically add based on declared permissions
  if (permissions?.camera) allows.push('camera');
  if (permissions?.microphone) allows.push('microphone');
  if (permissions?.geolocation) allows.push('geolocation');
  if (permissions?.clipboardWrite) allows.push('clipboard-write');

  return allows.join('; ');
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": ",e.jsx(n.code,{children:"allow-same-origin"})," is necessary for postMessage communication but does not grant the App access to the parent window's DOM."]}),`
`,e.jsx(n.h3,{children:"6.3 Double iframe Architecture (Recommended)"}),`
`,e.jsxs(n.p,{children:["For enhanced security, the specification recommends a ",e.jsx(n.strong,{children:"double iframe architecture"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Host Window
  └── Sandbox iframe (validates origin)
        └── Resource iframe (runs App)
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Outer iframe"}),": Acts as security proxy, validates inner message origins"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Inner iframe"}),": Actually runs the App"]}),`
`]}),`
`,e.jsx(n.p,{children:"This architecture prevents malicious Apps from spoofing message origins."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 7: Display Modes"}),`
`,e.jsx(n.h3,{children:"7.1 Three Modes"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Mode"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Use Case"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"inline"})}),e.jsx(n.td,{children:"Embedded in conversation flow"}),e.jsx(n.td,{children:"Default mode, small components"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"fullscreen"})}),e.jsx(n.td,{children:"Full screen overlay"}),e.jsx(n.td,{children:"Complex interactions, immersive experiences"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"pip"})}),e.jsx(n.td,{children:"Picture-in-picture"}),e.jsx(n.td,{children:"Continuous monitoring, video playback"})]})]})]}),`
`,e.jsx(n.h3,{children:"7.2 Mode Switching"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// View requests switch to fullscreen mode
await app.requestDisplayMode({ mode: 'fullscreen' });

// Listen for mode changes
app.onhostcontextchanged = context => {
  if (context.displayMode) {
    console.log('Display mode changed to:', context.displayMode);
    // Adjust layout based on mode
  }
};
`})}),`
`,e.jsx(n.h3,{children:"7.3 Responsive Design Considerations"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Use containerSize to adapt to container
const { width, height } = hostContext.containerSize ?? {};

// Handle safe areas for notched screens
const { top, right, bottom, left } = hostContext.safeAreaInsets ?? {};

// Adjust touch interactions based on platform
if (hostContext.platform === 'mobile') {
  // Increase tap targets, optimize gestures
}
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 8: Practical Development Guide"}),`
`,e.jsx(n.h3,{children:"8.1 Project Structure (Recommended)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`my-mcp-app/
├── src/
│   ├── server/
│   │   └── index.ts        # MCP server
│   └── view/
│       ├── index.html      # View entry
│       ├── app.tsx         # React component
│       └── styles.css      # Styles
├── dist/                   # Build output
├── package.json
├── tsconfig.json
└── vite.config.ts
`})}),`
`,e.jsx(n.h3,{children:"8.2 Minimal Example - Server Side"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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

// Register tool with UI
registerAppTool(
  server,
  'show-dashboard',
  {
    title: 'Show Dashboard',
    description: 'Display interactive dashboard',
    inputSchema: {
      type: 'object',
      properties: {
        data: { type: 'array', description: 'Data to display' },
      },
    },
    _meta: {
      ui: { resourceUri },
    },
  },
  async args => {
    // Tool logic - returned data is sent to View via tool-result
    return {
      content: [{ type: 'text', text: 'Dashboard ready' }],
      structuredContent: { chartData: args.data },
    };
  }
);

// Register UI resource
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
`,e.jsx(n.h3,{children:"8.3 Minimal Example - View Side (Vanilla JS)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { App, PostMessageTransport } from '@modelcontextprotocol/ext-apps';

      const app = new App({ name: 'my-view', version: '1.0.0' });
      const transport = new PostMessageTransport();

      // Handle tool input (parameters when tool is called)
      app.ontoolinput = input => {
        console.log('Tool input:', input);
      };

      // Handle tool result (data after tool execution)
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
`,e.jsx(n.h3,{children:"8.4 Minimal Example - View Side (React)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useApp, useHostStyleVariables } from '@modelcontextprotocol/ext-apps/react';

export default function Dashboard() {
  const { app, toolInput, toolResult, hostContext } = useApp({
    name: 'my-view',
    version: '1.0.0',
  });

  // Automatically apply host theme CSS variables
  useHostStyleVariables(app, hostContext);

  // Proactively call server tools
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
`,e.jsx(n.h3,{children:"8.5 Build Configuration (Vite)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// vite.config.ts
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
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"viteSingleFile"})," plugin inlines all resources into a single HTML file—the recommended approach for MCP Apps to simplify distribution and avoid external dependencies."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 9: Advanced Patterns"}),`
`,e.jsx(n.h3,{children:"9.1 App-Only Tools"}),`
`,e.jsx(n.p,{children:'Create "internal tools" that only the UI can call:'}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`registerAppTool(
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
        visibility: ['app'], // Key: only visible to app, LLM cannot call
      },
    },
  },
  async args => {
    const data = await fetchInternal(args.endpoint);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);
`})}),`
`,e.jsx(n.h3,{children:"9.2 Chunked Loading for Large Data"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Server side - support pagination
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

// View side - incremental loading
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
`,e.jsx(n.h3,{children:"9.3 Updating Model Context"}),`
`,e.jsx(n.p,{children:"Let the LLM know what the user did in the UI:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// User selected an option in the UI
const handleSelection = async selectedItem => {
  // Update model context so LLM knows about the selection
  await app.updateModelContext({
    content: [
      {
        type: 'text',
        text: \`User selected in dashboard: \${selectedItem.name} (ID: \${selectedItem.id})\`,
      },
    ],
  });
};
`})}),`
`,e.jsx(n.p,{children:'This way, when the user asks "help me analyze the one I just selected," the LLM will know what it is.'}),`
`,e.jsx(n.h3,{children:"9.4 Streaming Tool Input"}),`
`,e.jsx(n.p,{children:"When tool input data is large, the host can send it in chunks:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// View side - handle partial input
app.ontoolinputpartial = partial => {
  // Show loading progress
  setLoadingText(partial.input?.partialText || 'Loading...');
};

app.ontoolinput = input => {
  // Complete input arrived
  setLoadingText(null);
  processInput(input);
};
`})}),`
`,e.jsx(n.h3,{children:"9.5 Theme Synchronization"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Automatically apply host theme
app.onhostcontextchanged = context => {
  // Set data-theme attribute
  document.documentElement.dataset.theme = context.theme;

  // Apply CSS variables
  if (context.styles) {
    for (const [key, value] of Object.entries(context.styles)) {
      document.documentElement.style.setProperty(key, value);
    }
  }
};
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 10: Comparison with OpenAI Apps SDK"}),`
`,e.jsx(n.h3,{children:"10.1 Relationship"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ext-apps (MCP Apps)"}),": MCP official specification + SDK, cross-platform standard"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"OpenAI Apps SDK"}),": ChatGPT-specific implementation, based on MCP Apps specification"]}),`
`]}),`
`,e.jsxs(n.p,{children:["They are ",e.jsx(n.strong,{children:"not competitors"}),", but rather a ",e.jsx(n.strong,{children:"specification-implementation"})," relationship. OpenAI Apps SDK is the official implementation of MCP Apps specification on the ChatGPT platform."]}),`
`,e.jsx(n.h3,{children:"10.2 Key Differences"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Aspect"}),e.jsx(n.th,{children:"ext-apps (MCP Apps)"}),e.jsx(n.th,{children:"OpenAI Apps SDK"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Positioning"})}),e.jsx(n.td,{children:"Protocol spec + generic SDK"}),e.jsx(n.td,{children:"ChatGPT-specific framework"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Metadata prefix"})}),e.jsx(n.td,{children:"No specific prefix"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"openai/*"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"State management"})}),e.jsx(n.td,{children:"Implemented by App"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"widgetSessionId"})," + ",e.jsx(n.code,{children:"widgetState"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Transport"})}),e.jsx(n.td,{children:"stdio, SSE, HTTP"}),e.jsx(n.td,{children:"Primarily SSE"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"UI library"})}),e.jsx(n.td,{children:"Any"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"@openai/apps-sdk-ui"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Authentication"})}),e.jsx(n.td,{children:"Via MCP standard"}),e.jsx(n.td,{children:"OAuth RFC 9728"})]})]})]}),`
`,e.jsx(n.h3,{children:"10.3 Migration Guide"}),`
`,e.jsx(n.p,{children:"Migrating from OpenAI Apps SDK to MCP Apps:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// OpenAI Apps SDK
const meta = {
  'openai/outputTemplate': 'ui://widget/view.html',
  'openai/widgetSessionId': sessionId,
  'openai/widgetState': { count: 0 },
};

// MCP Apps (ext-apps)
const meta = {
  ui: { resourceUri: 'ui://widget/view.html' },
};
// State management via updateModelContext or custom tools
`})}),`
`,e.jsx(n.h3,{children:"10.4 OpenAI-Specific Features"}),`
`,e.jsx(n.p,{children:"OpenAI Apps SDK provides some ChatGPT-specific APIs:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Call tools from Widget
window.openai.callTool({ name: "search", arguments: {...} })

// Send follow-up message (trigger new LLM response)
window.openai.sendFollowUpMessage("Continue analysis...")

// Open modal
window.openai.requestModal({ ... })

// widgetState auto-persisted to session
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 11: Client Support"}),`
`,e.jsx(n.h3,{children:"11.1 Supported Clients"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Client"}),e.jsx(n.th,{children:"Status"}),e.jsx(n.th,{children:"Notes"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Claude (Web & Desktop)"})}),e.jsx(n.td,{children:"✅ Supported"}),e.jsx(n.td,{children:"First batch, full implementation"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"ChatGPT"})}),e.jsx(n.td,{children:"✅ Supported"}),e.jsx(n.td,{children:"Launched release week 2026-01-26"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Goose"})}),e.jsx(n.td,{children:"✅ Supported"}),e.jsx(n.td,{children:"Block open source project"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"VS Code Insiders"})}),e.jsx(n.td,{children:"✅ Supported"}),e.jsx(n.td,{children:"GitHub Copilot integration"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Postman"})}),e.jsx(n.td,{children:"✅ Supported"}),e.jsx(n.td,{children:"API testing tool"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"MCPJam"})}),e.jsx(n.td,{children:"✅ Supported"}),e.jsx(n.td,{children:"Community client"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"JetBrains IDEs"})}),e.jsx(n.td,{children:"🚧 In Development"}),e.jsx(n.td,{children:"Expressed support intent"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"AWS (Bedrock)"})}),e.jsx(n.td,{children:"🚧 In Development"}),e.jsx(n.td,{children:"Expressed support intent"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Google DeepMind"})}),e.jsx(n.td,{children:"🚧 In Development"}),e.jsx(n.td,{children:"Antigravity team exploring"})]})]})]}),`
`,e.jsx(n.h3,{children:"11.2 Configuration Example (Claude Desktop)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "mcpServers": {
    "my-app": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
`})}),`
`,e.jsx(n.h3,{children:"11.3 Configuration Example (VS Code)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "mcpServers": {
    "my-app": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-my-app", "--stdio"]
    }
  }
}
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 12: Example Projects Overview"}),`
`,e.jsx(n.h3,{children:"12.1 Official ext-apps Examples"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Category"}),e.jsx(n.th,{children:"Example"}),e.jsx(n.th,{children:"Tech Stack"}),e.jsx(n.th,{children:"Demo Feature"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Basic Templates"})}),e.jsx(n.td,{children:"basic-server-react"}),e.jsx(n.td,{children:"React"}),e.jsx(n.td,{children:"Basic Hooks usage"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"basic-server-vue"}),e.jsx(n.td,{children:"Vue 3"}),e.jsx(n.td,{children:"Composition API"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"basic-server-svelte"}),e.jsx(n.td,{children:"Svelte"}),e.jsx(n.td,{children:"Reactive programming"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"basic-server-vanillajs"}),e.jsx(n.td,{children:"Vanilla JS"}),e.jsx(n.td,{children:"No-framework implementation"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"3D/Visualization"})}),e.jsx(n.td,{children:"map-server"}),e.jsx(n.td,{children:"CesiumJS"}),e.jsx(n.td,{children:"3D globe"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"threejs-server"}),e.jsx(n.td,{children:"Three.js"}),e.jsx(n.td,{children:"3D scenes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"shadertoy-server"}),e.jsx(n.td,{children:"GLSL"}),e.jsx(n.td,{children:"Real-time shaders"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Documents/Media"})}),e.jsx(n.td,{children:"pdf-server"}),e.jsx(n.td,{children:"PDF.js"}),e.jsx(n.td,{children:"PDF chunked loading"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"video-resource-server"}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"Binary video"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"sheet-music-server"}),e.jsx(n.td,{children:"abc2svg"}),e.jsx(n.td,{children:"Sheet music rendering"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Data Analysis"})}),e.jsx(n.td,{children:"cohort-heatmap-server"}),e.jsx(n.td,{children:"ECharts"}),e.jsx(n.td,{children:"Retention heatmap"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"customer-segmentation-server"}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"Clustering scatter plot"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"wiki-explorer-server"}),e.jsx(n.td,{children:"Cytoscape"}),e.jsx(n.td,{children:"Knowledge graph"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Business Apps"})}),e.jsx(n.td,{children:"scenario-modeler-server"}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"SaaS financial projections"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"budget-allocator-server"}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"Budget allocation"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Utilities"})}),e.jsx(n.td,{children:"system-monitor-server"}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"Real-time system monitoring"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"transcript-server"}),e.jsx(n.td,{children:"WebAPI"}),e.jsx(n.td,{children:"Speech transcription"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{}),e.jsx(n.td,{children:"qr-server (Python)"}),e.jsx(n.td,{children:"-"}),e.jsx(n.td,{children:"QR code generation"})]})]})]}),`
`,e.jsx(n.h3,{children:"12.2 Running Examples"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Clone repository
git clone https://github.com/modelcontextprotocol/ext-apps.git
cd ext-apps

# Install dependencies
npm install

# Start all examples (using basic-host)
npm start

# Visit http://localhost:8080/
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 13: Testing and Debugging"}),`
`,e.jsx(n.h3,{children:"13.1 Local Testing"}),`
`,e.jsxs(n.p,{children:["Test your MCP App using ",e.jsx(n.code,{children:"basic-host"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Start basic-host
cd ext-apps/examples/basic-host
npm install && npm start

# In another terminal, start your server
cd your-app && npm run serve

# Configure basic-host to connect to your server
SERVERS='["http://localhost:3001"]' npm start
`})}),`
`,e.jsx(n.h3,{children:"13.2 Testing with Claude"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Expose local server using cloudflared
npx cloudflared tunnel --url http://localhost:3001

# Copy the generated URL (e.g., https://xxx.trycloudflare.com)
# Add it as a Custom Connector in Claude settings
`})}),`
`,e.jsx(n.h3,{children:"13.3 Common Troubleshooting"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Issue"}),e.jsx(n.th,{children:"Possible Cause"}),e.jsx(n.th,{children:"Solution"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"External requests blocked"}),e.jsx(n.td,{children:"CSP domain not declared"}),e.jsxs(n.td,{children:["Add domain to ",e.jsx(n.code,{children:"_meta.ui.csp.connectDomains"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"postMessage fails"}),e.jsx(n.td,{children:"Sandbox misconfiguration"}),e.jsxs(n.td,{children:["Ensure ",e.jsx(n.code,{children:"allow-same-origin"})," is present"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Theme not syncing"}),e.jsx(n.td,{children:"Not listening for context changes"}),e.jsxs(n.td,{children:["Implement ",e.jsx(n.code,{children:"onhostcontextchanged"})," handler"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Tool call timeout"}),e.jsx(n.td,{children:"Server responding slowly"}),e.jsx(n.td,{children:"Check server logs, optimize processing logic"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"UI not displaying"}),e.jsx(n.td,{children:"Resource load failure"}),e.jsx(n.td,{children:"Verify resourceUri is correct"})]})]})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 14: Best Practices"}),`
`,e.jsx(n.h3,{children:"14.1 Do's ✅"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Use CSS variables for theme adaptation"}),": Ensure good presentation in both light and dark themes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Respond to displayMode changes"}),": Adjust layout for inline/fullscreen/pip"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Provide text fallback"}),": Support clients that don't support MCP Apps"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Use TypeScript"}),": Ensure type safety, reduce runtime errors"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Chunk load large datasets"}),": Avoid transferring too much data at once"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Explicitly declare required CSP domains"}),": Principle of least privilege"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implement teardown cleanup"}),": Release resources, unsubscribe"]}),`
`]}),`
`,e.jsx(n.h3,{children:"14.2 Don'ts ❌"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Store sensitive data in View"}),": iframe may be accessible by other scripts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Assume fixed container dimensions"}),": Use responsive design"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ignore teardown events"}),": May cause memory leaks"]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Use ",e.jsx(n.code,{children:"*"})," wildcard CSP domains"]}),": Security risk"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Block main thread"}),": Use Web Workers for time-consuming operations"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rely on undeclared external CDNs"}),": Will be blocked by CSP"]}),`
`]}),`
`,e.jsx(n.h3,{children:"14.3 Performance Optimization"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// 1. Use viteSingleFile to inline all resources
import { viteSingleFile } from 'vite-plugin-singlefile';

// 2. Enable gzip compression
// Set Content-Encoding: gzip when server returns

// 3. Lazy load heavy libraries
const loadThreeJs = () => import('three');

// 4. Use requestIdleCallback for non-critical tasks
requestIdleCallback(() => {
  // Preloading, analytics, and other non-critical operations
});

// 5. Use virtual scrolling for long lists
// Recommended: react-window, vue-virtual-scroller
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 15: Impact and Transformation of MCP Apps"}),`
`,e.jsx(n.h3,{children:"15.1 Impact on AI Ecosystem"}),`
`,e.jsx(n.h4,{children:'Breaking the "Text-Only Response" Paradigm'}),`
`,e.jsx(n.p,{children:`Traditional AI Agents can only return text. Even with "code execution" capabilities, what's ultimately presented to users is still text or static images.`}),`
`,e.jsx(n.p,{children:"MCP Apps change this:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Before MCP App:
User: "Help me generate a pie chart of sales data"
Agent: "Sure, here's the data: {...}, you can copy it to Excel to generate the chart"

After MCP App:
User: "Help me generate a pie chart of sales data"
Agent: [Directly renders interactive ECharts pie chart, supports hover for details, export images]
`})}),`
`,e.jsx(n.h4,{children:"Promoting Agent Ecosystem Standardization"}),`
`,e.jsxs(n.p,{children:["MCP Apps is the ",e.jsx(n.strong,{children:"first cross-company, cross-platform"})," AI Agent UI standard:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Joint participation from Anthropic, OpenAI, Block, Microsoft"}),`
`,e.jsx(n.li,{children:"Same MCP App can run in Claude, ChatGPT, VS Code"}),`
`,e.jsx(n.li,{children:"Developers only need to write code once"}),`
`]}),`
`,e.jsx(n.p,{children:'This avoids ecosystem fragmentation—no "Claude-only plugins" or "ChatGPT-only Widgets."'}),`
`,e.jsx(n.h4,{children:"Accelerating Enterprise AI Applications"}),`
`,e.jsxs(n.p,{children:["According to Forrester 2026 predictions, ",e.jsx(n.strong,{children:"30% of enterprise application vendors"})," will launch their own MCP servers."]}),`
`,e.jsx(n.p,{children:"MCP Apps enable enterprises to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Encapsulate internal systems as MCP Apps, exposing capabilities to AI Agents"}),`
`,e.jsx(n.li,{children:"Avoid vendor lock-in, flexibly choose AI platforms"}),`
`,e.jsx(n.li,{children:"Standardize AI integration for internal tools"}),`
`]}),`
`,e.jsx(n.h3,{children:"15.2 Impact on Developers"}),`
`,e.jsx(n.h4,{children:"New Skill Requirements"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Traditional MCP Development"}),e.jsx(n.th,{children:"MCP App Development"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Backend-focused"}),e.jsx(n.td,{children:"Full-stack required"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"JSON data processing"}),e.jsx(n.td,{children:"UI/UX design"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"No sandbox considerations"}),e.jsx(n.td,{children:"Must understand CSP, iframe security"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Single platform adaptation"}),e.jsx(n.td,{children:"Cross-platform theming/responsive"})]})]})]}),`
`,e.jsx(n.h4,{children:"Lower Distribution Barriers"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No separate deployment"}),": UI embedded as resource in MCP Server"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No app store review"}),": Configure MCP server to use"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Instant updates"}),": Code changes take effect immediately, no user upgrade needed"]}),`
`]}),`
`,e.jsx(n.h3,{children:"15.3 Transformation of Product Interactions"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Scenario"}),e.jsx(n.th,{children:"Traditional Experience"}),e.jsx(n.th,{children:"MCP App Experience"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Data visualization"}),e.jsx(n.td,{children:"Return data for user to chart"}),e.jsx(n.td,{children:"Render interactive charts directly"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Form filling"}),e.jsx(n.td,{children:"Multi-turn conversation asking fields one by one"}),e.jsx(n.td,{children:"One-time form input"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"File preview"}),e.jsx(n.td,{children:"Return download link"}),e.jsx(n.td,{children:"Embed PDF/3D viewer"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Configuration wizard"}),e.jsx(n.td,{children:"Step-by-step text guidance"}),e.jsx(n.td,{children:"Visual step indicators"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Map navigation"}),e.jsx(n.td,{children:"Return address text"}),e.jsx(n.td,{children:"Embed interactive map"})]})]})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 16: Comparison with Google A2UI"}),`
`,e.jsx(n.h3,{children:"16.1 A2UI Introduction"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A2UI (Agent-to-User Interface)"})," is another Agent UI protocol released by Google in December 2025."]}),`
`,e.jsxs(n.p,{children:["Core philosophy: ",e.jsx(n.strong,{children:"Declarative component description"}),", not executable code."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Agent outputs A2UI JSON description
        ↓
Client reads component description
        ↓
Maps to native local components
        ↓
User sees native-style UI
`})}),`
`,e.jsx(n.h3,{children:"16.2 Core Differences"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Dimension"}),e.jsx(n.th,{children:"MCP Apps"}),e.jsx(n.th,{children:"Google A2UI"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Core Philosophy"})}),e.jsx(n.td,{children:"Embedded web applications"}),e.jsx(n.td,{children:"Declarative component descriptions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"UI Implementation"})}),e.jsx(n.td,{children:"Full HTML/CSS/JS (iframe)"}),e.jsx(n.td,{children:"JSON component declarations (native rendering)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Flexibility"})}),e.jsx(n.td,{children:"High (can use any frontend tech)"}),e.jsx(n.td,{children:"Limited (only predefined components)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Security Model"})}),e.jsx(n.td,{children:"iframe sandbox + CSP"}),e.jsx(n.td,{children:"Component whitelist directory"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Development Barrier"})}),e.jsx(n.td,{children:"Requires frontend experience"}),e.jsx(n.td,{children:"LLM can generate directly"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Rendering Consistency"})}),e.jsx(n.td,{children:"Consistent across platforms"}),e.jsx(n.td,{children:"Depends on each platform's native implementation"})]})]})]}),`
`,e.jsx(n.h3,{children:"16.3 Technical Approach Comparison"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:'MCP Apps: "Mini Web App" Approach'})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// Return complete HTML
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
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:'A2UI: "Native-First Declarative" Approach'})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
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
`,e.jsx(n.h3,{children:"16.4 How to Choose"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Scenario"}),e.jsx(n.th,{children:"Recommended Approach"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Simple forms, lists, cards"}),e.jsx(n.td,{children:"A2UI (lighter weight)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Complex data visualization (ECharts, D3)"}),e.jsx(n.td,{children:"MCP Apps (more flexible)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"3D/maps/rich media"}),e.jsx(n.td,{children:"MCP Apps (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Want native system experience"}),e.jsx(n.td,{children:"A2UI"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Need complex interaction logic"}),e.jsx(n.td,{children:"MCP Apps"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"LLM directly generating UI"}),e.jsx(n.td,{children:"A2UI"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Reusing existing web components"}),e.jsx(n.td,{children:"MCP Apps"})]})]})]}),`
`,e.jsx(n.h3,{children:"16.5 Possible Convergence Directions"}),`
`,e.jsx(n.p,{children:"The two aren't mutually exclusive—future possibilities include:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"MCP Apps internally using A2UI descriptions for dynamically generated UI fragments"}),`
`,e.jsx(n.li,{children:"A2UI component directory expanding to support embedded MCP Apps"}),`
`,e.jsx(n.li,{children:'Unified "Agent UI Protocol" integrating both approaches'}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Part 17: Future Development Directions"}),`
`,e.jsx(n.h3,{children:"17.1 Protocol Level"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"More display modes"}),": Beyond inline/fullscreen/pip, possibly modal, sidebar, etc."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Enhanced permission control"}),": Finer-grained device access, network request control"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"A2UI convergence"}),": Hybrid use of declarative components and embedded Apps"]}),`
`]}),`
`,e.jsx(n.h3,{children:"17.2 Ecosystem Expansion"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"More client support"}),": JetBrains, AWS Bedrock, Google, etc."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Component template library"}),": Ready-to-use templates for common UI patterns"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visual building tools"}),": Low-code/no-code MCP App builders"]}),`
`]}),`
`,e.jsx(n.h3,{children:"17.3 Technical Capability Enhancements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multi-App coordination"}),": State sharing and message passing between Apps"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Offline and persistence"}),": Service Worker caching, cross-session state preservation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"More device permissions"}),": Bluetooth, NFC, sensors, etc."]}),`
`]}),`
`,e.jsx(n.h3,{children:"17.4 Vertical Domain Deepening"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Healthcare"}),": DICOM medical image viewers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Financial Services"}),": Real-time market charts, risk dashboards"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Engineering Design"}),": CAD previewer, BIM model viewing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Education & Training"}),": Interactive courseware, programming exercise environments"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"Conclusion"}),`
`,e.jsxs(n.p,{children:["MCP Apps is a ",e.jsx(n.strong,{children:"historic extension"}),' to the MCP protocol, marking the elevation of the AI Agent ecosystem from "tool calling" to "application platform."']}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Key Takeaways"}),":"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MCP App = Tool + UI Resource"}),", linked via ",e.jsx(n.code,{children:"_meta.ui.resourceUri"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Three-layer architecture"}),": Server → Host → View, communicating via JSON-RPC"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multi-layer security"}),": iframe sandbox + CSP + permission declarations + user consent"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-platform support"}),": Claude, ChatGPT, VS Code, Goose, and more"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ecosystem significance"}),": Breaking text-only paradigm, promoting Agent UI standardization"]}),`
`]}),`
`,e.jsxs(n.p,{children:["If you're developing MCP servers, it's time to consider adding interactive UI to your tools. MCP Apps make AI Agents truly become a ",e.jsx(n.strong,{children:"visual application platform"}),", not just a chat box."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"References"}),`
`,e.jsx(n.h3,{children:"Official Resources"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/modelcontextprotocol/ext-apps",children:"ext-apps Official Repository"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://modelcontextprotocol.io/docs/extensions/apps",children:"MCP Apps Official Documentation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://modelcontextprotocol.github.io/ext-apps/api/",children:"API Documentation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx",children:"Specification (2026-01-26)"})}),`
`]}),`
`,e.jsx(n.h3,{children:"Blog Posts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/",children:"MCP Apps 1.0 Release Announcement (2026-01-26)"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/",children:"MCP Apps Preview Announcement (2025-11-21)"})}),`
`]}),`
`,e.jsx(n.h3,{children:"Related Projects"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/MCP-UI-Org/mcp-ui",children:"MCP-UI Community Project"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://developers.openai.com/apps-sdk/",children:"OpenAI Apps SDK"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://a2ui.org/",children:"Google A2UI"})}),`
`]}),`
`,e.jsx(n.h3,{children:"Community Discussions"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865",children:"SEP-1865 PR"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/modelcontextprotocol-community/working-groups/issues/35",children:"Working Group Issue #35"})}),`
`]})]})}function o(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{o as default,r as frontmatter};
