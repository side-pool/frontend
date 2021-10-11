import axios, { AxiosRequestConfig } from 'axios';

import { loadItem, ACCESS_TOKEN } from '@src/utils/storage';

export const SERVER_URL = 'http://demo4261295.mockable.io/';

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

// TODO: 리프레시 토큰 적용시 사용

// export const assignDefaultAuthToken = (token: string) => {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequestConfig = error?.config;

//     if (!error.response) {
//       console.error(error);
//     }

//     if (error.response.status === 403 && !originalRequestConfig._retry) {
//       originalRequestConfig._retry = true;

//       const refreshToken = await loadItem(REFRESH_TOKEN);

//       return api
//         .post('/refresh-token', {
//           refreshToken,
//         })
//         .then(
//           async (
//             postResponse: AxiosResponse<{
//               token?: string;
//               refreshToken: string | null;
//             }>,
//           ): Promise<AxiosPromise<AxiosRequestConfig> | undefined> => {
//             if (postResponse?.status !== 200) {
//               return undefined;
//             }

//             const newToken = postResponse?.data?.token;
//             const newRefreshToken = postResponse?.data?.refreshToken;

//             if (newToken) {
//               await saveItem(ACCESS_TOKEN, newToken);
//               await saveItem(REFRESH_TOKEN, newRefreshToken ?? '');

//               assignDefaultAuthToken(newToken);
//             }

//             return api(originalRequestConfig);
//           },
//         );
//     }

//     return Promise.reject(error);
//   },
// );

export default api;
