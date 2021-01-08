import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { newslistReducer } from "./newslistReducer";
import { sidebarReducer } from "./sidebarReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  newslist: newslistReducer
});