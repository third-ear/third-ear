import * as types from '../types';


export default function (state = {}, action) {
  switch (action.type) {
    case types.TRANSLATE_SUCCEED: {
      const { translation } = action.payload;
      return translation;
    }

    default: {
      return state;
    }
  }
}
