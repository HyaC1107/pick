// app/_layout.tsx

import { useEffect } from 'react';
import { useRouter, useSegments, Slot } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  // useEffect(() => {
  //   const checkLogin = async () => {
  //       const token = await AsyncStorage.getItem('userToken');
        
  //       // 💡 (segments as any)를 써서 빨간 줄을 싹 지워요! ㅎㅎ
  //       const segs = segments as any;
  //       const currentPath = segs[0] || ''; 
        
  //       // index 페이지거나 경로가 없을 때를 로그인 페이지로 봐요
  //       const isLoginPage = currentPath === '' || currentPath === 'index' || currentPath === '(tabs)';
  //       const isSignUpPage = currentPath === 'signup';

  //       if (!token) {
  //         // 토큰 없는데 로그인/회원가입도 아니라면? -> 로그인(/)으로 가!
  //         if (!isLoginPage && !isSignUpPage) {
  //           router.replace('/' as any); 
  //         }
  //       } else {
  //         // 토큰 있는데 로그인/회원가입창이면? -> 메인으로 가!
  //         if (isLoginPage || isSignUpPage) {
  //           router.replace('/main' as any);
  //         }
  //       }
  //     };

  //     checkLogin();
  // }, [segments]);

  return <Slot />;
}