/*
 * All routes for Map data are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const mapQueries = require("../db/queries/maps");

// GET /maps/:user_id/my-maps - Display my maps list
router.get("/:user_id/my-maps", (req, res) => {
  const user_id = req.session["user_id"];
  mapQueries
    .getUserMaps(user_id)
    .then((data) => {
      res.json(data);
      
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET maps/:username/:user_id/contributions  - Display contributions
router.get("/:user_id/contributions", (req, res) => {
  const user_id = req.session["user_id"];
  mapQueries
    .getUserContributions(user_id)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

// GET maps/:username/:user_id/favorites  - Display favorites
router.get("/:user_id/favorites", (req, res) => {
  const user_id = req.session["user_id"];
  mapQueries
    .getUserFavorites(user_id)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

module.exports = router;
