'use client';
/**
 * Liquid-glass hero card – adapted from the AnimatedWebs "Clinic Liquid Glass" template (free licence).
 * - Frosted glass (backdrop blur + saturate), inner highlight, SVG displacement on the rim
 *   so the photo/gradient behind appears to bend at the edges (Chromium; others get plain glass).
 * - Enters with y 30px + blur 10px → 0, then bobs 8px on a 6s loop (CSS).
 * - Tilts up to 6° toward the cursor with a spring (stiffness 150, damping 18) on desktop pointers only.
 * - prefers-reduced-motion / touch / ≤1024px: no tilt, no bob.
 */
import { useEffect, useRef, type ReactNode } from 'react';

const MAX_TILT = 6;            // degrees
const STIFFNESS = 150;
const DAMPING = 18;

export default function GlassCard({ className = '', children }: { className?: string; children: ReactNode }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    const area = el?.closest('section') as HTMLElement | null;
    if (!el || !area) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px) and (prefers-reduced-motion: no-preference)');

    // Spring state for rotateX / rotateY
    const s = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    let raf = 0;
    let last = 0;

    const step = (t: number) => {
      const dt = Math.min((t - (last || t)) / 1000, 1 / 30);
      last = t;
      for (const [p, v, target] of [['x', 'vx', 'tx'], ['y', 'vy', 'ty']] as const) {
        const force = -STIFFNESS * (s[p] - s[target]) - DAMPING * s[v];
        s[v] += force * dt;
        s[p] += s[v] * dt;
      }
      el.style.transform = `perspective(1200px) rotateX(${s.x.toFixed(3)}deg) rotateY(${s.y.toFixed(3)}deg)`;
      const settled = Math.abs(s.x - s.tx) < 0.01 && Math.abs(s.y - s.ty) < 0.01 && Math.abs(s.vx) < 0.01 && Math.abs(s.vy) < 0.01;
      if (settled) { raf = 0; last = 0; return; }
      raf = requestAnimationFrame(step);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(step); };

    const onMove = (e: PointerEvent) => {
      if (!mq.matches) return;
      // Settle flat while the pointer is over the card itself, so the button is a still target.
      if (el.contains(e.target as Node)) { s.tx = 0; s.ty = 0; kick(); return; }
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2 + 200)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2 + 200)));
      s.ty = nx * MAX_TILT;          // pointer to the right → card turns right
      s.tx = -ny * MAX_TILT;         // pointer above → card tilts up
      kick();
    };
    const onLeave = () => { s.tx = 0; s.ty = 0; kick(); };
    const onMq = () => { if (!mq.matches) { s.tx = s.ty = s.x = s.y = s.vx = s.vy = 0; el.style.transform = ''; } };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    mq.addEventListener('change', onMq);
    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  return (
    <div className="glass-tilt" ref={tiltRef}>
      {/* entrance + bob live on this wrapper so the card and its rim move together */}
      <div className="glass-float">
        <div className={`glass-card ${className}`}>{children}</div>
        {/* rim is a sibling (not a child) so its backdrop samples the photo, not the card */}
        <span className="glass-card__rim" aria-hidden="true" />
      </div>
    </div>
  );
}

/** Animated brand mesh gradient + the SVG filter used by the glass rim. Decorative only. */
export function HeroMesh() {
  return (
    <div className="hero__mesh" aria-hidden="true">
      <span className="hero__blob hero__blob--1" />
      <span className="hero__blob hero__blob--2" />
      <span className="hero__blob hero__blob--3" />
      <span className="hero__blob hero__blob--4" />
      <svg width="0" height="0" style={{ position: 'absolute' }} focusable="false">
        <filter id="bk-liquid-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
}
