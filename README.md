# @truefit/http-utils

This library is a lightweight wrapper around [axios](https://github.com/mzabriskie/axios). It provides a set of utility functions to enable making http requests.

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

As mentioned above, this library makes the assumption that you are building an app around a central api. Given this approach, you need to provide the shared configuration settings on the boot of your app (for example, in a react app, you would do it in your index.js file).

Once this configuration is setup, you can make http calls from any file in the app using this base configuration.

### Configure

| Field | Type | Description |
|-------|------|-------------|
| baseConfig | json object | shared configuration for all requests |
| transformConfig | function | hook called on creation of each request, must return a json object |
| baseHeaders | json object | shared headers to be sent with each request |
| transformHeaders | function | hook called on creation of each request, must return a json object - stored at headers in config |
| configureInstance | function | hook called on creation of each request, it is passed the axios instance directly after it's creation |

* You can find the full array of options that can be passed in the config on the axios site.
* Each hook is also provided with the url of the specific request being created

#### Examples

At it's simplest, you just need to supply the baseURL to be used.

```javascript
import {configureHttp} from 'truefit-http-utils';

configureHttp({
  baseConfig: {
    baseURL: 'https://a.domain.com/',
  },
});
```

That said, apps are rarely this simple. Often you will need to provide a piece of data or authentication token that can only be known at runtime. To account for these situations, the configuration properties (full list above), provide hooks that are invoked on the creation of each request.

```javascript
import {configureHttp} from 'truefit-http-utils';

configureHttp({
  baseConfig: {
    baseURL: 'https://a.domain.com/',
  },
  transformConfig: (baseConfig) => {
    return {
      ...baseConfig
      timeout: 1000,
    };
  },
});
```

### Individual Calls

#### Get

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string (required) | the relative url for the request |
| configure | function (optional) | hook to provide the configuration for this particular call |

```javascript
import {get} from 'truefit-http-utils';

const response = await get('/users');

const response = await get('/users', () => ({
  headers: {'X-Custom-Header': 'foobar'}
}));
```

#### Post

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string (required) | the relative url for the request |
| data | any (required) | the data to use in the body of the request |
| configure | function (optional) | hook to provide the configuration for this particular call |

```javascript
import {post} from 'truefit-http-utils';

const response = await post('/users', {name: 'Jim Bob'});
```

#### Patch

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string (required) | the relative url for the request |
| data | any (required) | the data to use in the body of the request |
| configure | function (optional) | hook to provide the configuration for this particular call |

```javascript
import {patch} from 'truefit-http-utils';

const response = await patch('/users', {id: 1, name: 'Jim Bob'});
```

#### Put

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string (required) | the relative url for the request |
| data | any (required) | the data to use in the body of the request |
| configure | function (optional) | hook to provide the configuration for this particular call |

```javascript
import {put} from 'truefit-http-utils';

const response = await put('/users', {name: 'Jim Bob'});
```

#### Delete

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string (required) | the relative url for the request |
| configure | function (optional) | hook to provide the configuration for this particular call |

```javascript
import {del} from 'truefit-http-utils';

const response = await del('/users/1');
```

### Misc

You can pass a fully qualified url to any of the functions to bypass the baseURL provided to the base configuration.

```javascript
const response = await get('https://a.domain.com/');
```

