const {
  fetchRestaurants,
  insertRestaurant,
  removeRestaurant,
} = require("../db/models");

const getAPI = (request, response, next) => {
  response.status(200).send({ msg: "all good here" });
};

const getRestaurants = (request, response, next) => {
  fetchRestaurants()
    .then((restaurants) => {
      console.log(restaurants);
      response.status(200).send({ restaurants });
    })
    .catch((err) => {
      //console.log("getRestaurants catch block!!!");
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
      //console.log(err, "This is post error!");
      next(err);
    });
};

const deleteRestaurant = (request, response) => {
  const { restaurant_id } = request.params;
  //console.log(restaurant_id);

  removeRestaurant(restaurant_id).then((emptyObj) => {
    //console.log(emptyObj);
    response.status(204).send(emptyObj);
  });
};

module.exports = { getAPI, getRestaurants, postRestaurant, deleteRestaurant };
