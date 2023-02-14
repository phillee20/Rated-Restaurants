const {fetchRestaurants, insertRestaurant} = require("./models");

const getRestaurants = (request, response) => {
  fetchRestaurants().then((restaurants) => {
    response.status(200).send({ restaurants });
  });
};

const postRestaurant = (request, response) => {
  const { restaurant_name, area_id, cuisine, website } = request.body;
  
  insertRestaurant(restaurant_name, area_id, cuisine, website).then((restaurant) => {
    response.status(201).send({ restaurant });
  })
}

module.exports = {getRestaurants, postRestaurant};
