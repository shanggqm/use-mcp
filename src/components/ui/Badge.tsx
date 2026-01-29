import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'cyber' | 'holo' | 'plasma' | 'success' | 'warning';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  glow?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-void-700 text-dust-light border-void-600',
  cyber: 'bg-cyber-500/10 text-cyber-400 border-cyber-500/30',
  holo: 'bg-holo/10 text-holo-light border-holo/30',
  plasma: 'bg-plasma/10 text-plasma-light border-plasma/30',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
};

export function Badge({
  className,
  variant = 'default',
  glow = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5',
        'text-xs font-medium rounded-full',
        'border font-heading tracking-wide',
        variantStyles[variant],
        glow && variant === 'cyber' && 'shadow-glow-cyber',
        glow && variant === 'holo' && 'shadow-glow-holo',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
