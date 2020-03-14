import React from "react";

const userNamePage = (props: any) => {
  const { password, clearTextFun } = props;
  return (
    <label htmlFor="password">
      <input
        id="password"
        name="password"
        value={password}
        type="password"
        placeholder="请输入密码"
        onChange={props.infoFun}
      />
      {password ? (
        <span
          onClick={() => clearTextFun("password")}
          className="login-clear-text"
        >
          x
        </span>
      ) : null}
    </label>
  );
};
export default userNamePage;
