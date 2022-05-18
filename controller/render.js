

const axios = require('axios');
const User = require('../models/users');
const Post = require("../models/posts");
const modelprofile = require("../models/infulancer")


exports.infulancer = (req,res)=>{
    modelprofile.find()
    .then((result) => {
        res.render("infulancer",{infulancer:result, stylecss:'/css/mainpage.css',title:'Infulancer',user: req.user});
    })
    .catch((err) => {
        console.log(err);
    });
}
exports.mainpage = (req,res)=>{
    Post.find()
    .then((result) =>{
        // let posts =  Post.find().sort({ timeCreated: 'desc' });
        res.render("mainpage",{posts:result,stylecss:'/css/mainpage.css',title:'BLOG',user: req.user});
    }).catch((err)=>{
        console.log(err);
    })
}
exports.go_to_article = (req,res)=>{
    Post.findById(req.params.id)
    .then((result) =>{
        res.render("article",{objposts:result,stylecss:'/css/mainpage.css',title:'BLOG',user: req.user});
    })
    .catch((err) =>{
        console.log(err);
    })
}
exports.addpost = (req,res)=>{
    res.render("addpost",{stylecss:'/css/mainpage.css',title:'Addpost',user: req.user});
}
exports.register = (req,res)=>{
    res.render("register",{stylecss:'/css/login.css',title:'Rigster',success:req.flash('success')});
}
exports.signin = (req,res)=>{
    res.render("signIn",{stylecss:'/css/login.css',title:'sign in',success:req.flash('success')});
}

exports.dashboard = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('Dashboard', { users : response.data ,title:"Dashboard"});
            
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("register", { user : userdata.data,title:'update information',stylecss:'/css/login.css'})
        })
        .catch(err =>{
            res.send(err);
        })
}
