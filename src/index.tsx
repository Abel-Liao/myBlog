import * as React from "react";
import * as ReactDOM from "react-dom";
import Routers from "./router";
const Loading = () => <div>loading...</div>;
ReactDOM.render(
  <React.Suspense fallback={Loading}>
    <Routers />
  </React.Suspense>,
  document.getElementById("root")
);
