import SupporterCard from './SupporterCard';
import type { Supporter } from '@/lib/content';

export default function Supporters({ supporters }: { supporters: Supporter[] }) {
  // Fara companii in supporters.yml, sectiunea nu se afiseaza deloc.
  if (supporters.length === 0) return null;

  return (
    <section id="supporters" className="relative scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            Parteneri cărora le suntem recunoscători pentru sprijinul acordat comunității noastre de cybersecurity
          </h2>
        </div>

        <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {supporters.map((company) => (
            <SupporterCard key={company.name} company={company} />
          ))}
        </ul>
      </div>
    </section>
  );
}
