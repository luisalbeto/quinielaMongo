import React from "react";
import UserPredictions from "./components/UserPredictions";


export default async function Page() {
	return (
		<div>
			<div className="container mx-auto px-4">			
			<h1 className="text-3xl font-bold text-center my-8 text-black">Mis Predicciones</h1>
			<UserPredictions/>
			</div>

		</div>
	);
}
