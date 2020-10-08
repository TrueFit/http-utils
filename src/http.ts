/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {sharedConfig} from './configure';
import {identity} from './util';
import {ConfigureInstanceRequest} from './types';

// shared creation flow
export const createAxiosInstance = (url: string): AxiosInstance => {
  const {
    baseConfig,
    transformConfig,
    baseHeaders,
    transformHeaders,
    configureInstance,
  } = sharedConfig;

  const headers = transformHeaders(baseHeaders, url);
  const config = transformConfig(
    {
      ...baseConfig,
      headers,
    },
    url,
  );

  const instance = axios.create(config);
  configureInstance(instance, url);

  return instance;
};

// utility functions
export const request = <T = any>(
  url: string,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise<T> => createAxiosInstance(url)(configure({}));

export const get = <T = any>(
  url: string,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise<T> => createAxiosInstance(url).get(url, configure({}));

export const post = <T = any>(
  url: string,
  data: any,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise<T> => createAxiosInstance(url).post(url, data, configure({}));

export const patch = <T = any>(
  url: string,
  data: any,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise<T> => createAxiosInstance(url).patch(url, data, configure({}));

export const put = <T = any>(
  url: string,
  data: any,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise<T> => createAxiosInstance(url).put(url, data, configure({}));

export const del = <T = any>(
  url: string,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise<T> => createAxiosInstance(url).delete(url, configure({}));
