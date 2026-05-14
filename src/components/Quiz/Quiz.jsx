import { useState } from "react";
import { buildLeadData } from "../../utils/buildLeadData";
import { isStepValid, validateStep } from "../../utils/validation";
import { submitLead } from "../../utils/submitLead";
import ProgressBar from "./ProgressBar";
import SuccessScreen from "./SuccessScreen";
import PavilionTypeStep from "./PavilionTypeStep";
import ParametersStep from "./ParametersStep";
import FillingStep from "./FillingStep";
import ContactStep from "./ContactStep";

const createInitialFormData = () => ({
  pavilionType: null,
  length: "",
  width: "",
  polycarbonateType: null,
  comment: "",
  fullName: "",
  deliveryCity: "",
  phone: "",
  email: "",
  fax: "",
});

const steps = ["pavilionType", "parameters", "filling", "contact"];

export default function Quiz() {
  const [screen, setScreen] = useState("quiz");
  const [formData, setFormData] = useState(createInitialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentStep = steps[currentStepIndex] || steps[0];
  const errors = showErrors ? validateStep(currentStep, formData) : {};
  const canGoNext = isStepValid(currentStep, formData);

  const resetQuiz = () => {
    setFormData(createInitialFormData());
    setCurrentStepIndex(0);
    setShowErrors(false);
    setIsSubmitting(false);
    setSubmitError("");
  };

  const startQuiz = () => {
    resetQuiz();
    setScreen("quiz");
  };

  const closeQuiz = () => {
    resetQuiz();
  };

  const updateField = (field, value) => {
    if (submitError) setSubmitError("");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePavilionTypeChange = (field, value) => {
    updateField(field, value);
    setShowErrors(false);
  };

  const goBack = () => {
    if (currentStepIndex === 0) return;
    setShowErrors(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = async () => {
    const nextErrors = validateStep(currentStep, formData);
    setShowErrors(true);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    if (currentStep === "contact") {
      setIsSubmitting(true);
      const leadData = buildLeadData(formData);
      try {
        await submitLead(leadData);
        setScreen("success");
      } catch (error) {
        setSubmitError(error.message || "Не удалось отправить заявку. Попробуйте еще раз.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setShowErrors(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const renderStep = () => {
    if (currentStep === "pavilionType") {
      return <PavilionTypeStep formData={formData} onFieldChange={handlePavilionTypeChange} error={errors.pavilionType} />;
    }
    if (currentStep === "parameters") {
      return <ParametersStep formData={formData} onFieldChange={updateField} errors={errors} />;
    }
    if (currentStep === "filling") {
      return <FillingStep formData={formData} onFieldChange={updateField} errors={errors} />;
    }
    return <ContactStep formData={formData} onFieldChange={updateField} errors={errors} />;
  };

  if (screen === "success") return <SuccessScreen onRestart={startQuiz} />;

  return (
    <main className="quiz-shell">
      <div className="quiz-shell__photo" aria-hidden="true" />
      <section className="quiz-panel">
        <div className="quiz-panel__top">
          <ProgressBar current={currentStepIndex} total={steps.length} />
        </div>
        {renderStep()}
        {submitError && <p className="submit-error">{submitError}</p>}
        <div className="quiz-actions">
          {currentStepIndex > 0 && (
            <button className="button button--ghost" type="button" onClick={goBack}>
              Назад
            </button>
          )}
          <span className="secure-note">Ваши данные защищены и не передаются третьим лицам</span>
          <button
            className="button button--primary"
            type="button"
            onClick={goNext}
            disabled={!canGoNext || isSubmitting}
          >
            {currentStep === "contact" ? (isSubmitting ? "Отправляем..." : "Отправить заявку") : "Далее"}
          </button>
        </div>
      </section>
    </main>
  );
}
