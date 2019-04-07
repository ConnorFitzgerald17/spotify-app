const fetch = require("node-fetch");
const URLSearchParams = require("url-search-params");

exports.spotifyCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.send("No code");
  }

  const body = {
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:7777/spotify/callback",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  const searchParams = new URLSearchParams();
  for (const prop in body) {
    searchParams.set(prop, body[prop]);
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: searchParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
  });

  const data = await response.json();

  res.redirect(`${process.env.CLIENT_URL}/user/${data.access_token}`);
};

exports.spotifyUser = async (req, res) => {
  const { access_token } = req.query;

  if (!access_token) {
    res.send({ error: "No code" });
    return;
  }

  const userData = {};

  const userInfoResponse = await fetch("https://api.spotify.com/v1/me", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userInfo = await userInfoResponse.json();

  if (userInfo.error) {
    res.send({ error: userInfo.error.message });
    return;
  }

  userData["userInfo"] = userInfo;

  const userTopArtistsResponse = await fetch(
    "https://api.spotify.com/v1/me/top/artists",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const userTopArtists = await userTopArtistsResponse.json();

  if (userTopArtists.error) {
    res.send({ error: userInfo.error.message });
    return;
  }

  userData["userTopArtists"] = userTopArtists;

  res.send({ userData });
};
