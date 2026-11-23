/** Inline SVG icons (unchanged from the static build). All decorative → aria-hidden. */
type P = { className?: string };

export const ClockBadge = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#14b7f8" /><path d="M12 5v7h5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
);
/** Blue circle badges for the header info row (same style as ClockBadge). */
export const PinBadge = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#14b7f8" /><path d="M12 5.6a4 4 0 0 0-4 4c0 3.1 4 7.9 4 7.9s4-4.8 4-7.9a4 4 0 0 0-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#fff" /></svg>
);
export const PhoneBadge = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#14b7f8" /><path d="M9.4 6.6H8.2c-.6 0-1 .4-1 1 0 5.1 4.1 9.2 9.2 9.2.6 0 1-.4 1-1v-1.2c0-.5-.3-.9-.8-1l-1.7-.4c-.4-.1-.8 0-1 .4l-.6.8c-1.6-.8-2.9-2.1-3.7-3.7l.8-.6c.3-.2.5-.6.4-1l-.4-1.7c-.1-.5-.5-.8-1-.8z" fill="#fff" /></svg>
);
export const Facebook = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V14h2.7v8h3.2z" /></svg>
);
export const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.2 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.3-1.6.5-3.2.5-4.8s-.2-3.2-.5-4.8zM9.7 15V9l5.8 3-5.8 3z" /></svg>
);
export const Calendar = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z" /></svg>
);
export const Mobile = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H8a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-4 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4-4H8V4h8v14z" /></svg>
);
export const Pin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
);
export const Clock = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" /></svg>
);
export const Mail = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
export const Caret = () => (
  <svg className="main-nav__caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M0 0h10L5 6z" /></svg>
);
export const A11yPerson = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" /></svg>
);
