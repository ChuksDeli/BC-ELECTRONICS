import { FiStar } from 'react-icons/fi';

export default function RatingStars({ rating, size = 'w-3.5 h-3.5', showValue = true, reviews }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-accent">
        {stars.map((s) => (
          <FiStar key={s} className={`${size} ${s <= Math.round(rating) ? 'fill-accent' : ''}`} />
        ))}
      </div>
      {showValue && <span className="text-xs text-text-secondary">{rating.toFixed(1)}</span>}
      {reviews !== undefined && (
        <span className="text-xs text-text-secondary">({reviews})</span>
      )}
    </div>
  );
}
