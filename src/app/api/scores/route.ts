import { connectDB } from "@/libs/mongodb";
import Prediction from "@/models/predictions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();

  try {
    const data = await request.json();

    const newScore = new Prediction({
      userId: data.userId,
      localteam: data.localteam,
      awayteam: data.awayteam,
      scoreLocalteam: data.scoreLocalteam,
      scoreAwayteam: data.scoreAwayteam,
    });

    await newScore.save();

    return new NextResponse(JSON.stringify({ message: "Marcador guardado exitosamente" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}