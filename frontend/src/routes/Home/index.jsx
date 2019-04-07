import React, { Component } from "react";

import { get } from "../../utils/api";

const scopes = "user-read-private user-read-email user-top-read";

const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=7fc9a822035c4ab7bf130752b3555de7${
  scopes ? "&scope=" + encodeURIComponent(scopes) : ""
}&redirect_uri=${encodeURIComponent("http://localhost:7777/spotify/callback")}`;

class Home extends Component {
  state = {
    data: false,
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
        <div>
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
        Hi, {userData.userInfo.display_name} from {userData.userInfo.country}.
        <br />
        Your top artist is {userData.userTopArtists.items[0].name}
      </div>
    );
  }
}

export default Home;
