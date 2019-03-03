import { combineEpics } from 'redux-observable';

import {
  translateEpic,
} from './Home/epics/';

export default combineEpics(
  translateEpic,
);
