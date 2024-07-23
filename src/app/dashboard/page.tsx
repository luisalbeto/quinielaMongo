import SignOut from "../components/SignOut";

export default function Dashboard() {
  return (
    <main>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="container mx-auto px-4 py-16">
      {/* Hero Section with Title */}
      <section className="flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold text-black">¡Copa América USA 2024!</h1>
        <p className="mt-4 text-2xl text-black">El torneo de fútbol más antiguo del mundo</p>
      </section>
      {/* Historical Paragraphs */}
      <section className="mt-8">
        <h2 className="text-4xl font-semibold text-black">Historia de la Copa América</h2>
        <p className="mt-4 text-2xl text-black">
          La Copa América, oficialmente Campeonato Sudamericano de Fútbol, es el
          torneo de fútbol internacional más antiguo a nivel de selecciones
          nacionales. Se disputa cada cuatro años entre los equipos
          masculinos de las diez asociaciones miembros de la CONMEBOL.
        </p>
        <p className="mt-4 text-2xl text-black">
          La primera edición se celebró en Argentina en 1916 y desde entonces se ha
          jugado en 47 ocasiones, incluyendo la edición extraordinaria de 2016
          para celebrar el centenario del torneo. La selección con más títulos es
          Uruguay y Argentina con 15 seguidos por Brasil que cuenta con 9.
        </p>
      </section>
      <div className="justify-center items-center">
      <section className="mt-8">
        <h2 className="text-4xl font-semibold text-black">Reglamento de la Quiniela</h2>
        <div className="mt-4 text-2xl text-black">
          <li>1-Predecir al Ganador de un Partido +10pts</li>
          <li>2-Predecir al el marcador exacto del Partido +5pts</li>
          <li>3-Predecir la diferencia de goles entre el equipo ganador y el perdedor +5pts</li>
        </div>
        <div className="flex flex-col items-center text-center">
        <SignOut/>
        </div>
      </section>
      </div>
    </div>
      </div>
    </main>
  )
}
