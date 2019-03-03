import { catchError, map, mergeMap,tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

import Config from '../../config';
import * as actions from '../actions';
import * as queries from '../queries';
import * as types from '../types';


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
