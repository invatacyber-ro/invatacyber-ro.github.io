import Image from 'next/image';
import SocialIcon from './SocialIcon';
import type { SiteConfig } from '@/lib/content';

export default function Hero({ site }: { site: SiteConfig }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Bannerul din new-branding/banner.jpg, refacut in cod ca sa ramana clar pe orice ecran. */}
          <div className="animate-rise relative mb-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-24px_rgba(143,0,255,0.35)]">
            <span
              aria-hidden="true"
              className="brand-gradient absolute top-0 left-0 h-16 w-20 [clip-path:polygon(0_0,100%_0,0_100%)] sm:h-20 sm:w-28"
            />
            <span
              aria-hidden="true"
              className="brand-gradient absolute right-0 bottom-0 h-16 w-20 [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:h-24 sm:w-32"
            />

            <div className="relative flex flex-col items-center justify-center gap-5 px-6 py-8 sm:flex-row sm:gap-10 sm:px-12 sm:py-6">
              <Image
                src="/img/logo.svg"
                alt="Logo InvataCyber"
                width={877}
                height={556}
                priority
                className="h-28 w-auto sm:h-36"
              />
              {site.slogan && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-16 rounded-full bg-brand-500 sm:h-24 sm:w-0.5"
                  />
                  <p className="font-display text-3xl font-extrabold tracking-tight text-brand-500 sm:text-5xl">
                    {site.slogan}
                  </p>
                </>
              )}
            </div>
          </div>

          <p
            className="animate-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-[12.5px] font-medium tracking-wide text-brand-600 uppercase"
            style={{ animationDelay: '80ms' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75 [animation:pulse-ring_2s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            {site.tagline}
          </p>

          <h1
            className="animate-rise font-display max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-6xl"
            style={{ animationDelay: '140ms' }}
          >
           Hai să descoperi lumea securității cibernetice{' '}
            <span className="brand-text-gradient">
              alături de alți pasionați ai acestui domeniu.
            </span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted text-pretty sm:text-lg"
            style={{ animationDelay: '200ms' }}
          >
            In prezent, InvataCyber isi desfasoara activitatile online pe Discord, dar vor avea loc si evenimente fizice. 
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
              className="glass inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base font-semibold text-ink transition hover:border-brand-500/35 hover:bg-surface-hover active:scale-[0.98] sm:w-auto"
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
