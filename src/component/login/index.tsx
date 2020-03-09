import * as React from "react";
import { connect } from "react-redux";

import "./css/index.less";

import loginImg from "./img/18051.jpg";

interface UserInfo {
  userName: string;
  password: string;
  props: string;
}
class Login extends React.Component<UserInfo> {
  constructor(props: Readonly<UserInfo>) {
    super(props);
    this.state = { userName: "", password: "" };
  }
  render(): JSX.Element {
    return (
      <div className="myBlog-login">
        <h1 className="text-center">{this.props.login.counter}</h1>
        <button
          className="btn btn-primary mr-2"
          onClick={() => this.props.increment()}
        >
          加上
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => this.props.decrement()}
        >
          减去
        </button>
        <img src={loginImg} alt="" />
        <p>This is login page!</p>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return state;
};
const mapDispatchToProps = (
  dispatch: (arg0: { type: string; amount: number }) => void
) => {
  return {
    increment: () => {
      setTimeout(() => {
        dispatch({ type: "INCREMENT", amount: 10 });
      }, 1000);
    },
    decrement: () => {
      dispatch(decrement(3));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
