export default function ContactStep({ formData, onFieldChange, errors }) {
  return (
    <div className="step step--contact">
      <div className="step__header">
        <h2>Последний шаг! Укажите ваши контакты</h2>
        <p>Мы вышлем готовый расчет на вашу почту или свяжемся по телефону</p>
      </div>

      <div className="contact-form">
        <div className="form-grid form-grid--contact">
          <div className="field">
            <span>Ваше имя</span>
            <input
              id="fullName"
              type="text"
              placeholder="Например, Анна"
              value={formData.fullName || ""}
              onChange={(e) => onFieldChange("fullName", e.target.value)}
            />
            {errors?.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="field">
            <span>Город поставки</span>
            <input
              id="deliveryCity"
              type="text"
              placeholder="Например, Москва"
              value={formData.deliveryCity || ""}
              onChange={(e) => onFieldChange("deliveryCity", e.target.value)}
            />
            {errors?.deliveryCity && <span className="field-error">{errors.deliveryCity}</span>}
          </div>

          <div className="field">
            <span>Контактный телефон</span>
            <input
              id="phone"
              type="tel"
              placeholder="+7 900 000-00-00"
              value={formData.phone || ""}
              onChange={(e) => onFieldChange("phone", e.target.value)}
            />
            <small>Проверьте номер: по нему специалист сможет связаться для уточнения расчета.</small>
            {errors?.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="field">
            <span>Email для получения расчета</span>
            <input
              id="email"
              type="email"
              placeholder="name@example.ru"
              value={formData.email || ""}
              onChange={(e) => onFieldChange("email", e.target.value)}
            />
            {errors?.email && <span className="field-error">{errors.email}</span>}
          </div>
        </div>

        <div className="contact-assurance">
          <span>Расчет ни к чему не обязывает</span>
          <span>Данные используются только для подготовки предложения</span>
          <span>Ответим в рабочее время</span>
        </div>
      </div>
    </div>
  );
}
