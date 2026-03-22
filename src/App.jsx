import { useState } from 'react';
import resources from './data/resources.json';
import fonts from './data/fonts.json';
import { useDarkMode } from './hooks/useDarkMode';
import { useFilter } from './hooks/useFilter';
import { useFavorites } from './hooks/useFavorites';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ResourceGrid from './components/ResourceGrid';
import FontGrid from './components/FontGrid';
import ColorGallery from './components/ColorGallery';
import { usePinnedFonts } from './hooks/usePinnedFonts';
import colorThemes from './data/colorThemes';
import './App.css';

const FONTS_CATEGORY = 'Fonts';
const COLOR_CATEGORY = 'Color Theme Gallery';
const FAVES_CATEGORY = "Shi's Fave";

function App() {
  const { dark, toggle: toggleTheme } = useDarkMode();
  const {
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
  } = useFilter(resources);
  const { toggle: toggleFav, isFav, favorites } = useFavorites();
  const { toggle: togglePinFont, isPinned: isFontPinned } = usePinnedFonts();

  const [menuOpen, setMenuOpen] = useState(false);

  /* Merge Fonts into the category list, replace All with Shi's Fave */
  const allCategories = [FAVES_CATEGORY, ...categories.filter(c => c !== 'All'), FONTS_CATEGORY];
  const allCounts = { ...categoryCounts, [FONTS_CATEGORY]: fonts.length, [FAVES_CATEGORY]: favorites.length };

  const isFontsView = category === FONTS_CATEGORY;
  const isColorView = category === COLOR_CATEGORY;
  const isFavesView = category === FAVES_CATEGORY;

  const favResources = resources.filter(r => isFav(r.id));

  return (
    <div className="app" id="app">
      <Header
        dark={dark}
        onToggleTheme={toggleTheme}
        search={search}
        onSearch={setSearch}
        onMenuToggle={() => setMenuOpen((o) => !o)}
      />

      <div className="app__body">
        <Sidebar
          categories={allCategories}
          active={category}
          onSelect={setCategory}
          counts={allCounts}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <main className="main" id="main-content">
          <div className="main__toolbar">
            <div className="main__info">
              <h2 className="main__heading">
                {isFontsView
                  ? 'Font Collection'
                  : isFavesView
                  ? "Shi's Fave"
                  : category === 'All'
                  ? 'All Resources'
                  : category}
              </h2>
              <span className="main__count">
                {isFontsView
                  ? `${fonts.length} fonts`
                  : isColorView
                  ? `${colorThemes.length} image${colorThemes.length !== 1 ? 's' : ''}`
                  : isFavesView
                  ? `${favResources.length} resource${favResources.length !== 1 ? 's' : ''}`
                  : `${filtered.length} resource${filtered.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            {!isFontsView && !isColorView && !isFavesView && (
              <div className="main__sort">
                <label htmlFor="sort-select" className="main__sort-label">Sort:</label>
                <select
                  id="sort-select"
                  className="main__sort-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                  <option value="pinned">Pinned First</option>
                </select>
              </div>
            )}
          </div>

          {isFontsView ? (
            <FontGrid
              fonts={[...fonts].sort((a, b) => isFontPinned(b.name) - isFontPinned(a.name))}
              isPinned={isFontPinned}
              onTogglePin={togglePinFont}
            />
          ) : isColorView ? (
            <ColorGallery />
          ) : isFavesView ? (
            <ResourceGrid
              resources={favResources}
              isFav={isFav}
              onToggleFav={toggleFav}
            />
          ) : (
            <ResourceGrid
              resources={filtered}
              isFav={isFav}
              onToggleFav={toggleFav}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
