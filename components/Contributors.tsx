import ContributorCard from './ContributorCard';
import SocialIcon from './SocialIcon';
import type { Contributor, SiteConfig } from '@/lib/content';

export default function Contributors({
  contributors,
  site,
}: {
  contributors: Contributor[];
  site: SiteConfig;
}) {
  return (
    <section id="contributors" className="relative scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            O comunitate nu se construiește singură. Iată persoanele care au ajutat pana acum la dezvoltarea acestei initiative.
          </h2>
        </div>

        {contributors.length > 0 ? (
          <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((person) => (
              <ContributorCard key={person.name} person={person} />
            ))}
          </ul>
        ) : (
          <p className="glass mt-10 rounded-2xl p-8 text-center text-ink-muted">
            
          </p>
        )}

        <div className="glass mt-8 flex flex-col items-start gap-5 rounded-2xl p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              Vrei să contribui la initiativa?
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
              Hai pe Discord sa vorbim si sa facem lucruri grozave pentru comunitatea de securitate cibernetica din Romania.
            </p>
          </div>
          <a
            href={site.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-brand-300/30 bg-brand-500/15 px-5 py-3 text-sm font-semibold text-brand-200 transition hover:border-brand-300/50 hover:bg-brand-500/25 active:scale-[0.98]"
          >
            <SocialIcon platform="discord" className="h-4 w-4" />
            Contribuie
          </a>
        </div>
      </div>
    </section>
  );
}
