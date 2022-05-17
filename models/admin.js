const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var admin = new mongoose.Schema({
    
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
    isAdmin:Boolean,
    // role: {type: String, default: "member"},
},{timestamps:true});



const Admin = mongoose.model('admin', admin);
module.exports = Admin;