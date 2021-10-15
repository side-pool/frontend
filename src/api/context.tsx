import axios, { AxiosRequestConfig } from 'axios';

import { loadItem, ACCESS_TOKEN } from '@src/utils/storage';

export const SERVER_URL = 'http://13.209.171.179:80';

const api = axios.create({
  baseURL: SERVER_URL,
});

api.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    const token = await loadItem(ACCESS_TOKEN);

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
