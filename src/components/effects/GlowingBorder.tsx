import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
  variant?: 'amber' | 'holo' | 'mixed';
}

export function GlowingBorder({
  children,
  className,
  borderRadius = '0.75rem',
  duration = 4,
  variant = 'amber',
}: GlowingBorderProps) {
  const gradients = {
    amber: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706, #f59e0b, #fbbf24)',
    holo: 'linear-gradient(90deg, #2dd4bf, #14b8a6, #0d9488, #14b8a6, #2dd4bf)',
    mixed: 'linear-gradient(90deg, #fbbf24, #f59e0b, #2dd4bf, #f59e0b, #fbbf24)',
  };

  return (
    <div className={cn('relative group', className)}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          borderRadius,
          background: gradients[variant],
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '200% 50%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Content */}
      <div className="relative" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}
