import { combineEpics } from 'redux-observable';

import {
  getUserEpic,
  updateNameEpic
} from './Home/epics/';

export default combineEpics(
  getUserEpic,
  updateNameEpic
);
