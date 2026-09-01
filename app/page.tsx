import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Contributors from '@/components/Contributors';
import Footer from '@/components/Footer';
import { getContributors, getSite } from '@/lib/content';

export default function Home() {
  const site = getSite();
  const contributors = getContributors();

  return (
    <>
      <Nav site={site} />
      <main id="main">
        <Hero site={site} />
        <Contributors contributors={contributors} site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
