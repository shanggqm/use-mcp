import { ComponentType } from 'react';
import { Mermaid } from './Mermaid';

// MDX 组件映射
// Mermaid 组件通过 remarkMermaid 插件在编译时转换
export const mdxComponents: Record<string, ComponentType<any>> = {
  Mermaid: Mermaid,
};

export default mdxComponents;
