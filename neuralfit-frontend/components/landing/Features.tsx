'use client';

import { Sparkles, Mic, Shield, FileText } from 'lucide-react';

const iconMap = {
  Sparkles: <Sparkles className="h-12 w-12" />,
  Mic: <Mic className="h-12 w-12" />,
  Shield: <Shield className="h-12 w-12" />,
  FileText: <FileText className="h-12 w-12" />,
};

export function Features({ content }) {
  return (
    <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">Explore the features that make NeuralFit a safe and powerful space for growth.</p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {content.features.map((feature, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              {iconMap[feature.icon]}
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
