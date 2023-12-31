/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});

router.get("/login", (req, res) => {
  const username = req.params.username;
  const templateVars = {
    username
  }
  res.render("login", templateVars);
});

router.get("/signup", (req, res) => {
  const username = req.params.username;
  const templateVars = {
    username
  }
  res.render("signup", templateVars);
});

router.get("/user", (req, res) => {
  const { username, password } = req.body;

})

// router.get("/users/:id", (req, res) => {
//   res.render("");
// });
// router.get("/maps", (req, res) => {
//   res.render("");
// });
// router.get("/maps/user_id/create", (req, res) => {
//   res.render("");
// });
// router.get("/maps/list", (req, res) => {
//   res.render("");
// });
// router.get("/maps/:map_id/points", (req, res) => {
//   res.render("");
// });
// router.get("/maps/:map_id/point_id", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:id/privacy", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:id/privacy", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:map_id/user_id/edit", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:map_id/user_id/favourite", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:map_id/user_id/points_id/edit", (req, res) => {
//   res.render("");
// });
// router.post("/maps", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:map_id/:user_id/points_id/delete", (req, res) => {
//   res.render("");
// });
// router.post("/maps/:id/delete", (req, res) => {
//   res.render("");
// });
module.exports = router;
