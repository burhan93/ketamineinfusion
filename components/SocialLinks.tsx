import { FACEBOOK_URL, YOUTUBE_URL, ext } from '@/lib/site';
import { Facebook, YouTubeIcon } from './Icons';

/** Facebook + YouTube circles (header and footer). */
export default function SocialLinks() {
  return (
    <ul className="social-links" aria-label="Social media">
      <li><a className="is-fb" href={FACEBOOK_URL} {...ext} aria-label="Balanced Ketamine on Facebook"><Facebook /></a></li>
      <li><a className="is-yt" href={YOUTUBE_URL} {...ext} aria-label="Balanced Ketamine on YouTube"><YouTubeIcon /></a></li>
    </ul>
  );
}
