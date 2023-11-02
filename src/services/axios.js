import axios from "axios";

const http = () =>
  axios.create({
    baseURL: process.env.VUE_APP_URI_BACKEND,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("-tknA")}`,
    },
  });

export default http;
