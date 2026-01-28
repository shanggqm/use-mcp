export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">关于</h1>

      <div className="prose max-w-none">
        <p className="text-slate-600 leading-relaxed mb-6">
          Use MCP 是一个专注于 Model Context Protocol (MCP) 主题的内容网站，
          旨在帮助开发者了解和使用 MCP 协议。
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">关于 MCP</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Model Context Protocol (MCP) 是由 Anthropic 提出的开放协议，
          用于标准化 AI 模型与外部工具和数据源之间的交互方式。
          它定义了一套统一的接口，使 AI 应用能够安全、高效地访问各种资源。
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">网站内容</h2>
        <ul className="text-slate-600 space-y-2">
          <li><strong>文章</strong>：MCP 相关的技术文章和深度解析</li>
          <li><strong>资源</strong>：精选的工具、库、文档等资源汇总</li>
          <li><strong>案例</strong>：实际应用 MCP 的项目案例分析</li>
          <li><strong>视频</strong>：视频教程和演示</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">参与贡献</h2>
        <p className="text-slate-600 leading-relaxed">
          欢迎通过 {' '}
          <a
            href="https://github.com/shanggqm/use-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            GitHub
          </a>
          {' '} 参与贡献内容或提出建议。
        </p>
      </div>
    </div>
  );
}
