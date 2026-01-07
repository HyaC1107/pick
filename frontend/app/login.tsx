import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// 💡 백엔드 서버 주소 (관리자님 PC의 IP 주소로 꼭 바꿔주세요!)
const API_URL = 'http://192.168.219.80:5000/api'; 

export default function LoginPage() {
  const router = useRouter();
  
  // 상태 관리
  const [loginType, setLoginType] = useState<'user' | 'partner'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  // 🚀 로그인 실행 함수
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 모두 입력해주세요! ㅎㅎ');
      return;
    }
    console.log("버튼 눌림! 이메일:", email); // 1. 버튼 작동 확인
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        role: loginType === 'user' ? 'customer' : 'contractor', // 단순 테스트용 구분
      });

      if (response.status === 200) {
        // 자동 로그인 체크했다면 토큰 저장!
        if (autoLogin) {
          await AsyncStorage.setItem('userToken', 'test-token-value'); // 나중에 실제 JWT로 교체
        }
        
        Alert.alert('성공', `${response.data.message || '반가워요! ✨'}`);
        router.replace('/main' as any);// 메인 페이지로 이동
      }
    } catch (error: any) {
      console.error('로그인 에러:', error);
      const errorMsg = error.response?.data?.message || '로그인 서버가 응답하지 않아요. ㅠㅠ';
      Alert.alert('로그인 실패', errorMsg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.loginBox}>
        {/* 로고 영역 */}
        <Text style={styles.logo}>PICK</Text>
        <Text style={styles.subTitle}>인테리어의 시작, 픽! 🌿</Text>
        
        {/* 1. 로그인 타입 선택 (초록색 포인트!) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, loginType === 'user' && styles.activeTab]}
            onPress={() => setLoginType('user')}
          >
            <Text style={[styles.tabText, loginType === 'user' && styles.activeTabText]}>일반 회원</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, loginType === 'partner' && styles.activeTab]}
            onPress={() => setLoginType('partner')}
          >
            <Text style={[styles.tabText, loginType === 'partner' && styles.activeTabText]}>파트너 업체</Text>
          </TouchableOpacity>
        </View>

        {/* 2. 입력 폼 */}
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="이메일 주소" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input} 
            placeholder="비밀번호" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
          />
        </View>

        {/* 3. 유틸리티 (자동로그인 & 찾기) */}
        <View style={styles.utilContainer}>
          <TouchableOpacity 
            onPress={() => setAutoLogin(!autoLogin)} 
            style={styles.row}
          >
            <Text style={{color: autoLogin ? '#4CAF50' : '#ccc', fontSize: 18, marginRight: 5}}>
              {autoLogin ? '✅' : '⬜'}
            </Text>
            <Text style={styles.utilText}>자동 로그인</Text>
          </TouchableOpacity>
          
          <View style={styles.row}>
            <TouchableOpacity><Text style={styles.utilText}>아이디</Text></TouchableOpacity>
            <Text style={styles.divider}>/</Text>
            <TouchableOpacity><Text style={styles.utilText}>비밀번호 찾기</Text></TouchableOpacity>
          </View>
        </View>

        {/* 4. 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        {/* 5. 회원가입 유도 */}
        <TouchableOpacity 
            style={styles.signUpButton} 
            onPress={() =>{ 
                console.log("회원가입 버튼 눌림! 🚀");
                router.push('/signup');
            }} 
        >
          <Text style={styles.signUpText}>
            아직 계정이 없으신가요? <Text style={styles.signUpLink}>회원가입</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F5F7F5', justifyContent: 'center', alignItems: 'center', padding: 20 },
  loginBox: { width: '100%', maxWidth: 450, padding: 30, backgroundColor: '#fff', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 },
  logo: { fontSize: 48, fontWeight: '900', color: '#4CAF50', textAlign: 'center' },
  subTitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 30 },
  tabContainer: { flexDirection: 'row', marginBottom: 25, backgroundColor: '#F0F0F0', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabText: { color: '#888', fontWeight: '600' },
  activeTabText: { color: '#4CAF50', fontWeight: 'bold' },
  inputContainer: { marginBottom: 15 },
  input: { backgroundColor: '#f9f9f9', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee', fontSize: 15 },
  utilContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  utilText: { fontSize: 13, color: '#666' },
  divider: { marginHorizontal: 5, color: '#ccc' },
  loginButton: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 12, alignItems: 'center', elevation: 2 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signUpButton: { marginTop: 25, alignItems: 'center' },
  signUpText: { color: '#888', fontSize: 14 },
  signUpLink: { color: '#4CAF50', fontWeight: 'bold', textDecorationLine: 'underline' }
});