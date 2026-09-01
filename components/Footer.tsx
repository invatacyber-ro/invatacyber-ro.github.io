import SocialIcon from './SocialIcon';
import type { SiteConfig } from '@/lib/content';

export default function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-brand-300/10 bg-navy-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-[13.5px] text-ink-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 {site.name}. Versiune temporară a site-ului.</p>

        <nav aria-label="Link-uri footer" className="flex items-center gap-5">
          <a
            href={site.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <SocialIcon platform="discord" className="h-4 w-4" />
            Discord
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <SocialIcon platform="linkedin" className="h-4 w-4" />
            LinkedIn
          </a>
          {site.links.email && (
            <a
              href={`mailto:${site.links.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-ink"
            >
              <SocialIcon platform="email" className="h-4 w-4" />
              Contact
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
