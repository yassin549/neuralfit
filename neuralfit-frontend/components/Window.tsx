'use client';

'use client';

import { Rnd } from 'react-rnd';
import { useWindowStore, WindowId } from '@/lib/store/windowStore';
import { X, Minus, Maximize } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // We'll create this utility file next

interface WindowProps {
  id: WindowId;
  children: ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const [
    isClosing,
    setIsClosing
  ] = useState(false);
  const {
    windows,
    focusOrder,
    focusWindow,
    closeWindow,
    toggleMinimize,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const windowState = windows[id];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeWindow(id);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  useEffect(() => {
    if (windowState?.isOpen) {
      setIsClosing(false);
    }
  }, [windowState?.isOpen]);

  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  return (
    <Rnd
      size={{ width: windowState.size.width, height: windowState.size.height }}
      position={{ x: windowState.position.x, y: windowState.position.y }}
      onDragStop={(_, d) => updateWindowPosition(id, { x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) => {
        updateWindowSize(id, { width: ref.style.width, height: ref.style.height });
        updateWindowPosition(id, position);
      }}
      onMouseDown={() => focusWindow(id)}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="handle"
      style={{ zIndex: windowState.zIndex }}
      className={cn(
        'bg-panel backdrop-blur-xl rounded-window border border-white/10 shadow-2xl flex flex-col overflow-hidden',
        windowState.isMaximized && 'w-full h-full',
        isClosing ? 'animate-close-in' : 'animate-pull-out',
        focusOrder[0] === id && 'shadow-glow'
      )}
    >
      <div onDoubleClick={() => toggleMaximize(id)} className="handle h-8 bg-white/5 flex items-center justify-between px-2 cursor-grab active:cursor-grabbing">
        <div className="flex items-center space-x-2">
          <button onClick={handleClose} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600" />
          <button onClick={() => toggleMinimize(id)} className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600" />
          <button onClick={() => toggleMaximize(id)} className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600" />
        </div>
        <span className="text-white/80 text-sm font-medium pr-2">{windowState.title}</span>
      </div>
      <div className="flex-grow p-4 overflow-auto text-white bg-slate-800/80">
        {children}
      </div>
    </Rnd>
  );
}
