import React, { useState, useImperativeHandle, useRef, useEffect } from "react";

import "./css/index.less";

function MouseAnimation(props: any): JSX.Element {
  const timer: any = useRef();
  const [mouseAnimation, useMouseAnimation] = useState([]);
  const [mousePosition, useMousePosition] = useState({ left: 0, top: 0 });

  useImperativeHandle(props.refName, () => ({
    handleOnMouseUp: (event: any) => {
      if (event.button === 0) {
        const data: Array<boolean> = [...mouseAnimation];
        data.push(true);
        useMouseAnimation(data);
        useMousePosition({
          ...mousePosition,
          left: event.clientX,
          top: event.clientY,
        });
        timer.current = setTimeout(() => {
          const data: Array<boolean> = [...mouseAnimation];
          data.shift();
          useMouseAnimation(data);
        }, 300);
      }
    },
  }));

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return mouseAnimation.length > 0 ? (
    <>
      {mouseAnimation.map((data: boolean, index: number) => {
        return data ? (
          <div
            className="myBlog-mouseAnimation-main"
            style={{
              top: mousePosition.top,
              left: mousePosition.left,
            }}
            key={`mouse-${index}`}
          />
        ) : null;
      })}
    </>
  ) : null;
}

export default MouseAnimation;
