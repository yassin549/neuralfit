'use client';

export function Pricing({ content }) {
  return (
    <section id="pricing" className="container flex flex-col py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-center">Pricing</h2>
        <p className="max-w-[85%] sm:max-w-[60%] lg:max-w-[50%] mx-auto text-center text-muted-foreground sm:text-lg">Simple, transparent pricing. Pay if you love it.</p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-3 mt-10">
        {content.pricing.map((tier, i) => (
          <div key={i} className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">{tier.tier}</h3>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              <li className="flex items-center"><span className="mr-2">✔</span> {tier.desc}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
