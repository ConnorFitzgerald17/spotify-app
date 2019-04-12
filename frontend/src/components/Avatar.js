import React, { Component } from "react";

class Avatar extends Component {
  render() {
    const { imgClass, img, alt } = this.props;

    return <img className={imgClass} src={img} alt={alt} />;
  }
}

export default Avatar;
