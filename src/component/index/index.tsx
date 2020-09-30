import React, { useState, useEffect, useRef } from "react";

import PopUps from "../popUps";
import MouseAnimation from "../mouseAnimation";

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

function Index(props: any): JSX.Element {
  const childRef: any = useRef(null);
  const animationList: Array<string> = ["Tree", "Book", "Road", "Galaxy"];
  const [current, useCurrent] = useState("Book");
  const Current = animation[current];

  const handleOnMouseUp: any = (event: any) => {
    childRef.current.handleOnMouseUp(event);
  };

  return (
    <div
      className="myBlog-index-main"
      onMouseUp={(event) => handleOnMouseUp(event)}
    >
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
      <PopUps {...props} />
      <MouseAnimation {...props} refName={childRef} />
    </div>
  );
}
export default Index;
