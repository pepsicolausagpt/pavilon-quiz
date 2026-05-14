import { polycarbonateTypes } from "../../data/pavilions";
import OptionCard from "./OptionCard";

export default function FillingStep({ formData, onFieldChange, errors }) {
  return (
    <div className="step">
      <div className="step__header">
        <h2>Выберите наполнение для вашего павильона</h2>
      </div>

      {errors?.polycarbonateType && <p className="field-error">{errors.polycarbonateType}</p>}

      <div className="card-grid card-grid--models">
        {polycarbonateTypes.map((p) => (
          <OptionCard
            key={p.id}
            title={p.label}
            image={p.image}
            isSelected={formData.polycarbonateType === p.id}
            onClick={() => onFieldChange("polycarbonateType", p.id)}
          />
        ))}
      </div>

      <div className="field" style={{ marginTop: "24px" }}>
        <span>Комментарий (пожелания, особенности)</span>
        <textarea
          id="comment"
          rows={3}
          placeholder="Опишите дополнительные пожелания..."
          value={formData.comment || ""}
          onChange={(e) => onFieldChange("comment", e.target.value)}
        />
      </div>
    </div>
  );
}
