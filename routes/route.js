const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const services = require("../controller/render");
const {ensureAuthenticated, forwardAuthenticated,plan,premium,admin,premiumoradmin } = require('../config/auth');


//home route
route.get("/", function (req, res) {
    res.redirect("BLOG");
})
route.get("/BLOG", services.mainpage);
route.get("/addpost",ensureAuthenticated,premiumoradmin,services.addpost);
route.get("/register",forwardAuthenticated, services.register);
route.get("/signin",forwardAuthenticated, services.signin);
route.get("/infulancer", services.infulancer);
route.get("/dashboard",admin, services.dashboard);
route.get("/mainpage/:id", services.go_to_article);


module.exports = route





