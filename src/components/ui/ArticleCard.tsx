import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  date: string;
  tags: string[];
  featured?: boolean;
  languages: string[];
  index?: number;
}

export function ArticleCard({
  slug,
  title,
  description,
  date,
  tags,
  featured = false,
  languages,
  index = 0,
}: ArticleCardProps) {
  return (
    <motion.a
      href={`#/articles/${slug}`}
      className="glass-card group block relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* 扫描动效装饰 */}
      <div className="absolute inset-0 scan-decoration pointer-events-none" />

      {/* 内容区域 */}
      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          {/* 左侧主内容 */}
          <div className="flex-1 min-w-0">
            {/* 元信息行 */}
            <div className="flex items-center gap-3 mb-3">
              {/* 精选徽章 */}
              {featured && (
                <span className="badge-futuristic badge-featured">
                  <Sparkles size={10} className="mr-1.5" />
                  精选
                </span>
              )}

              {/* 日期 */}
              <span className="flex items-center gap-1.5 text-xs text-dust-dim font-mono">
                <Calendar size={12} className="text-cyber-500/60" />
                {date}
              </span>
            </div>

            {/* 标题 */}
            <h2 className="text-lg md:text-xl font-semibold text-dust-white mb-2 font-heading tracking-wide group-hover:text-cyber-400 transition-colors duration-300 line-clamp-2">
              {title}
            </h2>

            {/* 描述 */}
            <p className="text-sm text-dust-muted leading-relaxed mb-4 line-clamp-2">
              {description}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="badge-futuristic text-[10px] py-1 px-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            {/* 语言标签 */}
            <div className="flex gap-1.5">
              {languages.includes('zh') && (
                <span className="badge-futuristic badge-holo text-[10px]">中文</span>
              )}
              {languages.includes('en') && <span className="badge-futuristic text-[10px]">EN</span>}
            </div>

            {/* 箭头指示器 */}
            <div className="mt-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-cyber-500/10 border border-cyber-500/30 flex items-center justify-center">
                <ChevronRight size={16} className="text-cyber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部发光线条 */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyber-500/0 to-transparent group-hover:via-cyber-500/30 transition-all duration-500" />
    </motion.a>
  );
}
