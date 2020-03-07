import * as React from "react";
import { Link } from "react-router-dom";
import timg from "./img/timg.jpg";
import "./css/index.less";
function Index() {
  const abc = {
    fontSize: "15px"
  };
  return (
    <div className="container" style={abc}>
      <img src={timg} alt="" />
      <p>This is index page</p>
      <Link to="/login">Go Login</Link>
      <Link to="/register">Go register</Link>
    </div>
  );
}
export default Index;
