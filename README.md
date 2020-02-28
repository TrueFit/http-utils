# @truefit/http-utils

This library is a lightweight wrapper around [axios](https://github.com/mzabriskie/axios). It provides a set of utility functions to enable making http requests easily.

This library is now written in Typescript and it exports its own types, as well as some common ones from axios for convenience.

## Install

```bash
npm install @truefit/http-utils
```

or

```bash
yarn add @truefit/http-utils
```

## Use

This library is generally meant to be used in client apps (such as website or mobile apps). It makes the assumption of there being a single base api for the app (an assumption that axios clearly can't make). The goal of this decision is to provide syntactic sugar to the developer and readability to code.

It is possible, and sometimes useful, to use this library in node apps as well, but when doing so you need to be mindful of the singleton nature of the base configuration.

## API

As mentioned above, this library makes the assumption that you are building an app around a central api. Given this approach, you need to provide the shared configuration settings on the boot of your app (for example, in a react app, you would typically do it in your index file).

Once this configuration is setup, you can make http calls from any file in the app using this base configuration.

### Configure

| Field             | Type                                                           | Description                                 |
| ----------------- | -------------------------------------------------------------- | ------------------------------------------- |
| baseConfig        | AxiosRequestConfig                                             | shared configuration for all requests       |
| transformConfig   | (config: AxiosRequestConfig, url?: string): AxiosRequestConfig | hook called on creation of each request     |
| baseHeaders       | any                                                            | shared headers to be sent with each request |
| transformHeaders  | (headers: any, url?: string): any                              | hook called on creation of each request     |
| configureInstance | (AxiosInstance, url?: string): void                            | hook called on creation of each request     |

#### Examples

At it's simplest, you just need to supply the baseURL to be used.

```javascript
import {configureHttp} from '@truefit/http-utils';

configureHttp({
  baseConfig: {
    baseURL: 'https://a.domain.com/',
  },
});
```

That said, apps are rarely this simple. Often you will need to provide a piece of data or authentication token that can only be known at runtime. To account for these situations, the configuration properties (full list above), provide hooks that are invoked on the creation of each request.

```javascript
import {configureHttp, AxiosRequestConfig} from '@truefit/http-utils';

configureHttp({
  baseConfig: {
    baseURL: 'https://a.domain.com/',
  },
  transformConfig: (baseConfig: AxiosRequestConfig) => {
    return {
      ...baseConfig
      timeout: 1000,
    };
  },
});
```

### Individual Calls

#### Get

| Parameter | Type                     | Description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| url       | string                   | the relative url for the request                           |
| configure | ConfigureInstanceRequest | hook to provide the configuration for this particular call |

```javascript
import {get} from '@truefit/http-utils';

const response = await get('/users');

const response = await get('/users', () => ({
  headers: {'X-Custom-Header': 'foobar'},
}));
```

#### Post

| Parameter | Type                     | Description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| url       | string                   | the relative url for the request                           |
| data      | any (required)           | the data to use in the body of the request                 |
| configure | ConfigureInstanceRequest | hook to provide the configuration for this particular call |

```javascript
import {post} from '@truefit/http-utils';

const response = await post('/users', {name: 'Jim Bob'});
```

#### Patch

| Parameter | Type                     | Description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| url       | string                   | the relative url for the request                           |
| data      | any (required)           | the data to use in the body of the request                 |
| configure | ConfigureInstanceRequest | hook to provide the configuration for this particular call |

```javascript
import {patch} from '@truefit/http-utils';

const response = await patch('/users', {id: 1, name: 'Jim Bob'});
```

#### Put

| Parameter | Type                     | Description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| url       | string                   | the relative url for the request                           |
| data      | any (required)           | the data to use in the body of the request                 |
| configure | ConfigureInstanceRequest | hook to provide the configuration for this particular call |

```javascript
import {put} from '@truefit/http-utils';

const response = await put('/users', {name: 'Jim Bob'});
```

#### Delete

| Parameter | Type                     | Description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| url       | string                   | the relative url for the request                           |
| configure | ConfigureInstanceRequest | hook to provide the configuration for this particular call |

```javascript
import {del} from '@truefit/http-utils';

const response = await del('/users/1');
```

#### Request

Allows you to create a request, but requires you to specify the method manually. This is used to make the lesser used calls (such as options or link).

| Parameter | Type                     | Description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| url       | string                   | the relative url for the request                           |
| configure | ConfigureInstanceRequest | hook to provide the configuration for this particular call |

```javascript
import {request} from '@truefit/http-utils';

const response = await get('/users', () => ({
  method: 'options',
}));
```

#### createAxiosInstance

Exposes the raw shared axios creation method - will return an AxiosInstance.

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| url       | string | the relative url for the request |

```javascript
import {createAxiosInstance} from '@truefit/http-utils';

const instance = createAxiosInstance('/users');
```

### Misc

You can pass a fully qualified url to any of the functions to bypass the baseURL provided to the base configuration.

```javascript
const response = await get('https://a.domain.com/');
```
