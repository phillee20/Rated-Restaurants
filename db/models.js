const db = require("./connection");

const fetchRestaurants = () => {
  return db.query(`SELECT * FROM restaurants;`).then((restaurantsData) => {
    //console.log(restaurantsData); Key/value restaurant sata
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

const removeRestaurant = (restaurant_id) => {
  return db
    .query(
      `
      DELETE FROM restaurants
      WHERE restaurant_id = $1 ;
  `,
      [restaurant_id]
    )
    .then(() => {
      return {};
    });
};

const updateRestaurantByID = (restaurant_id, restaurantBody) => {
  return db
    .query(
      `
  UPDATE restaurants
  SET $1 = $2
  WHERE restaurant_id = $3
  RETURNING *;
  `,
      [restaurantBody, restaurantBody.area_id, restaurant_id]
    )
    .then((updatedRestaurant) => {
      return updatedRestaurant.rows[0];
    });
};

module.exports = {
  fetchRestaurants,
  insertRestaurant,
  removeRestaurant,
  updateRestaurantByID,
};
