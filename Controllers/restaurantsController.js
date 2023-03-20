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
      //console.log(err, "This is post error for 400!");
      next(err);
    });
};

const deleteRestaurant = (request, response, next) => {
  const { restaurant_id } = request.params;
  //console.log(restaurant_id);

  removeRestaurant(restaurant_id)
    .then((emptyObj) => {
      if (!emptyObj) {
        return {
          status: 404,
          msg: `restaurant_id ${restaurant_id} does not exist`,
        };
      }
      response.status(204).send(emptyObj);
    })
    .catch(next);
};

const updateRestaurant = (request, response, next) => {
  const { restaurant_id } = request.params;
  const { body } = request;
  //console.log(body);
  if (Object.keys(body).length > 0) {
    updateRestaurantByID(restaurant_id, body).then((updatedRestaurant) => {
      response.status(200).send({ updatedRestaurant });
    });
  }
};

module.exports = {
  getAPI,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
