import axios from "axios";

const apiURL =
  process.env.NODE_ENV === "production"
    ? "http://www.example.com"
    : "http://localhost:7777";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const get = url => {
  return axios.get(`${apiURL}${url}`, {
    defaultHeaders,
  });
};
