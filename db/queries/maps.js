// Require the database connection file, which contains the node-postgres database client/connection setup
const db = require('../connection');

const getPublicMaps = () => {
  return db.query(`
  SELECT * FROM maps 
  WHERE private != TRUE
  ORDER BY title;
  `)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get points associated with a given map ID
const getMapPoints = (map_id) => {
  return db.query('SELECT * FROM points WHERE map_id = $1', [map_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


// Get maps associated with a given user to be displayed on Profile tab
const getUserMaps = (user_id) => {
  return db.query('SELECT * FROM maps WHERE creator_id = $1', [user_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get user favourite maps to be displayed on Profile tab
const getUserFavourites = (user_id) => {
  return db.query(`
  SELECT DISTINCT maps.id as maps_id, maps.title as map_title, maps.description 
  FROM favorites JOIN maps ON favorites.map_id = maps.id
  WHERE favorites.user_id = $1
  AND maps.private = FALSE;
  `, [user_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get maps user contributed to, to be displayed on Profile tab
const getUserContributions = (user_id) => {
  return db.query(`
    SELECT maps.id as map_id, maps.title as maps_title, maps.description, maps.creator_id, users.username as creator_username 
    FROM contributions 
    JOIN maps ON contributions.map_id = maps.id
    JOIN users ON maps.creator_id = users.id
    WHERE contributions.user_id = $1;
  `, [user_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getPublicMaps, getUserMaps, getMapPoints, getUserFavourites, getUserContributions };