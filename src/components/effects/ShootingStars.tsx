import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface ShootingStar {
  id: number;
  style: {
    top: string;
    left: string;
    animationDelay: string;
    animationDuration: string;
  };
}

interface ShootingStarsProps {
  className?: string;
  quantity?: number;
  minDelay?: number;
  maxDelay?: number;
}

export function ShootingStars({
  className,
  quantity = 10,
  minDelay = 1,
  maxDelay = 10,
}: ShootingStarsProps) {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: quantity }, (_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 50}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
        animationDuration: `${Math.random() * 2 + 3}s`,
      },
    }));
    setStars(newStars);
  }, [quantity, minDelay, maxDelay]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-meteor"
          style={{
            ...star.style,
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 2px rgba(255, 255, 255, 0.8), -100px 0 20px 1px rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Tail */}
          <span
            className="absolute top-1/2 -translate-y-1/2 w-[100px] h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
              transform: 'translateY(-50%) rotate(0deg)',
              transformOrigin: 'left center',
            }}
          />
        </span>
      ))}
    </div>
  );
}
