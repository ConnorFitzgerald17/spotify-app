import React, { Component } from "react";

class ListItem extends Component {
  render() {
    const { listItemClass } = this.props;

    return <li className={listItemClass}>{this.props.children}</li>;
  }
}

export default ListItem;
