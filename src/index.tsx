import * as React from "react";
import * as ReactDOM from "react-dom";

import Routers from "./router";

import { Provider } from "react-redux";

import Store from "./store";

const Loading = () => <div>loading...</div>;
ReactDOM.render(
  <Provider store={Store}>
    <React.Suspense fallback={Loading}>
      <Routers />
    </React.Suspense>
  </Provider>,
  document.getElementById("root")
);
