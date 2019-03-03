import { of } from 'rxjs';

import * as types from '../types';

export const getUser = ({ id }) => ({ type: types.GET_USER, payload: { id } });
export const getUserSucceed = ({ user }) => ({ type: types.GET_USER_SUCCEED, payload: { user } });
export const getUserFailed = err => of({ type: types.GET_USER_FAILED, payload: err });

export const updateName = ({ id, name }) => ({ type: types.UPDATE_NAME, payload: { id, name } });
export const updateNameSucceed = ({ user }) => ({ type: types.UPDATE_NAME_SUCCEED, payload: { user } });
export const updateNameFailed = err => of({ type: types.UPDATE_NAME_FAILED, payload: err });

export const translate = ({ text }) => ({ type: types.TRANSLATE, payload: { text } });
export const translateSucceed = ({ translation }) => ({ type: types.TRANSLATE_SUCCEED, payload: { translation } });
export const translateFailed = err => of({ type: types.TRANSLATE_FAILED, payload: err });
