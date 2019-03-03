import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import gapi from 'gapi-client';
import { Config } from './config';
import 'bulma/css/bulma.css';
import 'normalize.css';

import rootReducer from './reducer';
import rootEpic from './epic';
import './index.css';

import TyHome from './Home/components/Home';
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

// Initialize Google API
//On load, called to load the auth2 library and API client library.
gapi.load('client:auth2', initClient);

// Initialize the API client library
function initClient() {
  gapi.client.init({
    clientId: Config.clientId,
    apiKey: Config.apiKey,
    scope: [
      'https://www.googleapis.com/auth/documents'
    ].join(' ')
  }).catch(err => console.log(`Your app is having problem initializing google API, here is the err`, err))
  .then(function () {
    // do stuff with loaded APIs
    console.log('Google API initialized in index.js');
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TyHome} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
