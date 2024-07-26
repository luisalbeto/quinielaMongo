"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/singup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/login");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="justify-center flex flex-col items-center">
      <form onSubmit={handleSubmit} className="bg-purple px-8 py-10 w-full rounded mb-4">
        {error && <div className="bg-red rounded text-black p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-white">Registro</h1>

        <label className="text-white">Usuario:</label>
        <input
          type="text"
          placeholder="Fullname"
          className="bg-sky px-4 py-2 block mb-2 w-full rounded text-black"
          name="fullname"
        />

        <label className="text-white">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="bg-sky px-4 py-2 block mb-2 w-full rounded text-black"
          name="email"
        />

        <label className="text-white">Password:</label>
        <input
          type="password"
          placeholder="******"
          className="bg-sky px-4 py-2 block mb-2 w-full rounded text-black"
          name="password"
        />

        <button className="bg-blue text-white px-4 py-2 block w-full mt-4 rounded">
          Registrate
        </button>
      </form>
      <div className="justify-center flex flex-col items-center w-full">
    <p className="text-black">Ya Tienes una Cuenta?</p>
    <button className="bg-blue text-white px-4 py-2 block w-full rounded">
      <Link href='/login'>
      Inicia Sesión
      </Link>
    </button>
  </div>
    </div>
  );
}

export default Signup;