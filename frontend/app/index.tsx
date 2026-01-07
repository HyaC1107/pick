import { Redirect } from 'expo-router';

export default function Index() {
  // 사이트 오자마자 바로 /login 주소로 던져버려요! ㅎㅎ
  return <Redirect href="/login" />;
}