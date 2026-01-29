import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'holo';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-cyber-500 to-cyber-600
    text-void-950 font-semibold
    hover:shadow-glow-cyber
  `,
  secondary: `
    bg-void-700/50 backdrop-blur-sm
    text-dust-white
    border border-cyber-500/20
    hover:bg-void-600/50 hover:border-cyber-500/40
  `,
  ghost: `
    bg-transparent
    text-dust-light
    hover:text-dust-white hover:bg-void-700/30
  `,
  outline: `
    bg-transparent
    text-cyber-400
    border border-cyber-500/50
    hover:bg-cyber-500/10 hover:border-cyber-500
  `,
  holo: `
    bg-transparent
    text-holo
    border border-holo/50
    hover:bg-holo/10 hover:border-holo hover:shadow-glow-holo
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3 text-base rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          'font-medium transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'font-heading tracking-wide',
          variants[variant],
          sizes[size],
          glow && 'animate-glow-pulse',
          className
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
