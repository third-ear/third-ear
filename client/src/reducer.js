import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import activeLanguageIdReducer from './Home/reducers/active-language-id.reducer';
import translationReducer from './Home/reducers/translation.reducer';


const appReducer = combineReducers({
  form: formReducer,

  activeLanguageId: activeLanguageIdReducer,
  translation: translationReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
