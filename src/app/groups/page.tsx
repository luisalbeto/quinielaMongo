import { MatchesPrediction } from "../components/MatchesPrediction";



export default async function Page() {


    return (
        <main>
        <section className="flex flex-col items-center text-center">
            {/* Hero Section with Title */}
        <h1 className="text-6xl font-bold text-black">Predicciones</h1>
        <p className="mt-4 text-2xl text-black">Predice los resultados de la Copa y finje sorpresa</p>       
        </section>
        <MatchesPrediction matchDay={1}/>
        <MatchesPrediction matchDay={2}/>
        <MatchesPrediction matchDay={3}/>
        <MatchesPrediction matchDay={4}/>
        </main>
    )



}
