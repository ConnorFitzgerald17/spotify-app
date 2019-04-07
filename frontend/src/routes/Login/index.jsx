import React, { Component } from "react";

import { get } from "../../utils/api";

class Login extends Component {
  componentDidMount() {
    get("/login");
  }

  render() {
    return <div>Logging in...</div>;
  }
}

export default Login;
