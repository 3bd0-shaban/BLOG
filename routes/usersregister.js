const express = require("express");
const route = express.Router();
const jwt = require('jsonwebtoken'); // to generate token
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const services = require("../services/render");
const modeluser = require('../models/users');
const passport = require('passport');
const controller = require('../controller/users_controller');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');




// Login Page
route.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
route.get('/register', forwardAuthenticated, (req, res) => res.render('register'));


// Login
route.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/SignIn',
    failureFlash: true
    
  })(req, res, next);
  req.flash('success_msg', 'invalid email or password');

});

// Logout
route.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


// const admin ={
//   email:"admin@gmail.com",
//   password :"123-456*"
// }
// route.post('/login', (req,res) => {
//   const { email,passport } = req.body;
//     let errors = [];

//     if (!email || !password ) {
//         errors.push({ msg: 'Please enter all fields' });
//     }else{
//       if (req.body.email == admin.email && req.body.passport == admin.password){
//         res.render("mainpage",{stylecss:"/css/mainpage.css",title:'mingo'});
//         req.seasion.users= req.body.email;
//       }else{
//         res.render("SignIn",{stylecss:"/css/mainpage.css",title:'mingo'});
//       }
//     }
  
// });



/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/users', services.users);

 /**
  *  @description add users
  *  @method GET /add-user
  */
 route.get('/add-user', services.add_user)
 
 /**
  *  @description for update user
  *  @method GET /update-user
  */
 route.get('/update-user', services.update_user)
 
 
 // API
 route.post('/api/users', controller.create);
 route.get('/api/users', controller.find);
 route.put('/api/users/:id', controller.update);
 route.delete('/api/users/:id', controller.delete);
 


module.exports = route


