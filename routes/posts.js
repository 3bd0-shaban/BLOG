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
      cb(null, "Uploads");
    },
    filename: (req, file, cb) => {
      const fileName = file.fieldname + '-' + Date.now();
      cb(null, fileName)
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
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
route.post("/addpost", upload.single("image"),
    (req, res) => {
        const {title,author,description}=req.body;
        let errors = [];
        if(!title || !author || !description){
            req.flash('error','Please fill all fields');
            res.redirect('/addpost');
        }else{
            const storepost = new postsmodel({
                title : req.body.title,
                author:req.body.author,
                description:req.body.description,
                image : {
                    data :  req.file.path,
                    contentType :'image/png'
                }
            });
            // res.json(productstore);
            console.log(req.body);

            storepost
                .save()
                .then(result => {
                    req.flash('success','This Post Is Created Successfully');
                    res.redirect('/addpost')
                    // res.send(console.dir(req.files));
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    );




module.exports = route



