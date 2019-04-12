import React, { Component } from "react";
import Avatar from "./Avatar";
import Link from "./Link";
import PlayButton from "./PlayButton";

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
    const { topArtist, cardClass } = this.props;
    const { data } = this.state;

    if (data) {
      return (
        <div className={cardClass + " card"}>
          <div className="card-image">
            <Avatar img={topArtist.images[0].url} alt={topArtist.name} />
            <span className="card-title">{topArtist.name}</span>
          </div>
          <div className="card-content">
            {Object.keys(data.artistData).map(i => (
              <Link
                key={topArtist.name + i}
                href={data.artistData[i].url}
                newTab={true}
                linkClass="top-link"
              >
                <p>
                  <PlayButton />
                  {data.artistData[i].track}
                </p>
              </Link>
            ))}
          </div>
          <div className="card-action">
            <Link href={topArtist.external_urls.spotify} newTab={true}>
              Listen
            </Link>
          </div>
        </div>
      );
    }

    return <div>loading...</div>;
  }
}

export default Card;
