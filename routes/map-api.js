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
router.get("/:user_id", (req, res) => {
  const user_id = req.session["user_id"];
  mapQueries
    .getUserMaps(user_id)
    .then((data) => {
      res.json(data);
      console.log("maps>>>>>",data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
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

// full url GET maps/:username/:user_id/profile/my-maps
router.get("/:username/:user_id/profile/my-maps", (req, res) => {
  const user_id = req.session["user_id"];
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
