import { cn } from '../../utils/cn';

interface NebulaGradientProps {
  className?: string;
  variant?: 'default' | 'cyber' | 'holo' | 'plasma';
}

export function NebulaGradient({ className, variant = 'default' }: NebulaGradientProps) {
  const gradients = {
    default: (
      <>
        {/* Cyber blue glow - main cockpit light */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-cyber-500/10 blur-[120px] animate-nebula-flow" />
        {/* Secondary cyber */}
        <div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-cyber-600/8 blur-[100px] animate-nebula-flow"
          style={{ animationDelay: '-5s' }}
        />
        {/* Holo accent */}
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-holo/5 blur-[80px] animate-nebula-flow"
          style={{ animationDelay: '-10s' }}
        />
      </>
    ),
    cyber: (
      <>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyber-500/15 blur-[120px] animate-nebula-flow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyber-600/10 blur-[100px] animate-nebula-flow"
          style={{ animationDelay: '-7s' }}
        />
      </>
    ),
    holo: (
      <>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-holo/10 blur-[120px] animate-nebula-flow" />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyber-500/8 blur-[100px] animate-nebula-flow"
          style={{ animationDelay: '-5s' }}
        />
      </>
    ),
    plasma: (
      <>
        {/* Plasma orange glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-plasma/10 blur-[120px] animate-nebula-flow" />
        {/* Secondary red accent */}
        <div
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-red-500/8 blur-[100px] animate-nebula-flow"
          style={{ animationDelay: '-5s' }}
        />
        {/* Cyber highlight */}
        <div
          className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-cyber-500/5 blur-[80px] animate-nebula-flow"
          style={{ animationDelay: '-10s' }}
        />
      </>
    ),
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {gradients[variant]}
    </div>
  );
}
