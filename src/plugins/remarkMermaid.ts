import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';

/**
 * Remark 插件：将 mermaid 代码块转换为 Mermaid 组件
 * 这样可以在 rehype-pretty-code 处理之前将 mermaid 代码块提取出来
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (node.lang === 'mermaid' && parent && typeof index === 'number') {
        // 将代码块转换为 MDX JSX 元素
        const mermaidNode = {
          type: 'mdxJsxFlowElement',
          name: 'Mermaid',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'chart',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: JSON.stringify(node.value),
                data: {
                  estree: {
                    type: 'Program',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'Literal',
                          value: node.value,
                          raw: JSON.stringify(node.value),
                        },
                      },
                    ],
                    sourceType: 'module',
                  },
                },
              },
            },
          ],
          children: [],
          data: { _mdxExplicitJsx: true },
        };

        // 替换原节点
        parent.children.splice(index, 1, mermaidNode as any);
      }
    });
  };
}

export default remarkMermaid;
