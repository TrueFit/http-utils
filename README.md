# react-utils

This repository is a set of utility classes and functions for Truefit's React based applications.

Can be found on npm as [truefit-react-utils](https://www.npmjs.com/package/truefit-react-utils)

## HTTP

Helpful wrappers of [Axios](https://github.com/mzabriskie/axios) for HTTP access

To get started, you need to pass an axios config object:

```
import {configureHttp} from 'truefit-react-utils';

configureHttp({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

from there you have four functions available to you, one for each of the http verbs:

- GET

```
get('user', {id: 1}).then((response) => { // do something });
```

- POST

```
post('user', {name: 'john doe'}).then((response) => { // do something });
```

- PUT

```
put('user', {id: 1, name: 'john doe'}).then((response) => { // do something });
```

- PATCH

```
patch('user', {id: 1, name: 'john doe'}).then((response) => { // do something });
```

- DELETE

```
httpDelete('user', {id: 1}).then((response) => { // do something });
```

## Reducers

Higher level functions allowing you to represent a reducer as a state machine instead of the traditional switch statement.

### State Reducer

This higher order function returns a reducer for use with Redux. It accepts the initial state of the reducer and a set of states.

```
import stateReducer from 'truefit-react-utils';

export default stateReducer([], {
  DATA_REMOVED: (state, payload) => payload.data,
  DATA_LOADED: (state, payload) => payload.data,
});
```

### Promise Reducer

This higher order function returns a reducer for use with Redux. It is intended for use with redux-promise-middleware. It accepts the root action type, the initial state of the reducer and a set of states. It will match the root action type with the generated types returned by the middleware.

```
import promiseReducer from 'truefit-react-utils';

export default promiseReducer('FOO', [], {
  PENDING: (state, payload) => payload.data,
  FULFILLED: (state, payload) => payload.data,
  REJECTED: (state) => [],
});
```
