import { connectDB } from "@/libs/mongodb";
import Prediction from "@/models/predictions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();

  try {
    const data = await request.json();
    const { userId, localteam, awayteam, scoreLocalteam, scoreAwayteam } = data;

    // Validar los datos recibidos
    if (!userId || !localteam || !awayteam || scoreLocalteam === undefined || scoreAwayteam === undefined) {
      return new NextResponse(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Verificar si ya existe una predicción para este usuario y partido
    const existingPrediction = await Prediction.findOne({ userId, localteam, awayteam }).exec();

    if (existingPrediction) {
      return new NextResponse(JSON.stringify({ message: "Prediction already exists for this match" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Crear y guardar la nueva predicción
    const newScore = new Prediction({
      userId,
      localteam,
      awayteam,
      scoreLocalteam,
      scoreAwayteam,
    });

    await newScore.save();

    return new NextResponse(JSON.stringify({ message: "Marcador guardado exitosamente" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error saving prediction:", error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
