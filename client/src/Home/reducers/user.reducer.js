import * as types from '../types';


export default function (state = {}, action) {
  switch (action.type) {
    case types.GET_USER_SUCCEED:
    case types.UPDATE_NAME_SUCCEED: {
      const { user } = action.payload;
      return user;
    }

    default: {
      return state;
    }
  }
}
