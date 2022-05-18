const express = require("express");
const route = express.Router();
const multer = require('multer');
const postsmodel = require("../models/posts");

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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/webg" || file.mimetype == "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(req.flash('error','Allowed only .png, .jpg, .jpeg and .gif .webg .webp')
            );
        }
    }
});

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
                    req.flash('success','Article Is Created Successfully');
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
    postsmodel.findOneAndUpdate(req.params.id)
    .then((result) => {
        res.render('editpost', { stylecss:'/css/mainpage.css',title:'Addpost',user: req.user,posts: result });
    }).catch((err) => {
        console.log(err);
    })
});

route.post('edit/:id',  (req, res,next) => {
    const posts = postsmodel.findByIdAndUpdate(req.params.id,req.body)
        posts
        .save()
        .then((result) => {
        req.flash('success,"Article Updated Successfully');
        // res.redirect('/edit/:_id');
    }).catch((err) => {
        req.flash('error,"Article can not update');
        res.redirect('/edit/:_id');
    })

    });
    ///route to handle delete
    route.post('/delete/:id', (req, res) => {
        postsmodel.findByIdAndDelete(req.params.id).then((result)=>{
        req.flash('success,"Article deleted successfully');
        res.redirect('/');
    });
});


module.exports = route



