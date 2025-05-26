import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  name: string;
  website: string;
  type: string;
  status: string;
  amount: number;
  email: string;
  password: string;
  note: string;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: false },
  website: { type: String, required: false },
  type: { type: String, required: false },
  status: { type: String, required: false },
  amount: { type: Number, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  note: { type: String, required: false },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);