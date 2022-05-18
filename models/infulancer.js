const mongoose = require('mongoose');

var infulancerschema = new mongoose.Schema({
    
    firstname : {
        type: String,
        required: true,
    },
    secondname:{
        type : String,
        required: true
    },
    image:{
        type:String,
    },
    education1:{
        type:String,
    },
    education2:{
        type:String,
    },
    education3:{
        type:String,
    },
    lang1:{
        type:String,
    },
    lang2:{
        type:String,
    },
    company1:{
        type:String,
    },
    company1:{
        type:String,
    },
    company3:{
        type:String,
    },
    award1:{
        type:String,
    },
    award2:{
        type:String,
    },
    award3:{
        type:String,
    },
    skill1:{
        type:String,
    },
    skill2:{
        type:String,
    },
    skill2:{
        type:String,
    },
});



const infulancer = mongoose.model('infulancer', infulancerschema);
module.exports = infulancer;