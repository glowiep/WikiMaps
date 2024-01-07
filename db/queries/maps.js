// Require the database connection file, which contains the node-postgres database client/connection setup
const db = require("../connection");

// Add new map record to maps table upon creation
const createMap = (title, description, isPrivate, creatorId) => {
  return db
    .query(
      "INSERT INTO maps (title, description, private, creator_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, isPrivate, creatorId]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Add contribution
const addContribution = (user_id, map_id, point_id) => {
  return db
    .query(
      `INSERT INTO contributions (user_id, map_id, point_id) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, map_id, point_id]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get the list of public maps to display on Discover page
const getPublicMaps = () => {
  return db
    .query(`
    SELECT * FROM maps 
    WHERE private != TRUE
    ORDER BY title ASC;
    `)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get maps associated with a given user
const getUserMaps = (creator_id) => {
  return db
    .query(`
    SELECT * FROM maps WHERE creator_id = $1
    ORDER BY creation_date DESC, title ASC;
    `, [creator_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get points associated with a given map ID
const getMapPoints = (map_id) => {
  return db
    .query("SELECT * FROM points WHERE map_id = $1;", [map_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get points associated with a given map ID
const getMapInfo = (map_id) => {
  return db
    .query("SELECT * FROM maps WHERE id = $1;", [map_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Add new points to the database
const createPoints = (description,imageUrl, latitude, longitude, map_id) => {
  return db
    .query(
      "INSERT INTO points (description,image_url, latitude, longitude, map_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [description,imageUrl, latitude, longitude, map_id]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Add favorites
const addFavorite = (user_id, map_id) => {
  return db
    .query(
      "INSERT INTO favorites (user_id, map_id) VALUES ($1, $2) RETURNING *",
      [user_id, map_id]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Delete favorites
const deleteFavorite = (user_id, map_id) => {
  return db
    .query(
      "DELETE FROM favorites WHERE user_id = $1 AND map_id = $2;",
      [user_id, map_id]
    )
    .catch((err) => {
      console.log(err.message);
    });
};

// Delete maps
const deleteMaps = ( map_id) => {
  return db
    .query(
      "DELETE FROM maps WHERE id = $1;",
      [ map_id]
    )
    .catch((err) => {
      console.log(err.message);
    });
};

// Delete points
const deletePoint = (point_id) => {
  return db
    .query(
      "DELETE FROM points WHERE id = $1;",
      [point_id]
    )
    .catch((err) => {
      console.log(err.message);
    });
};


// Get maps user contributed to, to be displayed on Profile tab
const getUserContributions = (user_id) => {
  return db.query(`
    SELECT maps.id, maps.title, maps.description, maps.creator_id, users.username as creator_username 
    FROM contributions 
    JOIN maps ON contributions.map_id = maps.id
    JOIN users ON maps.creator_id = users.id
    WHERE contributions.user_id = $1
    ORDER BY maps.title;
  `, [user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};


// Get user favorite maps to be displayed on Profile tab
const getUserFavorites = (user_id) => {
  return db
    .query(`
    SELECT DISTINCT maps.id, maps.title , maps.description 
    FROM favorites JOIN maps ON favorites.map_id = maps.id
    WHERE favorites.user_id = $1
    AND maps.private = FALSE
    ORDER BY maps.title;
    `, [user_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getPublicMaps,
  getUserMaps,
  getMapPoints,
  getMapInfo,
  getUserFavorites,
  createMap,
  createPoints,
  getUserContributions,
  addFavorite,
  deleteFavorite,
  deleteMaps,
  deletePoint
};
