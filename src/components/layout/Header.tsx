import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: '首页', code: 'HOME' },
  { path: '/articles', label: '文章', code: 'DOCS' },
  { path: '/resources', label: '资源', code: 'RES' },
  { path: '/cases', label: '案例', code: 'CASE' },
  { path: '/videos', label: '视频', code: 'VID' },
  { path: '/about', label: '关于', code: 'INFO' },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-void-900/80 backdrop-blur-xl border-b border-amber-500/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="font-display font-bold text-xl text-gradient tracking-wider">
              USE MCP
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-sm transition-colors"
              >
                {location.pathname === item.path && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-amber-500/10 rounded-lg border border-amber-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`relative z-10 font-heading tracking-wide ${
                    location.pathname === item.path
                      ? 'text-amber-400'
                      : 'text-dust-muted hover:text-dust-white'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-dust-muted hover:text-dust-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-amber-500/10 space-y-1">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-heading tracking-wide transition-colors ${
                      location.pathname === item.path
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-dust-muted hover:text-dust-white hover:bg-void-700/30'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-dust-dim">[{item.code}]</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
