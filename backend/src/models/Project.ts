import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  customerId: mongoose.Types.ObjectId;
  title: string;
  categories: string[]; // ['철거', '전기', '도배'] 유저가 고른 목록
  address: string;
  totalStatus: 'ready' | 'progressing' | 'completed';
  startDate?: Date;
}

const ProjectSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  categories: [{ type: String }], // 유저가 선택한 공정들
  address: { type: String, required: true },
  totalStatus: { type: String, enum: ['ready', 'progressing', 'completed'], default: 'ready' },
  startDate: Date
});

export default mongoose.model<IProject>('Project', ProjectSchema);