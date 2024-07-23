"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signin() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) return router.push("/dashboard");
  };

  return (
    <div className="justify-center flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-purple px-8 py-10 w-full rounded"
      >
        {error && <div className="bg-red text-black p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-white">Login</h1>

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
          placeholder="Password"
          className="bg-sky px-4 py-2 block mb-2 w-full rounded text-black"
          name="password"
        />

        <button className="bg-blue text-white px-4 py-2 block w-full mt-4 rounded">
          Inicia Sesion
        </button>
      </form>
    </div>
  );
}

export default Signin;