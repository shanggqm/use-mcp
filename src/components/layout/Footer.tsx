import { Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-500/10 bg-void-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-xl text-gradient tracking-wider mb-3">
              USE MCP
            </h3>
            <p className="text-dust-muted text-sm leading-relaxed">
              探索 Model Context Protocol
              <br />
              <span className="font-mono text-xs text-dust-dim">[AI_GATEWAY_INTERFACE]</span>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-dust-white font-heading font-semibold mb-3 tracking-wide">
              导航
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/articles', label: '文章', code: 'DOCS' },
                { to: '/resources', label: '资源', code: 'RES' },
                { to: '/cases', label: '案例', code: 'CASE' },
                { to: '/videos', label: '视频', code: 'VID' },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-dust-muted hover:text-amber-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-dust-dim">[{item.code}]</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-dust-white font-heading font-semibold mb-3 tracking-wide">
              连接
            </h4>
            <div className="flex space-x-3">
              <a
                href="https://github.com/shanggqm/use-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-void-800/50 text-dust-muted hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-void-800/50 text-dust-muted hover:text-holo hover:bg-holo/10 border border-transparent hover:border-holo/20 transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-amber-500/5">
          <p className="text-center text-dust-dim text-sm font-mono">
            <span className="text-dust-muted">&copy; {new Date().getFullYear()}</span>
            {' '}<span className="text-amber-400/60">USE_MCP</span>{' '}
            <span className="text-dust-dim">// ALL_RIGHTS_RESERVED</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
