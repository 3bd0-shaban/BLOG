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
    }
});



const infulancer = mongoose.model('infulancer', infulancerschema);
module.exports = infulancer;