import Image from 'next/image';
import SocialIcon from './SocialIcon';
import type { Supporter } from '@/lib/content';

// Aceeasi caseta ca la contribuitori, dar doar cu nume, site si LinkedIn.
export default function SupporterCard({ company }: { company: Supporter }) {
  return (
    <li className="glass group flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300/30 hover:bg-navy-800/70">
      {/* object-contain: un logo patrat umple rama, unul lat nu se taie. */}
      {company.logo ? (
        <Image
          src={company.logo}
          alt={`Logo ${company.name}`}
          width={128}
          height={128}
          className="h-16 w-16 rounded-2xl bg-brand-500/15 object-contain ring-1 ring-brand-300/20"
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-display flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-300/20 bg-brand-500/15 text-lg font-bold text-brand-300"
        >
          {company.initials}
        </span>
      )}

      <h3 className="font-display mt-5 text-[17px] font-semibold tracking-tight">
        {company.name}
      </h3>

      {company.links.length > 0 && (
        <ul className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {company.links.map((link) => (
            <li key={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${company.name} pe ${link.label}`}
                aria-label={`${company.name} pe ${link.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-300/12 bg-navy-700/40 text-ink-muted transition hover:border-brand-300/40 hover:bg-brand-500/20 hover:text-brand-200"
              >
                <SocialIcon platform={link.platform} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
