import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Contributors from '@/components/Contributors';
import Supporters from '@/components/Supporters';
import Footer from '@/components/Footer';
import { getContributors, getSite, getSupporters } from '@/lib/content';

export default function Home() {
  const site = getSite();
  const contributors = getContributors();
  const supporters = getSupporters();

  return (
    <>
      <Nav site={site} />
      <main id="main">
        <Hero site={site} />
        <Contributors contributors={contributors} site={site} />
        <Supporters supporters={supporters} />
      </main>
      <Footer site={site} />
    </>
  );
}
