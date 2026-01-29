import { useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';

interface WarpDriveNebulaProps {
  className?: string;
  starCount?: number;
  warpSpeed?: number;
  nebulaIntensity?: number;
  nebulaScale?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  size: number;
  hasGlow: boolean;
}

// 星点颜色
const STAR_COLOR = '#f0f2f8';

export function WarpDriveNebula({
  className,
  starCount = 400,
  warpSpeed = 0.08,
  nebulaIntensity = 1,
  nebulaScale = 0.5,
}: WarpDriveNebulaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  // 初始化星星
  const initStars = useCallback(
    (width: number, height: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const star = createStar(width, height);
        stars.push(star);
      }
      starsRef.current = stars;
    },
    [starCount]
  );

  // 创建单个星星 - 放射状分布
  const createStar = (width: number, height: number, resetToCenter = false): Star => {
    const centerX = width / 2;
    const centerY = height / 2;

    // 放射状分布：从中心向外
    const angle = Math.random() * Math.PI * 2;
    // 初始位置在中心附近
    const initialRadius = resetToCenter
      ? Math.random() * 30
      : Math.random() * Math.max(width, height) * 0.6;

    return {
      x: centerX + Math.cos(angle) * initialRadius,
      y: centerY + Math.sin(angle) * initialRadius,
      z: resetToCenter ? 2000 + Math.random() * 500 : Math.random() * 2000 + 200,
      baseX: centerX,
      baseY: centerY,
      size: Math.random() * 1.2 + 0.3,
      hasGlow: Math.random() < 0.08, // 只有8%的星星有星辉
    };
  };

  // 绘制螺旋星云（上帝之眼）- 占画面50%
  const drawHelixNebula = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    time: number
  ) => {
    // 星云大小占画面50%
    const maxRadius = Math.min(centerX, centerY) * nebulaScale * 2;

    // 外层气体云 - 更大更柔和
    for (let i = 0; i < 4; i++) {
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        maxRadius * 0.05,
        centerX,
        centerY,
        maxRadius * (1.2 - i * 0.1)
      );
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.2, `rgba(45, 212, 191, ${0.015 * nebulaIntensity})`);
      gradient.addColorStop(0.4, `rgba(14, 165, 233, ${0.025 * nebulaIntensity})`);
      gradient.addColorStop(0.6, `rgba(2, 132, 199, ${0.02 * nebulaIntensity})`);
      gradient.addColorStop(0.8, `rgba(12, 74, 110, ${0.01 * nebulaIntensity})`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, centerX * 2, centerY * 2);
    }

    // 绘制同心椭圆环（上帝之眼特征）- 更多层次
    const rings = 12;
    for (let i = rings; i > 0; i--) {
      const ringRadius = maxRadius * (i / rings) * 0.85;
      const eccentricity = 0.55 + Math.sin(time * 0.0002 + i * 0.3) * 0.08;
      const rotation = time * 0.00003 * (i % 2 === 0 ? 1 : -1);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // 绘制椭圆环
      const ringGradient = ctx.createRadialGradient(0, 0, ringRadius * 0.85, 0, 0, ringRadius);

      const alpha = (0.06 + (rings - i) * 0.015) * nebulaIntensity;
      if (i > rings * 0.75) {
        ringGradient.addColorStop(0, 'transparent');
        ringGradient.addColorStop(0.6, `rgba(12, 74, 110, ${alpha * 0.6})`);
        ringGradient.addColorStop(1, 'transparent');
      } else if (i > rings * 0.5) {
        ringGradient.addColorStop(0, 'transparent');
        ringGradient.addColorStop(0.6, `rgba(14, 165, 233, ${alpha * 0.8})`);
        ringGradient.addColorStop(1, 'transparent');
      } else if (i > rings * 0.25) {
        ringGradient.addColorStop(0, 'transparent');
        ringGradient.addColorStop(0.5, `rgba(45, 212, 191, ${alpha})`);
        ringGradient.addColorStop(1, 'transparent');
      } else {
        ringGradient.addColorStop(0, 'transparent');
        ringGradient.addColorStop(0.4, `rgba(125, 211, 252, ${alpha * 1.2})`);
        ringGradient.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius, ringRadius * eccentricity, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 中心明亮核心 - 更大
    const coreGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      maxRadius * 0.2
    );
    coreGradient.addColorStop(0, `rgba(240, 249, 255, ${0.85 * nebulaIntensity})`);
    coreGradient.addColorStop(0.15, `rgba(186, 230, 253, ${0.6 * nebulaIntensity})`);
    coreGradient.addColorStop(0.3, `rgba(125, 211, 252, ${0.4 * nebulaIntensity})`);
    coreGradient.addColorStop(0.5, `rgba(14, 165, 233, ${0.2 * nebulaIntensity})`);
    coreGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = coreGradient;
    ctx.fillRect(0, 0, centerX * 2, centerY * 2);

    // 中心亮点 - 更柔和
    const brightCore = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
    brightCore.addColorStop(0, `rgba(255, 255, 255, ${0.9 * nebulaIntensity})`);
    brightCore.addColorStop(0.2, `rgba(240, 249, 255, ${0.7 * nebulaIntensity})`);
    brightCore.addColorStop(0.5, `rgba(186, 230, 253, ${0.4 * nebulaIntensity})`);
    brightCore.addColorStop(1, 'transparent');

    ctx.fillStyle = brightCore;
    ctx.fillRect(centerX - 35, centerY - 35, 70, 70);

    // 添加星云气体丝状结构
    drawNebulaFilaments(ctx, centerX, centerY, maxRadius, time);
  };

  // 绘制星云丝状气体结构 - 更大更柔和
  const drawNebulaFilaments = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    maxRadius: number,
    time: number
  ) => {
    const filamentCount = 16;

    for (let i = 0; i < filamentCount; i++) {
      const baseAngle = (i / filamentCount) * Math.PI * 2;
      const angle = baseAngle + Math.sin(time * 0.00012 + i) * 0.12;

      const startRadius = maxRadius * 0.15;
      const endRadius = maxRadius * (0.75 + Math.sin(time * 0.00006 + i * 0.4) * 0.12);

      const gradient = ctx.createLinearGradient(
        centerX + Math.cos(angle) * startRadius,
        centerY + Math.sin(angle) * startRadius,
        centerX + Math.cos(angle) * endRadius,
        centerY + Math.sin(angle) * endRadius
      );

      const alpha = (0.02 + Math.sin(time * 0.00015 + i) * 0.01) * nebulaIntensity;
      gradient.addColorStop(0, `rgba(125, 211, 252, ${alpha * 0.7})`);
      gradient.addColorStop(0.3, `rgba(45, 212, 191, ${alpha})`);
      gradient.addColorStop(0.6, `rgba(14, 165, 233, ${alpha * 0.5})`);
      gradient.addColorStop(1, 'transparent');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 25 + Math.sin(time * 0.0001 + i) * 10;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(angle) * startRadius, centerY + Math.sin(angle) * startRadius);

      // 绘制弯曲的丝状结构 - 更自然的曲线
      const controlAngle = angle + Math.sin(time * 0.00006 + i) * 0.35;
      const controlRadius = (startRadius + endRadius) / 2;
      ctx.quadraticCurveTo(
        centerX + Math.cos(controlAngle) * controlRadius * 1.15,
        centerY + Math.sin(controlAngle) * controlRadius * 1.15,
        centerX + Math.cos(angle) * endRadius,
        centerY + Math.sin(angle) * endRadius
      );
      ctx.stroke();
    }
  };

  // 更新和绘制星星 - 缓慢放射状，白色星点
  const updateAndDrawStars = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    deltaTime: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    // 非常缓慢的速度
    const speed = warpSpeed * deltaTime * 0.15;

    starsRef.current.forEach(star => {
      // 减小Z值（星星向观察者靠近）
      star.z -= speed;

      // 计算屏幕坐标（透视投影）
      const perspective = 400;
      const scale = perspective / star.z;

      // 从中心向外扩散
      const dx = star.x - centerX;
      const dy = star.y - centerY;

      const screenX = centerX + dx * scale;
      const screenY = centerY + dy * scale;

      // 如果星星飞出屏幕或太近，重置到远处中心附近
      if (
        star.z < 50 ||
        screenX < -100 ||
        screenX > width + 100 ||
        screenY < -100 ||
        screenY > height + 100
      ) {
        // 重置星星到远处中心附近
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20;
        star.x = centerX + Math.cos(angle) * radius;
        star.y = centerY + Math.sin(angle) * radius;
        star.z = 2000 + Math.random() * 500;
        star.hasGlow = Math.random() < 0.08;
        return;
      }

      // 计算星星大小（近大远小，但保持较小）
      const starSize = Math.max(0.3, Math.min(star.size * scale * 0.3, 2));

      // 计算透明度（远处更暗）
      const alpha = Math.min(1, Math.max(0.2, (2000 - star.z) / 1500));

      // 绘制星星本体 - 白色
      ctx.fillStyle = `rgba(240, 242, 248, ${alpha})`;
      ctx.beginPath();
      ctx.arc(screenX, screenY, starSize, 0, Math.PI * 2);
      ctx.fill();

      // 只有少数星星有星辉效果
      if (star.hasGlow && star.z < 800) {
        const glowIntensity = (800 - star.z) / 800;
        const glowSize = starSize * 4 + glowIntensity * 3;

        // 十字星辉
        ctx.strokeStyle = `rgba(125, 211, 252, ${glowIntensity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        // 水平线
        ctx.moveTo(screenX - glowSize, screenY);
        ctx.lineTo(screenX + glowSize, screenY);
        // 垂直线
        ctx.moveTo(screenX, screenY - glowSize);
        ctx.lineTo(screenX, screenY + glowSize);
        ctx.stroke();

        // 柔和光晕
        const glow = ctx.createRadialGradient(
          screenX,
          screenY,
          0,
          screenX,
          screenY,
          glowSize * 0.6
        );
        glow.addColorStop(0, `rgba(186, 230, 253, ${glowIntensity * 0.4})`);
        glow.addColorStop(0.5, `rgba(125, 211, 252, ${glowIntensity * 0.15})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(screenX - glowSize, screenY - glowSize, glowSize * 2, glowSize * 2);
      }
    });
  };

  // 动画循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initStars(rect.width, rect.height);
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 清除画布
      ctx.clearRect(0, 0, width, height);

      // 绘制螺旋星云
      drawHelixNebula(ctx, width / 2, height / 2, currentTime);

      // 更新和绘制星星
      updateAndDrawStars(ctx, width, height, deltaTime);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initStars, warpSpeed, nebulaIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      style={{ background: 'transparent' }}
    />
  );
}
