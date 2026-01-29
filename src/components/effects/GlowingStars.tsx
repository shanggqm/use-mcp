import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface GlowingStarsProps {
  className?: string;
  quantity?: number;
}

export function GlowingStars({ className, quantity = 30 }: GlowingStarsProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newStars = Array.from({ length: quantity }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, [quantity]);

  // Color palette: mostly cool (cyber/white), occasional holo accent
  const getStarColor = (index: number) => {
    const colors = ['#38bdf8', '#0ea5e9', '#f0f2f8', '#c8cdd8', '#2dd4bf'];
    // Weight towards cyber/white (80%), occasional holo (20%)
    if (index % 5 === 0) return colors[4]; // holo
    return colors[index % 4];
  };

  const getGlowColor = (index: number) => {
    if (index % 5 === 0) return 'rgba(45, 212, 191, 0.5)'; // holo glow
    if (index % 3 === 0) return 'rgba(14, 165, 233, 0.5)'; // cyber glow
    return 'rgba(240, 242, 248, 0.4)'; // white glow
  };

  return (
    <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: getStarColor(i),
            opacity: star.opacity,
            animationDuration: `${star.twinkleSpeed}s`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${getGlowColor(i)}`,
          }}
        />
      ))}
    </div>
  );
}
