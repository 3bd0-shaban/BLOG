const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const services = require("../services/render");
const modelproductadd = require("../models/products");
// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { basicuser, premuimuser, ensureAuthenticated, forwardAuthenticated,plan } = require('../config/auth');


//home route
route.get("/", function (req, res) {
    res.redirect("BLOG");
})
route.get("/BLOG", services.mainpage);
route.get("/addpost",services.addpost)
route.get("/register",forwardAuthenticated, services.register);
route.get("/signin",forwardAuthenticated, services.signin);
route.get("/addproduct", services.addproduct);
route.get("/cart", services.cart);
route.get("/mainpage/category/:category", services.category);
route.get("/profile", services.profile);
route.get("/search", services.seach);
route.get("/signupasseller", services.signupseller);
route.get("/mainpage/:id", services.go_to_article);
route.get("/seller_rigister",services.signupseller);


module.exports = route





