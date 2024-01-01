// Require the database connection file, which contains the node-postgres database client/connection setup
const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserID = (username) => {
  return db.query('SELECT id FROM users WHERE username = $1;', [username])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUsers, getUserID };

