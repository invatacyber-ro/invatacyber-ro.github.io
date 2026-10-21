import Image from 'next/image';
import SocialIcon from './SocialIcon';
import type { SiteConfig } from '@/lib/content';

export default function Nav({ site }: { site: SiteConfig }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-xl">
      <nav
        aria-label="Navigare principală"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#" className="flex shrink-0 items-center gap-2.5" aria-label={site.name}>
          <Image
            src="/img/logo-icon.svg"
            alt=""
            width={556}
            height={556}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-[15px] leading-none font-extrabold tracking-tight text-ink uppercase">
            Invata<span className="text-brand-500">Cyber</span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-brand-500/10 hover:text-ink"
          >
            <SocialIcon platform="linkedin" className="h-[18px] w-[18px]" />
          </a>
          <a
            href={site.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:brightness-110 active:scale-[0.98] sm:px-4"
          >
            <SocialIcon platform="discord" className="h-4 w-4" />
            Discord
          </a>
        </div>
      </nav>
    </header>
  );
}
