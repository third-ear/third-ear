import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import 'bulma/css/bulma.css';
import 'react-tippy/dist/tippy.css';
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

const config = {
  key: 'state',
  storage,
};

const reducer = persistReducer(config, rootReducer);

export const store = createStore(
  reducer,

  // debug
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

epicMiddleware.run(rootEpic);


const persistor = persistStore(store);




const onBeforeLift = () => {

};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TyHome} />

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
