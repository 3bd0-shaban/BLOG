const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const services = require("../services/render");
const modelproductadd = require("../models/products");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


//home route
route.get("/", function (req, res) {
    res.redirect("mingo");
})
route.get("/mingo", services.homepage);
route.get("/register", services.register);
route.get("/signin", services.signin);
route.get("/addproduct", services.addproduct);
route.get("/cart", services.cart);
route.get("/mainpage/category/:category", services.category);
route.get("/profile",ensureAuthenticated, services.profile);
route.get("/search", services.seach);
route.get("/signupasseller", services.signupseller);
route.get("/mainpage/:id", services.go_to_productpage);
route.get("/seller_rigister",services.signupseller);


module.exports = route





