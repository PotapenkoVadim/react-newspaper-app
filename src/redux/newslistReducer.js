import { NEWSLIST_LOAD_CHANGE, NEWSLIST_MODAL_CHANGE, NEWSLIST_SET_NEWS } from './types';

const initialState = {
  load: true,
  modal: false,
  news: {},
};
export function newslistReducer (state = initialState, action) {
  switch (action.type) {
    case NEWSLIST_LOAD_CHANGE:
      return { ...state, load: action.payload };
    case NEWSLIST_MODAL_CHANGE:
      return { ...state, modal: !state.modal };
    case NEWSLIST_SET_NEWS:
      return { ...state, news: action.payload };
    default: return state;
  }
}