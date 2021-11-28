import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LOG_TOGGLE } from './context';

const defaultOption = {
  headers: {
    // TODO: 환경변수 등록 <= 근데 안할듯..
    Authorization: process.env.GH_TOKEN || '',
  },
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  LOG_TOGGLE && console.info(`[request] [${JSON.stringify(config)}]`);

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

export const getGithubApiInstance = () => {
  const axiosInstance = axios.create(defaultOption);

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
