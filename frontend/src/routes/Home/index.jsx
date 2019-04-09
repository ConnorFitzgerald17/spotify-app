import React, { Component } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";

import { get } from "../../utils/api";

const scopes = "user-read-private user-read-email user-top-read";

const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=5b92325236524738a87549303931ebae${
  scopes ? "&scope=" + encodeURIComponent(scopes) : ""
}&redirect_uri=${encodeURIComponent("http://localhost:7777/spotify/callback")}`;

class Home extends Component {
  state = {
    data: false
  };

  componentDidMount() {
    const { accessToken } = this.props;

    if (accessToken) {
      get(`/spotify/user?access_token=${accessToken}`).then(res => {
        this.setState({ data: res.data });
      });
    }
  }

  render() {
    const { accessToken } = this.props;
    const { data } = this.state;

    if (!accessToken) {
      return (
        <div className="main">
          <h1>Home</h1>
          <a href={url}>Login to Spotify</a>
        </div>
      );
    }

    if (!data) {
      return <div>Loading...</div>;
    }

    const { error, userData } = data;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <Header data={this.state.data} />
        <div className="greeting">
          <h1 className="greeting-text">
            Hello, <span>{userData.userInfo.display_name}</span>
          </h1>
        </div>

        <div className="container">
          <div className="row">
            {Object.keys(userData.userTopArtists.items)
              .slice(0, 5)
              .map(key => (
                <Card
                  key={key}
                  topArtist={userData.userTopArtists.items[key]}
                  accessToken={this.props.accessToken}
                  index={key}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
