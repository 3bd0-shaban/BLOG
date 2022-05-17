const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const services = require("../services/render");
const postsmodel = require("../models/posts");
// const { basicuser, premuimuser, ensureAuthenticated, forwardAuthenticated,plan } = require('../config/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/Uploads");
    },
    filename: (req, file, cb) => {
    //   const fileName = file.fieldname + '-' + Date.now();
      cb(null, Date.now() + file.originalname)
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
      },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/webg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(req.flash('error','Allowed only .png, .jpg, .jpeg and .gif,webp')
            );
        }
    }
});

// const Storage = multer.diskStorage({
//     destination : "Uploads",
//     filename : (req,res,cb) =>{
//         cb(null,file.originalname);
//     },
// });
// const upload = multer({
//     storage:Storage
// }).single('testImage')
route.post("/addpost", upload.single('image'),
    (req, res) => {
        const {title,author,description,image}=req.body;
        let errors = [];
        if(!title || !author || !description){
            req.flash('error','Please fill all fields');
            res.redirect('/addpost');
        }else{
            const storepost = new postsmodel({
                title : req.body.title,
                author:req.body.author,
                description:req.body.description,
                image: req.file.filename,
            });
            // res.json(productstore);
            console.log(req.body);

            storepost
                .save()
                .then(result => {
                    req.flash('success','This Post Is Created Successfully');
                    res.redirect('/addpost');
                    // res.send(console.dir(req.files));
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    );

    // route that handles edit view
    route.get('/edit/:id', (req, res) => {
        let posts =  postsmodel.findById(req.params.id);
        res.render('editpost', { stylecss:'/css/mainpage.css',title:'Addpost',user: req.user,posts: posts });
    });
  
    route.put('/:id',  (req, res) => {
        req.posts =  postsmodel.findById(req.params.id);
        let posts = req.posts;
        posts.title = req.body.title;
        posts.author = req.body.author;
        posts.description = req.body.description;
      
        try {
            posts =  posts.save();
          //redirect to the view route
          res.redirect(`/mainpage/${blog.slug}`);
        } catch (error) {
          console.log(error);
          res.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
        }
      });
      ///route to handle delete
    route.delete('/:id', (req, res) => {
        postsmodel.findByIdAndDelete(req.params.id);
        res.redirect('/');
    });



module.exports = route



