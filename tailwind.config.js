/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 深空背景色 - 太空科幻深色
        void: {
          950: '#030508', // 最深背景 - 深空黑
          900: '#070a10', // 主背景
          850: '#0c1018', // 卡片背景
          800: '#111620', // 稍亮
          700: '#1a2030', // 悬停背景
          600: '#252d40', // 边框色
        },
        // 天蓝/霓虹蓝 - 太空仪表盘科技光 (主色)
        cyber: {
          DEFAULT: '#0ea5e9',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
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
          white: '#f0f2f8', // 主文字 - 冷白
          light: '#c8cdd8', // 次要文字
          muted: '#8a8fa0', // 辅助文字
          dim: '#5a5f70', // 最暗文字
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
        // 天蓝渐变
        'cyber-gradient': 'linear-gradient(135deg, #0ea5e9, #0284c7)',
        'cyber-glow':
          'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.15), transparent 70%)',
        // 全息渐变
        'holo-gradient': 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
        // 能量渐变
        'plasma-gradient': 'linear-gradient(135deg, #f97316, #ef4444)',
        // 飞船灯光渐变
        'cockpit-gradient':
          'linear-gradient(180deg, rgba(14, 165, 233, 0.05) 0%, transparent 50%, rgba(20, 184, 166, 0.03) 100%)',
      },
      boxShadow: {
        'glow-cyber': '0 0 20px rgba(14, 165, 233, 0.4)',
        'glow-cyber-lg': '0 0 40px rgba(14, 165, 233, 0.5)',
        'glow-holo': '0 0 20px rgba(45, 212, 191, 0.4)',
        'glow-plasma': '0 0 20px rgba(249, 115, 22, 0.4)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(14, 165, 233, 0.1)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse-cyber 2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        flicker: 'flicker 0.15s infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        meteor: 'meteor 5s linear infinite',
        'holo-shift': 'holo-shift 8s ease-in-out infinite',
        'data-flow': 'data-flow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse-cyber': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' },
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
            color: '#c8cdd8',
            a: {
              color: '#38bdf8',
              '&:hover': {
                color: '#0ea5e9',
              },
            },
            strong: {
              color: '#f0f2f8',
            },
            h1: {
              color: '#0ea5e9',
            },
            h2: {
              color: '#0ea5e9',
            },
            h3: {
              color: '#38bdf8',
            },
            h4: {
              color: '#7dd3fc',
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
              color: '#8a8fa0',
              borderLeftColor: '#0ea5e9',
            },
            hr: {
              borderColor: 'rgba(200, 205, 216, 0.15)',
            },
            'ul > li::marker': {
              color: '#0ea5e9',
            },
            'ol > li::marker': {
              color: '#0ea5e9',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
