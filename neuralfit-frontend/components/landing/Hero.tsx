'use client';

import Link from 'next/link';

export function Hero({ content }) {
  return (
    <section className="space-y-6 py-8 md:py-12 lg:py-24">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl">{content.hero.headline}</h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">{content.hero.subheadline}</p>
        <div className="space-x-4">
          <Link href="/signup"><button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md">{content.hero.primaryCta}</button></Link>
          <Link href="#"><button className="h-11 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">{content.hero.secondaryCta}</button></Link>
        </div>
      </div>
    </section>
  );
}
