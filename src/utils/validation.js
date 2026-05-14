export function validateStep(stepId, formData) {
  const errors = {};
  const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

  const requireField = (field, message = "Заполните поле") => {
    const value = formData[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[field] = message;
    }
  };

  if (stepId === "pavilionType") {
    requireField("pavilionType", "Выберите серию павильона");
  }

  if (stepId === "parameters") {
    requireField("length", "Укажите длину");
    requireField("width", "Укажите ширину");
  }

  if (stepId === "filling") {
    requireField("polycarbonateType", "Выберите тип поликарбоната");
  }

  if (stepId === "contact") {
    requireField("fullName", "Укажите ФИО");
    requireField("deliveryCity", "Укажите населенный пункт");
    requireField("phone", "Укажите контактный телефон");
    requireField("email", "Укажите email");

    if (formData.phone && formData.phone.replace(/\D/g, "").length !== 11) {
      errors.phone = "Укажите номер телефона полностью";
    }

    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = "Проверьте формат email";
    }
  }

  return errors;
}

export function isStepValid(stepId, formData) {
  return Object.keys(validateStep(stepId, formData)).length === 0;
}
