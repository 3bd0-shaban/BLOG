const express = require("express");
const route = express.Router();
const services = require("../controller/render");
const passport = require('passport');
const controller = require('../controller/users_controller');



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
  res.redirect('SignIn');
});

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


