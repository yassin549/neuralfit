'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          // Slow down towards the end
          return Math.min(prev + 1, 100);
        }
        return Math.min(prev + Math.random() * 10, 90);
      });
    }, 200);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
    }, 1800); // Ensure it completes around 2s

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900 z-[2000] flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4 text-slate-200">NeuralFit</div>
      <div className="w-1/3 max-w-sm">
        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent-mint"
            style={{
              boxShadow: '0 0 10px #6EE7B7, 0 0 20px #6EE7B7', // Glow effect
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </div>
        <p className="text-center text-sm text-slate-400 mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

