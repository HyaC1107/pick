import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function MainScreen() {
  const router = useRouter();

  // 테스트용 카테고리 데이터
  const categories = [
    { id: 1, name: '철거', icon: '🔨' },
    { id: 2, name: '전기', icon: '💡' },
    { id: 3, name: '도배', icon: '📜' },
    { id: 4, name: '바닥', icon: '🪵' },
    { id: 5, name: '욕실', icon: '🛁' },
    { id: 6, name: '주방', icon: '🍳' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 1. 상단 헤더 */}
        <View style={styles.header}>
          <Text style={styles.logo}>PICK</Text>
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        {/* 2. 환영 문구 */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>장철영 관리자님, 👋</Text>
          <Text style={styles.welcomeSub}>오늘은 어떤 인테리어를 계획하시나요?</Text>
        </View>

        {/* 3. 진행 중인 공정 (관리자님이 강조하신 단계별 흐름!) */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>현재 진행 상황 🏗️</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressInner, { width: '33%' }]} />
          </View>
          <Text style={styles.progressText}>[철거] 업체 상담 중입니다. ㅎㅎ</Text>
        </View>

        {/* 4. 카테고리 선택 (그리드 레이아웃) */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>시공 카테고리</Text>
          <View style={styles.categoryGrid}>
            {categories.map((item) => (
              <TouchableOpacity key={item.id} style={styles.categoryItem} onPress={() => alert(`${item.name} 업체 리스트로 이동!`)}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 24, fontWeight: '900', color: '#4CAF50' },
  logoutText: { color: '#888', fontSize: 14 },
  welcomeBox: { padding: 25 },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  welcomeSub: { fontSize: 16, color: '#666', marginTop: 5 },
  statusCard: { margin: 20, padding: 20, backgroundColor: '#fff', borderRadius: 15, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginBottom: 10 },
  progressInner: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 4 },
  progressText: { fontSize: 14, color: '#4CAF50', fontWeight: '600' },
  categoryContainer: { padding: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: { width: '30%', backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 2 },
  categoryIcon: { fontSize: 30, marginBottom: 8 },
  categoryName: { fontSize: 14, fontWeight: '500', color: '#444' },
});