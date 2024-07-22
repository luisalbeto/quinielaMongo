import { MatchesResult } from "../components/MatchesResult";



export default async function Page() {


    return (
        <main>
        <section className="flex flex-col items-center text-center">
            {/* Hero Section with Title */}
        <h1 className="text-6xl font-bold text-black">Resultados</h1>
        <p className="mt-4 text-2xl text-black">Mira aqui los Resultados de la Copa America</p>       
        </section>
        <MatchesResult/>
        </main>

    )



}
