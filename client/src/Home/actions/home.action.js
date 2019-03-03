import { of } from 'rxjs';

import * as types from '../types';


export const selectLanguage = ({ languageId }) => ({
  type: types.SELECT_LANGUAGE,
  payload: {
    languageId,
  },
});

export const translate = ({ languageId, text }) => ({
  type: types.TRANSLATE,
  payload: {
    languageId,
    text,
  },
});
export const translateSucceed = ({ translation }) => ({
  type: types.TRANSLATE_SUCCEED,
  payload: {
    translation,
  },
});
export const translateFailed = err => of({
  type: types.TRANSLATE_FAILED,
  payload: err,
});
