const fetchRestaurants = require("./models");

const getRestaurants = (request, response) => {
  //console.log(request.params);
  fetchRestaurants().then((restaurants) => {
    response.status(200).send({ restaurants });
  });
};

module.exports = getRestaurants;
