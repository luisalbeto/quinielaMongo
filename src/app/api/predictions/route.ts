// /pages/api/predictions.ts
import { NextResponse } from 'next/server';  
import {connectDB} from '@/libs/mongodb';
import Prediction from '@/models/predictions';

export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const predictions = await Prediction.find({ userId }).exec();
    return NextResponse.json(predictions, { status: 200 });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return NextResponse.json({ message: 'Error fetching predictions', error }, { status: 500 });
  }
}
