import React, { Component } from "react";

class PlayButton extends Component {
  render() {
    return (
      <svg
        className="playbutton"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    );
  }
}

export default PlayButton;