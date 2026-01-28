/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 深空背景色 - 更偏暖的深色
        void: {
          950: '#0a0806',    // 最深背景 - 带一点暖色的黑
          900: '#0f0d0a',    // 主背景
          850: '#151310',    // 卡片背景
          800: '#1c1916',    // 稍亮
          700: '#2a2520',    // 悬停背景
          600: '#3d362e',    // 边框色
        },
        // 琥珀/金色系 - 飞船仪表盘暖光 (主色)
        amber: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // 全息青色 - 数据/信息显示
        holo: {
          DEFAULT: '#2dd4bf',
          light: '#5eead4',
          dim: '#14b8a6',
          dark: '#0d9488',
        },
        // 警告红/橙 - 能量/重点
        plasma: {
          DEFAULT: '#f97316',
          light: '#fb923c',
          bright: '#ff6b35',
          red: '#ef4444',
        },
        // 星尘色 - 文字层级
        dust: {
          white: '#f5f0e8',    // 主文字 - 暖白
          light: '#d4cdc2',    // 次要文字
          muted: '#9a928a',    // 辅助文字
          dim: '#6b635a',      // 最暗文字
        },
        // 功能色
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
      },
      fontFamily: {
        // 主显示字体 - 科幻几何感
        display: ['Orbitron', 'Rajdhani', 'system-ui', 'sans-serif'],
        // 副标题字体 - 现代感
        heading: ['Exo 2', 'Rajdhani', 'system-ui', 'sans-serif'],
        // 正文字体
        body: ['Inter', 'system-ui', 'sans-serif'],
        // 终端/代码字体
        mono: ['Share Tech Mono', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        // 琥珀渐变
        'amber-gradient': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'amber-glow': 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15), transparent 70%)',
        // 全息渐变
        'holo-gradient': 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
        // 能量渐变
        'plasma-gradient': 'linear-gradient(135deg, #f97316, #ef4444)',
        // 飞船灯光渐变
        'cockpit-gradient': 'linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, transparent 50%, rgba(20, 184, 166, 0.03) 100%)',
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glow-amber-lg': '0 0 40px rgba(245, 158, 11, 0.5)',
        'glow-holo': '0 0 20px rgba(45, 212, 191, 0.4)',
        'glow-plasma': '0 0 20px rgba(249, 115, 22, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(245, 158, 11, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse-amber 2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'meteor': 'meteor 5s linear infinite',
        'holo-shift': 'holo-shift 8s ease-in-out infinite',
        'data-flow': 'data-flow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse-amber': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: 0 },
        },
        'holo-shift': {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(15deg)' },
        },
        'data-flow': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#d4cdc2',
            a: {
              color: '#fbbf24',
              '&:hover': {
                color: '#f59e0b',
              },
            },
            strong: {
              color: '#f5f0e8',
            },
            h1: {
              color: '#f5f0e8',
            },
            h2: {
              color: '#f5f0e8',
            },
            h3: {
              color: '#f5f0e8',
            },
            h4: {
              color: '#f5f0e8',
            },
            code: {
              color: '#2dd4bf',
              backgroundColor: 'rgba(45, 212, 191, 0.1)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              color: '#9a928a',
              borderLeftColor: '#f59e0b',
            },
            hr: {
              borderColor: 'rgba(212, 205, 194, 0.15)',
            },
            'ul > li::marker': {
              color: '#f59e0b',
            },
            'ol > li::marker': {
              color: '#f59e0b',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
