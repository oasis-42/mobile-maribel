import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://api.maribel.cloud',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const authData = await AsyncStorage.getItem('auth');

  if (authData) {
    const auth = JSON.parse(authData);
    const updatedAt = new Date(auth.updatedAt);
    const now = new Date();

    if ((now.getTime() - updatedAt.getTime()) / 1000 > 300) {
      const response = await axios.post('https://api.maribel.cloud/api/auth/jwt/refresh/', {
        refresh: auth.refreshToken,
      });

      const { access: newAccessToken, refresh: newRefreshToken } = response.data;

      await AsyncStorage.setItem('auth', JSON.stringify({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        updatedAt: new Date(),
      }));

      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
