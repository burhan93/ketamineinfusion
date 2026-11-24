'use client';
/**
 * Back-to-top button (bottom-right). Appears after scrolling one screen down.
 * Smooth scroll (instant under prefers-reduced-motion); focus returns to the logo
 * so keyboard users continue from the top of the page.
 */
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => { raf = 0; setShow(window.scrollY > window.innerHeight * 0.8); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.querySelector<HTMLElement>('.site-logo')?.focus({ preventScroll: true });
  };

  return (
    <button type="button" className={`back-to-top${show ? ' is-visible' : ''}`} onClick={toTop} aria-label="Back to top">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
