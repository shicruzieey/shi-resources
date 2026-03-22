import colorThemes from '../data/colorThemes';

export default function ColorGallery() {
  return (
    <div className="color-gallery">
      {colorThemes.map((src, i) => (
        <div key={i} className="color-gallery__item">
          <img src={src} alt={`Color theme ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}
