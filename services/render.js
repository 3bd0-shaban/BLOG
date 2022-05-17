
const modelproductadd = require("../models/products");
const modelusers = require('../models/users');
const postsmodel = require("../models/posts");

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

exports.mainpage = (req,res)=>{
    postsmodel.find()
    .then((result) =>{
        let posts =  postsmodel.find().sort({ timeCreated: 'desc' });
        res.render("mainpage",{posts:result,stylecss:'/css/mainpage.css',title:'BLOG',user: req.user});
    }).catch((err)=>{
        console.log(err);
    })
}
exports.go_to_article = (req,res)=>{
    modelproductadd.findById(req.params.id)
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
exports.cart = (req,res)=>{
    modelproductadd.findById(req.params.id)
    .then((result) =>{
        res.render("cart",{objproduct:result, stylecss:'css/cart.css',title:'Cart'});
    })
    .catch((err) =>{
        console.log(err);
    })
}
exports.profile = (req,res)=>{
    modelusers.find()
    .then((result) => {
        res.render("PersonalProfile",{users : result.data, stylecss:'/css/personalProfile.css',title:'Profile'});
    })
    .catch((err) => {
        console.log(err);
    });
}
exports.seach = (req,res)=>{
    res.render("Searching",{stylecss:'css/Searching.css',title:'Searching......'});
}
exports.signupseller = (req,res)=>{
    res.render("signupseller",{stylecss:'',title:'Sign Up For Sellers'});
}
exports.category = (req, res) => {
    modelproductadd.find({category})
    .then((result) => {
        res.render("categories",{arrproduct:result,stylecss:"css/Searching.css",title:'Category'});
    })
    .catch((err) => {
        console.log(err);
    });
}


//////////////////
const axios = require('axios');


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

//////////////////
exports.addproduct = (req,res)=>{
    modelproductadd.find()
    .then((result) =>{
        res.render("AddProductSeller",{arrproduct:result});
    })
    .catch((err) =>{
        console.log(err);
    })
}


