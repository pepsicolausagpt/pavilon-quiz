import {
  EMAIL_SETTINGS_PLACEHOLDER,
  IVAN_API_URL,
} from "../config/constants";
import { formatLeadEmail } from "./formatLeadEmail";

async function submitToIvanApi({ header, msg }) {
  if (!IVAN_API_URL) {
    throw new Error("API URL не настроен");
  }

  const params = new URLSearchParams();
  params.append("header", header);
  params.append("msg", msg);

  console.info("Sending lead to Ivan API (no-cors mode)...", { url: IVAN_API_URL, header });

  await fetch(IVAN_API_URL.endsWith("/") ? IVAN_API_URL : `${IVAN_API_URL}/`, {
    method: "POST",
    body: params,
    mode: "no-cors",
  });

  console.info("Lead sent successfully (opaque response accepted)");
  return "OK (assumed)";
}

export async function submitLead(leadData) {
  const emailBody = formatLeadEmail(leadData);
  const subject = `${EMAIL_SETTINGS_PLACEHOLDER.subject}: ${leadData.contact.fullName}`;

  try {
    await submitToIvanApi({
      header: subject,
      msg: emailBody,
    });

    return {
      ok: true,
      emailSubject: subject,
      emailBody,
    };
  } catch (error) {
    console.error("Lead submission failed:", error);
    
    if (!IVAN_API_URL) {
      console.info("Mock lead submission (no API URL)", { subject, emailBody });
      await new Promise((resolve) => window.setTimeout(resolve, 800));
      return {
        ok: true,
        isMock: true,
        emailSubject: subject,
        emailBody,
      };
    }

    throw new Error(`Не удалось отправить заявку: ${error.message}. Попробуйте еще раз или свяжитесь по телефону.`);
  }
}
