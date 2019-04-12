import React, { Component } from "react";

class Button extends Component {
  render() {
    const { buttonClass } = this.props;

    return <button className={buttonClass}>{this.props.children}</button>;
  }
}

export default Button;
