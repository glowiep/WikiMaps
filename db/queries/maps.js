// Require the database connection file, which contains the node-postgres database client/connection setup
const db = require('../connection');

const getPublicMaps = () => {
  return db.query('SELECT * FROM maps WHERE private != TRUE')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get maps associated with a given user
const getUserMaps = (user_id) => {
  return db.query('SELECT * FROM maps WHERE creator_id = $1', [creator_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get points associated with a given map ID
const getMapPoints = (map_id) => {
  return db.query('SELECT * FROM points WHERE map_id = $1', [map_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get user favourite maps to be displayed on Profile tab
const getUserFavourites = (user_id) => {
  return db.query('SELECT user_id FROM favorites WHERE user_id = $1', [user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getPublicMaps, getUserMaps, getMapPoints, getUserFavourites };