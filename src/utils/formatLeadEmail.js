import { pavilions, polycarbonateTypes } from "../data/pavilions";

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Не указано";
  }
  return String(value);
};

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));

export function formatLeadEmail(leadData) {
  const contact = leadData.contact;
  const selectedPavilion = pavilions.find((p) => p.id === leadData.pavilionType);
  const selectedPolycarbonate = polycarbonateTypes.find((p) => p.id === leadData.polycarbonateType);

  const base = [
    "Новая заявка на расчет павильона",
    "",
    "Контакты клиента:",
    `Имя: ${formatValue(contact.fullName)}`,
    `Населенный пункт: ${formatValue(contact.deliveryCity)}`,
    `Телефон: ${formatValue(contact.phone)}`,
    `Email: ${formatValue(contact.email)}`,
    `Факс: ${formatValue(contact.fax)}`,
    "",
    "Параметры павильона:",
    `Серия павильона: ${selectedPavilion ? selectedPavilion.name : formatValue(leadData.pavilionType)}`,
    `Длина: ${formatValue(leadData.length)} м`,
    `Ширина: ${formatValue(leadData.width)} м`,
    "",
    "Наполнение павильона:",
    `Тип поликарбоната: ${selectedPolycarbonate ? selectedPolycarbonate.label : formatValue(leadData.polycarbonateType)}`,
    `Комментарий: ${formatValue(leadData.comment)}`,
    "",
    `Источник: ${leadData.source}`,
    `Дата заявки: ${formatDate(leadData.createdAt)}`,
  ];

  return base.join("\n");
}
