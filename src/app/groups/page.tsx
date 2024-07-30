import { MatchesPrediction } from "../components/MatchesPrediction";



export default async function Page() {


    return (
        <main>
        <section className="flex flex-col items-center text-center">
            {/* Hero Section with Title */}
        <h1 className="text-6xl font-bold text-black">Predicciones</h1>
        <p className="mt-4 text-2xl text-black">Predice los resultados de la Copa y finje sorpresa</p>       
        </section>
        <h1 className="text-6xl font-bold text-black">Final</h1>

        <MatchesPrediction matchDay={1}/>
        <h1 className="text-6xl font-bold text-black">3er Lugar</h1>

        <MatchesPrediction matchDay={2}/>
        <h1 className="text-6xl font-bold text-black">Semifinales</h1>
       
        <MatchesPrediction matchDay={3}/>
        <h1 className="text-6xl font-bold text-black">Cuartos de Final</h1>

        <MatchesPrediction matchDay={4}/>
        </main>
    )



}
