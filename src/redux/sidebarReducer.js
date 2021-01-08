import { SIDEBAR_LOAD_CHANGE, SIDEBAR_MODAL_CHANGE, SIDEBAR_SET_NEWS } from "./types";

const initialState = {
  load: true,
  modal: false,
  news: {}
};
export function sidebarReducer (state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_LOAD_CHANGE:
      return { ...state, load: action.payload };
    case SIDEBAR_MODAL_CHANGE:
      return { ...state, modal: !state.modal };
    case SIDEBAR_SET_NEWS:
      return { ...state, news: action.payload };
    default: return state;
  }
}