import { HOST, METHOD_SEARCH, SORT_PARAMS, QUERY_PARAMS } from '../configs/hnconfigs';
import { NEWSLIST_SET_NEWS, NEWSLIST_LOAD_CHANGE, NEWSLIST_MODAL_CHANGE, QUERY_PARAMS_TYPE, SIDEBAR_LOAD_CHANGE, SIDEBAR_MODAL_CHANGE, SIDEBAR_SET_NEWS } from './types';

export function setQueryParams (query) {
  return {
    type: QUERY_PARAMS_TYPE,
    payload: query
  }
}

export function sidebarLoadChange () {
  return { type: SIDEBAR_LOAD_CHANGE };
}

export function sidebarModalChange () {
  return { type: SIDEBAR_MODAL_CHANGE };
}

export function fetchSidebarNews (isMount = false) {
  const TIME = Date.now() / 1000;
  const start = TIME - 31536000;
  const end = TIME;
  return dispatch => {
    !isMount && dispatch( sidebarLoadChange(true) );
    fetchAction(`${HOST}${METHOD_SEARCH}?${SORT_PARAMS}created_at_i>${start},created_at_i<${end}`)
    .then(result => {
      dispatch({
        type: SIDEBAR_SET_NEWS,
        payload: result
      });
      dispatch( sidebarLoadChange(false) );
    })
    .catch( () => dispatch( sidebarLoadChange(false) ) );
  };
}

export function newslistLoadChange () {
  return { type: NEWSLIST_LOAD_CHANGE };
}

export function newslistModalChange () {
  return { type: NEWSLIST_MODAL_CHANGE };
}

export function fetchNewslistNews (query, isMount = false) {
  return dispatch => {
    !isMount && dispatch( newslistLoadChange(true) );
    fetchAction(`${HOST}${METHOD_SEARCH}?${QUERY_PARAMS}${query}`)
    .then(res => {
      dispatch({
        type: NEWSLIST_SET_NEWS,
        payload: res
      })
      dispatch( newslistLoadChange(false) );
    })
    .catch(() => dispatch( newslistLoadChange(false) ));
  }
}

async function fetchAction (url) {
  const response = await fetch(url);
  return response.json();
}