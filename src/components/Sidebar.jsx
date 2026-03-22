const MY_LISTS = ['Color Theme Gallery', 'Fonts'];

export default function Sidebar({ categories, active, onSelect, counts, open, onClose }) {
  const resources = categories.filter(c => !MY_LISTS.includes(c));
  const myLists = categories.filter(c => MY_LISTS.includes(c));

  const renderItem = (cat) => (
    <li key={cat}>
      <button
        className={`sidebar__item ${active === cat ? 'sidebar__item--active' : ''}`}
        onClick={() => { onSelect(cat); onClose(); }}
        id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="sidebar__item-icon">{catIcons[cat] || <IconFolder />}</span>
        <span className="sidebar__item-label">{cat}</span>
        <span className="sidebar__badge">{counts[cat] || 0}</span>
      </button>
    </li>
  );

  return (
    <>
      {open && <div className="sidebar__overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`} id="sidebar">
        <div className="sidebar__header">
          <span className="sidebar__heading">Resources</span>
          <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            {resources.map(renderItem)}
          </ul>
        </nav>

        <div className="sidebar__section-header">
          <span className="sidebar__heading">My Lists</span>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            {myLists.map(renderItem)}
          </ul>
        </nav>
      </aside>
    </>
  );
}

/* ---- Heroicon-style SVG icons ---- */
const s = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };

const IconGlobe = () => (
  <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const IconPalette = () => (
  <svg {...s}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.55-.2-1.05-.54-1.46-.34-.4-.54-.9-.54-1.46 0-1.1.9-2 2-2h2.36c3.1 0 5.64-2.54 5.64-5.64C23 6.18 18 2 12 2z"/><circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/><circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/></svg>
);
const IconCode = () => (
  <svg {...s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const IconBolt = () => (
  <svg {...s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const IconCube = () => (
  <svg {...s}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconPhoto = () => (
  <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
);
const IconEye = () => (
  <svg {...s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconSparkles = () => (
  <svg {...s}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>
);
const IconTerminal = () => (
  <svg {...s}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
);
const IconFolder = () => (
  <svg {...s}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
);
const IconPaintBrush = () => (
  <svg {...s}><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 10-3-3z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></svg>
);
const IconType = () => (
  <svg {...s}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
);
const IconHeart = () => (
  <svg {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);

const catIcons = {
  "Shi's Fave": <IconHeart />,
  'Design Tools': <IconPalette />,
  CSS: <IconPaintBrush />,
  JavaScript: <IconBolt />,
  React: <IconCube />,
  'Icons & Assets': <IconPhoto />,
  'Design Inspirations': <IconEye />,
  'Vibe Designing': <IconSparkles />,
  'Vibe Coding': <IconTerminal />,
  'AI Tools': <IconSparkles />,
  'Color Theme Gallery': <IconPalette />,
  Mockups: <IconPhoto />,
  Fonts: <IconType />,
};
