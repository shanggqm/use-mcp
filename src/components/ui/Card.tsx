import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'glass' | 'solid' | 'panel';
  hover?: 'lift' | 'glow' | 'border' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  glass: `
    bg-void-800/40 backdrop-blur-xl
    border border-amber-500/10
  `,
  solid: `
    bg-void-850
    border border-void-700
  `,
  panel: `
    bg-void-850/60 backdrop-blur-xl
    border border-amber-500/15
    shadow-inner-glow
  `,
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const hoverVariants = {
  lift: {
    rest: { y: 0, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' },
    hover: { y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)' },
  },
  glow: {
    rest: { boxShadow: '0 0 0 rgba(245, 158, 11, 0)' },
    hover: { boxShadow: '0 0 30px rgba(245, 158, 11, 0.2)' },
  },
  border: {
    rest: { borderColor: 'rgba(245, 158, 11, 0.1)' },
    hover: { borderColor: 'rgba(245, 158, 11, 0.4)' },
  },
  none: {
    rest: {},
    hover: {},
  },
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'glass', hover = 'lift', padding = 'md', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-xl transition-colors duration-300',
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        initial="rest"
        whileHover="hover"
        variants={hoverVariants[hover]}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Subcomponents
export const CardHeader = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl font-semibold text-dust-white font-heading', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-dust-muted mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-dust-light', className)} {...props}>
    {children}
  </div>
);
