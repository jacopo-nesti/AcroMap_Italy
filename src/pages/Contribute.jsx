import SEO from "../components/SEO"

const CARDS = [
  {
    icon: "geo-alt-fill",
    title: "Aggiungi una città",
    text: "La tua città o il tuo gruppo non sono ancora presenti? Segnalaceli!",
  },
  {
    icon: "calendar-event-fill",
    title: "Aggiorna jam o corsi",
    text: "Un orario è cambiato o c'è una nuova jam al parco? Faccelo sapere per aggiornare i dati.",
  },
  {
    icon: "bug-fill",
    title: "Segnala un errore",
    text: "Hai trovato un link non funzionante o una posizione sbagliata su Google Maps?",
  },
]

export default function Contribute() {
  return (
    <main className="contribute-page">
      <SEO
        title="Contribuisci | AcroFinder"
        description="Segnala una community, una jam, un corso o un'informazione da aggiornare e aiuta AcroFinder a crescere."
      />

      <div className="container contribute-page__container">
        <header className="contribute-page__header">
          <span className="contribute-page__badge">
            Partecipa
          </span>

          <h1 className="contribute-page__title">
            Contribuisci al progetto
          </h1>

          <p className="contribute-page__subtitle">
            Aggiungi il tuo gruppo, segnala una nuova jam o aggiorna le
            informazioni della tua community.
          </p>
        </header>

        <div className="row g-4 contribute-page__cards">
          {CARDS.map((item) => (
            <div key={item.title} className="col-lg-4">
              <article className="contribute-card">
                <div className="contribute-card__icon" aria-hidden="true">
                  <i className={`bi bi-${item.icon}`} />
                </div>

                <h2 className="contribute-card__title">
                  {item.title}
                </h2>

                <p className="contribute-card__text">
                  {item.text}
                </p>
              </article>
            </div>
          ))}
        </div>

        <div className="contribute-page__action">
          <a
            href="https://tally.so/r/zxAD88"
            target="_blank"
            rel="noreferrer"
            className="contribute-page__button"
          >
            Compila il modulo di segnalazione
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  )
}