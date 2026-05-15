import axios from 'axios';

const api = axios.create({
  baseURL: '', // Để trống vì đã có Proxy ở bước 1
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động lấy Token từ localStorage gửi kèm lên Backend
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;