export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar" id="searchbar">
      <svg className="searchbar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className="searchbar__input"
        type="text"
        placeholder="Search by title or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="inline-search"
      />
      {value && (
        <button className="searchbar__clear" onClick={() => onChange('')} aria-label="Clear">
          ✕
        </button>
      )}
    </div>
  );
}
