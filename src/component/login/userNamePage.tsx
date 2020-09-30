import React, { FunctionComponent } from "react";

const userNamePage: FunctionComponent = (props: any) => {
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
      ) : undefined}
    </label>
  );
};
export default userNamePage;
