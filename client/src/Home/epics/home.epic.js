import { catchError, map, mergeMap,tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

import { Config } from '../../config';
import * as actions from '../actions';
import * as queries from '../queries';
import * as types from '../types';


const query = `
  query User($id: String) {
    user(id: $id) {
      id
      name
    }
  }
`;

export const getUserEpic = (action$) => action$.pipe(
  ofType(types.GET_USER),
  mergeMap(action => ajax.post(
    Config.graphQLUrl,
    {
      query,
      variables: {
        id: action.payload.id
      },
    },
    { 'Content-Type': 'application/json' }
  ).pipe(
    map(res => actions.getUserSucceed({
      user: res.response.data.user
    })),
    catchError(actions.getUserFailed)
  ))
);

const mutation = `
  mutation UpdateName($id: String, $name: String) {
    updateName(id: $id, name: $name) {
      id,
      name,
    }
  }
`;

export const updateNameEpic = (action$) => action$.pipe(
  ofType(types.UPDATE_NAME),
  mergeMap(action => ajax.post(
    Config.graphQLUrl,
    {
      query: mutation,
      variables: {
        id: action.payload.id,
        name: action.payload.name
      },
    },
    { 'Content-Type': 'application/json' }
  ).pipe(
    map(res => actions.updateNameSucceed({
      user: res.response.data.updateName
    })),
    catchError(actions.updateNameFailed)
  ))
);

export const translateEpic = (action$) => action$.pipe(
  ofType(types.TRANSLATE),
  mergeMap(action => ajax.post(
    Config.graphQLUrl,
    {
      query: queries.translateMutation,
      variables: {
        text: action.payload.text
      },
    },
    { 'Content-Type': 'application/json' }
  ).pipe(
    tap(res => console.log('res', res)),
    map(res => actions.translateSucceed({
      translation: res.response.data.translate
    })),
    catchError(actions.translateFailed)
  )),
);
