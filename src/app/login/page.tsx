"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signin() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      router.replace("/dashboard"); // Use replace instead of push
    }
  };

  return (
    <div className="justify-center flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-purple px-8 py-10 w-full rounded mb-4"
      >
        {error && <div className="bg-red text-black p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-white">Inicia Sesión</h1>

        <label className="text-white">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="bg-sky px-4 py-2 block mb-2 w-full rounded text-black"
          name="email"
          required
        />

        <label className="text-white">Contraseña:</label>
        <input
          type="password"
          placeholder="******"
          className="bg-sky px-4 py-2 block mb-2 w-full rounded text-black"
          name="password"
          required
        />
        <button className="bg-blue text-white px-4 py-2 block w-full mt-4 rounded">
          Inicia Sesion
        </button>
      </form>

      <div className="justify-center flex flex-col items-center w-full">
        <p className="text-black">No Tienes una Cuenta?</p>
        <button className="bg-blue text-white px-4 py-2 block w-full rounded">
          <Link href='/register'>
            Registrate
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Signin;