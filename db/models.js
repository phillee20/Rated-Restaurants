const db = require("./connection");

const fetchRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then((restaurantsData) => {
    //console.log(restaurantsData.rows);
    return restaurantsData.rows;
  });
};

module.exports = fetchRestaurants;
