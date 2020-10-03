import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import regex from "../../helper/regex";

import ButtonAnimation from "../buttonAnimation";

import "./css/index.less";

const Register: FunctionComponent = (props: any) => {
  let buttonRefs: { [k: string]: any } = useRef({});
  let clickRefs: { [k: string]: any } = useRef({});

  /**
   * 错误提示信息
   */
  const descriptionText: any = {
    userName: "用户名必须是数字/字母/下划线的5-12位任意组合",
    password: "密码必须是大小写字母/数字/特殊符号的8-16位组合",
    confirm: "请确认密码",
    email: "请输入正确的邮箱地址",
    dynamic: "请输入邮件里的4位动态数字",
  };
  /**
   * 用户信息列表
   */
  const inputList: string[] = [
    "userName",
    "password",
    "confirm",
    "email",
    "dynamic",
  ];
  /**
   * 用户信息列表文字
   */
  const userInfoText: any = {
    userName: "用户名",
    password: "用户密码",
    confirm: "确认密码",
    email: "邮箱",
    dynamic: "邮箱验证码",
  };
  /**
   * 用户登录信息
   */
  const [userInfo, setUserInfo]: any = useState({
    userName: "",
    password: "",
    confirm: "",
    email: "",
    dynamic: "",
  });
  /**
   * 用户登录输入错误监听
   */
  const [isError, setIsError]: any = useState({
    userName: false,
    password: false,
    confirm: false,
    email: false,
    dynamic: false,
  });
  /**
   * 用户登录输入错误提示信息
   */
  const [errorText, setErrorText]: any = useState({
    userName: descriptionText.userName,
    password: descriptionText.password,
    confirm: descriptionText.confirm,
    email: descriptionText.email,
    dynamic: descriptionText.dynamic,
  });
  const changeFun = (name: string, isTrue: boolean, text: string) => {
    setIsError({ ...isError, [name]: isTrue });
    setErrorText({ ...errorText, [name]: text });
  };
  /**
   * 判断数据是否合法
   */
  const isLegitimateFun = (name: string, value: string | number) => {
    if (!value) {
      changeFun(name, true, `${userInfoText[name]}不能为空`);
      return true;
    }
    if (name === "confirm") {
      if (userInfo.password !== value) {
        changeFun(name, true, "两次密码不一致");
        return true;
      } else {
        changeFun(name, false, "");
      }
    } else if (!regex(name, value)) {
      changeFun(name, true, descriptionText[name]);
      return true;
    }
    changeFun(name, false, "");
    return false;
  };
  /**
   * input value绑定
   */
  const infoFun = useCallback(
    (enent) => {
      const { name, value }: any = event.target;
      isLegitimateFun(name, value);
      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    },
    [userInfo]
  );
  /**
   *
   * 清空数据
   * @param name {string}
   */
  const clearTextFun = (name: string) => {
    isLegitimateFun(name, "");
    setUserInfo({
      ...userInfo,
      [name]: "",
    });
  };
  /**
   * 登录按钮触发事件
   */
  const registerFun = () => {
    if (buttonRefs.current.register) {
      buttonRefs.current.register.buttonFun(event, "register");
    }
    for (let key in userInfo) {
      if (isLegitimateFun(key, userInfo[key])) {
        return;
      }
    }
    console.log(userInfo);
  };

  return (
    <div className="myBlog-register">
      <div className="myBlog-register-content">
        <form className="myBlog-register-form" autoComplete="off">
          {inputList.map((item) => {
            return (
              <label htmlFor={item} key={item}>
                <input
                  id={item}
                  name={item}
                  type={
                    item === "password" || item === "confirm"
                      ? "password"
                      : "text"
                  }
                  value={userInfo[item]}
                  onChange={infoFun}
                  placeholder={`请输入${userInfoText[item]}`}
                />
                {userInfo[item] ? (
                  <span
                    onClick={() => clearTextFun(item)}
                    className="register-clear-text"
                  >
                    x
                  </span>
                ) : undefined}
                <p className="error-text">
                  {isError[item] ? errorText[item] : ""}
                </p>
              </label>
            );
          })}
          <ButtonAnimation
            {...props}
            refName={(el: any) => (buttonRefs.current.register = el)}
            clickRefs={clickRefs.current}
          >
            <input
              type="button"
              className="myBlog-register-button"
              onClick={() => registerFun()}
              value="注册"
              ref={(el: any) => (clickRefs.current.register = el)}
            />
          </ButtonAnimation>
        </form>
        <div className="myBlog-register-bottom">
          <Link to="/">去登录</Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
