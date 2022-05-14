const mongoose = require("mongoose");
const { object } = require("webidl-conversions");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const addProduct = new Schema({
  photo:String,
  video:String,
  product_name: String,
  price: Number,
  Category:String,
  Child_category:String,
  brieve_description:String,
  full_description:String,
  checkout_url:String,
});
 
 
// Create a model based on that schema
const modelproductadd = mongoose.model("Product", addProduct);
 
 
// export the model
module.exports = modelproductadd; 