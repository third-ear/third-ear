import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from './reducer';
import rootEpic from './epic';

import 'normalize.css';

import './index.css';

import MyHome from './Home/components/Home';
import registerServiceWorker from './registerServiceWorker';

const epicMiddleware = createEpicMiddleware();

let middlewares = [
  epicMiddleware
];


// debug
const logger = createLogger({
  collapsed: true,
  diff: true
});
middlewares = [...middlewares, logger];

export const store = createStore(
  rootReducer,

  // debug
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MyHome} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
