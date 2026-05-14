export default function SuccessScreen({ onRestart }) {
  return (
    <main className="quiz-shell quiz-shell--success">
      <div className="quiz-shell__photo" aria-hidden="true" />
      <section className="success-screen">
        <div className="success-screen__content">
          <h2 className="success-screen__title">Спасибо за заявку!</h2>
          <p className="success-screen__text">Мы получили ваши ответы и уже приступили к расчету стоимости павильона. Наш менеджер свяжется с вами в ближайшее время.</p>
          <button className="button button--ghost" onClick={onRestart}>
            Пройти тест заново
          </button>
        </div>
      </section>
    </main>
  );
}
