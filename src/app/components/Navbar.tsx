import Link from "next/link";
import { Logo } from "./Logo";


const navItems = [
  {path: '/dashboard', text: 'Home'},
  {path: '/groups', text: 'Fase Final'},
  {path: '/results', text: 'Resultados'},
  {path: '/ranking', text: 'Ranking'},
]


export const Nav = () => {
  return (
<div className="w-full bg-gradient-to-b from-blue/90 to-sky">
  <div className="py-5 border-b-[5]">
    <div className="flex flex-row items-center justify-between gap-8 md:gap-0">
      <div className="flex-none">
        <Logo />
      </div>
      <div className="hidden md:flex flex-row gap-8 w-full justify-center text-2xl hover:text-turquesa transition-colors text-purple font-extrabold">
        Quiniela Copa America 2024 Crazy Imagine
      </div>
      <div className="hidden md:flex flex-row gap-4 w-full justify-center">
        { navItems.map( navItem => (
          <Link key={navItem.path} className="mr-2 font-bold text-xl text-purple hover:text-turquesa transition-colors" href={navItem.path}>{navItem.text}</Link>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};