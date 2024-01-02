/*
 * All routes for logged-in user Profile tab data are defined here
 * Since this file is loaded in server.js into /maps/:username/:user_id/,
 *   these routes are mounted onto /maps/:username/:user_id/
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

// GET /maps/:username/:user_id/profile/my-maps
router.get('/maps/:username/:user_id/profile/my-maps', (req, res) => {
  const user_id = req.params.user_id;

  mapQueries.getUserMaps(user_id)
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: err.message });
    })
})

module.exports = router;