/*
 * All routes for logged-in user Profile tab data are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapListQueries = require('../db/queries/maps');


module.exports = router;