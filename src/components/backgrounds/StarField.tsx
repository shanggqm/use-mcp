'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface StarFieldProps {
  className?: string;
  quantity?: number;
  speed?: number;
}

export function StarField({ className, quantity = 80, speed = 0.3 }: StarFieldProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          // Cool star colors - cyber, white, occasional holo
          value: ['#f0f2f8', '#38bdf8', '#0ea5e9', '#c8cdd8', '#2dd4bf'],
        },
        move: {
          enable: true,
          speed: speed,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
        },
        number: {
          value: quantity,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        opacity: {
          value: { min: 0.1, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.5,
            startValue: 'random',
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 0.5, max: 2 },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
            color: {
              value: ['#38bdf8', '#0ea5e9', '#2dd4bf'],
            },
          },
        },
      },
      detectRetina: true,
    }),
    [quantity, speed]
  );

  if (!init) return null;

  return <Particles className={className} options={options} />;
}
