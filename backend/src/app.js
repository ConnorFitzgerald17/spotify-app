const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

const errorHandlers = require("./error-handler");
const routes = require("./routes");

const app = express();

// Use morgan for dev env
app.use(morgan("dev"));

// Allow CORS from react app
app.use(cors({ origin: process.env.CLIENT_URL }));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use our routes
app.use("/", routes);

app.use(errorHandlers.notFound);

if (app.get("env") !== "production") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
