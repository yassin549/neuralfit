'use client';

export function Testimonials({ content }) {
  return (
    <section id="testimonials" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Loved by the community</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Real stories from real people.</p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-2 mt-10">
        {content.testimonials.map((testimonial, i) => (
          <div key={i} className="rounded-lg border bg-background p-6 shadow-sm">
            <blockquote className="flex flex-col justify-between h-full">
              <div>
                <p className="text-lg">“{testimonial.text}”</p>
              </div>
              <footer className="mt-4 text-sm font-medium">{testimonial.name}, {testimonial.role}</footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
