const express = require("express");
const route = express.Router();
const jwt = require('jsonwebtoken'); // to generate token
// const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
const services = require("../services/render");
const modelproductadd = require("../models/products");
// const modeluser = require('../models/users');
// const passport = require('passport');
// const Controller = require("../Controller/Controller");
// const controller = require('../controller/controller');
// const { forwardAuthenticated } = require('../config/auth');



// route.post('/register', urlencodedParser, [
//     check('first_name', 'This username must me 3+ characters long')
//         .exists()
//         .isLength({ min: 3 }),
//     check('email', 'Email is not valid')
//         .isEmail()
//         .normalizeEmail()
// ], (req, res) => {

//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         // return res.status(422).jsonp(errors.array())
//         const alert = errors.array()
//         res.render('register', { alert })
//     }
// })

route.post("/upload_Product_data",urlencodedParser, [
    check('product_name', "product_name can't be empty").not().isEmpty().isLength({ min: 3 }),
    check('price', "price can't be empty").not().isEmpty(),
    check('category', "category can't be empty").not().isEmpty(),
    check('child_category', "child_category can't be empty").not().isEmpty(),
    check('brief_description', "brief_description can't be empty").not().isEmpty(),
    check('full_description', "full_description can't be empty").not().isEmpty(),
    check('checkout_url', "checkout_url can't be empty").not().isEmpty()
],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const alert = errors.array()
            res.render('AddProductSeller', { alert })
        }
        else{
            const productstore = new modelproductadd(req.body);
            // res.json(productstore);
            console.log(req.body);

            productstore
                .save()
                .then(result => {
                    req.flash('error','page added!');
                    res.render('AddProductSeller');
                    // res.send(console.dir(req.files));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });




module.exports = route





