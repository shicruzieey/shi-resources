import FontCard from './FontCard';

export default function FontGrid({ fonts, isPinned, onTogglePin }) {
  return (
    <div className="font-grid" id="font-grid">
      {fonts.map((font) => (
        <FontCard
          key={font.name}
          font={font}
          pinned={isPinned(font.name)}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}
