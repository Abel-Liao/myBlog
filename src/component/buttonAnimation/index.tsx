import React, { useState, useImperativeHandle, useRef, useEffect } from "react";

import "./css/index.less";

function ButtonAnimation(props: any): JSX.Element {
  const timer: any = useRef(null);
  const [buttonPostion, setButtonPostion] = useState({
    top: 0,
    left: 0,
  });
  useImperativeHandle(props.refName, () => ({
    buttonFun: (event: any, name: string) => {
      const postionData = props.clickRefs[name].getBoundingClientRect();
      setButtonPostion({
        top: event.clientY - postionData.top,
        left: event.clientX - postionData.left,
      });
      timer.current = setTimeout(() => {
        setButtonPostion({
          top: 0,
          left: 0,
        });
      }, 510);
    },
  }));

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="myBlog-buttonAnimation-main">
      {buttonPostion.top ? (
        <span
          className="myBlog-buttonAnimation-maskLayer"
          style={{
            top: buttonPostion.top,
            left: buttonPostion.left,
          }}
        />
      ) : null}
      {props.children}
    </div>
  );
}

export default ButtonAnimation;
