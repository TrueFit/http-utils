import {Configuration} from './types';
import {identity, consumer} from './util';

// this is the singleton shared configuration the library uses to generate instances
export const sharedConfig: Configuration = {};

export default (config: Configuration): void => {
  sharedConfig.baseConfig = config.baseConfig ?? {};
  sharedConfig.transformConfig = config.transformConfig ?? identity;

  sharedConfig.baseHeaders = config.baseHeaders ?? {};
  sharedConfig.transformHeaders = config.transformHeaders ?? identity;

  sharedConfig.configureInstance = config.configureInstance ?? consumer;
};
