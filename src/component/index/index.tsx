import React, { useState, useEffect } from "react";

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
      <PopUps {...props} />
    </div>
  );
}
export default Index;
