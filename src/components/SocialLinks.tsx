import { useId } from 'react';
import { SOCIAL_LINKS } from '@/config/social';

type SocialKey = keyof typeof SOCIAL_LINKS;

const items: Array<{ key: SocialKey; label: string }> = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'x', label: 'X' },
];

function InstagramIcon({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" fill={`url(#${gradientId})`} />
      <circle cx="12" cy="12" r="4.1" stroke="white" strokeWidth="1.9" />
      <circle cx="17.35" cy="6.7" r="1.15" fill="white" />
      <defs>
        <linearGradient id={gradientId} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#feda75" />
          <stop offset="0.25" stopColor="#fa7e1e" />
          <stop offset="0.5" stopColor="#d62976" />
          <stop offset="0.75" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="9.5" fill="#1877F2" />
      <path fill="white" d="M13.45 20v-7h2.35l.35-2.72h-2.7V8.54c0-.79.22-1.33 1.36-1.33h1.45V4.78c-.25-.03-1.1-.1-2.08-.1-2.06 0-3.47 1.26-3.47 3.57v2.03H8.38V13h2.33v7h2.74Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path fill="currentColor" d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.8h1.73L8.47 4.1H6.61L17.8 19.8Z" />
    </svg>
  );
}

function Icon({ name, gradientId }: { name: SocialKey; gradientId: string }) {
  if (name === 'instagram') return <InstagramIcon gradientId={gradientId} />;
  if (name === 'facebook') return <FacebookIcon />;
  return <XIcon />;
}

export function SocialLinks({ className = '', light = false }: { className?: string; light?: boolean }) {
  const gradientId = `motherland-instagram-${useId().replace(/:/g, '')}`;

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Social media">
      {items.map(({ key, label }) => {
        const href = SOCIAL_LINKS[key];
        const base = 'grid h-10 w-10 place-items-center border transition';
        const surface = light
          ? 'border-gray-300 bg-white text-gray-900 hover:border-amber-600 hover:bg-gray-50'
          : 'border-white/15 bg-white text-gray-900 hover:border-amber-400 hover:bg-gray-50';

        if (!href) {
          return (
            <span key={key} title={`${label} — link coming soon`} aria-label={`${label} — link coming soon`} className={`${base} ${surface}`}>
              <Icon name={key} gradientId={gradientId} />
            </span>
          );
        }

        return (
          <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={`MotherLand Auto Parts on ${label}`} className={`${base} ${surface}`}>
            <Icon name={key} gradientId={gradientId} />
          </a>
        );
      })}
    </div>
  );
}
