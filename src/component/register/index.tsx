import * as React from "react";

import "./css/index.less";

class Register extends React.Component {
  render(): JSX.Element {
    return (
      <div className="myBlog-register">
        <p>This is register page!</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Register);
