import ResourceCard from './ResourceCard';

export default function ResourceGrid({ resources, isFav, onToggleFav }) {
  if (resources.length === 0) {
    return (
      <div className="grid__empty" id="empty-state">
        <span className="grid__empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <h3>No resources found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid" id="resource-grid">
      {resources.map((r) => (
        <ResourceCard
          key={r.id}
          resource={r}
          isFav={isFav(r.id)}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}
