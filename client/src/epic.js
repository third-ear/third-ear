import { combineEpics } from 'redux-observable';

import {
  getUserEpic,
  translateEpic,
  updateNameEpic,
} from './Home/epics/';

export default combineEpics(
  getUserEpic,
  translateEpic,
  updateNameEpic,
);
