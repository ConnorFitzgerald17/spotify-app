import React, { Component } from "react";

class Header extends Component {
  render() {
    const { data } = this.props;
    const { error, userData } = data;

    return (
      <div className="nav">
        <div className="profile">
          <h3 className="avatar-text">{userData.userInfo.display_name}</h3>
          <img className="avatar" src={userData.userInfo.images[0].url} />
        </div>
      </div>
    );
  }
}

export default Header;
