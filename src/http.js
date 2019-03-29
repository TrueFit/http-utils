import axios from 'axios';
import {baseConfiguration} from './configure';
import {identity} from './constants';

// axios base config
const createRequest = url => {
  const {
    baseConfig,
    transformConfig,
    baseHeaders,
    transformHeaders,
    configureInstance,
  } = baseConfiguration;

  const headers = transformHeaders(baseHeaders, url);
  const config = transformConfig(
    {
      ...baseConfig,
      headers,
    },
    url
  );

  const instance = axios.create(config);
  configureInstance(instance, url);

  return instance;
};

// public api
export const request = (url, configure = identity) =>
  createRequest(url)(configure({url}));

export const get = (url, configure = identity) =>
  createRequest(url).get(url, configure({}));

export const post = (url, data, configure = identity) =>
  createRequest(url).post(url, data, configure({}));

export const patch = (url, data, configure = identity) =>
  createRequest(url).patch(url, data, configure({}));

export const put = (url, data, configure = identity) =>
  createRequest(url).put(url, data, configure({}));

export const del = (url, configure = identity) =>
  createRequest(url).delete(url, configure({}));
