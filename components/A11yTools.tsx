'use client';
/** Accessibility toolbar (equivalent of the reference's a11y widget) – port of main.js §7. */
import { useEffect, useState } from 'react';
import { A11yPerson } from './Icons';

const KEY = 'bk-a11y';
const FLAGS = ['grayscale', 'contrast', 'negative', 'light', 'underline', 'readable'] as const;
const FILTERS = ['grayscale', 'contrast', 'negative'];
type Flag = (typeof FLAGS)[number];
type State = { size: number; flags: Flag[] };
const DEFAULT: State = { size: 100, flags: [] };

const LABELS: Record<Flag, string> = {
  grayscale: 'Grayscale', contrast: 'High Contrast', negative: 'Negative Contrast',
  light: 'Light Background', underline: 'Links Underline', readable: 'Readable Font',
};

export default function A11yTools() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setState(JSON.parse(localStorage.getItem(KEY) || 'null') || DEFAULT); } catch { /* ignore */ }
    setReady(true);
  }, []);

  // Apply settings to <html>/<body> and persist.
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    (document.body.style as CSSStyleDeclaration & { zoom: string }).zoom = state.size === 100 ? '' : String(state.size / 100);
    FLAGS.forEach((f) => root.classList.toggle('a11y-' + f, state.flags.includes(f)));
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state, ready]);

  const toggleFlag = (f: Flag) => setState((s) => {
    const has = s.flags.includes(f);
    // filters are mutually exclusive
    const flags = s.flags.filter((x) => x !== f && !(FILTERS.includes(f) && FILTERS.includes(x)));
    return { ...s, flags: has ? flags : [...flags, f] };
  });

  return (
    <div className="a11y">
      <div className="a11y__panel" id="a11y-panel" hidden={!open}>
        <h2>Accessibility Tools</h2>
        <button type="button" data-a11y="text-up" onClick={() => setState((s) => ({ ...s, size: Math.min(s.size + 10, 150) }))}>Increase Text</button>
        <button type="button" data-a11y="text-down" onClick={() => setState((s) => ({ ...s, size: Math.max(s.size - 10, 80) }))}>Decrease Text</button>
        {FLAGS.map((f) => (
          <button key={f} type="button" data-a11y={f} aria-pressed={state.flags.includes(f)} onClick={() => toggleFlag(f)}>{LABELS[f]}</button>
        ))}
        <button type="button" data-a11y="reset" onClick={() => setState(DEFAULT)}>Reset</button>
      </div>
      <button className="a11y__toggle" type="button" aria-expanded={open} aria-controls="a11y-panel"
              aria-label="Open accessibility tools" onClick={() => setOpen((o) => !o)}>
        <A11yPerson />
      </button>
    </div>
  );
}
