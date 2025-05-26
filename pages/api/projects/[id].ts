import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDatabase();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating project' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting project' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
