import { motion } from 'framer-motion';
import { Boxes, Database, Zap } from 'lucide-react';
import { Badge } from '../components';
import { NebulaGradient } from '../components/backgrounds/NebulaGradient';
import { GlowingStars } from '../components/effects/GlowingStars';

export default function Resources() {
  return (
    <div className="relative min-h-screen">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <NebulaGradient variant="holo" className="opacity-30" />
        <GlowingStars quantity={12} />
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
            <Badge variant="holo" className="font-cockpit text-[10px] tracking-wider">
              <Database size={10} className="mr-1.5" />
              RESOURCE HUB
            </Badge>
            <span className="text-dust-dim text-xs font-mono">[0 ENTRIES]</span>
          </div>

          {/* 标题 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-holo/10 border border-holo/30 flex items-center justify-center">
              <Boxes size={24} className="text-holo" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-holo tracking-wider">
                资源
              </h1>
              <p className="text-sm text-dust-muted font-mono mt-1">TOOLS · LIBRARIES · DOCS</p>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-dust-light leading-relaxed max-w-2xl">
            精选的 MCP 相关工具、库和文档资源，
            <span className="text-holo">帮助你快速构建 AI 应用</span>。
          </p>
        </motion.div>

        {/* 空状态 */}
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-holo/10 border border-holo/20 flex items-center justify-center">
            <Zap size={24} className="text-holo/60" />
          </div>
          <p className="text-dust-muted font-heading tracking-wide">资源列表即将上线...</p>
          <p className="text-dust-dim text-sm mt-2 font-mono">SCANNING NETWORK FOR RESOURCES...</p>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 text-dust-dim text-xs font-mono">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-holo/30" />
            END OF TRANSMISSION
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-holo/30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
