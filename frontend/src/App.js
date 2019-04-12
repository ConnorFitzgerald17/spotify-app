import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import User from "./routes/User";
import Footer from "./components/Footer";

import "./Styles/bootstrap-grid.min.css";
import "./Styles/main.scss";
import "./Styles/card.scss";
import "./Styles/collection.scss";
import "./normalize.css";
// import "./App.css";
import "./Styles/nav.scss";

class App extends Component {
  state = {
    accessToken: false,
    artistData: false
  };

  setAccessToken = accessToken => {
    this.setState({ accessToken });
  };

  setArtistData = artistData => {
    this.setState({ artistData });
  };

  render() {
    const { accessToken } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} accessToken={accessToken} />}
          />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/user/:token"
            render={props => (
              <User {...props} setAccessToken={this.setAccessToken} />
            )}
          />
          <Route render={() => <div>404</div>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
