import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loadable from "@loadable/component";

import { connect } from "react-redux";

import Store from "./store";

const Index = Loadable(() => import("./component/index"));
const Login = Loadable(() => import("./component/login"));
const Register = Loadable(() => import("./component/register"));

const notLoginRouter = [
  {
    component: [Login],
    path: "/",
  },
  {
    component: [Register],
    path: "/register",
  },
];
const loginRouter = [
  {
    component: [Index],
    path: "/index",
  },
];
interface RouterArr {
  [index: string]: any;
}
function routerFun(routersArr: RouterArr, needLogin: Boolean = true): any {
  const loginData: any = Store.getState().login;
  const isLogin: Boolean =
    JSON.parse(sessionStorage.getItem("isLogin")) || loginData.isLogin;
  return routersArr.map((route: any) => (
    <Route
      exact={route.path === "/" ? true : false}
      path={route.path}
      key={`ro-${route.component}`}
      render={(props: any) =>
        route.component.map((Routecom: string) => {
          if (needLogin && !isLogin) {
            return (
              <Redirect
                key={`login-${route.Routecom}`}
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            );
          } else {
            return <Routecom {...props} key={`com-${route.Routecom}`} />;
          }
        })
      }
    />
  ));
}
function MyBlogRoter() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {routerFun(loginRouter)}
          {routerFun(notLoginRouter, false)}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

function mapStateToProps(state: any) {
  return state.login;
}

export default connect(mapStateToProps)(MyBlogRoter);
