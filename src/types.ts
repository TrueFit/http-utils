/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosRequestConfig, AxiosInstance} from 'axios';

export type ConfigureInstanceRequest = (requestConfig: AxiosRequestConfig) => AxiosRequestConfig;

export type Configuration = {
  baseConfig?: AxiosRequestConfig;
  transformConfig?: (config: AxiosRequestConfig, url?: string) => AxiosRequestConfig;

  baseHeaders?: any;
  transformHeaders?: (headers: any, url?: string) => any;

  configureInstance?: (instance: AxiosInstance, url?: string) => void;
};
