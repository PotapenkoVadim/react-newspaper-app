import { QUERY_PARAMS_TYPE } from "./types";

const initialState = { string: '', query: '' };
export function appReducer (state = initialState, action) {
  switch (action.type) {
    case QUERY_PARAMS_TYPE:
      return { ...state, query: action.payload };
    default: return state;
  }
}