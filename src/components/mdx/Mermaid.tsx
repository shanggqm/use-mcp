import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// 初始化 mermaid 配置 - 科幻主题
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    // 背景色
    background: '#0f0d0a',
    primaryColor: '#1c1916',
    secondaryColor: '#151310',
    tertiaryColor: '#0f0d0a',

    // 主要颜色 - 琥珀色
    primaryTextColor: '#f5f0e8',
    primaryBorderColor: '#f59e0b',

    // 次要颜色 - 青色
    secondaryTextColor: '#d4cdc2',
    secondaryBorderColor: '#2dd4bf',

    // 线条颜色
    lineColor: '#f59e0b',

    // 文字颜色
    textColor: '#d4cdc2',

    // 节点颜色
    nodeBorder: '#f59e0b',
    nodeTextColor: '#f5f0e8',

    // 序列图特定
    actorBkg: '#1c1916',
    actorBorder: '#f59e0b',
    actorTextColor: '#fbbf24',
    actorLineColor: '#f59e0b',
    signalColor: '#f59e0b',
    signalTextColor: '#d4cdc2',
    noteBkgColor: '#1c1916',
    noteBorderColor: '#2dd4bf',
    noteTextColor: '#5eead4',

    // 流程图特定
    clusterBkg: '#151310',
    clusterBorder: '#f59e0b',

    // 字体
    fontFamily: '"Share Tech Mono", "JetBrains Mono", monospace',
    fontSize: '14px',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 50,
    htmlLabels: true,
    useMaxWidth: true,
  },
  sequence: {
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
    useMaxWidth: true,
    rightAngles: false,
    showSequenceNumbers: false,
  },
});

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className = '' }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current || !chart) return;

      try {
        // 生成唯一 ID
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // 渲染 mermaid 图表
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className={`mermaid-error ${className}`}>
        <div className="flex items-center gap-2 text-plasma text-sm font-mono mb-2">
          <span>⚠</span>
          <span>Diagram Error</span>
        </div>
        <pre className="text-xs text-dust-muted overflow-auto">{error}</pre>
        <details className="mt-2">
          <summary className="text-xs text-dust-dim cursor-pointer">View source</summary>
          <pre className="text-xs text-dust-muted mt-2 overflow-auto">{chart}</pre>
        </details>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default Mermaid;
