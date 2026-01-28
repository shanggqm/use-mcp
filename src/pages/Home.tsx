import { Link } from 'react-router-dom';
import { BookOpen, Boxes, FolderKanban, Video, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, Badge } from '../components';
import { NebulaGradient } from '../components/backgrounds/NebulaGradient';
import { ShootingStars } from '../components/effects/ShootingStars';
import { GlowingStars } from '../components/effects/GlowingStars';
import { GlowingBorder } from '../components/effects/GlowingBorder';

const features = [
  {
    icon: BookOpen,
    title: '文章',
    description: '深入了解 MCP 协议的技术文章和教程',
    link: '/articles',
    color: 'amber',
  },
  {
    icon: Boxes,
    title: '资源',
    description: '精选的 MCP 相关工具、库和文档资源',
    link: '/resources',
    color: 'holo',
  },
  {
    icon: FolderKanban,
    title: '案例',
    description: '实际应用 MCP 的项目案例分析',
    link: '/cases',
    color: 'plasma',
  },
  {
    icon: Video,
    title: '视频',
    description: 'MCP 相关的视频教程和演示',
    link: '/videos',
    color: 'amber',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <NebulaGradient />
        <ShootingStars quantity={8} />
        <GlowingStars quantity={20} />

        {/* Grid overlay for cockpit feel */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center mb-8"
            >
              <Badge variant="amber" className="px-4 py-1.5 font-cockpit text-[10px]">
                <Zap size={12} className="mr-2" />
                OPEN PROTOCOL · AI GATEWAY
              </Badge>
            </motion.div>

            {/* Title - using cockpit display font */}
            <h1 className="mb-6">
              <span className="block text-dust-white text-2xl md:text-3xl font-heading tracking-wider mb-2">
                EXPLORE THE
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient tracking-wider">
                MODEL CONTEXT
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient tracking-wider">
                PROTOCOL
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-dust-light max-w-2xl mx-auto mb-10 leading-relaxed">
              连接 AI 模型与外部工具的开放协议
              <br className="hidden md:block" />
              <span className="text-dust-muted">在这里，发现无限可能</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/articles">
                <Button size="lg" glow>
                  <span className="font-cockpit text-xs tracking-widest">开始探索</span>
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  <span className="font-heading tracking-wide">了解更多</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-amber-500/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-amber-500"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Link to={feature.link}>
                  <GlowingBorder variant={feature.color === 'holo' ? 'holo' : 'amber'}>
                    <Card
                      hover="glow"
                      className="h-full bg-void-850/60"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                            feature.color === 'amber'
                              ? 'bg-amber-500/10 text-amber-400'
                              : feature.color === 'holo'
                              ? 'bg-holo/10 text-holo'
                              : 'bg-plasma/10 text-plasma'
                          }`}
                        >
                          <feature.icon size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-dust-white mb-2 font-heading tracking-wide">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-dust-muted leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </GlowingBorder>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About MCP Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-void-900/50" />
        <NebulaGradient variant="amber" className="opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Badge variant="holo" className="mb-4 font-cockpit text-[10px]">
                SYSTEM INFO
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-dust-white tracking-wider">
                什么是 MCP?
              </h2>
            </div>

            <Card variant="panel" className="max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <p className="text-dust-light leading-relaxed text-lg">
                  <span className="text-dust-white font-semibold">Model Context Protocol (MCP)</span>{' '}
                  是由 Anthropic 提出的开放协议，旨在标准化 AI 模型与外部工具、数据源之间的交互方式。
                </p>
                <p className="text-dust-light leading-relaxed text-lg mt-4">
                  通过 MCP，AI 应用可以安全、高效地访问文件系统、数据库、API 等资源，实现更强大的功能。
                  它就像是 AI 世界的 <span className="text-amber-400 font-semibold">通用接口</span>，让不同的工具和服务能够即插即用。
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-amber-500/10">
                  {[
                    { label: '开放标准', value: 'OPEN', code: 'PROTO' },
                    { label: '安全可控', value: 'SECURE', code: 'SAFE' },
                    { label: '即插即用', value: 'PLUG', code: 'PLAY' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="font-cockpit text-2xl md:text-3xl text-gradient tracking-widest">
                        {item.value}
                      </div>
                      <div className="font-mono text-xs text-holo tracking-wider mt-1">
                        [{item.code}]
                      </div>
                      <div className="text-sm text-dust-muted mt-2">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-dust-white mb-4 tracking-wider">
              准备好探索了吗？
            </h2>
            <p className="text-dust-muted mb-8 max-w-xl mx-auto">
              从文章开始，深入了解 MCP 的核心概念和最佳实践
            </p>
            <Link to="/articles">
              <Button size="lg" glow>
                <span className="font-cockpit text-xs tracking-widest">浏览文章</span>
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
