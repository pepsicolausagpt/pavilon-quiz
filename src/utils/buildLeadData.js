import { LEAD_SOURCE } from "../config/constants";

export function buildLeadData(formData) {
  const createdAt = new Date().toISOString();
  const contact = {
    fullName: formData.fullName?.trim() || "",
    deliveryCity: formData.deliveryCity?.trim() || "",
    phone: formData.phone?.trim() || "",
    email: formData.email?.trim() || "",
    fax: formData.fax?.trim() || "",
  };

  return {
    source: LEAD_SOURCE,
    pavilionType: formData.pavilionType,
    length: formData.length?.trim() || "",
    width: formData.width?.trim() || "",
    polycarbonateType: formData.polycarbonateType,
    comment: formData.comment?.trim() || "",
    contact,
    createdAt,
  };
}
