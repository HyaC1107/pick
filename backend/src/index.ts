import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pick_database';
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Compass와 연결될 준비 완료! (pick_database)');
  })
  .catch((err) => {
    console.error('❌ DB 연결 실패 ㅠㅠ 에러 내용:', err);
  });


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 인테리어 중개 플랫폼 TS 서버 작동 중! (장철영 관리자님 화이팅!)');
});

app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  http://localhost:${PORT}
  ################################################
  `);
});