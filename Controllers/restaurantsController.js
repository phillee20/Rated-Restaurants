const { fetchRestaurants, insertRestaurant, removeRestaurant } = require("../db/models");

const getRestaurants = (request, response, next) => {
  fetchRestaurants()
    .then((restaurants) => {
      response.status(200).send({ restaurants });
    })
    .catch((err) => {
      console.log("Hi we're in the getRestaurants catch block!!!")
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

const deleteRestaurant = (request, response) => {
  const { restaurant_id } = request.params;
  console.log(restaurant_id);

  removeRestaurant(restaurant_id).then((restaurant) => {
    console.log(restaurant, "this is the deleteRestaurant console log")
    response.status(204).send({msg: "no content"});
  });
}

module.exports = { getRestaurants, postRestaurant, deleteRestaurant };
