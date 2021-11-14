import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { loadItem, ACCESS_TOKEN } from '@src/utils/storage';
import qs from 'qs';
import { NODE_ENV } from '@src/utils/NODE_ENV_TYPE';

// 네트워크 요청, 응답 로그
export const LOG_TOGGLE = true;
export const SERVER_URL =
  NODE_ENV === 'product'
    ? process.env.PAASTA_SERVER_URL
    : process.env.LOCAL_SERVER_URL;

const defaultOption = {
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
};

/**
 *
 * Check if there's an access token and put it in the header
 */
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  LOG_TOGGLE && console.info(`[request] [${JSON.stringify(config)}]`);

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
  LOG_TOGGLE && console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  LOG_TOGGLE && console.info(`[response] [${JSON.stringify(response)}]`);

  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  LOG_TOGGLE && console.error(`[response error] [${JSON.stringify(error)}]`);

  return Promise.reject(error);
};

// TODO: Response Promise generic type 지정 필요
export const getApiInstance = () => {
  const axiosInstance = axios.create(defaultOption);

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  axiosInstance.defaults.paramsSerializer = function (paramObj) {
    return qs.stringify(paramObj, { arrayFormat: 'repeat' });
  };

  return axiosInstance;
};
