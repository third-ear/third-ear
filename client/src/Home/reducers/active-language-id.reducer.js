import * as types from '../types';


export default function (state = 'zh', action) {
  switch (action.type) {
    case types.SELECT_LANGUAGE: {
      const { languageId } = action.payload;

      if (languageId === state) return state;

      return languageId;
    }

    default: {
      return state;
    }
  }
}
