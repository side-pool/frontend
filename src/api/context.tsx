import axios, { AxiosRequestConfig } from 'axios';

import { loadItem, ACCESS_TOKEN } from '@src/utils/storage';

export const SERVER_URL = 'http://13.209.171.179:80';

const api = axios.create({
  baseURL: SERVER_URL,
});

api.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    const token = await loadItem(ACCESS_TOKEN);

    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers':
        'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    };

    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
