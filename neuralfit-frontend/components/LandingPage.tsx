'use client';

import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="absolute inset-0 p-8 flex items-center justify-center text-white">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter">Welcome to NeuralFit</h1>
          <p className="text-lg text-slate-300">
            Your personal space for mental clarity and growth. Connect in live spaces, chat with therapists, and track your progress with detailed analytics. All within a seamless, private desktop experience.
          </p>
        </div>
        
        <div className="bg-panel backdrop-blur-lg p-6 rounded-window border border-white/10">
          <div className="mb-4">
            <h3 className="font-bold">Message the Founder</h3>
            <p className="text-sm text-slate-400">I'm here to help. Let's connect.</p>
          </div>
          <form className="space-y-4">
            <input type="email" placeholder="Your Email" className="w-full p-2 bg-background-dark/50 rounded-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-primary" />
            <textarea placeholder="Your Message" rows={4} className="w-full p-2 bg-background-dark/50 rounded-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
            <button type="submit" className="w-full bg-accent-primary/80 hover:bg-accent-primary text-black font-bold py-2 px-4 rounded-card transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
