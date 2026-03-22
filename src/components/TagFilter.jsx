export default function TagFilter({ tags, selected, onToggle, onClear }) {
  if (tags.length === 0) return null;

  return (
    <div className="tag-filter" id="tag-filter">
      {selected.length > 0 && (
        <button className="tag-filter__clear" onClick={onClear}>
          Clear ({selected.length})
        </button>
      )}
      <div className="tag-filter__chips">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-chip ${selected.includes(tag) ? 'tag-chip--active' : ''}`}
            onClick={() => onToggle(tag)}
            id={`tag-${tag}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
