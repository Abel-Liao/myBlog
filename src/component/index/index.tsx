import React, { useState, useRef, useEffect } from "react";

import PopUps from "../popUps";

import Book from "./book";
import Tree from "./tree";
import Road from "./road";
import Galaxy from "./galaxy";

import "./css/index.less";

import userNameImg from "./images/timg2.jfif";

const animation: any = {
  Book: Book,
  Tree: Tree,
  Road: Road,
  Galaxy: Galaxy,
};

function Index(props: any) {
  const animationList = ["Tree", "Book", "Road", "Galaxy"];
  const [current, useCurrent] = useState("Book");
  const Current = animation[current];
  const popUpsEle = useRef([]);
  const [popUpsEleHeight, usePopUpsEleHeight] = useState([]);
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

  useEffect(() => {
    popUpsEleHeightFun();
  }, [popUpsContent]);
  /**
   * 计算弹窗高度
   */
  const popUpsEleHeightFun = () => {
    const currentData = popUpsEle.current || [];
    const height = currentData.map((data: any) => {
      return data ? data.offsetHeight : 0;
    });
    const numberData = height.map((number: number, index: number) => {
      const eleHeight: number = height
        .slice(0, index)
        .reduce((total, currentValue) => {
          return total + currentValue + 10;
        }, 0);
      return eleHeight;
    });
    usePopUpsEleHeight(numberData);
  };

  const closePopups: any = (index: number) => {
    usePopUpsContent(
      popUpsContent.filter((item: any, dataIndex: number) => {
        return dataIndex !== index;
      })
    );
  };

  return (
    <div className="myBlog-index-main">
      <div className="myBlog-index-header">
        <img
          className="myBlog-userName-img"
          src={userNameImg}
          alt="user0image"
        />
        <div className="myBlog-header-information">
          <span className="myBlog-header-userName">Eble</span>
          <span className="current-selection-theme">
            {current}
            <ul className="index-choose-ul">
              {animationList.map((animation) => {
                return (
                  <li
                    className={`index-choose-li ${animation} ${
                      current === animation ? "choose-animation" : ""
                    }`}
                    onClick={() => useCurrent(animation)}
                    key={animation}
                  >
                    {animation}
                  </li>
                );
              })}
            </ul>
          </span>
        </div>
      </div>
      <Current />
      {popUpsContent.map((content: any, index: number) => {
        return (
          <div
            className="myBlog-popUps-main"
            ref={(el) => (popUpsEle.current[index] = el)}
            key={`popUps-${index}`}
            style={{ bottom: popUpsEleHeight[index] || 0 }}
          >
            <span
              className={`myBlog-popUps-close`}
              onClick={() => closePopups(index)}
            >
              X
            </span>
            <PopUps {...props} content={content} />
          </div>
        );
      })}
    </div>
  );
}
export default Index;
