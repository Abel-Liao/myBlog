import React, { useState, useEffect, useRef, FunctionComponent } from "react";

import "./css/index.less";

const PopUps: FunctionComponent = (props: any) => {
  const popUpsEle = useRef([]);
  const timer: any = useRef();
  const [popUpsDisplay, usePopUpsDisplay] = useState(false);
  const [popUpsEleDisplay, usePopUpsEleDisplay] = useState([]);
  const [popUpsEleAnimation, usePopUpsEleAnimation] = useState([]);
  const [popUpsContent, usePopUpsContent] = useState([
    {
      title: "Title",
      text: "This is test!",
    },
    {
      title: "Title",
      text:
        "This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!",
    },
    {
      title: "Title",
      text:
        "This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!",
    },
    {
      title: "Title",
      text:
        "This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!This is test!",
    },
  ]);

  /**
   * 初始化数据方法
   */
  const popUpsEleDisplayFun: any = (): Array<boolean> => {
    let data = [];
    for (let i = 0; i < popUpsContent.length; i++) {
      if (popUpsContent[i]) {
        data.push(true);
      }
    }
    return data;
  };

  const closePopups: any = (index: number) => {
    timer.current = setTimeout(() => {
      const data = [].concat(popUpsEleDisplay);
      const spliceData = data.splice(index, 1, false);
      usePopUpsEleDisplay(data);
    }, 280);
    const data = [].concat(popUpsEleAnimation);
    const spliceData = data.splice(index, 1, false);
    usePopUpsEleAnimation(data);
  };

  useEffect(() => {
    const data = popUpsEleDisplayFun();
    usePopUpsEleDisplay(data);
    usePopUpsEleAnimation(data);
  }, []);
  useEffect(() => {
    const data = popUpsEleDisplay.some((data: boolean) => {
      return data;
    });
    usePopUpsDisplay(data);
  }, [popUpsEleDisplay]);

  // 清除定时器
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return popUpsDisplay ? (
    <div className="myBlog-popUps-page">
      {popUpsContent.map((content: any, index: number) => {
        return popUpsEleDisplay[index] ? (
          <div
            className={`myBlog-popUps-main ${
              popUpsEleAnimation[index] ? "popUps-enter" : "popUps-closed"
            }`}
            ref={(el) => (popUpsEle.current[index] = el)}
            key={`popUps-${index}`}
            style={{
              height: popUpsEleAnimation[index]
                ? "auto"
                : popUpsEle.current[index].offsetHeight,
            }}
          >
            <span
              className={`myBlog-popUps-close`}
              onClick={() => closePopups(index)}
            >
              X
            </span>
            <h3 className="myBlog-popUps-title">{content.title}</h3>
            <div className="myBlog-popUps-content">{content.text}</div>
          </div>
        ) : null;
      })}
    </div>
  ) : null;
};
export default PopUps;
