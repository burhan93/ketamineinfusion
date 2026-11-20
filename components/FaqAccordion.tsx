'use client';
/** FAQ accordion – one item open at a time, animated height (port of main.js §2). */
import { useEffect, useRef, useState, type ReactNode } from 'react';

export type FaqItem = { q: string; a: string; body: ReactNode };

function Item({ index, item, open, onToggle }: { index: number; item: FaqItem; open: boolean; onToggle: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const initialOpen = useRef(open).current;   // `hidden` is managed manually after mount
  const firstRun = useRef(true);
  const id = `faq-${index + 1}`;

  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const panel = panelRef.current;
    if (!panel) return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (!open) panel.hidden = true;
      panel.style.height = '';
    };
    if (open) {
      panel.hidden = false;
      panel.style.height = '0px';
      requestAnimationFrame(() => { panel.style.height = panel.scrollHeight + 'px'; });
    } else {
      panel.style.height = panel.scrollHeight + 'px';
      requestAnimationFrame(() => { panel.style.height = '0px'; });
    }
    panel.addEventListener('transitionend', finish, { once: true });
    const t = window.setTimeout(finish, 450);   // fallback if no transition runs
    return () => { window.clearTimeout(t); panel.removeEventListener('transitionend', finish); };
  }, [open]);

  return (
    <div className="accordion__item">
      <h3 className="accordion__heading">
        <button className="accordion__trigger" type="button" aria-expanded={open} aria-controls={id} id={`${id}-btn`} onClick={onToggle}>
          {item.q}
        </button>
      </h3>
      <div className="accordion__panel" id={id} role="region" aria-labelledby={`${id}-btn`} hidden={!initialOpen} ref={panelRef}>
        <div className="accordion__content">{item.body}</div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="accordion" data-accordion>
      {items.map((item, i) => (
        <Item key={item.q} index={i} item={item} open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
      ))}
    </div>
  );
}
