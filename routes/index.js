const express = require('express');
const route = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
route.get('/', forwardAuthenticated, (req, res) => res.render('/'));

// Dashboard
route.get('/', ensureAuthenticated, (req, res) =>
  res.render('mainpage', {
    user: req.user
  })
);

module.exports = route;