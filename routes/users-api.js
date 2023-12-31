/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

// GET /api/users
router.get('/', (req, res) => {
  const { username, password } = req.query;
  // const redirectURL = ``
  userQueries.getUsers()
  .then(users => {
    for (const user of users) {
        if (username === user.username && password === user.password) {
          return res.redirect(`/maps/${username}`)
          // return res.redirect(`/maps?${username}`)
        } else if (password !== user.password) {
          res.send('Password is incorrect!');
          return res.redirect("/users/login")
        }
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
// router.get('/', (req, res) => {
//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;
