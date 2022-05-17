const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

// Load User model
const User = require('../models/users');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email: email }) 
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            //   if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
          // if (user.role === "basic") {
          //   return passport.authenticate("local", {
          //     successRedirect: "/",
          //     failureRedirect: "/SignIn",
          //     success_msg: req.flash("success_msg", "successfully logged in"),
          //     failureFlash: true,
          //     successFlash: true,
          //   })(req, res, next);
          // }
          // if (user.role === "premium") {
          //   return passport.authenticate("local", {
          //     successRedirect: "/SignIn",
          //     failureRedirect: "/SignIn",
          //     success_msg: req.flash("success_msg", "successfully logged in"),
          //     failureFlash: true,
          //     successFlash: true,
          //   })(req, res, next);
          // }

        });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
