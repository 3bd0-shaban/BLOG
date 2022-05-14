const mongoose = require('mongoose');

var sellersregister = new mongoose.Schema({
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
    phonenumber:{
        type : String,
        required: true
    },
    district:{
        type : String,
        required: true
    },
    apartment:{
        type : String,
        required: true
    },
    country:{
        type : String,
        required: true
    },
    state:{
        type : String,
        required: true
    },
    card_name:{
        type : String,
        required: true
    },
    zipcode:{
        type : Number,
        required: true
    },
    card_number:{
        type : Number,
        required: true
    },
    card_expire:{
        type : Number,
        required: true
    },
    cvv:{
        type : Number,
        required: true
    },
})

const sellers = mongoose.model('users', sellersregister);

module.exports = sellers;