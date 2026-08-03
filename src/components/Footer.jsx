function Footer() {
  return (
    <footer className="bg-dark text-light d-flex flex-wrap justify-content-between p-4 mt-4">
      <div>
        <h3>AcroMap Italy</h3>
        <p className="mb-0">&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
      </div>

      <div>
        <h4>Contatti</h4>
        <p className="mb-1">Email: jacopo@jacopo.it</p>
        <p className="mb-0">Telefono: +39 000 000 0000</p>
      </div>
    </footer>
  )
}

export default Footer