import BackButton from "../components/BackButton"
import SEO from "../components/SEO"

function Privacy() {
  return (
    <div className="container-fluid container-xl py-5">

      <SEO
        title="Privacy Policy | AcroFinder"
        description="Consulta l'informativa sulla privacy di AcroFinder."
        canonical="https://acrofinder.it/privacy"
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
              Informativa sulla Privacy
            </span>

            <h1 className="display-5 fw-bold text-dark mb-2">
              Privacy Policy
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
                  className="bi bi-person-badge"
                  style={{ color: "#15803d" }}
                ></i>
                1. Titolare del trattamento
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder è un progetto indipendente dedicato alla raccolta,
                organizzazione e condivisione di informazioni relative alle
                community di Acroyoga presenti in Italia.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Il Titolare del trattamento dei dati personali è:
              </p>

              <p className="fw-semibold mb-3" style={{ color: "#1e293b" }}>
                Jacopo Nesti
                <br />
                <span className="fw-normal">
                  gestore del progetto AcroFinder
                </span>
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Contatto per questioni relative alla privacy e all'esercizio
                dei diritti:
              </p>

              <p className="mb-3">
                <a href="mailto:jacopo.nesti95@gmail.com">
                  jacopo.nesti95@gmail.com
                </a>
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder non richiede la creazione di un account o la
                registrazione degli utenti per consultare i contenuti del sito.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 2 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i
                  className="bi bi-database-lock"
                  style={{ color: "#15803d" }}
                ></i>
                2. Quali dati possono essere trattati
              </h2>

              <p style={{ color: "#334155" }}>
                La semplice consultazione di AcroFinder non richiede
                all'utente di fornire direttamente dati personali.
              </p>

              <p style={{ color: "#334155" }}>
                Attraverso i moduli esterni di contribuzione e di contatto
                possono tuttavia essere raccolti dati e informazioni forniti
                volontariamente dall'utente.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Questi possono comprendere:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>nome o altro identificativo del soggetto che invia la segnalazione;</li>
                <li>indirizzo email utilizzato per eventuali comunicazioni relative alla segnalazione;</li>
                <li>nome della community, dell'organizzazione o dell'associazione;</li>
                <li>città e luoghi in cui vengono svolte le attività;</li>
                <li>link a siti web, social network, gruppi o altri canali pubblici della community;</li>
                <li>informazioni relative a jam, corsi e altre attività di Acroyoga;</li>
                <li>nome degli insegnanti o degli organizzatori;</li>
                <li>
                  contenuto di domande, richieste o altre comunicazioni inviate
                  attraverso il modulo Contatti;
                </li>
                <li>eventuali ulteriori informazioni inserite volontariamente nel modulo.</li>
              </ul>

              <p className="fw-semibold mb-0" style={{ color: "#1e293b" }}>
                Si invita a non inserire dati personali non necessari, dati
                appartenenti a categorie particolari ai sensi dell'art. 9 GDPR
                o informazioni private non pertinenti alle finalità di
                AcroFinder.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 3 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-gear-fill" style={{ color: "#15803d" }}></i>
                3. Finalità del trattamento
              </h2>

              <p style={{ color: "#334155" }}>
                I dati raccolti attraverso i moduli di contribuzione e di
                contatto vengono trattati esclusivamente per finalità connesse
                al funzionamento di AcroFinder e, in particolare, per:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>ricevere e valutare segnalazioni relative alle community di Acroyoga;</li>
                <li>verificare, correggere e aggiornare le informazioni presenti sul sito;</li>
                <li>contattare, quando necessario, la persona che ha inviato una segnalazione per richiedere chiarimenti;</li>
                <li>pubblicare sul sito le informazioni pertinenti relative a community, jam, corsi, insegnanti e organizzatori;</li>
                <li>mantenere aggiornata la mappa e il database delle community;</li>
                <li>prevenire o gestire segnalazioni manifestamente errate, abusive o non pertinenti;</li>
                <li>gestire eventuali richieste di rettifica, aggiornamento o rimozione delle informazioni.</li>
                <li>
                  rispondere a domande, richieste o comunicazioni inviate
                  attraverso il modulo Contatti.
                </li>
              </ul>
            </section>

            <hr className="my-4 text-border" />

            {/* 4 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-bank2" style={{ color: "#15803d" }}></i>
                4. Base giuridica del trattamento
              </h2>

              <p style={{ color: "#334155" }}>
                Il trattamento dei dati forniti direttamente dalla persona che
                utilizza il modulo è effettuato, a seconda delle circostanze,
                sulla base:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>
                  dell'esecuzione delle attività richieste dall'interessato
                  mediante l'invio volontario di una segnalazione o di una
                  richiesta di contatto;
                </li>
                <li>
                  del legittimo interesse del Titolare a gestire, verificare,
                  mantenere aggiornato e proteggere il progetto AcroFinder e a
                  fornire agli utenti informazioni utili sulle community di
                  Acroyoga.
                </li>
              </ul>

              <p style={{ color: "#334155" }}>
                Quando il trattamento si basa sul legittimo interesse, questo
                viene perseguito nel rispetto dei diritti e delle libertà
                fondamentali degli interessati e secondo i principi di
                necessità, proporzionalità e minimizzazione dei dati.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder non utilizza i dati raccolti attraverso i moduli per
                attività di marketing, profilazione o invio di comunicazioni
                commerciali.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 5 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-globe2" style={{ color: "#15803d" }}></i>
                5. Dati destinati alla pubblicazione
              </h2>

              <p style={{ color: "#334155" }}>
                Alcune delle informazioni ricevute attraverso il modulo sono
                destinate, per loro natura, alla pubblicazione su AcroFinder.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Possono essere pubblicati, quando pertinenti:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>nome della community;</li>
                <li>città e luoghi delle attività;</li>
                <li>link pubblici della community;</li>
                <li>informazioni relative a jam e corsi;</li>
                <li>nomi degli insegnanti o degli organizzatori quando pertinenti alla descrizione dell'attività;</li>
                <li>altre informazioni chiaramente destinate alla presentazione pubblica della community.</li>
              </ul>

              <p style={{ color: "#334155" }}>
                Non viene invece pubblicato l'indirizzo email personale fornito
                esclusivamente come recapito del soggetto che invia la
                segnalazione, salvo che l'interessato ne richieda espressamente
                la pubblicazione come contatto pubblico della community.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                AcroFinder applica il principio di minimizzazione e cerca di
                pubblicare esclusivamente le informazioni necessarie a
                consentire agli utenti di conoscere e contattare le community.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 6 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-people-fill" style={{ color: "#15803d" }}></i>
                6. Informazioni relative a terze persone
              </h2>

              <p style={{ color: "#334155" }}>
                Il soggetto che invia una segnalazione potrebbe fornire
                informazioni riguardanti altre persone, ad esempio il nome di
                un insegnante o di un organizzatore.
              </p>

              <p style={{ color: "#334155" }}>
                Chi invia informazioni relative a terzi è invitato a fornire
                esclusivamente dati pertinenti all'attività pubblica della
                community e a non comunicare informazioni private o non
                necessarie.
              </p>

              <p style={{ color: "#334155" }}>
                Quando AcroFinder riceve dati personali non direttamente
                dall'interessato, tali informazioni possono provenire da
                membri o organizzatori delle community oppure da fonti
                pubblicamente accessibili collegate alle attività delle
                community.
              </p>

              <p style={{ color: "#334155" }}>
                Le categorie di dati interessate sono normalmente limitate a
                dati identificativi e professionali o associativi pertinenti
                all'attività di Acroyoga, quali nome, ruolo, community di
                appartenenza e riferimenti pubblici relativi all'attività.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Chiunque sia interessato può richiedere in qualsiasi momento
                la verifica, rettifica o rimozione delle informazioni personali
                che lo riguardano utilizzando il contatto indicato nella
                presente Privacy Policy.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 7 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-send-check" style={{ color: "#15803d" }}></i>
                7. Conferimento dei dati
              </h2>

              <p style={{ color: "#334155" }}>
                La consultazione di AcroFinder non richiede l'invio dei moduli
                di contribuzione o di contatto.
              </p>

              <p style={{ color: "#334155" }}>
                Il conferimento dei dati attraverso i moduli è volontario.
              </p>

              <p style={{ color: "#334155" }}>
                Alcune informazioni possono tuttavia essere necessarie per
                permettere ad AcroFinder di verificare una segnalazione o di
                ricontattare il soggetto che l'ha inviata.
              </p>

              <p style={{ color: "#334155" }}>
                La mancata comunicazione delle informazioni necessarie può
                rendere impossibile verificare o pubblicare la segnalazione.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                L'utente è invitato a fornire esclusivamente i dati necessari
                allo scopo della segnalazione.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 8 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-shield-lock-fill" style={{ color: "#15803d" }}></i>
                8. Modalità del trattamento e sicurezza
              </h2>

              <p style={{ color: "#334155" }}>
                I dati personali sono trattati con strumenti elettronici e
                secondo principi di liceità, correttezza, trasparenza,
                minimizzazione e limitazione delle finalità.
              </p>

              <p style={{ color: "#334155" }}>
                Sono adottate misure ragionevoli volte a proteggere le
                informazioni da accessi non autorizzati, perdita, divulgazione
                o utilizzo improprio.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                L'accesso alle informazioni ricevute tramite il modulo è
                limitato ai soggetti che ne hanno necessità per la gestione del
                progetto e ai fornitori tecnici utilizzati per l'erogazione dei
                relativi servizi.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 9 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-clock-history" style={{ color: "#15803d" }}></i>
                9. Conservazione dei dati
              </h2>

              <p style={{ color: "#334155" }}>
                Le informazioni pubblicate relative alle community vengono
                conservate finché risultano utili e pertinenti alle finalità di
                AcroFinder oppure fino alla loro modifica o rimozione.
              </p>

              <p style={{ color: "#334155" }}>
                I dati personali utilizzati per gestire e verificare una
                segnalazione, compreso l'indirizzo email del soggetto che la
                invia, vengono conservati finché risultano ragionevolmente
                necessari per valutare la segnalazione, documentarne l'origine
                e supportare eventuali aggiornamenti delle informazioni
                pubblicate.
              </p>

              <p style={{ color: "#334155" }}>
                I dati inviati tramite il modulo Contatti vengono conservati
                finché risultano ragionevolmente necessari per gestire la
                richiesta e le eventuali comunicazioni successive. In entrambi
                i casi può rendersi necessaria una conservazione ulteriore per
                gestire contestazioni, richieste dell'interessato o obblighi di
                legge.
              </p>

              <p style={{ color: "#334155" }}>
                I dati non più necessari rispetto alle finalità per cui sono
                stati raccolti vengono cancellati o resi anonimi.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                L'interessato può in ogni momento richiedere la cancellazione
                dei propri dati nei casi previsti dalla normativa applicabile.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 10 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-box-seam-fill" style={{ color: "#15803d" }}></i>
                10. Fornitori tecnici e servizi di terze parti
              </h2>

              <h3 className="h6 fw-bold text-dark mt-4 mb-2">Tally</h3>

              <p style={{ color: "#334155" }}>
                AcroFinder utilizza due moduli forniti da Tally: il modulo
                Contribuisci, destinato all'invio di nuove community, jam,
                corsi, aggiornamenti e altre segnalazioni utili al progetto, e
                il modulo Contatti, destinato a domande, richieste e
                comunicazioni rivolte ad AcroFinder.
              </p>

              <p style={{ color: "#334155" }}>
                I moduli non sono incorporati in AcroFinder tramite iframe o
                script: vengono aperti sul dominio <strong>tally.so</strong>
                soltanto dopo un'azione esplicita dell'utente. Da quel momento
                il browser comunica direttamente con il servizio Tally.
              </p>

              <p style={{ color: "#334155" }}>
                Nell'ambito della gestione delle risposte al modulo, AcroFinder
                determina le finalità del trattamento dei dati raccolti, mentre
                Tally tratta i dati necessari all'erogazione del servizio
                secondo il proprio ruolo e le proprie condizioni applicabili.
              </p>

              <p style={{ color: "#334155" }}>
                Tally dichiara di avere sede nell'Unione europea e di conservare
                in Europa i dati raccolti tramite i moduli.
              </p>

              <p style={{ color: "#334155" }}>
                Nella configurazione attuale non sono attive la raccolta delle
                risposte parziali, la cancellazione automatica delle
                submission, le notifiche email automatiche al gestore o al
                rispondente e la prevenzione degli invii duplicati. Le risposte
                inviate vengono quindi gestite e cancellate in base ai criteri
                di necessità descritti nella sezione 9, senza un termine
                automatico preimpostato sulla piattaforma.
              </p>

              <p style={{ color: "#334155" }}>
                È attiva la funzione “Save answers for later”. Secondo quanto
                dichiarato da Tally, le risposte non ancora inviate vengono
                conservate localmente nel browser dell'utente per consentirgli
                di riprendere la compilazione e non lasciano il suo dispositivo.
                Questo storage è gestito sul servizio Tally e non è implementato
                dal codice di <strong>acrofinder.it</strong>.
              </p>

              <p style={{ color: "#334155" }}>
                Per maggiori informazioni è possibile consultare la{" "}
                <a
                  href="https://tally.so/help/gdpr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  documentazione privacy di Tally
                </a>{" "}
                e le relative condizioni applicabili.
              </p>

              <h3 className="h6 fw-bold text-dark mt-4 mb-2">
                OpenStreetMap e Leaflet
              </h3>

              <p style={{ color: "#334155" }}>
                La pagina <strong>/map</strong> utilizza Leaflet e React Leaflet
                per visualizzare la mappa delle community. Le librerie e i
                relativi file applicativi sono serviti localmente da
                AcroFinder; le tile cartografiche, invece, vengono richieste
                automaticamente dal browser ai server della OpenStreetMap
                Foundation, sui domini <strong>*.tile.openstreetmap.org</strong>,
                quando l'utente apre la pagina della mappa e durante la sua
                consultazione.
              </p>

              <p style={{ color: "#334155" }}>
                Tali richieste possono trasmettere alla OpenStreetMap Foundation
                dati tecnici quali indirizzo IP, informazioni sul browser o sul
                dispositivo, referrer, data e ora della richiesta e tile o area
                geografica visualizzata. AcroFinder utilizza questo servizio
                esclusivamente per fornire la funzionalità cartografica e non
                impiega tali dati per analytics, marketing o profilazione.
              </p>

              <p style={{ color: "#334155" }}>
                Per maggiori informazioni è possibile consultare la{" "}
                <a
                  href="https://osmfoundation.org/wiki/Privacy_Policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy della OpenStreetMap Foundation
                </a>
                .
              </p>

              <h3 className="h6 fw-bold text-dark mt-4 mb-2">GitHub Pages</h3>

              <p style={{ color: "#334155" }}>
                AcroFinder è ospitato tramite GitHub Pages. Nel corso delle
                normali richieste HTTP necessarie a rendere disponibile il sito,
                GitHub può trattare dati tecnici quali indirizzo IP, user-agent,
                URL richiesto, data e ora, referrer e log tecnici o di sicurezza,
                secondo le proprie pratiche e condizioni. GitHub opera come
                fornitore dell'infrastruttura di hosting; AcroFinder non utilizza
                questi dati per attività di profilazione.
              </p>

              <p style={{ color: "#334155" }}>
                Ulteriori informazioni sono disponibili nella{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Statement di GitHub
                </a>
                .
              </p>

              <h3 className="h6 fw-bold text-dark mt-4 mb-2">
                Semplici collegamenti esterni
              </h3>

              <p style={{ color: "#334155" }}>
                Google Maps, Instagram, Facebook, WhatsApp, i siti delle
                community e Buy Me a Coffee sono presenti esclusivamente come
                collegamenti esterni e non come embed, iframe o SDK incorporati.
                Il browser contatta il relativo servizio soltanto quando
                l'utente sceglie di aprire il link.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Dopo la navigazione verso il servizio esterno, l'eventuale
                trattamento di dati e l'uso di cookie o altre tecnologie proprie
                avvengono secondo le informative e le condizioni del rispettivo
                provider.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 11 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-diagram-3-fill" style={{ color: "#15803d" }}></i>
                11. Destinatari dei dati
              </h2>

              <p style={{ color: "#334155" }}>
                I dati personali non vengono venduti a terzi.
              </p>

              <p style={{ color: "#334155" }}>
                Possono essere trattati dai fornitori di servizi tecnici
                utilizzati per il funzionamento di AcroFinder, nei limiti
                necessari alla fornitura dei rispettivi servizi.
              </p>

              <p style={{ color: "#334155" }}>
                Le informazioni espressamente destinate alla pubblicazione
                diventano accessibili agli utenti del sito e, trattandosi di un
                sito pubblico, possono essere visualizzate anche da soggetti
                situati al di fuori dell'Unione europea.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                I dati utilizzati esclusivamente per la gestione interna delle
                segnalazioni, come l'indirizzo email personale del
                contributore, non vengono resi pubblici.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 12 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-globe-europe-africa" style={{ color: "#15803d" }}></i>
                12. Trasferimenti internazionali
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder privilegia, ove possibile, servizi che trattano i
                dati all'interno dello Spazio Economico Europeo.
              </p>

              <p style={{ color: "#334155" }}>
                Qualora uno dei fornitori tecnici utilizzati comporti il
                trattamento o il trasferimento di dati personali verso Paesi
                situati al di fuori dello Spazio Economico Europeo, il
                trattamento avverrà nel rispetto delle condizioni previste dal
                GDPR e, ove necessario, mediante gli strumenti di garanzia
                previsti dalla normativa applicabile.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Le informazioni volontariamente pubblicate sul sito sono, per
                loro natura, accessibili tramite Internet anche da Paesi
                esterni allo Spazio Economico Europeo.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 13 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-cookie" style={{ color: "#15803d" }}></i>
                13. Cookie, browser storage e strumenti di tracciamento
              </h2>

              <p style={{ color: "#334155" }}>
                Il codice applicativo di AcroFinder non imposta né legge cookie
                e non utilizza <strong>localStorage</strong>,{" "}
                <strong>sessionStorage</strong> o <strong>IndexedDB</strong> sul
                dominio <strong>acrofinder.it</strong>.
              </p>

              <p style={{ color: "#334155" }}>
                AcroFinder non utilizza Google Analytics o GA4, Google Tag
                Manager, Meta Pixel, strumenti pubblicitari, strumenti di
                profilazione o sistemi di analytics comportamentali.
              </p>

              <p style={{ color: "#334155" }}>
                Poiché nello stato attuale del sito non sono presenti cookie o
                tecnologie non essenziali soggetti a consenso preventivo,
                AcroFinder non presenta un cookie banner o una piattaforma di
                gestione del consenso (CMP).
              </p>

              <p style={{ color: "#334155" }}>
                Questa descrizione riguarda il funzionamento di AcroFinder. I
                servizi esterni aperti volontariamente tramite link possono
                utilizzare cookie o tecnologie proprie dopo la navigazione sui
                rispettivi domini; inoltre Tally utilizza lo storage locale del
                browser per la funzione “Save answers for later” descritta nella
                sezione 10.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Qualora in futuro vengano introdotti strumenti di analisi,
                cookie o altre tecnologie che richiedano il consenso
                dell'utente ai sensi della normativa applicabile, questa
                informativa e gli eventuali meccanismi di consenso saranno
                aggiornati prima della loro attivazione.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 14 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-cpu-fill" style={{ color: "#15803d" }}></i>
                14. Processi decisionali automatizzati
              </h2>

              <p style={{ color: "#334155" }}>
                I dati personali trattati da AcroFinder non sono utilizzati per
                processi decisionali automatizzati o attività di profilazione
                ai sensi dell'art. 22 GDPR.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Le segnalazioni ricevute possono essere sottoposte a verifica
                prima della loro pubblicazione.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 15 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-check-fill" style={{ color: "#15803d" }}></i>
                15. Diritti degli interessati
              </h2>

              <p style={{ color: "#334155" }}>
                Nei casi previsti dal GDPR, l'interessato può esercitare i
                propri diritti e, in particolare, richiedere:
              </p>

              <ul style={{ color: "#334155" }}>
                <li>la conferma dell'esistenza di dati personali che lo riguardano;</li>
                <li>l'accesso ai propri dati personali;</li>
                <li>la rettifica di dati inesatti o l'integrazione di dati incompleti;</li>
                <li>la cancellazione dei dati nei casi previsti dalla legge;</li>
                <li>la limitazione del trattamento;</li>
                <li>la portabilità dei dati, quando applicabile;</li>
                <li>l'opposizione al trattamento quando questo è fondato sul legittimo interesse;</li>
                <li>informazioni sull'origine dei dati, quando questi non siano stati raccolti direttamente presso l'interessato.</li>
              </ul>

              <p style={{ color: "#334155" }}>
                È inoltre possibile richiedere la modifica o la rimozione di
                informazioni personali pubblicate su AcroFinder.
              </p>

              <p className="mb-2" style={{ color: "#334155" }}>
                Le richieste possono essere inviate a:
              </p>

              <p>
                <a href="mailto:jacopo.nesti95@gmail.com">
                  jacopo.nesti95@gmail.com
                </a>
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Le richieste saranno gestite nei termini previsti dalla
                normativa applicabile.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 16 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-shield-exclamation" style={{ color: "#15803d" }}></i>
                16. Reclamo al Garante
              </h2>

              <p className="mb-0" style={{ color: "#334155" }}>
                L'interessato che ritenga che il trattamento dei propri dati
                personali avvenga in violazione della normativa applicabile ha
                il diritto di proporre reclamo al Garante per la protezione dei
                dati personali, fatto salvo ogni altro ricorso amministrativo o
                giurisdizionale previsto dalla legge.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 17 */}
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-x-fill" style={{ color: "#15803d" }}></i>
                17. Minori
              </h2>

              <p style={{ color: "#334155" }}>
                AcroFinder non è progettato per raccogliere intenzionalmente
                dati personali di minori attraverso il modulo di contribuzione.
              </p>

              <p style={{ color: "#334155" }}>
                Si invita pertanto a non inserire nel modulo dati personali
                relativi a minori.
              </p>

              <p className="mb-0" style={{ color: "#334155" }}>
                Qualora AcroFinder venga a conoscenza della presenza di dati
                personali di minori non necessari alle finalità del progetto,
                tali informazioni potranno essere rimosse.
              </p>
            </section>

            <hr className="my-4 text-border" />

            {/* 18 */}
            <section>
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-arrow-repeat" style={{ color: "#15803d" }}></i>
                18. Modifiche alla Privacy Policy
              </h2>

              <p style={{ color: "#334155" }}>
                La presente Privacy Policy può essere aggiornata per riflettere
                modifiche al funzionamento di AcroFinder, ai servizi utilizzati
                o alla normativa applicabile.
              </p>

              <p style={{ color: "#334155" }}>
                La versione aggiornata sarà pubblicata su questa pagina
                indicando la data dell'ultimo aggiornamento.
              </p>

            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
