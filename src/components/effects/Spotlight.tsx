import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = 'white' }: SpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn('absolute pointer-events-none', className)}
    >
      <svg
        className="w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] opacity-30"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="spotlight-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor={fill} stopOpacity="0.15" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="600"
          cy="600"
          rx="600"
          ry="600"
          fill="url(#spotlight-gradient)"
        />
      </svg>
    </motion.div>
  );
}
