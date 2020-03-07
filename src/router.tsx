import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Loadable from "@loadable/component";

const Index = Loadable(() => import("./component/index"));
const Login = Loadable(() => import("./component/login"));
const Register = Loadable(() => import("./component/register"));

class MyBlogRoter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}
export default MyBlogRoter;
