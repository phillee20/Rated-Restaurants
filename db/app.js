const express = require("express");
const app = express();
app.use(express.json());

const {
  getAPI,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
} = require("../Controllers/restaurantsController");
const {
  handle400Statuses,
  handle500Statuses,
} = require("../Controllers/errorController");

app.get("/api", getAPI);

app.get("/api/restaurants", getRestaurants);

//To be refactored
app.get("/*", (request, response) => {
  response.status(404).send({ msg: "error" });
});

app.post("/api/restaurants", postRestaurant);

app.delete("/api/restaurants/:restaurant_id", deleteRestaurant);

app.use(handle400Statuses);
app.use(handle500Statuses);

module.exports = app;
