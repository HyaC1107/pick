import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

// 💡 백엔드 주소 (관리자님 PC IP로 수정 필수!)
const API_URL = 'http://192.168.219.80:5000/api'; 

export default function SignUpPage() {
  const router = useRouter();
  
  // 입력 상태 관리
  const [role, setRole] = useState<'customer' | 'contractor' | 'equipment'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 🚀 회원가입 전송 함수
  const handleSignUp = async () => {
    if (!email || !password || !name || !phone) {
      Alert.alert('알림', '모든 항목을 입력해주세요! ㅎㅎ');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
        phone,
        role
      });

      if (response.status === 201) {
        Alert.alert('성공', '회원가입이 완료되었습니다! 로그인해주세요. ✨');
        router.replace('/'); // 로그인(index) 페이지로 이동!
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || '가입 중 에러가 발생했어요.';
      Alert.alert('실패', msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>PICK 파트너 되기 🌿</Text>

        {/* 타입 선택 탭 */}
        <View style={styles.tabContainer}>
          {(['customer', 'contractor', 'equipment'] as const).map((r) => (
            <TouchableOpacity 
              key={r}
              style={[styles.tab, role === r && styles.activeTab]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.tabText, role === r && styles.activeTabText]}>
                {r === 'customer' ? '일반' : r === 'contractor' ? '시공' : '장비'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 입력 필드들 */}
        <TextInput style={styles.input} placeholder="이메일 주소" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="이름 (또는 상호명)" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="연락처 (010-0000-0000)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
          <Text style={styles.submitButtonText}>가입 완료하기 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>이미 계정이 있나요? 로그인하러 가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F5F7F5', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 450, padding: 30, backgroundColor: '#fff', borderRadius: 20, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 25 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 10, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabText: { color: '#888', fontWeight: '600', fontSize: 13 },
  activeTabText: { color: '#4CAF50' },
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  submitButton: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#888', fontSize: 14, textDecorationLine: 'underline' }
});