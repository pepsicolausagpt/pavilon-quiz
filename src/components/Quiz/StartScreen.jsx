export default function StartScreen({ onStart }) {
  return (
    <main className="quiz-shell quiz-shell--start">
      <div className="quiz-shell__photo" aria-hidden="true" />
      <section className="start-screen">
        <div className="start-screen__content">
          <span className="badge">Онлайн расчет</span>
          <h1 className="start-screen__title">Узнайте стоимость вашего павильона за 2 минуты</h1>
          <p className="start-screen__subtitle">Ответьте на 4 простых вопроса и получите расчет стоимости.</p>
          <button className="button button--primary button--large" onClick={onStart}>
            Начать расчет
          </button>
        </div>
      </section>
    </main>
  );
}
