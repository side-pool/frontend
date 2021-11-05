import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { loadItem, ACCESS_TOKEN } from '@src/utils/storage';
import qs from 'qs';

export const SERVER_URL = 'http://13.209.171.179:80/api';

const defaultOption = {
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
};

/**
 *
 * Check if there's an access token and put it in the header
 */
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);

  const token = loadItem(ACCESS_TOKEN) ?? null;

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

function onResponse(response: AxiosResponse): AxiosResponse {
  console.info(`[response] [${JSON.stringify(response)}]`);

  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);

  return Promise.reject(error);
};

// TODO: Response Promise generic type 지정 필요
export function getApiInstance() {
  const axiosInstance = axios.create(defaultOption);

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  axiosInstance.defaults.paramsSerializer = function (paramObj) {
    return qs.stringify(paramObj, { arrayFormat: 'repeat' });
  };

  return axiosInstance;
}
