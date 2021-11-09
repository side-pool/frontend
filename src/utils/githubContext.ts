import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultOption = {
  headers: {
    // TODO: 환경변수 등록 <= 근데 안할듯..
    Authorization: `token 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`,
  },
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);

  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);

  return Promise.reject(error);
};

export const getGithubApiInstance = () => {
  const axiosInstance = axios.create(defaultOption);

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
