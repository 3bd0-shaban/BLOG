const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var postscema = new mongoose.Schema({
    
    title : {
        type: String,
        required: true,
    },
    author:{
        type : String,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    image:{
        type:String,
    }
    // role: {type: String, default: "member"},
});



const posts = mongoose.model('posts', postscema);
module.exports = posts;