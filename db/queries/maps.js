// Require the database connection file, which contains the node-postgres database client/connection setup
const db = require('../connection');

const getPublicMaps = () => {
  return db.query('SELECT * FROM maps WHERE private != TRUE')
    .then(data => {
      return data.rows
    })
}

module.exports = { getPublicMaps }