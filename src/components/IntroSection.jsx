function IntroSection () {

    const scrollToMap = (e) => {
        e.preventDefault()
        const mapElement = document.getElementById('mappa')
        if (mapElement) {
            mapElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
            })
        }
    }

    return (
        <div className="container">
            <h1 className="display-4 fw-bold text-dark mb-3">
            Trova la tua community di Acroyoga
            </h1>

            <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: '700px' }}>
            AcroMap Italy raccoglie le community italiane di Acroyoga. Clicca un marker sulla mappa oppure cerca la tua città per trovare allenamenti, jam e corsi.
            </p>

            <a href="#mappa" onClick={scrollToMap} className="btn btn-success btn-lg fw-semibold shadow-sm">
            Esplora la Mappa
            </a>
        </div>
    )
}

export default IntroSection