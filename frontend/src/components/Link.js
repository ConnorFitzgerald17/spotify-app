import React, { Component } from "react";

class Link extends Component {
  render() {
    const { href, linkClass, newTab } = this.props;

    if (!newTab) {
      return (
        <a className={linkClass} href={href}>
          {this.props.children}
        </a>
      );
    }

    return (
      <a
        className={linkClass}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.props.children}
      </a>
    );
  }
}

export default Link;
