import { useEffect } from 'react';
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

/**
 * Hook to render mermaid diagrams in the DOM
 * Finds all code blocks with language-mermaid class and renders them
 */
export function useMermaid(containerRef: React.RefObject<HTMLElement>, deps: any[] = []) {
  useEffect(() => {
    const renderMermaidDiagrams = async () => {
      if (!containerRef.current) return;

      // 查找所有 mermaid 代码块
      // rehype-pretty-code 会创建 figure > pre > code 结构
      const codeBlocks = containerRef.current.querySelectorAll(
        'code[data-language="mermaid"], code.language-mermaid'
      );

      for (let i = 0; i < codeBlocks.length; i++) {
        const codeElement = codeBlocks[i] as HTMLElement;
        const preElement = codeElement.closest('pre');
        const figureElement = preElement?.closest('figure') || preElement?.parentElement;

        if (!preElement) continue;

        // 获取 mermaid 代码
        const code = codeElement.textContent || '';
        if (!code.trim()) continue;

        // 检查是否已经渲染过
        if (preElement.dataset.mermaidRendered === 'true') continue;

        try {
          // 生成唯一 ID
          const id = `mermaid-diagram-${i}-${Date.now()}`;

          // 渲染 mermaid
          const { svg } = await mermaid.render(id, code);

          // 创建容器
          const container = document.createElement('div');
          container.className = 'mermaid-container';
          container.innerHTML = svg;

          // 替换原来的代码块
          if (figureElement && figureElement !== preElement) {
            figureElement.replaceWith(container);
          } else {
            preElement.replaceWith(container);
          }
        } catch (error) {
          console.error('Mermaid render error:', error);
          // 标记为已处理，避免重复尝试
          preElement.dataset.mermaidRendered = 'true';
          preElement.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        }
      }
    };

    // 延迟执行，确保 DOM 完全渲染
    const timer = setTimeout(renderMermaidDiagrams, 100);
    return () => clearTimeout(timer);
  }, [containerRef, ...deps]);
}

export default useMermaid;
