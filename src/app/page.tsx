import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<main>
    <div className="text-center">
      <h1 className="text-4xl font-bold text-black mb-4">Bienvenido a la Copa América 2024</h1>
      <p className="text-lg text-black">Disfruta de la emoción del fútbol sudamericano.</p>
    </div>
    
    <div className="mt-4 flex space-x-4 justify-center">
      <button className="bg-blue hover:bg-turquesa text-white font-bold py-2 px-4 rounded">
          <Link href="/login">Inicia Sesion</Link>
      </button>
      <button className="bg-blue hover:bg-turquesa text-white font-bold py-2 px-4 rounded">
          <Link href="/register">Registro</Link>
      </button>
    </div>
 

    <div className="mt-8">
      <img src="https://via.placeholder.com/800x400" alt="Copa América" className="w-full rounded-lg shadow-md"/>
    </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray/50 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-black mb-2">Últimas Noticias</h2>
        <p className="text-black">Argentina se coronó campeona de la Copa América tras vencer a Colombia en una emocionante final. El partido, disputado con gran intensidad, terminó con un marcador de 1-0 a favor de la Albiceleste. El gol decisivo fue anotado en el minuto 112 de la prorroga por Lautaro Martinez, quien aprovechó una asistencia precisa de Leandro Paredes. Con esta victoria Argentina consigue su segunda copa america consecutiva luego de pasar 28 años sin ganar el torneo, celebrando su título número 16 en la historia de la Copa América convirtiendose en el maximo ganador de este torneo seguido de Uruguay que se queda con 15.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src="https://via.placeholder.com/600x400" alt="Imagen Copa América" className="w-full h-full object-cover"/>
      </div>
    </div>

    <div className="mt-8">
      <h2 className="text-2xl font-bold text-black">Sobre la Copa América</h2>
      <p className="text-black leading-relaxed">
        La Copa América es el principal torneo de selecciones de fútbol de América del Sur. Se realiza cada cuatro años y
        reúne a las mejores selecciones de la región en una competencia llena de pasión y emociones. El torneo
        presenta equipos como Brasil, Argentina, Uruguay y más, compitiendo por el título de campeón sudamericano.
      </p>
    </div>
</main>
  );
}


