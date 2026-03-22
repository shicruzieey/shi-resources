import { useState } from 'react';

export default function ResourceCard({ resource, isFav, onToggleFav }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resource.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may fail in some browsers */
    }
  };

  return (
    <article
      className={`card ${isFav ? 'card--pinned' : ''}`}
      id={`card-${resource.id}`}
    >
      {isFav && (
        <span className="card__pin-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Shi's Fave
        </span>
      )}

      <div className="card__body">
        <div className="card__title-row">
          <img
            className="card__favicon"
            src={`https://www.google.com/s2/favicons?domain=${new URL(resource.url).hostname}&sz=32`}
            alt=""
            width="18"
            height="18"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h3 className="card__title">{resource.title}</h3>
        </div>
        <p className="card__desc">{resource.description}</p>
        <div className="card__tags">
          {resource.tags.map((tag) => (
            <span key={tag} className="card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="card__actions">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__visit"
          id={`visit-${resource.id}`}
        >
          Visit Resource
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        <div className="card__icon-btns">
          <button
            className={`card__icon-btn ${isFav ? 'card__icon-btn--fav' : ''}`}
            onClick={() => onToggleFav(resource.id)}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            )}
          </button>
          <button
            className={`card__icon-btn ${copied ? 'card__icon-btn--copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy link"
            title="Copy link"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
