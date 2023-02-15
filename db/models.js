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

const removeRestaurant = (restaurant_id) => {
  return db.query(`
      DELETE FROM restaurants
      WHERE restaurant_id = $1
      RETURNING *;
  `, [restaurant_id]).then(({ rows }) => {
      console.log(rows[0]);
      return rows[0];
  })
}

module.exports = { fetchRestaurants, insertRestaurant, removeRestaurant };
