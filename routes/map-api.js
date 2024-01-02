/*
 * All routes for Map data are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps/:username/:user_id
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const mapQueries = require("../db/queries/maps");

// GET /maps/:username/:user_id/:map_id
router.get("/:username/:user_id/:map_id", (req, res) => {
  const { map_id } = req.params;

  mapQueries
    .getMapPoints(map_id)
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:username/:user_id/profile/my-maps", (req, res) => {
  const user_id = 2;
  mapQueries
    .getUserMaps(user_id)
    .then((maps) => {
      console.log(">>>>>>>", maps);
      res.json({ maps });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

// Test with curl -X GET http://localhost:8080/maps/:username/:user_id/:map_id:
// curl -X GET http://localhost:8080/maps/HappyMapper/4/1

module.exports = router;
