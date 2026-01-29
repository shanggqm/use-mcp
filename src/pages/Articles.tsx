import { motion } from 'framer-motion';
import { BookOpen, Cpu, Zap } from 'lucide-react';
import { ArticleCard, Badge } from '../components';
import { NebulaGradient } from '../components/backgrounds/NebulaGradient';
import { GlowingStars } from '../components/effects/GlowingStars';
import articlesData from '../../content/articles/_meta.json';

interface Article {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  date: string;
  tags: string[];
  featured?: boolean;
  languages: string[];
}

export default function Articles() {
  const articles = articlesData.articles as Article[];

  return (
    <div className="relative min-h-screen">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <NebulaGradient className="opacity-40" />
        <GlowingStars quantity={15} />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* 页面内容 */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题区域 */}
        <motion.div
          className="glass-header mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 装饰徽章 */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="cyber" className="font-cockpit text-[10px] tracking-wider">
              <Cpu size={10} className="mr-1.5" />
              KNOWLEDGE BASE
            </Badge>
            <span className="text-dust-dim text-xs font-mono">[{articles.length} ENTRIES]</span>
          </div>

          {/* 标题 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-500/10 border border-cyber-500/30 flex items-center justify-center">
              <BookOpen size={24} className="text-cyber-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-gradient tracking-wider">
                文章
              </h1>
              <p className="text-sm text-dust-muted font-mono mt-1">
                ARTICLES · TUTORIALS · GUIDES
              </p>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-dust-light leading-relaxed max-w-2xl">
            深入了解 MCP 协议的技术文章和教程，从基础概念到高级实践，
            <span className="text-cyber-400">助你掌握 AI Agent 开发的核心技术</span>。
          </p>
        </motion.div>

        {/* 文章列表 */}
        {articles.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-500/10 border border-cyber-500/20 flex items-center justify-center">
              <Zap size={24} className="text-cyber-500/60" />
            </div>
            <p className="text-dust-muted font-heading tracking-wide">文章内容即将上线...</p>
            <p className="text-dust-dim text-sm mt-2 font-mono">INITIALIZING DATA STREAM...</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} {...article} index={index} />
            ))}
          </div>
        )}

        {/* 底部装饰 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 text-dust-dim text-xs font-mono">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyber-500/30" />
            END OF TRANSMISSION
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyber-500/30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
