import React, { FunctionComponent } from "react";

import "./css/index.less";

const PopUps: FunctionComponent = (props: any) => {
  return (
    <>
      <h3 className="myBlog-popUps-title">{props.content.title}</h3>
      <div className="myBlog-popUps-content">{props.content.text}</div>
    </>
  );
};
export default PopUps;
