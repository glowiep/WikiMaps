/*
 * All routes for Map data are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
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

// GET /maps/:username/:user_id/add
router.post("/:username/:user_id/add", (req, res) => {
  const { title, description, isPrivate} = req.body;
  const user_id = req.session["user_id"];
  mapQueries
    .createMap(title, description, isPrivate, user_id)
    .then((rows) => {
      if (rows && rows.length > 0) {
        console.log("new map....", rows);
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: "No data returned from the query." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST /maps/points/add
router.post('/points/add', (req, res) => {
  const { description,imageUrl, latitude, longitude } = req.body;
  const map_id = 1;

  // Insert the point into the database
  mapQueries.createPoints(description,imageUrl, latitude, longitude, map_id)
      .then(result => {
        console.log(">>>>>>>",result);
          res.json(result.rows);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: err.message });
      });
});

module.exports = router;
