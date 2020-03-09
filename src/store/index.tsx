import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from "react-router-redux";

import { logger, crashReporter } from "./logger";
import login from "./login";
import register from "./register";

// Add the reducer to your store on the `routing` key
const combineStore = combineReducers<any>({
  login,
  register,
  routing: routerReducer
});
const store = createStore(
  combineStore,
  // applyMiddleware() tells createStore() how to handle middleware
  applyMiddleware(logger, crashReporter, thunk)
);
export default store;
