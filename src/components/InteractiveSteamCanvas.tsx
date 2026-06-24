import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  type: 'steam' | 'spice';
  angle?: number;
  spin?: number;
}

export default function InteractiveSteamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Seed initial particles
    const initParticles = () => {
      particles = [];
      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(true));
      }
    };

    const createParticle = (randomY = false): Particle => {
      const type = Math.random() > 0.4 ? 'steam' : 'spice';
      const size = type === 'steam' ? Math.random() * 30 + 15 : Math.random() * 4 + 2;
      const x = Math.random() * canvas.width;
      const y = randomY ? Math.random() * canvas.height : canvas.height + 20;
      const alpha = type === 'steam' ? Math.random() * 0.15 + 0.05 : Math.random() * 0.6 + 0.2;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: type === 'steam' ? -(Math.random() * 0.8 + 0.4) : -(Math.random() * 1.2 + 0.5),
        size,
        alpha,
        decay: type === 'steam' ? 0.0012 : 0.0008,
        color: type === 'steam' ? 'rgba(230, 220, 205, ' : 'rgba(255, 170, 0, ',
        type,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02
      };
    };

    initParticles();

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }

        // Draw mouse visual attractor aura (subtle)
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, 'rgba(255, 180, 0, 0.04)');
        gradient.addColorStop(1, 'rgba(255, 180, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle movement
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.angle !== undefined && p.spin !== undefined) {
          p.angle += p.spin;
          p.x += Math.sin(p.angle) * 0.15; // wind wobble
        }

        // Mouse physics interaction (attract/repel)
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            if (p.type === 'spice') {
              // Spices swirl or get attracted to the cursor
              const angle = Math.atan2(dy, dx) + 0.3; // Orbit offset
              p.x -= Math.cos(angle) * force * 1.5;
              p.y -= Math.sin(angle) * force * 1.5;
            } else {
              // Steam gently drifts around the cursor (repel)
              p.x += (dx / dist) * force * 1.0;
              p.y += (dy / dist) * force * 0.5;
            }
          }
        }

        // Draw particles
        if (p.type === 'steam') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `${p.color}${p.alpha})`);
          grad.addColorStop(0.5, `${p.color}${p.alpha * 0.4})`);
          grad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Spice / Ember glows
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FF8A00';
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }

        // Respawn dead or out of bounds particles
        if (p.alpha <= 0 || p.y < -30 || p.x < -30 || p.x > canvas.width + 30) {
          particles[i] = createParticle();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) {
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      id="steam-interactive-canvas"
    />
  );
}
