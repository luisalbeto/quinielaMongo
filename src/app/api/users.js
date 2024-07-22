import connectDB from '@/libs/mongodb';
import User from '@/models/users';

export default async function handler(req, res) {
    await connectDB();
  
    if (req.method === 'GET') {
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }