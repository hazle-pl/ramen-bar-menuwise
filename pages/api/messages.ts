import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '@/lib/mongodb';
import Message from '@/models/Message';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDatabase();

  if (req.method === 'POST') {
    try {
      console.log('Received message:', req.body);
      const message = await Message.create(req.body);
      return res.status(201).json(message);
    } catch (error) {
      console.error('Error adding message:', error);
      return res.status(500).json({ message: 'Error adding message', error });
    }
  }

  if (req.method === 'GET') {
    try {
      const messages = await Message.find();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ message: 'Error fetching messages', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
