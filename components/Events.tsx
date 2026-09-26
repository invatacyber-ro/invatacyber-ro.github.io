import Image from 'next/image';
import type { CommunityEvent } from '@/lib/content';

export default function Events({ events }: { events: CommunityEvent[] }) {
  // Fara intrari in events.yml, sectiunea nu se afiseaza deloc.
  if (events.length === 0) return null;

  return (
    <section id="events" className="relative scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            Evenimente realizate de comunitatea noastră
          </h2>
        </div>

        <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li
              key={event.name}
              className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-brand-300/30 hover:bg-navy-800/70"
            >
              {/* object-cover: poza umple rama 16:9, orice format ar avea. */}
              {event.photo && (
                <Image
                  src={event.photo}
                  alt={event.name}
                  width={640}
                  height={360}
                  className="aspect-video w-full border-b border-brand-300/12 object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="font-display text-[17px] font-semibold tracking-tight">
                  {event.name}
                </h3>
                {event.description && (
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                    {event.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
