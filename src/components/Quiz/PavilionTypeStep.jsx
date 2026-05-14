import { pavilions } from "../../data/pavilions";
import OptionCard from "./OptionCard";

export default function PavilionTypeStep({ formData, onFieldChange, error }) {
  return (
    <div className="step">
      <div className="step__header">
        <h2>Выберите серию павильона</h2>
      </div>

      {error && <p className="field-error">{error}</p>}

      <div className="card-grid card-grid--types">
        {pavilions.map((p) => (
          <OptionCard
            key={p.id}
            title={p.name}
            price={p.price}
            image={p.image}
            isSelected={formData.pavilionType === p.id}
            onClick={() => onFieldChange("pavilionType", p.id)}
          />
        ))}
      </div>
    </div>
  );
}
