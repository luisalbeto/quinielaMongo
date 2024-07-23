'use client'
import { signOut } from 'next-auth/react';

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <button className='bg-blue text-white px-4 py-2 block w-40 mt-4 rounded' onClick={handleSignOut}>
      Cerrar Sesión
    </button>
  );
};

export default SignOut;