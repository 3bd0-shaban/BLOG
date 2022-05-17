const { getMaxListeners } = require('../models/users');
const User = require('../models/users')

module.exports = {
  //Check if user is logged in
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      // req.isLogged = true
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/SignIn');
  },

  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');      
  },
  premium: function(req, res, next) {
    if ( req.user.plan === 'premium') {
      return next();
    }
    req.flash('error_msg', 'Please log in as a admin or premium to view that resource');
    res.redirect('/SignIn');
  },
  premiumoradmin: function(req, res, next) {
    if ( req.user.plan === 'premium' || req.user.isAdmin) {
      return next();
    }
    req.flash('error_msg', 'Please log in as a admin or premium to view that resource');
    res.redirect('/SignIn');
  },
  
//check if user is basic Or premium
  plan: function(req, res, next) {
    if (req.user.plan === "basic" || req.user.plan === 'premium') {
      return next();
    }
    req.flash('error_msg', 'Please log in as a basic or premium to view that resource');
    res.redirect('/SignIn');
  },
  
// Check if Admin is logedin
//admin@gmail.com
//123-456*
  admin:function(req,res,next){
    if (!req.user.isAdmin) {
      req.flash('error', 'You have no premission to see this page')
      return res.redirect('/signin');
    }
    return next();   
  }
};

