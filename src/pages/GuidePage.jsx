import { Fragment, useState } from "react"
import { Link } from "react-router"
import SEO from "../components/SEO"
import { guideSections } from "./guideSections"

const TALLY_CONTRIBUTE_URL = "https://tally.so/r/81DR1Y"

function renderInlineText(text) {
  return text
    .split(/(<strong>.*?<\/strong>)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
        return <strong key={`${part}-${index}`}>{part.slice(8, -9)}</strong>
      }

      return part
    })
}

function GuideContentBlock({ block }) {
  if (block.type === "linked-paragraph") {
    return (
      <p>
        {renderInlineText(block.before)}
        <Link to={block.to} className="guide-accordion__inline-link">
          {block.linkText}
        </Link>
        {renderInlineText(block.after)}
      </p>
    )
  }

  if (block.type === "subheading") {
    return <h3 className="guide-accordion__subheading">{block.text}</h3>
  }

  if (block.type === "list") {
    return (
      <ul className="guide-accordion__list">
        {block.items.map((item) => (
          <li key={item}>{renderInlineText(item)}</li>
        ))}
      </ul>
    )
  }

  if (block.type === "examples") {
    return (
      <div className="guide-accordion__examples">
        {block.items.map((item) => (
          <p key={item}>{renderInlineText(item)}</p>
        ))}
      </div>
    )
  }

  const lines = block.lines || [block.text]

  return (
    <p>
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {renderInlineText(line)}
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  )
}

function GuidePage() {
  const [openSectionId, setOpenSectionId] = useState(null)
  const firstSection = guideSections[0]

  const toggleSection = (sectionId) => {
    setOpenSectionId((currentId) => currentId === sectionId ? null : sectionId)
  }

  return (
    <div className="guide-page">
      <SEO
        title="Guida all'Acroyoga | AcroFinder"
        description="Informazioni utili per iniziare, partecipare alle jam e vivere la community in modo sicuro, consapevole e rispettoso."
        canonical="https://acrofinder.it/guide"
      />

      <div className="container guide-page__container">
        <header className="guide-hero">
          <h1 className="guide-hero__title">Guida all&apos;Acroyoga</h1>
          <p className="guide-hero__subtitle">
            Informazioni utili per iniziare, partecipare alle jam e vivere la
            community in modo sicuro, consapevole e rispettoso.
          </p>

          <button
            type="button"
            className="guide-hero__starter"
            aria-expanded={openSectionId === firstSection.id}
            aria-controls={`guide-panel-${firstSection.id}`}
            onClick={() => setOpenSectionId(firstSection.id)}
          >
            <i className="bi bi-compass" aria-hidden="true" />
            <span>
              Nuovo nell&apos;Acroyoga? Inizia da “Sono principiante: come
              comincio?”
            </span>
          </button>
        </header>

        <section className="guide-accordion" aria-label="Sezioni della Guida all'Acroyoga">
          {guideSections.map((section) => {
            const isOpen = openSectionId === section.id
            const triggerId = `guide-trigger-${section.id}`
            const panelId = `guide-panel-${section.id}`

            return (
              <article
                key={section.id}
                className={`guide-accordion__item${isOpen ? " guide-accordion__item--open" : ""}`}
              >
                <h2 className="guide-accordion__heading">
                  <button
                    id={triggerId}
                    type="button"
                    className="guide-accordion__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="guide-accordion__icon" aria-hidden="true">
                      <i className={`bi ${section.icon}`} />
                    </span>

                    <span className="guide-accordion__summary">
                      <span className="guide-accordion__title">{section.title}</span>
                      <span className="guide-accordion__description">
                        {section.description}
                      </span>
                    </span>

                    <i
                      className={`bi bi-chevron-down guide-accordion__chevron${isOpen ? " guide-accordion__chevron--open" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h2>

                <div
                  id={panelId}
                  className="guide-accordion__panel"
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                >
                  <div className="guide-accordion__content">
                    {section.content.map((block, index) => (
                      <GuideContentBlock key={`${section.id}-${index}`} block={block} />
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <aside
          className="city-community-detail__notice guide-disclaimer"
          aria-labelledby="guide-disclaimer-title"
        >
          <i className="bi bi-info-circle-fill" aria-hidden="true" />

          <div className="guide-disclaimer__content">
            <p>
              <strong id="guide-disclaimer-title">Nota sulla Guida</strong>
            </p>
            <p>
              Le informazioni presenti in questa guida hanno uno scopo
              esclusivamente informativo e divulgativo. Non sostituiscono
              l&apos;insegnamento, la supervisione o le indicazioni di insegnanti
              qualificati.
            </p>
            <p>
              L&apos;Acroyoga è una pratica fisica e comporta dei rischi: pratica in
              modo responsabile, nel rispetto dei tuoi limiti e di quelli delle
              altre persone, e utilizza uno spotter quando necessario.
            </p>
          </div>
        </aside>

        <section className="guide-contribute" aria-labelledby="guide-contribute-title">
          <span className="guide-contribute__icon" aria-hidden="true">
            <i className="bi bi-lightbulb" />
          </span>

          <div className="guide-contribute__content">
            <h2 id="guide-contribute-title">Hai un suggerimento per questa guida?</h2>
            <p>
              Se vuoi proporre una modifica, migliorare una sezione o aggiungere
              un&apos;informazione che ritieni utile, puoi segnalarcelo attraverso il
              modulo di AcroFinder.
            </p>
          </div>

          <a
            href={TALLY_CONTRIBUTE_URL}
            target="_blank"
            rel="noreferrer"
            className="guide-contribute__button"
          >
            Invia un suggerimento
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </section>
      </div>
    </div>
  )
}

export default GuidePage
