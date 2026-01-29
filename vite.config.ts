import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import path from 'path';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    dark: 'github-dark-default',
    light: 'github-light-default',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
};

export default defineConfig({
  plugins: [
    {
      ...mdx({
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
        rehypePlugins: [
          [rehypePrettyCode, prettyCodeOptions],
        ],
      }),
      enforce: 'pre',
    },
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  // 自定义域名 mcpuse.cn 部署
  base: '/',
  build: {
    outDir: 'docs',  // 输出到 docs 目录，方便 GitHub Pages 部署
    sourcemap: false,
    rollupOptions: {
      external: (id) => id.includes('/workspace/'),
    },
  },
  // Exclude workspace from scanning
  server: {
    watch: {
      ignored: ['**/workspace/**', '**/node_modules/**'],
    },
  },
  // 排除 workspace 目录的依赖扫描
  optimizeDeps: {
    exclude: ['workspace'],
    entries: ['src/**/*.{ts,tsx}', 'content/**/*.mdx', '!workspace/**'],
  },
});
