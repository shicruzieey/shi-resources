import { useState, useMemo, useEffect } from 'react';

export function useFilter(resources) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    return hash || "Shi's Fave";
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  // Sync category to URL hash
  useEffect(() => {
    window.location.hash = encodeURIComponent(category === 'All' ? '' : category);
  }, [category]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    resources.forEach(r => r.tags.forEach(t => tagSet.add(t)));
    return [...tagSet].sort();
  }, [resources]);

  const categories = useMemo(() => {
    const catSet = new Set(resources.map(r => r.category));
    return ['All', ...Array.from(catSet).sort()];
  }, [resources]);

  const categoryCounts = useMemo(() => {
    const counts = { All: resources.length };
    resources.forEach(r => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [resources]);

  const filtered = useMemo(() => {
    let result = [...resources];

    // Category filter
    if (category !== 'All') {
      result = result.filter(r => r.category === category);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.tags.some(t => t.toLowerCase().includes(q)) ||
          r.description.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(r =>
        selectedTags.every(tag => r.tags.includes(tag))
      );
    }

    // Sort
    switch (sortOrder) {
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'pinned':
        result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [resources, category, search, selectedTags, sortOrder]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    selectedTags,
    toggleTag,
    clearTags,
    sortOrder,
    setSortOrder,
    allTags,
    categories,
    categoryCounts,
    filtered,
  };
}
