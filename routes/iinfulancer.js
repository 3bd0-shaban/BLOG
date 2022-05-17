const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const services = require("../services/render");
const infulancermodel = require("../models/infulancer");
const { basicuser, premuimuser, ensureAuthenticated, forwardAuthenticated,plan } = require('../config/auth');




module.exports = route




