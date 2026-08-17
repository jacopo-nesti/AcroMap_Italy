import BackButton from "../components/BackButton"
import SEO from "../components/SEO"

function Terms() {
  return (
    <div className="container-fluid container-xl py-5">

      <SEO
        title="Termini di utilizzo | AcroFinder"
        description="Consulta i termini di utilizzo di AcroFinder."
      />

      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">

          {/* Tasto Indietro */}
          <div className="mb-3">
            <BackButton />
          </div>

          {/* Header Pagina */}
          <div className="text-center mb-5">
            <span
              className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
              style={{ backgroundColor: "#15803d" }}
            >
              Condizioni di Servizio
            </span>

            <h1 className="display-5 fw-bold text-dark mb-2">
              Termini di utilizzo
            </h1>

            <p className="small" style={{ color: "#64748b" }}>
              Ultimo aggiornamento: agosto 2026
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">

            {/* 1 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-info-circle-fill"
                  style={{ color: "#15803d" }}
                ></i>
                1. Informazioni generali
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder è un progetto indipendente dedicato alla raccolta,
                organizzazione e condivisione di informazioni relative alle
                community di Acroyoga presenti in Italia.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Il progetto è gestito da:
              </p>

              <p className="mb-3" style={{ color: "#334155" }}>
                <strong>Jacopo Nesti</strong>
                <br />
                Contatto:{" "}
                <a href="mailto:jacopo.nesti95@gmail.com">
                  jacopo.nesti95@gmail.com
                </a>
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder è attualmente un servizio pubblico e gratuito.
                L'accesso al sito non richiede la creazione di un account o la
                registrazione dell'utente. L'utilizzo del sito è soggetto ai
                presenti Termini di utilizzo e alla Privacy Policy di
                AcroFinder.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 2 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-compass-fill"
                  style={{ color: "#15803d" }}
                ></i>
                2. Finalità del servizio
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder ha finalità esclusivamente informative e di supporto
                alla scoperta delle community di Acroyoga.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Il sito può mettere a disposizione, a titolo esemplificativo:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>informazioni sulle community di Acroyoga;</li>
                <li>città e località in cui sono presenti community;</li>
                <li>informazioni relative a jam, corsi e altre attività;</li>
                <li>nomi di insegnanti o organizzatori;</li>
                <li>luoghi, giorni e orari delle attività;</li>
                <li>
                  collegamenti a siti web, social network, gruppi di
                  messaggistica e altri canali esterni;
                </li>
                <li>una mappa delle community;</li>
                <li>
                  strumenti per segnalare nuove community, modifiche, errori o
                  aggiornamenti.
                </li>
              </ul>

              <p className="fw-semibold mb-0" style={{ color: "#1e293b" }}>
                AcroFinder non costituisce una scuola di Acroyoga,
                un'associazione sportiva, un organizzatore di eventi, un
                intermediario tra utenti e community o un fornitore delle
                attività indicate sul sito.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 3 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-browser-chrome"
                  style={{ color: "#15803d" }}
                ></i>
                3. Accesso e utilizzo del sito
              </h2>

              <p style={{ color: "#334155" }}>
                Gli utenti possono consultare liberamente le informazioni
                disponibili su AcroFinder per individuare community, jam,
                corsi e altre attività di Acroyoga.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                L'utente si impegna a utilizzare il sito in modo lecito e
                corretto e a non utilizzare AcroFinder per finalità:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>illecite;</li>
                <li>fraudolente;</li>
                <li>abusive;</li>
                <li>lesive dei diritti di terzi;</li>
                <li>
                  incompatibili con la finalità informativa e comunitaria del
                  progetto.
                </li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                È vietato tentare di compromettere la sicurezza, il
                funzionamento o l'integrità tecnica del sito o utilizzare
                strumenti automatizzati in modo tale da interferire con il
                normale funzionamento del servizio.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 4 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-patch-check-fill"
                  style={{ color: "#15803d" }}
                ></i>
                4. Accuratezza e aggiornamento delle informazioni
              </h2>

              <p className="mb-2" style={{ color: "#334155" }}>
                Le informazioni pubblicate su AcroFinder possono provenire:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>dalle community;</li>
                <li>dagli organizzatori;</li>
                <li>dagli insegnanti;</li>
                <li>dagli utenti che inviano segnalazioni;</li>
                <li>da fonti pubblicamente accessibili;</li>
                <li>da verifiche effettuate dal gestore del progetto.</li>
              </ul>

              <p style={{ color: "#334155" }}>
                AcroFinder cerca di mantenere le informazioni corrette e
                aggiornate, ma non può garantire che tutti i contenuti siano in
                ogni momento completi, esatti o aggiornati.
              </p>

              <p style={{ color: "#334155" }}>
                Jam, corsi, orari, luoghi, insegnanti, contatti, costi e altre
                informazioni possono essere modificati, sospesi o cancellati
                dalle rispettive community senza che AcroFinder ne venga
                immediatamente informato.
              </p>

              <p className="fw-semibold mb-0" style={{ color: "#1e293b" }}>
                Prima di partecipare a un'attività, l'utente è pertanto
                invitato a verificare direttamente con la community,
                l'organizzatore o l'insegnante interessato che le informazioni
                siano ancora valide.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 5 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-people-fill"
                  style={{ color: "#15803d" }}
                ></i>
                5. Community, insegnanti e organizzatori
              </h2>

              <p style={{ color: "#334155" }}>
                Le community, gli insegnanti, gli organizzatori, le
                associazioni e gli altri soggetti indicati sul sito sono
                autonomi e indipendenti da AcroFinder, salvo che venga
                espressamente indicato diversamente.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                La presenza di una community, di un insegnante, di un corso o
                di un evento su AcroFinder:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>non costituisce certificazione;</li>
                <li>non costituisce approvazione professionale;</li>
                <li>non costituisce raccomandazione personale;</li>
                <li>non garantisce qualifiche, competenza o affidabilità;</li>
                <li>
                  non determina alcun rapporto di collaborazione,
                  rappresentanza o affiliazione con AcroFinder.
                </li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder non determina prezzi, programmi, modalità di
                partecipazione, requisiti, assicurazioni, condizioni di
                accesso o organizzazione delle attività pubblicate.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 6 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-shield-check"
                  style={{ color: "#15803d" }}
                ></i>
                6. Attività sportive e sicurezza
              </h2>

              <p style={{ color: "#334155" }}>
                L'Acroyoga e le attività fisiche collegate comportano, per
                loro natura, rischi connessi al movimento, all'equilibrio,
                alle cadute, al contatto fisico e alle condizioni individuali
                dei partecipanti.
              </p>

              <p style={{ color: "#334155" }}>
                AcroFinder si limita a fornire informazioni utili per
                individuare community e attività e non svolge attività di
                insegnamento, supervisione o organizzazione delle pratiche
                indicate sul sito.
              </p>

              <p style={{ color: "#334155" }}>
                La decisione di partecipare a jam, corsi, workshop, eventi o
                altre attività è assunta autonomamente dall'utente.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                L'utente è invitato a:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>valutare la propria preparazione e le proprie condizioni;</li>
                <li>rispettare i propri limiti;</li>
                <li>
                  seguire le indicazioni degli insegnanti e degli
                  organizzatori;
                </li>
                <li>informarsi sulle condizioni di partecipazione;</li>
                <li>
                  verificare, ove ritenuto necessario, qualifiche, coperture
                  assicurative e misure di sicurezza dell'organizzatore o
                  della struttura.
                </li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder non può essere considerato organizzatore o
                responsabile dell'esecuzione delle attività semplicemente
                perché le relative informazioni sono presenti sul sito.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 7 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-send-check-fill"
                  style={{ color: "#15803d" }}
                ></i>
                7. Segnalazioni e contributi degli utenti
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder consente agli utenti di contribuire al progetto
                inviando informazioni, correzioni o richieste di inserimento
                attraverso gli strumenti messi a disposizione.
              </p>

              <p style={{ color: "#334155" }}>
                Chi invia una segnalazione dichiara, per quanto ragionevolmente
                a propria conoscenza, che le informazioni fornite sono
                corrette, pertinenti e inviate legittimamente.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Non devono essere inviati:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>contenuti falsi o volutamente ingannevoli;</li>
                <li>informazioni private non necessarie;</li>
                <li>
                  dati personali di terzi non pertinenti alla finalità della
                  segnalazione;
                </li>
                <li>contenuti diffamatori, offensivi o discriminatori;</li>
                <li>contenuti illeciti;</li>
                <li>
                  materiale che violi diritti d'autore, marchi o altri diritti
                  di terzi;
                </li>
                <li>materiale promozionale o spam non pertinente.</li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder può verificare le informazioni ricevute prima della
                pubblicazione e non è obbligato a pubblicare tutte le
                segnalazioni ricevute.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 8 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-pencil-square"
                  style={{ color: "#15803d" }}
                ></i>
                8. Modifica, rifiuto e rimozione dei contributi
              </h2>

              <p className="mb-2" style={{ color: "#334155" }}>
                AcroFinder si riserva la possibilità di:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>correggere errori materiali;</li>
                <li>uniformare la formattazione delle informazioni;</li>
                <li>sintetizzare descrizioni e testi;</li>
                <li>
                  chiedere chiarimenti al soggetto che ha inviato una
                  segnalazione;
                </li>
                <li>
                  rifiutare contenuti non verificabili, non pertinenti o
                  incompatibili con le finalità del progetto;
                </li>
                <li>aggiornare informazioni non più corrette;</li>
                <li>rimuovere contenuti obsoleti;</li>
                <li>
                  rimuovere contenuti che possano violare diritti di terzi o
                  norme applicabili.
                </li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                Tali interventi vengono effettuati con l'obiettivo di
                mantenere AcroFinder utile, affidabile, leggibile e coerente
                con le proprie finalità.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 9 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-file-earmark-text-fill"
                  style={{ color: "#15803d" }}
                ></i>
                9. Licenza sui contenuti inviati
              </h2>

              <p style={{ color: "#334155" }}>
                Chi invia volontariamente testi, descrizioni, informazioni o
                altri contenuti destinati alla pubblicazione concede ad
                AcroFinder, nei limiti necessari al funzionamento del progetto,
                il diritto non esclusivo di utilizzare, riprodurre,
                organizzare, formattare, adattare e pubblicare tali contenuti
                sul sito.
              </p>

              <p style={{ color: "#334155" }}>
                Il soggetto che invia il materiale conserva gli eventuali
                diritti di cui è titolare.
              </p>

              <p style={{ color: "#334155" }}>
                La presente autorizzazione è limitata alle finalità di
                gestione, pubblicazione, aggiornamento e promozione del
                progetto AcroFinder e non comporta il trasferimento della
                proprietà dei contenuti.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Chi invia materiale appartenente a terzi deve assicurarsi di
                essere legittimato a farlo.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 10 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-exclamation-circle-fill"
                  style={{ color: "#15803d" }}
                ></i>
                10. Segnalazione di errori e richieste di rimozione
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder incoraggia community, insegnanti, organizzatori e
                utenti a segnalare informazioni errate, obsolete o non più
                pertinenti.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                È possibile richiedere:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>la correzione di informazioni;</li>
                <li>l'aggiornamento di una community;</li>
                <li>la modifica dei riferimenti pubblicati;</li>
                <li>la rimozione di informazioni;</li>
                <li>
                  la verifica di contenuti potenzialmente illeciti o lesivi di
                  diritti di terzi.
                </li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                Le richieste possono essere effettuate attraverso gli strumenti
                disponibili sul sito o contattando{" "}
                <a href="mailto:jacopo.nesti95@gmail.com">
                  jacopo.nesti95@gmail.com
                </a>
                . Le richieste saranno valutate tenendo conto delle
                circostanze, dei diritti delle persone interessate e della
                normativa applicabile.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 11 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-box-arrow-up-right"
                  style={{ color: "#15803d" }}
                ></i>
                11. Link e servizi di terze parti
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder può contenere collegamenti verso servizi e siti
                gestiti da soggetti terzi, tra cui, a titolo esemplificativo:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>social network;</li>
                <li>gruppi di messaggistica;</li>
                <li>siti delle community;</li>
                <li>servizi cartografici;</li>
                <li>moduli esterni;</li>
                <li>
                  piattaforme utilizzate per supportare il progetto.
                </li>
              </ul>

              <p style={{ color: "#334155" }}>
                I collegamenti vengono forniti per facilitare l'accesso alle
                informazioni.
              </p>

              <p style={{ color: "#334155" }}>
                I servizi esterni non sono controllati da AcroFinder e sono
                soggetti ai propri termini, condizioni e informative privacy.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                La presenza di un collegamento non implica automaticamente
                approvazione, collaborazione o affiliazione con il relativo
                soggetto.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 12 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-heart-fill"
                  style={{ color: "#15803d" }}
                ></i>
                12. Donazioni e sostegno al progetto
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder può mettere a disposizione collegamenti a
                piattaforme esterne attraverso cui gli utenti possono
                sostenere volontariamente il progetto mediante donazioni o
                contributi.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Il sostegno economico:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>è facoltativo;</li>
                <li>
                  non è necessario per utilizzare le funzionalità pubbliche di
                  AcroFinder;
                </li>
                <li>
                  non attribuisce privilegi, diritti di gestione o controllo
                  sul progetto;
                </li>
                <li>
                  non garantisce l'introduzione di specifiche funzionalità;
                </li>
                <li>
                  non costituisce pagamento per l'accesso alle informazioni
                  disponibili gratuitamente sul sito.
                </li>
              </ul>

              <p style={{ color: "#334155" }}>
                Le operazioni di pagamento sono gestite dalla piattaforma
                esterna utilizzata e sono soggette alle condizioni applicabili
                del relativo fornitore.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder non acquisisce direttamente i dati completi degli
                strumenti di pagamento quando questi vengono gestiti
                esclusivamente dal fornitore esterno.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 13 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-c-circle-fill"
                  style={{ color: "#15803d" }}
                ></i>
                13. Proprietà intellettuale
              </h2>

              <p style={{ color: "#334155" }}>
                Salvo diversa indicazione, il nome AcroFinder, il design
                originale del sito, i testi originali, gli elementi grafici
                originali e gli altri contenuti realizzati specificamente per
                il progetto sono utilizzati e gestiti dal titolare del
                progetto e sono tutelati dalla normativa applicabile in
                materia di proprietà intellettuale.
              </p>

              <p style={{ color: "#334155" }}>
                Eventuali librerie software, componenti open source, mappe,
                icone, marchi, fotografie, loghi o contenuti appartenenti a
                soggetti terzi rimangono soggetti ai rispettivi diritti e alle
                rispettive licenze.
              </p>

              <p style={{ color: "#334155" }}>
                La presenza su AcroFinder del nome, logo o collegamento di una
                community non implica il trasferimento ad AcroFinder dei
                relativi diritti.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Non è consentito presentare copie o riproduzioni sostanziali di
                AcroFinder come se costituissero il progetto originale o
                fossero ufficialmente autorizzate, fatti salvi gli utilizzi
                consentiti dalla legge o dalle eventuali licenze applicabili.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 14 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-gear-fill"
                  style={{ color: "#15803d" }}
                ></i>
                14. Disponibilità del servizio
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder è un progetto indipendente e viene fornito secondo
                le risorse tecniche e organizzative disponibili.
              </p>

              <p style={{ color: "#334155" }}>
                Non viene garantita la disponibilità ininterrotta del sito.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Il servizio può essere temporaneamente indisponibile per:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>manutenzione;</li>
                <li>aggiornamenti;</li>
                <li>problemi tecnici;</li>
                <li>indisponibilità dei fornitori esterni;</li>
                <li>interventi di sicurezza;</li>
                <li>
                  cause non ragionevolmente controllabili dal gestore.
                </li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder può inoltre modificare, aggiungere o rimuovere
                funzionalità quando ciò sia necessario per evolvere o
                mantenere il progetto.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 15 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-shield-exclamation"
                  style={{ color: "#15803d" }}
                ></i>
                15. Limitazione di responsabilità
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder adotta ragionevoli accorgimenti per offrire
                informazioni utili e mantenere il progetto funzionante, ma non
                può garantire che tutti i dati pubblicati siano sempre privi
                di errori o costantemente aggiornati.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Nei limiti consentiti dalla legge, AcroFinder non risponde di
                conseguenze derivanti esclusivamente:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>
                  da informazioni modificate dagli organizzatori dopo la loro
                  pubblicazione;
                </li>
                <li>
                  dall'annullamento o modifica di eventi, jam o corsi da parte
                  di terzi;
                </li>
                <li>
                  dal comportamento delle community, degli insegnanti, degli
                  organizzatori o degli altri utenti;
                </li>
                <li>dall'utilizzo di siti o servizi esterni;</li>
                <li>
                  dalla partecipazione autonoma dell'utente ad attività
                  organizzate da soggetti indipendenti da AcroFinder.
                </li>
              </ul>

              <p className="fw-semibold mb-0" style={{ color: "#1e293b" }}>
                Nulla nei presenti Termini deve essere interpretato come
                esclusione o limitazione di responsabilità nei casi in cui
                tale esclusione o limitazione non sia consentita dalla legge.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 16 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-lock-fill"
                  style={{ color: "#15803d" }}
                ></i>
                16. Privacy
              </h2>

              <p style={{ color: "#334155" }}>
                Il trattamento dei dati personali connesso all'utilizzo di
                AcroFinder è disciplinato dalla Privacy Policy pubblicata sul
                sito.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                La Privacy Policy descrive, tra le altre cose:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>i dati eventualmente trattati;</li>
                <li>le finalità;</li>
                <li>le basi giuridiche;</li>
                <li>le modalità di pubblicazione;</li>
                <li>la conservazione;</li>
                <li>i fornitori coinvolti;</li>
                <li>i diritti degli interessati.</li>
              </ul>

              <p className="mb-0" style={{ color: "#334155" }}>
                I presenti Termini di utilizzo non sostituiscono la Privacy
                Policy.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 17 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-person-fill"
                  style={{ color: "#15803d" }}
                ></i>
                17. Utilizzo da parte di minori
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder non è specificamente progettato come servizio
                destinato ai minori.
              </p>

              <p style={{ color: "#334155" }}>
                I minori non dovrebbero utilizzare il modulo di contribuzione
                per fornire autonomamente dati personali propri o di terzi
                quando ciò non sia appropriato o consentito dalla normativa
                applicabile.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                La partecipazione di minori ad attività sportive individuate
                tramite il sito rimane soggetta alle condizioni stabilite
                dalle rispettive community, organizzatori, strutture e
                soggetti esercenti la responsabilità genitoriale.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 18 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-arrow-repeat"
                  style={{ color: "#15803d" }}
                ></i>
                18. Modifiche ai Termini
              </h2>

              <p className="mb-2" style={{ color: "#334155" }}>
                I presenti Termini possono essere aggiornati quando ciò sia
                necessario per riflettere:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>modifiche delle funzionalità di AcroFinder;</li>
                <li>introduzione di nuovi servizi;</li>
                <li>cambiamenti organizzativi;</li>
                <li>esigenze di sicurezza;</li>
                <li>modifiche normative.</li>
              </ul>

              <p style={{ color: "#334155" }}>
                La versione aggiornata sarà pubblicata sul sito con indicazione
                della data dell'ultimo aggiornamento.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Eventuali modifiche non incidono sui diritti inderogabili
                riconosciuti agli utenti dalla normativa applicabile.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 19 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-bank2"
                  style={{ color: "#15803d" }}
                ></i>
                19. Legge applicabile
              </h2>

              <p style={{ color: "#334155" }}>
                I presenti Termini sono disciplinati dalla legge italiana.
              </p>

              <p style={{ color: "#334155" }}>
                Resta impregiudicata l'applicazione delle norme imperative
                eventualmente riconosciute all'utente dalla normativa
                nazionale o dell'Unione europea.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Qualora l'utente rivesta la qualità di consumatore e trovi
                applicazione la relativa normativa di tutela, restano ferme le
                competenze territoriali inderogabili e gli altri diritti
                previsti dalla legge.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 20 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-envelope-paper-fill"
                  style={{ color: "#15803d" }}
                ></i>
                20. Contatti
              </h2>

              <p className="mb-2" style={{ color: "#334155" }}>
                Per segnalazioni, richieste di aggiornamento, richieste di
                rimozione, questioni relative ai contenuti o richieste
                relative ai presenti Termini è possibile contattare:
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                <strong>Jacopo Nesti</strong>
                <br />
                gestore del progetto AcroFinder
                <br />
                Email:{" "}
                <a href="mailto:jacopo.nesti95@gmail.com">
                  jacopo.nesti95@gmail.com
                </a>
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 21 */}
            <section>
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-journal-check"
                  style={{ color: "#15803d" }}
                ></i>
                21. Disposizioni finali
              </h2>

              <p style={{ color: "#334155" }}>
                Qualora una disposizione dei presenti Termini risulti
                invalida, inefficace o non applicabile, le restanti
                disposizioni continueranno ad applicarsi nei limiti consentiti
                dalla legge.
              </p>

              <p style={{ color: "#334155" }}>
                La mancata applicazione immediata di una disposizione dei
                presenti Termini non costituisce rinuncia definitiva alla
                possibilità di farla valere successivamente.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                I presenti Termini devono essere interpretati nel rispetto
                della normativa applicabile e senza pregiudicare eventuali
                diritti inderogabili riconosciuti agli utenti.
              </p>
            </section>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Terms