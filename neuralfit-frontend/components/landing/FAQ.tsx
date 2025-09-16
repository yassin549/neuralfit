'use client';

export function FAQ({ content }) {
  return (
    <section id="faq" className="container mx-auto max-w-4xl py-8 md:py-12 lg:py-24">
      <h2 className="text-center font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {content.faq.map((item, i) => (
          <details key={i} className="group rounded-lg bg-background p-4">
            <summary className="cursor-pointer font-medium list-none flex justify-between items-center">{item.q}<span className="transition group-open:rotate-180">▼</span></summary>
            <div className="mt-4 text-muted-foreground">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
