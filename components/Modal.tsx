'use client';
/** Accessible dialog: overlay, Esc to close, focus trap, focus restore, scroll lock. */
import { useEffect, useRef, type ReactNode } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  closeLabel: string;
  children: ReactNode;
};

export default function Modal({ id, open, onClose, labelledBy, closeLabel, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const dialog = dialogRef.current;
    // Focus the first form field (appointment form) or the first button.
    const first = dialog?.querySelector<HTMLElement>('input:not([disabled])') ?? dialog?.querySelector<HTMLElement>('button');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onCloseRef.current(); return; }
      if (e.key !== 'Tab' || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      (lastFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  return (
    <div className="modal" id={id} hidden={!open}>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby={labelledBy} ref={dialogRef}>
        <button className="modal__close" type="button" onClick={onClose} aria-label={closeLabel}>&times;</button>
        {children}
      </div>
    </div>
  );
}
