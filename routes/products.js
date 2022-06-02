const { product } = require('../models/product');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, './uploads/products');
   }
   ,
   filename: function(req, file, cb) {
     cb(null,    Date.now()+file.originalname);
   }
 });


 const fileFilter = (req, file, cb) => {
   // reject a file
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
     cb(null, true);
   } else {
     cb(null, false);
   }
 };

 const upload = multer({
   storage: storage,
   fileFilter: fileFilter
 });

router.get('/',async (req, res) => {
   try{
      const products = await product.find();
      //res.json(products);
      res.render('product',{products : products});
   }
   catch (error)
   {
      res.status(500).send({message: error.message});  
   }
})

router.post('/', upload.single('Image'), async (req, res) => {
   const newProduct = new product({
      Name: req.body.Name,
      Image: req.file?.path,
      Description:req.body.Description
     })
   try {   
      const result=await newProduct.save();
      res.status(201).json(result);
   }
   catch (e) {
      res.status(400).json({message:e.message});
   }
 
 });

 router.get('/:id',getProduct,async (req, res) => {
  res.render('productDetails',{product : res.product});
 });

 async function getProduct(req, res, next)
 { 
   let foundProduct;
      try{
         foundProduct = await product.findById(req.params.id);
         if(foundProduct == null)
         {
           return res.status(404).json({message:"product not found"});
         }
      }
      catch(e)
      {
         return res.status(500).json({message:"something went wrong"});
      }
      res.product = foundProduct;
      next();
 }


module.exports = router;


