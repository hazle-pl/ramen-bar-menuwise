import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDatabase();

  if (req.method === 'POST') {
    try {
      console.log('Received data:', req.body);
      const project = await Project.create(req.body);
      return res.status(201).json(project);
    } catch (error) {
      console.error('Error adding project:', error);
      return res.status(500).json({ message: 'Error adding project', error });
    }
  }

  if (req.method === 'GET') {
    try {
      const projects = await Project.find();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ message: 'Error fetching projects', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
