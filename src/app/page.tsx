import Link from "next/link";

export default function Home() {
  return (
<main>
  <section className="flex flex-col items-center text-center">
  <h1 className="text-4xl font-bold text-center mt-20 text-black">Quiniela Copa América 2024</h1>
  </section>
    <div className="mt-4 flex space-x-4 justify-center">
        <button className="bg-blue hover:bg-turquesa text-white font-bold py-2 px-4 rounded">
            <Link href="/login">Login</Link>
        </button>
        <button className="bg-blue hover:bg-turquesa text-white font-bold py-2 px-4 rounded">
            <Link href="/register">Registro</Link>
        </button>
    </div>
</main>
  );
}
