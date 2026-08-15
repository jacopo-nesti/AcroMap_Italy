# AcroFinder

**Trova la tua community di Acroyoga in tutta Italia.**

AcroFinder è un progetto indipendente nato per raccogliere in un unico posto le community di Acroyoga presenti in Italia e rendere più semplice trovare **gruppi, jam e corsi** nella propria città o mentre si viaggia.

L'obiettivo è creare una mappa della community italiana facile da consultare, mantenuta aggiornata anche grazie alle segnalazioni delle persone che ne fanno parte.

## Cosa puoi fare con AcroFinder

- Esplorare le community di Acroyoga presenti in Italia
- Cercare città e gruppi locali
- Consultare jam settimanali, luoghi e orari
- Trovare corsi, livelli e insegnanti
- Accedere rapidamente ai social e ai contatti delle community
- Aprire su Google Maps i luoghi di jam e corsi
- Segnalare nuove community, jam o informazioni da aggiornare

## Perché AcroFinder

Le community di Acroyoga sono spesso organizzate attraverso gruppi WhatsApp, pagine Instagram, passaparola e altre piattaforme separate tra loro.

Questo può rendere difficile capire dove si pratica Acroyoga, soprattutto per chi si avvicina per la prima volta alla disciplina, cambia città o vuole praticare durante un viaggio.

AcroFinder nasce per offrire un **punto di accesso unico alla community italiana**, senza sostituire i gruppi locali: il progetto aiuta semplicemente le persone a trovarli e a entrare in contatto con loro.

## Tecnologie

AcroFinder è sviluppato come applicazione web frontend utilizzando:

- **React** per la costruzione dell'interfaccia tramite componenti riutilizzabili
- **React Router** per la gestione della navigazione e delle route dinamiche
- **Bootstrap** per layout, responsive design e componenti di base
- **Bootstrap Icons** per il sistema di icone dell'interfaccia
- **Leaflet** e **React Leaflet** per la mappa interattiva
- **JavaScript** per la logica dell'applicazione
- **CSS** per il design system e la personalizzazione dell'interfaccia
- **JSON** come sorgente dati per città, community, jam e corsi

Il progetto è stato sviluppato mantenendo separati dati, logica e componenti dell'interfaccia, in modo da facilitare l'aggiunta di nuove città e community senza dover costruire manualmente una nuova pagina per ciascuna di esse.


## Progettazione UI/UX

Una parte importante dello sviluppo di AcroFinder è stata dedicata alla progettazione dell'interfaccia e dell'esperienza utente.

L'obiettivo non era solamente mostrare le informazioni disponibili, ma costruire un percorso che permettesse all'utente di arrivare rapidamente dalla ricerca iniziale alle informazioni realmente utili per praticare Acroyoga.

Il processo di progettazione ha incluso:

- definizione della gerarchia delle informazioni;
- realizzazione e confronto di diversi mockup;
- costruzione di un design system coerente tra le pagine;
- progettazione responsive per desktop, tablet e mobile;
- progressiva semplificazione delle interazioni;
- attenzione alla leggibilità e alla densità delle informazioni;
- utilizzo coerente di colori, card, icone e componenti di navigazione;
- progettazione degli stati di hover, focus, selezione ed espansione;
- attenzione all'accessibilità e alla navigazione tramite tastiera.

L'interfaccia è stata sviluppata attraverso un processo iterativo: diverse soluzioni sono state implementate, osservate nel contesto reale dell'applicazione e successivamente semplificate o modificate quando introducevano interazioni inutili o rendevano meno immediata la consultazione.


## User feedback e testing

Il processo di sviluppo ha incluso anche raccolta di feedback e test dell'esperienza utente.

I feedback sono stati utilizzati per individuare problemi di comprensione, navigazione e organizzazione delle informazioni e per guidare successive iterazioni dell'interfaccia.

Particolare attenzione è stata dedicata a:

- comprensione immediata dello scopo del sito;
- facilità nel trovare una città o una community;
- numero di interazioni necessarie per raggiungere jam e corsi;
- comprensione della navigazione tra regioni, città e community;
- leggibilità delle informazioni su schermi di dimensioni differenti;
- comportamento dell'interfaccia su dispositivi touch;
- chiarezza delle call to action;
- individuazione di elementi ridondanti o poco intuitivi.

Il feedback degli utenti viene quindi considerato parte del processo di progettazione e non solamente una verifica conclusiva del prodotto.


## Struttura e funzionamento dei dati

AcroFinder utilizza una struttura dati centralizzata per rappresentare le community presenti sul territorio.

I dati sono organizzati principalmente per:

**Regione → Città → Community → Jam / Corsi**

Ogni città può contenere una o più community.

Le pagine vengono generate dinamicamente a partire dai dati disponibili. Questo permette, ad esempio, di aggiungere una nuova città al dataset senza dover creare manualmente una nuova pagina React dedicata.

Una community può contenere informazioni come:

- nome e descrizione;
- collegamenti ai social e ai canali della community;
- jam settimanali;
- corsi;
- luoghi e collegamenti a Google Maps;
- giorni e orari;
- insegnanti e livelli, quando disponibili.

L'interfaccia gestisce inoltre in modo differente città con una sola community e città con più community, riducendo le interazioni non necessarie.


## Architettura dell'interfaccia

L'applicazione è organizzata attraverso componenti React riutilizzabili.

Le principali aree dell'interfaccia comprendono:

- landing page e ricerca delle città;
- esplorazione delle community per regione;
- pagine dinamiche delle città;
- schede delle community;
- sezioni dedicate a jam e corsi;
- mappa interattiva;
- navigazione e layout condivisi;
- pagine informative e di contribuzione.

La componentizzazione permette di riutilizzare gli stessi pattern dell'interfaccia mantenendo comportamento e stile coerenti nelle diverse parti dell'applicazione.


## Avvio del progetto in locale

Per eseguire AcroFinder in locale è necessario avere installati **Node.js** e **npm**.

1. Clona il repository:

```bash
git clone <[Repository](https://github.com/jacopo-nesti/AcroMap_Italy)>
```

2. Installa le dipendenze

```bash
npm install
```

3. Avvia il server di sviluppo

```bash
npm run dev
```

Nota: L'indirizzo locale dell'applicazione verrà mostrato nel terminale (es. http://localhost:5173).


## Stato del progetto

AcroFinder è attualmente in sviluppo.

L'interfaccia, l'esperienza utente e la struttura del progetto vengono progressivamente migliorate attraverso sviluppo iterativo, test responsive e feedback degli utenti.

Prima della pubblicazione definitiva sono previste ulteriori verifiche relative a:

- accessibilità;
- contrasto;
- performance;
- responsive design;
- qualità del codice;
- ottimizzazione degli asset;
- Lighthouse.


## Screenshot

Gli screenshot definitivi dell'applicazione verranno aggiunti al completamento dell'interfaccia.


## Note legali

AcroFinder è un progetto indipendente dedicato alla community italiana di Acroyoga.

Le informazioni relative a community, jam e corsi possono essere aggiornate o modificate nel tempo. Per informazioni sul trattamento dei dati e sulle condizioni di utilizzo sono disponibili la Privacy Policy e i Termini di utilizzo del progetto.

## Autore

Creato da **Jacopo Nesti**