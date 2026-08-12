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
        <div className="container text-center">
            <h1 className="display-4 fw-bold text-dark mb-3">
            Trova la tua community di Acroyoga
            </h1>

            <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: '700px' }}>
            Scopri jam, corsi e gruppi di Acroyoga attivi in tutta Italia
            </p>

            {/* <a href="#mappa" onClick={scrollToMap} className="btn btn-success btn-lg fw-semibold shadow-sm">
            Esplora la Mappa
            </a> */}

        </div>
    )
}

export default IntroSection