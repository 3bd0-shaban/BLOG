var User = require('../models/users');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
// const { forwardAuthenticated } = require('../config/auth');
// create and save new user
exports.create = (req, res) => {
    const { first_name, second_name, email, password, password2, phonenumber,plan} = req.body;
    let errors = [];

    if (!first_name || !second_name || !email || !password || !password2 || !phonenumber || !plan ) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            stylecss:'/css/login.css', title: 'Rigster',errors,first_name,second_name,email,password,password2,phonenumber,plan
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    stylecss:'/css/login.css', title: 'Rigster',
                    errors,first_name,second_name,email,password,password2,phonenumber,plan
                });
            } else {
                const newUser = new User({
                    first_name,second_name,email,password,phonenumber,password2,plan
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash('success', 'You are now registered and can log in');
                                res.redirect('/SignIn');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}

// retrieve and return all User/ retrive and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        User.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving user with id " + id })
            })

    } else {
        User.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }


}

// Update a new idetified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.json({delete:'/dashboard'})
                // res.send({
                //     message: "User was deleted successfully!"
                // })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}