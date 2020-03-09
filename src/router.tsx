import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Loadable from "@loadable/component";

const Index = Loadable(() => import("./component/index"));
const Login = Loadable(() => import("./component/login"));
const Register = Loadable(() => import("./component/register"));

const notLoginRouter = [
  {
    component: [Login],
    path: "/login"
  },
  {
    component: [Register],
    path: "/register"
  }
];
const loginRouter = [
  {
    component: [Index],
    path: "/"
  }
];
interface RouterArr {
  [index: string]: any;
}
function routerFun(routersArr: RouterArr, needLogin: Boolean = true): any {
  const isLogin = sessionStorage.getItem("isLogin");
  return routersArr.map((route: any) => (
    <Route
      exact={route.path === "/" ? true : false}
      path={route.path}
      key={`ro-${route.component}`}
      render={(props: any) =>
        route.component.map((Routecom: string) =>
          !needLogin ? (
            <Routecom {...props} key={`com-${route.Routecom}`} />
          ) : isLogin ? (
            <Routecom {...props} key={`com-${route.Routecom}`} />
          ) : (
            <Redirect
              key={`login-${route.Routecom}`}
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        )
      }
    />
  ));
}
function MyBlogRoter() {
  return (
    <Router>
      <Switch>
        {routerFun(loginRouter)}
        {routerFun(notLoginRouter, false)}
      </Switch>
    </Router>
  );
}
export default MyBlogRoter;
