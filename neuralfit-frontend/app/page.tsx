import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

import content from '@/data/landing-content.json';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header content={content} />
      <main className="flex-1">
        <Hero content={content} />
        <Features content={content} />
        <Pricing content={content} />
        <Testimonials content={content} />
        <FAQ content={content} />
      </main>
      <Footer />
    </div>
  );
}
