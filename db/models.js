const db = require("./connection");

const fetchRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then((restaurantsData) => {
    return restaurantsData.rows;
  });
};

const insertRestaurant = (restaurant_name, area_id, cuisine, website) => {
  return db
    .query(
      `
    INSERT INTO restaurants 
      (restaurant_name, area_id, cuisine, website)
      VALUES
      ($1, $2, $3, $4)
    RETURNING *;`,
      [restaurant_name, area_id, cuisine, website]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchRestaurants, insertRestaurant };
