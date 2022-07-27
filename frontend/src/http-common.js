import axios from "axios";

export default axios.create({
  baseURL: "https://mern-restaurant-sk.herokuapp.com/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});