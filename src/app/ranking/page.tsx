import React from "react";
import UsersList from "./components/UserRanking";


export default async function Page() {


	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-b from-sky to-white overflow-hidden">
			<div className="container mx-auto px-4">			
			<h1 className="text-3xl font-bold text-center my-8">Tabla de Posiciones</h1>
			<UsersList/>

	</div>

		</div>
	);
}
