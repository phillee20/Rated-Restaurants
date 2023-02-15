const { fetchRestaurants, insertRestaurant } = require("../db/models");
const handle500Statuses = require("./errorController");

const getRestaurants = (request, response, next) => {
  fetchRestaurants()
    .then((restaurants) => {
      response.status(200).send({ restaurants });
    })
    .catch((err) => {
      next(err);
    });
};

const postRestaurant = (request, response, next) => {
  const { restaurant_name, area_id, cuisine, website } = request.body;

  insertRestaurant(restaurant_name, area_id, cuisine, website)
    .then((restaurant) => {
      response.status(201).send({ restaurant });
    })
    .catch((err) => {
      console.log(err, "This is post error!");
      next(err);
    });
};

module.exports = { getRestaurants, postRestaurant };
