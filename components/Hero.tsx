import Image from 'next/image';
import SocialIcon from './SocialIcon';
import type { SiteConfig } from '@/lib/content';

export default function Hero({ site }: { site: SiteConfig }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/22 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="animate-rise relative mb-8">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-brand-400/25 blur-3xl"
            />
            <Image
              src="/img/logo-shield.png"
              alt="Logo InvataCyber.ro"
              width={706}
              height={879}
              priority
              className="h-28 w-auto drop-shadow-[0_10px_35px_rgba(51,96,183,0.55)] sm:h-36"
            />
          </div>

          <p
            className="animate-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-300/25 bg-brand-500/10 px-4 py-1.5 text-[12.5px] font-medium tracking-wide text-brand-200 uppercase"
            style={{ animationDelay: '80ms' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-300 opacity-75 [animation:pulse-ring_2s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
            </span>
            {site.tagline}
          </p>

          <h1
            className="animate-rise font-display max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-6xl"
            style={{ animationDelay: '140ms' }}
          >
           Hai să descoperi lumea securității cibernetice sau să-i ajuți și pe alții să o descopere,{' '}
            <span className="brand-text-gradient">
              într-un spațiu prietenos în care oamenii cresc împreună prin colaborare.
            </span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted text-pretty sm:text-lg"
            style={{ animationDelay: '200ms' }}
          >
            In prezent, InvataCyber.ro isi desfasoara activitatile online pe Discord, dar vor avea loc si evenimente fizice. 
            Asa ca alatura-te ca sa nu le ratezi!
          
          </p>

          <div
            className="animate-rise mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: '260ms' }}
          >
            <a
              href={site.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient glow-brand group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              <SocialIcon platform="discord" className="h-5 w-5" />
              Intră pe Discord
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base font-semibold text-ink transition hover:border-brand-300/35 hover:bg-navy-800/70 active:scale-[0.98] sm:w-auto"
            >
              <SocialIcon platform="linkedin" className="h-5 w-5" />
              Urmărește-ne
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
