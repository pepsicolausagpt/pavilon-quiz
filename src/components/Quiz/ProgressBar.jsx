export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / (total - 1)) * 100);
  return (
    <div className="progress">
      <div className="progress__meta">
        <span>
          Шаг {current + 1} из {total}
        </span>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
