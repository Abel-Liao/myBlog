import React, { useState, useImperativeHandle, useRef, useEffect } from "react";

import "./css/index.less";

function MouseAnimation(props: any): JSX.Element {
  const timer: any = useRef();
  const [mousePosition, useMousePosition] = useState([]);

  useImperativeHandle(props.refName, () => ({
    handleOnMouseUp: (event: any) => {
      if (event.button === 0) {
        const positionData: Array<any> = [...mousePosition];
        positionData.push({ left: event.clientX, top: event.clientY });
        useMousePosition(positionData);
        timer.current = setTimeout(() => {
          const timerPositionData: Array<boolean> = [...positionData];
          timerPositionData.shift();
          useMousePosition(timerPositionData);
        }, 300);
      }
    },
  }));

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return mousePosition.length > 0 ? (
    <>
      {mousePosition.map((data: boolean, index: number) => {
        return data ? (
          <div
            className="myBlog-mouseAnimation-main"
            style={{
              top: mousePosition[index].top,
              left: mousePosition[index].left,
            }}
            key={`mouse-${index}`}
          />
        ) : null;
      })}
    </>
  ) : null;
}

export default MouseAnimation;
