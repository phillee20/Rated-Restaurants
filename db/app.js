const express = require("express");
const { getRestaurants, postRestaurant } = require("./controller");
const app = express();
app.use(express.json());

app.get("/api", (request, response) => {
  response.status(200).send({ msg: "all good here" });
});

app.get("/api/restaurants", getRestaurants);

app.get("/*", (request, response) => {
  response.status(404).send({ msg: "error" });
});

app.post("/api/restaurants", postRestaurant);

module.exports = app;
