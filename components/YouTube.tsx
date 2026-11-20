'use client';
/** YouTube click-to-load facade (thumbnail + play button; iframe only after click). */
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
          <span className="video__play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
