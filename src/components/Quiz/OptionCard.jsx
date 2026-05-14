export default function OptionCard({ title, price, image, isSelected, onClick }) {
  return (
    <button
      className={`option-card ${isSelected ? "is-selected" : ""}`}
      type="button"
      onClick={onClick}
    >
      {isSelected && <div className="option-card__check" />}
      <div className="option-card__image-wrap">
        {image ? (
          <img src={image} alt={title} className="option-card__image" loading="lazy" />
        ) : (
          <div className="option-card__placeholder">Место под фото</div>
        )}
      </div>
      <div className="option-card__body">
        <h3 className="option-card__title">{title}</h3>
        {price && <p className="option-card__price">{price}</p>}
      </div>
    </button>
  );
}
