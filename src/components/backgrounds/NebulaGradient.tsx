import { cn } from '../../utils/cn';

interface NebulaGradientProps {
  className?: string;
  variant?: 'default' | 'amber' | 'holo';
}

export function NebulaGradient({ className, variant = 'default' }: NebulaGradientProps) {
  const gradients = {
    default: (
      <>
        {/* Amber warm glow - main cockpit light */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px] animate-nebula-flow" />
        {/* Secondary amber */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-amber-600/8 blur-[100px] animate-nebula-flow" style={{ animationDelay: '-5s' }} />
        {/* Holo accent */}
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-holo/5 blur-[80px] animate-nebula-flow" style={{ animationDelay: '-10s' }} />
      </>
    ),
    amber: (
      <>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/15 blur-[120px] animate-nebula-flow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[100px] animate-nebula-flow" style={{ animationDelay: '-7s' }} />
      </>
    ),
    holo: (
      <>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-holo/10 blur-[120px] animate-nebula-flow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[100px] animate-nebula-flow" style={{ animationDelay: '-5s' }} />
      </>
    ),
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {gradients[variant]}
    </div>
  );
}
