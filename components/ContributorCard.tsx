import Image from 'next/image';
import SocialIcon from './SocialIcon';
import type { Contributor } from '@/lib/content';

// `mt-auto` lipeste social-urile la baza, ca sa se alinieze intre carduri.
export default function ContributorCard({ person }: { person: Contributor }) {
  return (
    <li className="glass group flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300/30 hover:bg-navy-800/70">
      {person.photo ? (
        <Image
          src={person.photo}
          alt={`Fotografie ${person.name}`}
          width={320}
          height={320}
          className="h-16 w-16 rounded-2xl object-cover ring-1 ring-brand-300/20"
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-display flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-300/20 bg-brand-500/15 text-lg font-bold text-brand-300"
        >
          {person.initials}
        </span>
      )}

      <h3 className="font-display mt-5 text-[17px] font-semibold tracking-tight">
        {person.name}
      </h3>

      {person.role && (
        <p className="mt-0.5 text-sm font-medium text-brand-300">{person.role}</p>
      )}

      {person.bio && (
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{person.bio}</p>
      )}

      {person.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {person.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-brand-300/12 bg-navy-700/40 px-2 py-0.5 text-[11.5px] font-medium tracking-wide text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {person.links.length > 0 && (
        <ul className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {person.links.map((link) =>
            link.url ? (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  title={`${person.name} pe ${link.label}`}
                  aria-label={`${person.name} pe ${link.label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-300/12 bg-navy-700/40 text-ink-muted transition hover:border-brand-300/40 hover:bg-brand-500/20 hover:text-brand-200"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                </a>
              </li>
            ) : (
              <li key={link.platform}>
                <span
                  title={`${link.label}: ${link.handle}`}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-brand-300/12 bg-navy-700/40 px-2.5 text-[12.5px] font-medium text-ink-muted"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                  <span className="sr-only">{link.label}: </span>
                  {link.handle}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
}
