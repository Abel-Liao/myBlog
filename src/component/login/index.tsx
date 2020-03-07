import * as React from "react";

import "./css/index.less";

import loginImg from "./img/18051.jpg";

class Login extends React.Component {
  render() {
    return (
      <div className="myBlog-login">
        <img src={loginImg} alt="" />
        <p>This is login page!</p>
      </div>
    );
  }
}
export default Login;
