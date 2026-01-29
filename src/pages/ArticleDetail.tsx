import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, ComponentType, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Globe, Clock, ChevronUp } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import { Badge } from '../components';
import { NebulaGradient } from '../components/backgrounds/NebulaGradient';
import { GlowingStars } from '../components/effects/GlowingStars';
import { mdxComponents } from '../components/mdx/MDXComponents';
import { useMermaid } from '../hooks/useMermaid';

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  author: string;
}

interface MDXModule {
  default: ComponentType;
  frontmatter: Frontmatter;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'zh';

  const [Content, setContent] = useState<ComponentType | null>(null);
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableLangs, setAvailableLangs] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ref for mermaid rendering
  const articleRef = useRef<HTMLElement>(null);

  // Render mermaid diagrams after content loads
  useMermaid(articleRef, [Content, loading]);

  // 监听滚动显示返回顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      setError(null);

      try {
        const module = (await import(
          `../../content/articles/${slug}/index.${lang}.mdx`
        )) as MDXModule;
        setContent(() => module.default);
        setFrontmatter(module.frontmatter);

        const langs: string[] = [];
        try {
          await import(`../../content/articles/${slug}/index.zh.mdx`);
          langs.push('zh');
        } catch {}
        try {
          await import(`../../content/articles/${slug}/index.en.mdx`);
          langs.push('en');
        } catch {}
        setAvailableLangs(langs);
      } catch (err) {
        console.error('Failed to load article:', err);
        try {
          const fallbackLang = lang === 'zh' ? 'en' : 'zh';
          const module = (await import(
            `../../content/articles/${slug}/index.${fallbackLang}.mdx`
          )) as MDXModule;
          setContent(() => module.default);
          setFrontmatter(module.frontmatter);
          setAvailableLangs([fallbackLang]);
        } catch {
          setError('文章未找到');
        }
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadArticle();
    }
  }, [slug, lang]);

  const switchLanguage = (newLang: string) => {
    setSearchParams({ lang: newLang });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 加载状态
  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 pointer-events-none">
          <NebulaGradient className="opacity-30" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* 骨架屏 - 科幻风格 */}
            <div className="h-4 w-32 bg-void-700/50 rounded animate-pulse" />
            <div className="glass-card p-8">
              <div className="space-y-4">
                <div className="h-8 bg-void-700/50 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-void-700/50 rounded w-1/2 animate-pulse" />
                <div className="flex gap-2 mt-4">
                  <div className="h-6 w-16 bg-void-700/50 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-void-700/50 rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="glass-card p-8 space-y-4">
              <div className="h-4 bg-void-700/50 rounded animate-pulse" />
              <div className="h-4 bg-void-700/50 rounded animate-pulse" />
              <div className="h-4 bg-void-700/50 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-void-700/50 rounded w-4/6 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error || !Content) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 pointer-events-none">
          <NebulaGradient variant="plasma" className="opacity-30" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors mb-8 font-mono text-sm"
          >
            <ArrowLeft size={16} />
            <span>返回文章列表</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-state text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-plasma/10 border border-plasma/20 flex items-center justify-center">
              <span className="text-3xl">⚠</span>
            </div>
            <h1 className="text-2xl font-bold text-dust-white mb-4 font-heading">文章未找到</h1>
            <p className="text-dust-muted font-mono text-sm">ERROR 404 · DOCUMENT NOT FOUND</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <NebulaGradient className="opacity-30" />
        <GlowingStars quantity={10} />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      {/* 页面内容 */}
      <div className="relative z-10">
        {/* 顶部导航栏 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-20 backdrop-blur-xl bg-void-950/80 border-b border-cyber-500/10"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 text-dust-muted hover:text-cyber-400 transition-colors font-mono text-sm group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">返回文章列表</span>
                <span className="sm:hidden">返回</span>
              </Link>

              {/* 语言切换 */}
              {availableLangs.length > 1 && (
                <div className="flex items-center gap-1 p-1 rounded-lg bg-void-800/50 border border-cyber-500/10">
                  {availableLangs.includes('zh') && (
                    <button
                      onClick={() => switchLanguage('zh')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                        lang === 'zh'
                          ? 'bg-cyber-500/20 text-cyber-400 border border-cyber-500/30'
                          : 'text-dust-muted hover:text-dust-light hover:bg-void-700/50'
                      }`}
                    >
                      中文
                    </button>
                  )}
                  {availableLangs.includes('en') && (
                    <button
                      onClick={() => switchLanguage('en')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                        lang === 'en'
                          ? 'bg-cyber-500/20 text-cyber-400 border border-cyber-500/30'
                          : 'text-dust-muted hover:text-dust-light hover:bg-void-700/50'
                      }`}
                    >
                      EN
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 文章主体 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* 文章头部 */}
          {frontmatter && (
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10 sm:mb-12"
            >
              {/* 元信息徽章 */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="cyber" className="font-cockpit text-[10px]">
                  <Globe size={10} className="mr-1.5" />
                  {lang === 'zh' ? '中文' : 'ENGLISH'}
                </Badge>
                <span className="flex items-center gap-1.5 text-xs text-dust-dim font-mono">
                  <Calendar size={12} className="text-cyber-500/60" />
                  {frontmatter.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-dust-dim font-mono">
                  <User size={12} className="text-holo/60" />
                  {frontmatter.author}
                </span>
              </div>

              {/* 标题 */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dust-white mb-4 font-heading tracking-wide leading-tight">
                {frontmatter.title}
              </h1>

              {/* 描述 */}
              <p className="text-base sm:text-lg text-dust-light leading-relaxed mb-6">
                {frontmatter.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map(tag => (
                  <span key={tag} className="badge-futuristic text-[10px]">
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* 分隔线 */}
              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-cyber-500/30 to-transparent" />
            </motion.header>
          )}

          {/* 文章内容 */}
          <motion.article
            ref={articleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose"
          >
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </motion.article>

          {/* 文章底部 */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-8 border-t border-cyber-500/10"
          >
            {/* 标签云 */}
            {frontmatter && (
              <div className="mb-8">
                <h4 className="text-xs font-mono text-dust-dim mb-3 tracking-wider">TAGS</h4>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map(tag => (
                    <span key={tag} className="badge-futuristic badge-holo text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 返回按钮 */}
            <div className="flex items-center justify-between">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-void-800/50 border border-cyber-500/20 text-cyber-400 hover:bg-void-700/50 hover:border-cyber-500/40 transition-all font-mono text-sm group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                浏览更多文章
              </Link>

              <div className="text-xs text-dust-dim font-mono">END OF DOCUMENT</div>
            </div>
          </motion.footer>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-void-800/80 backdrop-blur-xl border border-cyber-500/30 flex items-center justify-center text-cyber-400 hover:bg-void-700/80 hover:border-cyber-500/50 transition-all shadow-lg shadow-void-950/50"
        aria-label="返回顶部"
      >
        <ChevronUp size={20} />
      </motion.button>
    </div>
  );
}
