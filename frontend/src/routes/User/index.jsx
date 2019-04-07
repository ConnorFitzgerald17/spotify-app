import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class User extends Component {
  componentDidMount() {
    const { match, setAccessToken } = this.props;

    const accessToken = match.params.token;
    setAccessToken(accessToken);
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default User;
