/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// GET /api/users
router.get("/", (req, res) => {
  const { username, password } = req.query;
  userQueries
    .getUsers()
    .then((users) => {
      for (const user of users) {
        if (username === user.username && password === user.password) {
          req.session['user_id'] = user.id
          return res.redirect(`/maps/${username}/${user.id}`);
        } else if (password !== user.password) {
          res.send("Password is incorrect!");
          return res.redirect("/users/login");
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
