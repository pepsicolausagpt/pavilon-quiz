export default function ParametersStep({ formData, onFieldChange, errors }) {
  return (
    <div className="step">
      <div className="step__header">
        <h2>Параметры павильона</h2>
        <p>Укажите желаемые габариты (в метрах)</p>
      </div>

      <div className="form-grid form-grid--contact">
        <div className="field">
          <span>Длина (м)</span>
          <input
            id="length"
            type="number"
            step="0.1"
            placeholder="Например: 6"
            value={formData.length || ""}
            onChange={(e) => onFieldChange("length", e.target.value)}
          />
          {errors?.length && <span className="field-error">{errors.length}</span>}
        </div>

        <div className="field">
          <span>Ширина (м)</span>
          <input
            id="width"
            type="number"
            step="0.1"
            placeholder="Например: 3"
            value={formData.width || ""}
            onChange={(e) => onFieldChange("width", e.target.value)}
          />
          {errors?.width && <span className="field-error">{errors.width}</span>}
        </div>
      </div>
    </div>
  );
}
