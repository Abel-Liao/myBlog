import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import regex from "../../helper/regex";
import UserNamePage from "./userNamePage";
import DynamicPage from "./dynamicPage";

import { connect } from "react-redux";

import ButtonAnimation from "../buttonAnimation";

import "./css/index.less";

const Login: FunctionComponent = (props: any) => {
  const buttonRefs: { [k: string]: any } = useRef({});
  const clickRefs: { [k: string]: any } = useRef({});

  /**
   * 登录方式列表
   */
  const chooseList: object[] = [
    {
      name: "userName",
      text: "密码登录",
    },
    {
      name: "dynamic",
      text: "动态码登录",
    },
  ];
  /**
   * 当前登录方式
   */
  const [types, setDynamic] = useState("userName");
  /**
   * 用户登录信息
   */
  const [userInfo, setUserInfo]: any = useState({
    userName: "",
    password: "",
    dynamic: "",
    types: types,
  });
  /**
   * 切换登录方式
   * userName 部位邮箱时，切换登录状态清空 userName
   */
  useEffect(() => {
    setDynamic(types);
    if (!regex("email", userInfo.userName)) {
      setUserInfo({ ...userInfo, userName: "" });
    }
  }, [types]);
  /**
   * 用户登录输入错误监听
   */
  const [isError, setIsError] = useState(false);
  /**
   * 用户登录输入错误提示信息
   */
  const [errorText, setErrorText] = useState("用户名或密码错误，请从新输入");
  /**
   * input value绑定
   */
  const infoFun = useCallback(() => {
    const { name, value }: any = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }, [userInfo]);
  /**
   *
   * 清空数据
   * @param name {string}
   */
  const clearTextFun = (name: string) => {
    setUserInfo({
      ...userInfo,
      [name]: "",
    });
  };

  /**
   * 登录按钮触发事件
   */
  const loginFun = (event: any) => {
    if (buttonRefs.current.login) {
      buttonRefs.current.login.buttonFun(event, "login");
    }
    const errorText: any = {
      userName: "用户名不能为空",
      password: "密码不能为空",
      dynamic: "动态码不能为空",
    };
    for (let key in userInfo) {
      if (!userInfo[key]) {
        if (types === "userName" && key === "dynamic") {
          break;
        } else if (types === "dynamic" && key === "password") {
          break;
        }
        setIsError(true);
        setErrorText(errorText[key]);
        return;
      } else {
        setIsError(false);
      }
    }
    props.changeLogin(true);
    props.history.push("/index");
  };

  return (
    <div className="myBlog-login">
      <div className="myBlog-login-content">
        <ul className="myBlog-login-ul">
          {chooseList.map((item: any, index: number) => {
            return (
              <ButtonAnimation
                {...props}
                key={item.name}
                refName={(el: any) => {
                  const data: any = { ...buttonRefs.current };
                  data[item.name] = el;
                  return (buttonRefs.current = data);
                }}
                clickRefs={clickRefs.current}
              >
                <li
                  className={`myBlog-login-li ${
                    types === item.name ? "login-choose" : ""
                  }`}
                  onClick={() => {
                    setDynamic(item.name);
                    if (buttonRefs.current[item.name]) {
                      buttonRefs.current[item.name].buttonFun(event, item.name);
                    }
                  }}
                  ref={(el: any) => (clickRefs.current[item.name] = el)}
                >
                  {item.text}
                </li>
              </ButtonAnimation>
            );
          })}
        </ul>
        <form className="myBlog-login-form" autoComplete="off">
          <p className="error-text">{isError ? errorText : ""}</p>
          <label htmlFor="userName">
            <input
              id="userName"
              name="userName"
              type="text"
              value={userInfo.userName}
              onChange={infoFun}
              placeholder={
                types === "userName" ? "请输入邮箱/用户名" : "请输入邮箱"
              }
            />
            {userInfo.userName ? (
              <span
                onClick={() => clearTextFun("userName")}
                className="login-clear-text"
              >
                x
              </span>
            ) : undefined}
          </label>
          {types === "userName" ? (
            <UserNamePage
              {...props}
              password={userInfo.password}
              infoFun={infoFun}
              clearTextFun={clearTextFun}
            />
          ) : (
            <DynamicPage
              {...props}
              dynamic={userInfo.dynamic}
              infoFun={infoFun}
              clearTextFun={clearTextFun}
            />
          )}
          <ButtonAnimation
            {...props}
            refName={(el: any) => {
              const data: any = { ...buttonRefs.current };
              data.login = el;
              return (buttonRefs.current = data);
            }}
            clickRefs={clickRefs.current}
          >
            <input
              type="button"
              className="myBlog-login-button"
              onClick={(event) => loginFun(event)}
              value="登录"
              ref={(el: any) => (clickRefs.current.login = el)}
            />
          </ButtonAnimation>
        </form>
        <div className="myBlog-login-bottom">
          <Link to="/register">注册</Link>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return state;
}

function mapDispatchToProps(dispatch: any) {
  return {
    // 改变登录状态
    changeLogin: (status: boolean) => {
      sessionStorage.setItem("isLogin", "true");
      dispatch({ type: "CHANGELOGIN", text: status });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
