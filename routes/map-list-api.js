/*
 * All routes for Discover tab data are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapListQueries = require('../db/queries/maps');

// GET /api/maps/list
router.get('/list', (req, res) => {
  mapListQueries.getPublicMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
})

module.exports = router;