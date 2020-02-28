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
export const request = (
  url: string,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise => createAxiosInstance(url)(configure({}));

export const get = (url: string, configure: ConfigureInstanceRequest = identity): AxiosPromise =>
  createAxiosInstance(url).get(url, configure({}));

export const post = (
  url: string,
  data: any,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise => createAxiosInstance(url).post(url, data, configure({}));

export const patch = (
  url: string,
  data: any,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise => createAxiosInstance(url).patch(url, data, configure({}));

export const put = (
  url: string,
  data: any,
  configure: ConfigureInstanceRequest = identity,
): AxiosPromise => createAxiosInstance(url).put(url, data, configure({}));

export const del = (url: string, configure: ConfigureInstanceRequest = identity): AxiosPromise =>
  createAxiosInstance(url).delete(url, configure({}));
