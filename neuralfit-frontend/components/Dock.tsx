'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, BarChart, Users, Clapperboard } from 'lucide-react';
import { useWindowStore, WindowId } from '@/lib/store/windowStore';

const dockItems: { id: WindowId; icon: React.ElementType }[] = [
  { id: 'spaces', icon: Clapperboard },
  { id: 'chat', icon: MessageSquare },
  { id: 'stats', icon: BarChart },
  { id: 'dms', icon: Users },
];

export default function Dock() {
  const { openWindow } = useWindowStore();
  const mouseX = useMotionValue(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <motion.div
        ref={containerRef}
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-4 rounded-2xl bg-black/20 px-4 pb-3 backdrop-blur-lg"
      >
        {dockItems.map(({ id, icon: Icon }) => (
          <DockItem key={id} mouseX={mouseX} onClick={() => openWindow(id)}>
            <Icon className="h-8 w-8" />
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({ children, mouseX, onClick }) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="flex aspect-square items-center justify-center rounded-full bg-slate-700"
    >
      {children}
    </motion.button>
  );
}

