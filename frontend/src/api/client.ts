import axios from 'axios';

const client = axios.create({
  // ⚠️ 중요: 관리자님 컴퓨터의 IPv4 주소를 넣으세요! (예: 192.168.x.x)
  baseURL: 'http://192.168.219.80:5000/api', 
  timeout: 5000,
});

export default client;