import React, { useState, useEffect, FunctionComponent, useRef } from "react";

const DynamicPage: FunctionComponent = (props: any) => {
  const { dynamic, clearTextFun } = props;
  // 接受定时器
  const timerFun: any = useRef();
  // 倒计时秒数
  const number = 59;
  // 显示 "获取动态密码" or 倒计时
  const [isText, setIsText] = useState(true);
  // 倒计时
  const [countdown, setCountdown] = useState(number);
  // 倒计时方法
  const isTextFun = () => {
    setIsText(isText => false);
    timerFun.current = setInterval(() => {
      setCountdown(countdown => countdown - 1);
    }, 1000);
  };
  // 清除定时器
  useEffect(() => {
    if (countdown < 0) {
      clearInterval(timerFun.current);
      setIsText(isText => true);
      setCountdown(countdown => number);
    }
  }, [countdown]);
  return (
    <label htmlFor="dynamic" className="myBlog-login-dynamic">
      <input
        id="dynamic"
        name="dynamic"
        value={dynamic}
        type="text"
        placeholder="请输入动态密码"
        onChange={props.infoFun}
      />
      <span
        className="myBlog-dynamic-text"
        onClick={isText ? isTextFun : undefined}
      >
        {isText ? "获取动态密码" : countdown}
      </span>
      {dynamic ? (
        <span
          onClick={() => clearTextFun("dynamic")}
          className="login-clear-text"
        >
          x
        </span>
      ) : (
        undefined
      )}
    </label>
  );
};
export default DynamicPage;
