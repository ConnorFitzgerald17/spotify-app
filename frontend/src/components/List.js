import React, { Component } from "react";

class List extends Component {
  render() {
    const { listClass } = this.props;

    return <ul className={listClass}>{this.props.children}</ul>;
  }
}

export default List;
