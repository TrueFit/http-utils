import {identity, consumer} from './constants';

// internal api
export const baseConfiguration = null;

// public api
export const configureHttp = ({
  baseConfig = {},
  transformConfig = identity,

  baseHeaders = {},
  transformHeaders = identity,

  configureInstance = consumer,
}) => {
  baseConfiguration.baseConfig = baseConfig;
  baseConfiguration.transformConfig = transformConfig;

  baseConfiguration.baseHeaders = baseHeaders;
  baseConfiguration.transformHeaders = transformHeaders;

  baseConfiguration.configureInstance = configureInstance;
};
