import { combineReducers } from 'redux';

import translationReducer from './Home/reducers/translation.reducer';


const appReducer = combineReducers({
  translation: translationReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
