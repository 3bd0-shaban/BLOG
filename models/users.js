const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var usersregister = new mongoose.Schema({
    first_name: {
        type : String,
        required: true
    },
    second_name: {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type : String,
        required: true
    },
    password2:{
        type : String,
        required: true
    },
    phonenumber:{
        type : String,
        required: true
    },
    // role: {type: String, default: "member"},
},{timestamps:true});


  

const users = mongoose.model('users', usersregister);
module.exports = users;