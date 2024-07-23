import React from "react";
import UsersList from "./components/UserRanking";


export default async function Page() {
	return (
		<div>
			<div className="container mx-auto px-4">			
			<h1 className="text-3xl font-bold text-center my-8 text-black">Tabla de Posiciones</h1>
			<UsersList/>
			</div>

		</div>
	);
}
