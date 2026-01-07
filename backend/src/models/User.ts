import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; 
  role: 'customer' | 'contractor' | 'equipment';
  phone: string;
  // 파트너(시공/중장비) 전용 필드
  businessInfo?: {
    businessNumber: string; // 사업자번호 (API 확인용)
    licenses: string[]; // 자격증 이미지 URL
    equipmentImages?: string[]; // 중장비 업체 전용 사진
    isVerified: boolean; // 인증 완료 여부
  };
  stats: {
    likeCount: number;
    reviewCount: number;
    contractCount: number; // 실계약 건수
  };
  createdAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ['customer', 'contractor', 'equipment'], required: true },
  phone: { type: String, required: true },
  businessInfo: {
    businessNumber: String,
    licenses: [String],
    equipmentImages: [String],
    isVerified: { type: Boolean, default: false }
  },
  stats: {
    likeCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    contractCount: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);