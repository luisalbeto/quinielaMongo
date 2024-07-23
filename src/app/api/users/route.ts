import { connectDB } from "@/libs/mongodb"
import User from '@/models/user';

export async function GET() {
  await connectDB();

  try {
    const users = await User.find({});
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}