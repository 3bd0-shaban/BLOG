// const Post = require("../models/posts");





// const addPost = (req, res) => {
//     const {title,author,description,image}=req.body;
//     // let errors = [];
//     if(!title || !author || !description){
//         req.flash('error','Please fill all fields');
//         res.redirect('/addpost');
//     }else{
//         const storepost = new Post({
//             title : req.body.title,
//             author:req.body.author,
//             description:req.body.description,
//             image: req.file.filename,
//         });
//         // res.json(productstore);
//         console.log(req.body);

//         storepost
//             .save()
//             .then(result => {
//                 req.flash('success','This Post Is Created Successfully');
//                 res.redirect('/addpost');
//                 // res.send(console.dir(req.files));
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//         }
// }







// module.exports = {
//     addPost
// }