const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 const productSchema = new Schema({
   _Id: {type:mongoose.Schema.Types.ObjectId},
   Name: {type:String, required: true}  ,
   Image: {type:String},
  Description:{type:String}  
 })

exports.product = mongoose.model('product',productSchema);
