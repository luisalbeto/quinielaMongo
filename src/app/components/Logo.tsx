import Image from "next/image";

export const Logo = () => {
  return (
    <div className="cursor-pointer">
        <Image
      className="w-100 h-100"
      src="/copalogo.svg"  // Ruta relativa a la carpeta 'public'
      alt="Logo"
      height={100}
      width={100}

    />

    </div>
  
  );
};