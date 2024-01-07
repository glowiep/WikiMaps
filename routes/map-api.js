/*
 * All routes for Map data are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps/:username/:user_id
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const mapQueries = require("../db/queries/maps");

// GET /maps/:user_id/:map_id/points
router.get("/:user_id/:map_id/points", (req, res) => {
  console.log(req.params)
  const { map_id } = req.params;

  mapQueries
    .getMapPoints(map_id)
    .then((points) => {
      res.json(points);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET /maps/:user_id/:map_id/map-info
router.get("/:user_id/:map_id/map-info", (req, res) => {
  const { map_id } = req.params;

  mapQueries
    .getMapInfo(map_id)
    .then((map) => {
      res.json(map);
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
  const { description,imageUrl, latitude, longitude, map_id} = req.body;
  

  // Insert the point into the database
  mapQueries.createPoints(description,imageUrl, latitude, longitude, map_id)
      .then(result => {
        console.log(">>>>>>>points", result);
          res.json(result.rows);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: err.message });
      });
});

// POST /maps/favorites/add
router.post('/favorites/add', (req, res) => {
  const { map_id } = req.body;
  const user_id = req.session["user_id"];

  // Insert the favorite into the database
  mapQueries.addFavorite(user_id, map_id)
      .then(result => {
        console.log(">>>>>>>", result);
          res.json(result.rows);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: err.message });
      });
});

// POST /maps/favorites/delete
router.post('/favorites/delete', (req, res) => {
  const { map_id } = req.body;
  const user_id = req.session["user_id"];
  console.log(user_id, map_id)

  // Delete the favorite from the database
  mapQueries.deleteFavorite(user_id, map_id)
      .then(result => {
        console.log(">>>>>>>", result);
          res.json(result.rows);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: err.message });
      });
});

// POST /maps/:map_id/delete
router.post('/:mapi_id/delete', (req, res) => {
  const { map_id } = req.body;
  const user_id = req.session["user_id"];
  console.log("map id>>>>>>>>", map_id)
  // Delete the favorite from the database
  mapQueries.deleteMaps(map_id)
      .then(result => {
        console.log(">>>>>>>", result);
          res.json(result.rows);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: err.message });
      });
});

// GET maps/:username/:user_id/profile/my-maps
// router.get("/:username/:user_id/profile/my-maps", (req, res) => {
//   const user_id = req.session["user_id"];
//   mapQueries
//     .getUserMaps(user_id)
//     .then((maps) => {
//       console.log(">>>>>>>", maps);
//       res.json({ maps });
//     })
//     .catch((err) => {
//       res.status(500).json({ err: err.message });
//     });
// });

// GET /maps/:user_id - Display my maps list
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

// GET maps/:username/:user_id/contributions
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

// GET maps/:username/:user_id/favorites
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
