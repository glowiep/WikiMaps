/*
 * All routes for Discover tab data are defined here
 * Since this file is loaded in server.js into /maps/:username/api/maps (logged in user) and /api/maps (guest),
 *   these routes are mounted onto /maps/:username/api/maps and /api/maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapListQueries = require('../db/queries/maps');

// GET /api/maps/list (guest) and GET /maps/:username/api/maps/list (logged in user)
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