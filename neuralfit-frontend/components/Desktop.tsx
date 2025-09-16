'use client';

import { useState, useEffect } from 'react';
import { useWindowStore, WindowId } from '@/lib/store/windowStore';
import Window from './Window';
import Dock from './Dock';
import DmsWindow from './DmsWindow';
import ProgressBar from './ProgressBar';

import SpacesWindow from './windows/SpacesWindow';
import ChatWindow from './windows/ChatWindow';
import StatsWindow from './windows/StatsWindow';

const windowContent: Record<WindowId, React.ReactNode> = {
  spaces: <SpacesWindow />,
  chat: <ChatWindow />,
  stats: <StatsWindow />,
  dms: <DmsWindow />,
};

export default function Desktop() {
  const { windows } = useWindowStore();
  const windowIds = Object.keys(windows) as WindowId[];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Fake loading for 2s
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProgressBar />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Render all windows based on the store state */}
      {windowIds.map((id) => (
        <Window key={id} id={id}>
          {windowContent[id]}
        </Window>
      ))}

      <Dock />
    </div>
  );
}

