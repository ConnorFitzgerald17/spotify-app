const express = require("express");
const router = express.Router();

const { catchErrors } = require("../error-handler");
const { spotifyCallback, spotifyUser } = require("../handlers");

// Basic route
router.get("/", (req, res) => {
  res.send({
    username: "confitz",
    email: "test@test.ca",
  });
});

// Spotify callback
router.get("/spotify/callback", catchErrors(spotifyCallback));

// Get spotify user info
router.get("/spotify/user", catchErrors(spotifyUser));

// Export router
module.exports = router;
