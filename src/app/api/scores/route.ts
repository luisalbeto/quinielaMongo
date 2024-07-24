import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/libs/mongodb"

import Score from '@/models/scores';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const scores = await Score.find({});
      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching scores', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
