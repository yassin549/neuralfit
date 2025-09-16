import { create } from 'zustand';

export type WindowId = 'spaces' | 'chat' | 'stats' | 'dms';

interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
  zIndex: number;
  preMaximizedSize?: { width: number | string; height: number | string };
  preMaximizedPosition?: { x: number; y: number };
}

interface WindowStoreState {
  windows: Record<WindowId, WindowState>;
  focusOrder: WindowId[];
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number | string; height: number | string }) => void;
}

const initialWindows: Record<WindowId, WindowState> = {
  spaces: { id: 'spaces', title: 'Live Spaces', isOpen: false, isMinimized: false, isMaximized: false, position: { x: 50, y: 50 }, size: { width: 600, height: 400 }, zIndex: 10 },
  chat: { id: 'chat', title: 'Therapist Chat', isOpen: false, isMinimized: false, isMaximized: false, position: { x: 100, y: 100 }, size: { width: 500, height: 600 }, zIndex: 10 },
  stats: { id: 'stats', title: 'Statistics & Improvements', isOpen: false, isMinimized: false, isMaximized: false, position: { x: 150, y: 150 }, size: { width: 700, height: 500 }, zIndex: 10 },
  dms: { id: 'dms', title: 'Direct Messages', isOpen: false, isMinimized: false, isMaximized: false, position: { x: 200, y: 200 }, size: { width: 550, height: 450 }, zIndex: 10 },
};

export const useWindowStore = create<WindowStoreState>((set) => ({
  windows: initialWindows,
  focusOrder: [],

  openWindow: (id) => set((state) => {
    const newFocusOrder = [id, ...state.focusOrder.filter(fid => fid !== id)];
    const updatedWindows = { ...state.windows };
    newFocusOrder.forEach((fid, index) => {
      updatedWindows[fid].zIndex = 100 - index;
    });
    return {
      windows: {
        ...updatedWindows,
        [id]: { ...updatedWindows[id], isOpen: true, isMinimized: false },
      },
      focusOrder: newFocusOrder,
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], isOpen: false } },
    focusOrder: state.focusOrder.filter(fid => fid !== id),
  })),

  toggleMinimize: (id) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: !state.windows[id].isMinimized } },
  })),

  toggleMaximize: (id) => set((state) => {
    const window = state.windows[id];
    if (window.isMaximized) {
      // Restore to pre-maximized state
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isMaximized: false,
            size: window.preMaximizedSize || window.size,
            position: window.preMaximizedPosition || window.position,
          },
        },
      };
    } else {
      // Maximize the window
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isMaximized: true,
            preMaximizedSize: window.size,
            preMaximizedPosition: window.position,
            position: { x: 0, y: 0 }, // Move to top-left
          },
        },
      };
    }
  }),

  focusWindow: (id) => set((state) => {
    if (state.focusOrder[0] === id) return {}; // Already focused
    const newFocusOrder = [id, ...state.focusOrder.filter(fid => fid !== id)];
    const updatedWindows = { ...state.windows };
    newFocusOrder.forEach((fid, index) => {
      updatedWindows[fid].zIndex = 100 - index;
    });
    return { windows: updatedWindows, focusOrder: newFocusOrder };
  }),

  updateWindowPosition: (id, position) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], position } },
  })),

  updateWindowSize: (id, size) => set((state) => ({
    windows: { ...state.windows, [id]: { ...state.windows[id], size } },
  })),
}));
