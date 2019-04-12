import React, { Component } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import Avatar from "../../components/Avatar";
import Link from "../../components/Link";
import PlayButton from "../../components/PlayButton";
import Button from "../../components/Button";

import { get } from "../../utils/api";

const scopes = "user-read-private user-read-email user-top-read";

const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=5b92325236524738a87549303931ebae${
  scopes ? "&scope=" + encodeURIComponent(scopes) : ""
}&redirect_uri=${encodeURIComponent("http://localhost:7777/spotify/callback")}`;

class Home extends Component {
  state = {
    data: false,
    trackData: false
  };

  componentDidMount() {
    const { accessToken } = this.props;

    if (accessToken) {
      get(`/spotify/user?access_token=${accessToken}`).then(res => {
        this.setState({ data: res.data });
      });

      get(`/spotify/user/top?access_token=${accessToken}`).then(res => {
        this.setState({ trackData: res.data });
      });
    }
  }

  render() {
    const { accessToken } = this.props;
    const { data } = this.state;
    const { trackData } = this.state;

    if (!accessToken) {
      return (
        <div className="conainter login">
          <h3 className="header">Welcome To My Spotify App</h3>
          <Link linkClass="login-button" href={url}>
            Login to Spotify
          </Link>
        </div>
      );
    }

    if (!data || !trackData) {
      return <div>Loading...yes2</div>;
    }

    const { userTopTrack } = trackData;

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

        <div className="col-12">
          <h3 className="header top-tracks-header">
            {userData.userInfo.display_name}'s Top 5 Artists
          </h3>
          <div className="row justify-content-center">
            {Object.keys(userData.userTopArtists.items)
              .slice(0, 5)
              .map(key => (
                <Card
                  cardClass="col-lg-2"
                  key={key}
                  topArtist={userData.userTopArtists.items[key]}
                  accessToken={this.props.accessToken}
                  index={key}
                />
              ))}
          </div>
        </div>
        <div className="top-tracks-div">
          <div className="container">
            <div className="justify-content-center">
              <h3 className="header top-tracks-header">
                {userData.userInfo.display_name}'s Top 5 Tracks
              </h3>
              <List listClass="collection">
                {Object.keys(userTopTrack).map(num => (
                  <ListItem key={num} listItemClass="collection-list-item">
                    <Avatar
                      imgClass="collection-img"
                      img={userTopTrack[num].albumImg}
                      alt={userTopTrack[num].album}
                    />
                    <span className="collection-title">
                      {userTopTrack[num].track}{" "}
                      <Link href={userTopTrack[num].albumUrl} newTab={true}>
                        <PlayButton />
                      </Link>
                    </span>
                    <p>
                      {userTopTrack[num].artist}
                      {" - "}
                      <span className="header">{userTopTrack[num].album}</span>
                    </p>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
