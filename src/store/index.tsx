import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger, crashReporter } from "./logger";

import login from "./login";
import register from "./register";

const combineStore = combineReducers<any>({
  login,
  register
});
const store = createStore(
  combineStore,
  // applyMiddleware() tells createStore() how to handle middleware
  applyMiddleware(logger, crashReporter)
);
export default store;
