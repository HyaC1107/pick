import { Request, Response } from 'express';
import User from '../models/User';

// 회원가입
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, role } = req.body;

    // 중복 확인
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "이미 있는 이메일이에요! ㅎㅎ" });

    // 유저 저장
    const user = await User.create({ email, password, name, phone, role });
    res.status(201).json({ message: "회원가입 성공!", user: { id: user._id, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: "회원가입 중 에러 발생 ㅠㅠ", error });
  }
};

// 로그인
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) { // 실제론 암호화 비교 필수!
      res.status(200).json({ message: `${user.name}님 환영합니다!`, role: user.role });
    } else {
      res.status(401).json({ message: "이메일이나 비밀번호가 틀렸어요!" });
    }
  } catch (error) {
    res.status(500).json({ message: "로그인 중 에러 발생 ㅠㅠ" });
  }
};