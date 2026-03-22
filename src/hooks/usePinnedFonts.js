import { useState, useCallback } from 'react';

export function usePinnedFonts() {
  const [pinned, setPinned] = useState(() => {
    try {
      const saved = localStorage.getItem('pinnedFonts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggle = useCallback((name) => {
    setPinned(prev => {
      const next = prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name];
      localStorage.setItem('pinnedFonts', JSON.stringify(next));
      return next;
    });
  }, []);

  const isPinned = useCallback((name) => pinned.includes(name), [pinned]);

  return { toggle, isPinned };
}
