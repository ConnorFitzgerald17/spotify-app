import React, { Component } from "react";
import { get } from "../utils/api";

class Card extends Component {
  state = {
    data: false
  };
  componentDidMount() {
    const { topArtist } = this.props;

    get(
      `/spotify/artist?id=${topArtist.id}&access_token=${
        this.props.accessToken
      }`
    ).then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    const { topArtist } = this.props;

    if (this.state) {
      return (
        <div className="card col-md-2">
          <div className="card-image">
            <img src={topArtist.images[0].url} alt="" />
            <span className="card-title">{topArtist.name}</span>
          </div>
          <div className="card-content">
            {/* {Object.keys(artistData.artistData.artistTop.tracks)
              .slice(0, 5)
              .map(key => (
                <p>{artistData.artistData.artistTop.tracks[0].name}</p>
              ))} */}
          </div>
          <div className="card-action">
            <a href={topArtist.external_urls.spotify} target="_blank">
              Listen
            </a>
          </div>
        </div>
      );
    }

    return <div>loading...</div>;
  }
}

export default Card;
