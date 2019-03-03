import { of } from 'rxjs';

import * as types from '../types';


export const translate = ({ text }) => ({ type: types.TRANSLATE, payload: { text } });
export const translateSucceed = ({ translation }) => ({ type: types.TRANSLATE_SUCCEED, payload: { translation } });
export const translateFailed = err => of({ type: types.TRANSLATE_FAILED, payload: err });
