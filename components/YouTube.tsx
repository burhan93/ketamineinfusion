'use client';
/** YouTube click-to-load facade (thumbnail + branded play button with bubble rings; iframe only after click). */
import { useState } from 'react';

type Props = { id: string; title: string; className?: string };

export default function YouTube({ id, title, className }: Props) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`video${className ? ' ' + className : ''}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video__btn" aria-label={`Play video: ${title}`} onClick={() => setPlaying(true)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`} width={480} height={360} loading="lazy" decoding="async" alt="" />
          {/* Branded play button: gradient core + pulsing "bubble" rings that invite a click */}
          <span className="video__play" aria-hidden="true">
            <span className="video__bubble" />
            <span className="video__bubble" />
            <span className="video__bubble" />
            <span className="video__core">
              <svg viewBox="0 0 24 24"><path d="M8.5 5.8v12.4c0 .8.9 1.3 1.6.8l9.4-6.2c.6-.4.6-1.2 0-1.6L10.1 5c-.7-.5-1.6 0-1.6.8z" /></svg>
            </span>
          </span>
          <span className="video__label" aria-hidden="true">Watch video</span>
        </button>
      )}
    </div>
  );
}
