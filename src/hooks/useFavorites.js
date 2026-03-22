import { useState, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const persist = (next) => {
    setFavorites(next);
    localStorage.setItem('favorites', JSON.stringify(next));
  };

  const toggle = useCallback(
    (id) => {
      const next = favorites.includes(id)
        ? favorites.filter(f => f !== id)
        : [...favorites, id];
      persist(next);
    },
    [favorites]
  );

  const isFav = useCallback((id) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFav };
}
