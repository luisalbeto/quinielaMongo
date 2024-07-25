import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
        <Image
      src="/copalogo.svg"  // Ruta relativa a la carpeta 'public'
      alt="Logo"
      height={100}
      width={100}

    />

    </Link>
  
  );
};