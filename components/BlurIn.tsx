'use client';
/**
 * Soft Blur-In Words – adapted from the AnimatedWebs "Soft Blur-In Words" template (free licence).
 * Words drift from a blur into focus with a breathing rhythm: 95ms per word, +280ms after every 4th word.
 * (The template's letter-spacing animation is omitted: it reflows text and would add layout shift.)
 * - Text is server-rendered (SEO / no-JS safe); it is only hidden when <html> has the `js` class.
 * - CSS does the animation; JS only splits words and flips data-visible.
 * - prefers-reduced-motion: simple 400ms fade (see globals.css §26).
 */
import { Fragment, useEffect, useRef, type CSSProperties } from 'react';

type Props = {
  text: string;
  /** heading: blur 14px / 1100ms / 95ms stagger · body: blur 6px / 600ms / 25ms stagger (shorter breath so long text settles quickly) */
  variant?: 'heading' | 'body';
  /** delay (ms) added before the first word */
  delay?: number;
  /** IntersectionObserver rootMargin. Template default reveals at 35% into the viewport;
   *  above-the-fold text (the hero) should use '0px' so it is never held back on small screens. */
  rootMargin?: string;
};

export default function BlurIn({ text, variant = 'heading', delay = 0, rootMargin = '0px 0px -35% 0px' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute('data-visible', 'true');
    if (!('IntersectionObserver' in window)) { show(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { show(); io.disconnect(); }
    }, { rootMargin });
    io.observe(el);
    // Drop will-change once the last word has settled (blur is expensive to keep promoted).
    const wordsEls = el.querySelectorAll('.blur-in__w');
    const last = wordsEls[wordsEls.length - 1];
    const done = (e: Event) => { if (e.target === last) el.classList.add('is-done'); };
    el.addEventListener('transitionend', done);
    return () => { io.disconnect(); el.removeEventListener('transitionend', done); };
  }, [rootMargin]);

  return (
    <span ref={ref} className={`blur-in blur-in--${variant}`} data-visible="false"
          style={{ '--blur-delay': `${delay}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="blur-in__w" style={{ '--i': i, '--breath': Math.floor(i / 4) } as CSSProperties}>{w}</span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}
