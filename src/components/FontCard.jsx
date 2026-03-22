import { useEffect, useState } from 'react';

export default function FontCard({ font, pinned, onTogglePin }) {
  const [loaded, setLoaded] = useState(false);
  const googleUrl = `https://fonts.googleapis.com/css2?family=${font.name.replace(/ /g, '+')}:wght@${font.weight}&display=swap`;

  useEffect(() => {
    /* Load the font dynamically */
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = googleUrl;
    link.onload = () => setLoaded(true);
    document.head.appendChild(link);
    return () => {
      /* Don't remove — keep fonts cached for the session */
    };
  }, [googleUrl]);

  return (
    <article className={`font-card ${pinned ? 'font-card--pinned' : ''}`} id={`font-${font.name.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="font-card__header">
        <div className="font-card__meta">
          <h3 className="font-card__name">{font.name}</h3>
          <span className="font-card__style">{font.style}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            className={`font-card__pin-btn ${pinned ? 'font-card__pin-btn--active' : ''}`}
            onClick={() => onTogglePin(font.name)}
            title={pinned ? 'Unpin' : 'Pin to top'}
            aria-label={pinned ? 'Unpin font' : 'Pin font to top'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={pinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.09 6.26L21 9.27l-5 3.64L17.18 20 12 16.77 6.82 20 8 12.91l-5-3.64 6.91-1.01z"/>
            </svg>
          </button>
          <a
            href={`https://fonts.google.com/specimen/${font.name.replace(/ /g, '+')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-card__link"
            title="View on Google Fonts"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <div
        className="font-card__preview"
        style={{
          fontFamily: loaded ? `'${font.name}', sans-serif` : 'inherit',
          opacity: loaded ? 1 : 0.4,
        }}
      >
        <span className="font-card__sample-lg">Aa</span>
        <span className="font-card__sample-text">The quick brown fox jumps over the lazy dog</span>
      </div>

      <p className="font-card__desc">{font.description}</p>

      <div className="font-card__tags">
        {font.tags.map((tag) => (
          <span key={tag} className="font-card__tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}
