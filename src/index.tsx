import * as React from "react";
import * as ReactDOM from "react-dom";

import { createBrowserHistory } from "history";

import Routers from "./router";
import { syncHistoryWithStore } from "react-router-redux";

import { Provider } from "react-redux";

import Store from "./store";

import "./style/index.less";

const history: any = syncHistoryWithStore(createBrowserHistory(), Store);

const Loading = () => <div>loading...</div>;

// Create an enhanced history that syncs navigation events with the store
ReactDOM.render(
  <Provider store={Store}>
    <React.Suspense fallback={Loading}>
      <Routers history={history} />
    </React.Suspense>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
